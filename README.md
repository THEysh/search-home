# Search Home

一个基于 `React + Vite + Express` 的可定制搜索主页项目，支持快捷链接管理、背景图管理，以及本地存储 / 腾讯云 COS 两种图片模式。

## 功能概览

- 搜索框，支持 `Google` / `Bing`
- 快捷链接新增、编辑、删除
- 快捷链接图标支持 `Emoji` 或网站 `favicon`
- 背景图片上传、切换、删除
- 背景模糊、遮罩、位置调整
- 支持本地图片存储
- 支持腾讯云 COS 图片存储

## 图片存储模式

项目支持两种背景图存储模式，后端启动时自动判断。

### 1. 本地模式

当没有配置完整的 COS 环境变量时，项目使用本地模式：

- 图片保存在 `uploads/`
- 后端提供 `/uploads/...` 访问
- 运行时数据保存在：
  - `links.json`
  - `background.json`
  - `images.json`

### 2. COS 模式

当配置了完整的 COS 环境变量时，项目自动切换到 COS 模式：

- 原图上传到腾讯云 COS
- `thumbUrl` 和 `url` 基于原图的 COS 图片处理样式生成
- 本地不再保存图片实体，只保留索引和配置
- 删除图片时会同步删除 COS 中的原图对象

当前图片策略：

- 背景图片管理列表：`thumbUrl -> url`
- 主页背景图：直接使用 `originalUrl`
- 图片缓存：`30 天`

## 环境变量

如果要启用腾讯云 COS，请在项目根目录创建 `.env` 文件。

示例：

```env
PORT=39421
COS_BUCKET=theysh-1321988599
COS_REGION=ap-chongqing
COS_BASE_URL=https://theysh-1321988599.cos.ap-chongqing.myqcloud.com
COS_SECRET_ID=your-secret-id
COS_SECRET_KEY=your-secret-key
COS_STYLE_DISPLAY=imageMogr2/auto-orient/thumbnail/1920x>/format/jpg/interlace/1
COS_STYLE_THUMB=imageMogr2/auto-orient/thumbnail/360x>/format/jpg/interlace/1
```

说明：

- `PORT`：本地和 Docker 共用的服务端口，默认 `39421`
- 不填写 COS 变量：使用本地模式
- 填写完整 COS 变量：使用 COS 模式
- 推荐将真实密钥写入 `.env`
- 不要把真实密钥提交到 Git

项目中已经提供 [.env.example](/F:/ysh_loc_office/projects/home/.env.example) 作为模板。

## 本地开发

### 环境要求

- Node.js `18+`
- npm `9+`

### 安装依赖

```bash
npm install
```

### 启动后端

```bash
npm run server
```

后端会自动读取项目根目录中的 `.env`。

默认地址：

- `http://localhost:39421`

如果你修改了 `.env` 中的 `PORT`，后端会监听新的端口。

### 启动前端

新开一个终端执行：

```bash
npm run dev
```

默认地址：

- `http://localhost:5173`

开发模式访问：

- `http://localhost:5173`

### 开发模式说明

开发模式需要两个进程同时运行：

1. `npm run server`
2. `npm run dev`

Vite 已配置代理，以下请求会自动转发到后端：

- `/api`
- `/uploads`

## 生产运行

### 构建前端

```bash
npm run build
```

### 启动服务

```bash
npm start
```

访问地址：

- `http://localhost:39421`

如果你修改了 `.env` 中的 `PORT`，这里的端口也会变化。

## Docker 运行

### 1. 直接构建并运行本地镜像

先构建镜像：

```bash
docker build -t search-home:local .
```

### 本地模式

不配置 COS，只使用本地文件存储：

```bash
docker run -d \
  --name search-home \
  --env-file .env \
  -p ${PORT}:${PORT} \
  -v ${PWD}/uploads:/app/uploads \
  -v ${PWD}/links.json:/app/links.json \
  -v ${PWD}/background.json:/app/background.json \
  -v ${PWD}/images.json:/app/images.json \
  search-home:local
```

### COS 模式

在 `.env` 中填入完整 COS 配置后运行：

