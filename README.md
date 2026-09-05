# 群像云图｜P3 成员数字画像与协同管理平台

当前版本：`p3-v2.0` 提交审核、权限、CSV 与 MySQL。

## 教师从这里开始

```powershell
npm ci
npm run check
npm test
npm run build
npm run dev
```

第 12 次课使用两份 v1.x 指南；第 13 次课从 `docs/lesson-13-teacher-guide.md` 开始。

## 已实现

- 8 条虚构成员数据和字段字典。
- 未授权资料过滤与公开字段白名单。
- 响应式画像卡片、详情面板和图片失败回退。
- 空地点、空介绍、空兴趣与空技能处理。
- 正常、边界、失败/隐私自动测试。
- GitHub Actions、Netlify 配置与 SPA fallback。
- CI 通过后触发的 Netlify 自动生产部署。
- 关键字与技能组合筛选、零结果和清除条件。
- 从当前筛选结果实时聚合的 ECharts 技能柱状图与文本摘要。
- HMAC 签名会话、成员/审核员 RBAC 与服务器端状态机。
- CSV 预览、全批事务导入、重复邮箱回滚、公式注入防护和脱敏导出。
- SQLite 本地数据层与 MySQL 生产数据层，共用同一 API 契约。

## 固定入口

- 仓库：<https://github.com/02-gdit-ffd-20260818/ffd-p3-community>
- 生产站点：<https://ffd-p3-community.netlify.app/>

## 版本路线

- `p3-v1.0`：画像、详情、授权与最少采集。
- `p3-v1.1`：关键字/技能筛选、聚合函数与 ECharts 图谱。
- `p3-v2.0`：提交审核、服务器 RBAC、CSV 事务导入、脱敏导出与 MySQL。
