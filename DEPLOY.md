# Vercel 上线说明

## 项目基线

- Node.js：20（`.nvmrc`）
- Next.js：15.5.24
- React / React DOM：18.3.1
- Framework：Next.js
- 必需环境变量：无
- 数据库：无

## 部署前

```bash
npm ci
npm run check
npm run build
```

`npm run check` 不依赖 Next.js，可以先检查 JSON、相对 import、公开资源、明显凭证和关键部署文件。

## Vercel 设置

1. 将项目根目录作为 Vercel Project Root。
2. Framework Preset 使用 Next.js（`vercel.json` 已显式声明）。
3. Build Command 使用默认 `npm run build`。
4. Install Command 使用默认设置；项目包含 `package-lock.json`，可使用 `npm ci`。
5. 不需要填写环境变量。
6. 部署后先保留 Preview URL 做验收，再提升为 Production。

## 上线后检查

重点检查：

- `/` 首页首屏、导航与 iPhone safe-area
- `/schools` 与任意院校详情
- 收藏/加入目标后 `/my-application` 状态同步
- `/sheet-music`、作曲家作品页与练声曲详情
- `/music-history`、作曲家、歌剧、浪漫曲和百科
- `/evaluate` 文件选择与本地预检
- iPhone 竖屏、iPad 竖屏/横屏

## 已知说明

“我的申请”是 localStorage 本地模式，不会跨设备自动同步。公开作曲家肖像来自外部图片地址；网络不可用时部分人物图可能显示失败，但文字内容仍可使用。