```bash
docker run -d \
  --name search-home \
  --env-file .env \
  -p ${PORT}:${PORT} \
  -v ${PWD}/links.json:/app/links.json \
  -v ${PWD}/background.json:/app/background.json \
  -v ${PWD}/images.json:/app/images.json \
  search-home:local
```

说明：

- Docker 运行时也会读取 `.env` 中的 `PORT`
- 容器内部和宿主机映射端口保持一致

## Docker Compose

项目自带 [docker-compose.yml](/F:/ysh_loc_office/projects/home/docker-compose.yml)。

### 启动

```bash
docker compose up -d
```

### 停止

```bash
docker compose down
```

### 模式说明

- 如果 `.env` 中没有完整 COS 配置：使用本地模式
- 如果 `.env` 中有完整 COS 配置：使用 COS 模式

`docker-compose.yml` 当前会读取：

- `PORT`
- `COS_BUCKET`
- `COS_REGION`
- `COS_BASE_URL`
- `COS_SECRET_ID`
- `COS_SECRET_KEY`
- `COS_STYLE_DISPLAY`
- `COS_STYLE_THUMB`

同时映射：

- `uploads/`
- `links.json`
- `background.json`
- `images.json`

## 首次运行需要准备的文件

如果本地缺少运行时文件，可以先复制示例文件。

Windows PowerShell：

```powershell
copy links.example.json links.json
copy background.example.json background.json
copy images.example.json images.json
```

macOS / Linux：

```bash
cp links.example.json links.json
cp background.example.json background.json
cp images.example.json images.json
```

如果使用本地模式，还需要确保上传目录存在：

Windows PowerShell：

```powershell
mkdir uploads
mkdir uploads\originals
mkdir uploads\display
mkdir uploads\thumbs
```

macOS / Linux：

```bash
mkdir -p uploads/originals uploads/display uploads/thumbs
```

## 运行时数据说明

### 本地模式

- 图片保存在 `uploads/`
- 索引与配置保存在：
  - `links.json`
  - `background.json`
  - `images.json`

### COS 模式

- 图片原图保存在 COS
- 本地仍保留：
  - `links.json`
  - `background.json`
  - `images.json`

## API 概览

| Method | Path | 说明 |
| --- | --- | --- |
| `GET` | `/api/emojis` | 获取 Emoji 数据 |
| `GET` | `/api/links` | 读取快捷链接 |
| `POST` | `/api/links` | 保存快捷链接 |
| `GET` | `/api/background` | 读取背景配置 |
| `POST` | `/api/background` | 保存背景配置 |
| `GET` | `/api/images` | 获取背景图片列表 |
| `POST` | `/api/upload` | 上传背景图 |
| `DELETE` | `/api/upload/:filename` | 删除背景图 |

## 常见问题

### 为什么我本地写了 `.env`，但没有上传到 COS？

请确认：

- 你启动的是当前新代码版本
- 根目录里存在 `.env`
- `.env` 中填写了完整的 COS 配置
- 启动日志中显示的是 `storage: 'cos'`

### 本地 `npm run server` 会自动读取 `.env` 吗？

会。当前后端已经接入 `dotenv`，本地启动时会自动读取 `.env`。

### COS 模式下图片还会保存本地吗？

不会保存图片实体到本地。

COS 模式下：

- 原图上传到 COS
- 本地仅保留索引与配置文件

### 浏览器缓存多久？

当前图片缓存策略为：

- `30 天`
- `Cache-Control: public, max-age=2592000, immutable`

本地模式和 COS 模式都按这个策略执行。

## 目录结构

```text
.
├─ src/
│  ├─ components/
│  ├─ constants/
│  ├─ features/
│  ├─ hooks/
│  ├─ services/api/
│  ├─ styles/
│  └─ utils/
├─ uploads/
├─ image_github/
├─ .env.example
├─ background.example.json
├─ background.json
├─ images.example.json
├─ images.json
├─ links.example.json
├─ links.json
├─ docker-compose.yml
├─ docker-entrypoint.sh
├─ Dockerfile
├─ server.js
└─ README.md
```

## License

MIT
