# P3 v2.0 部署与恢复手册

## 固定入口

- Netlify：<https://ffd-p3-community.netlify.app/>
- Ubuntu API：`http://47.120.73.69/ffd-p3-api`
- 内部端口：3020；systemd：`ffd-p3-api.service`；服务用户：`ffd-p3`
- 生产数据库：MySQL `ffd_p3`；应用账号：`ffd_p3_app@localhost`

## 生产顺序

1. 将 Release 源码部署到 `/srv/ffd-p3/app`，运行 `npm ci --omit=dev`。
2. 在 `/etc/ffd-p3-api.env` 配置 MySQL、Session Secret、member/reviewer 初始账号；权限为 `640 root:ffd-p3`。
3. 执行 `npm run db:mysql:migrate` 和 `npm run db:mysql:verify`。
4. systemd 启动 API，Nginx 将 `/ffd-p3-api/` 反代至 `127.0.0.1:3020/`。
5. Netlify 的 `/api/*` 与 `/health` 服务端代理连接 Ubuntu；无域名期间这是 HTTP 教学过渡链路。

## 备份与恢复

```bash
npm run db:mysql:backup -- /srv/ffd-p3/backups/p3-v2.0.sql
npm run db:mysql:restore -- /srv/ffd-p3/backups/p3-v2.0.sql
npm run db:mysql:verify
```

恢复前必须停止 API 并备份当前库。优先恢复到隔离临时库核对表数与记录数，不直接覆盖生产库。

## 回滚

记录失败 commit → 备份当前库 → 切回上一 Release → `npm ci --omit=dev` → 必要时恢复匹配备份 → 重启 → health/login/权限/公开列表 smoke。日志不得出现密码、Bearer token、邮箱或 CSV 正文。
