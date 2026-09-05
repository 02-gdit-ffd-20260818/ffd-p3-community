# 第 13 次课教师指南｜P3 v2.0 协同管理

## 本课可验收结果

成员登录后提交资料，审核员才能查看/审批；非法状态跳转被拒绝。CSV 必须先预览，任一错误使整批不写入；导出隐藏完整邮箱并防止表格公式注入。开发使用 SQLite，生产使用 MySQL、systemd 与 Nginx。

## 三学时路径

| 学时 | 教师演示 | 学生证据 |
| --- | --- | --- |
| 1 | 状态图、权限矩阵、登录和服务器授权 | 401、403、合法/非法转换 |
| 2 | 提交表单、审核列表、CSV 行校验和事务 | 行号报告、失败前后数量相同 |
| 3 | 脱敏导出、MySQL、备份恢复、CI/CD | 备份路径、恢复核对、URL、Release |

## 本地运行

复制 `.env.example` 为 `.env`，设置至少 32 字符的 `SESSION_SECRET` 和两个至少 12 字符的密码。PowerShell 可先把变量写入当前终端，再分别运行：

```powershell
npm run db:migrate
npm run dev:api
npm run dev
```

## 五个必须现场证明的失败路径

1. 未登录提交返回 401。
2. member 请求审核接口返回 403。
3. 已通过记录再次驳回返回 400 `INVALID_TRANSITION`。
4. CSV 错误行返回行号，数据库数量不变。
5. CSV 中已有邮箱导致 409，正确的新行也不应部分写入。

## 发布门

运行 `npm run check`、`npm test`、`npm run build`；生产 MySQL 执行迁移、验证、备份及隔离恢复。CI 绿色后自动发布 Netlify，再建立 `p3-v2.0` Release。
