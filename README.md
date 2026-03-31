# Search Home

`Search Home` 是一个面向浏览器新标签页场景的轻量化主页应用，基于 `React + Vite + Express` 构建，提供搜索入口、快捷链接管理、背景图片上传与可视化裁剪能力。

项目采用前后端同仓库模式：
- 前端使用 `React` 组织界面与状态。
- 开发阶段由 `Vite` 提供构建与热更新。
- 后端由 `Express` 提供 API、静态资源访问与生产环境 `dist` 托管。

![](./image_github/image1.png)
![](./image_github/image2.png)

## 核心能力

- 搜索引擎切换：支持 `Google` 与 `Bing` 快速切换。
- 快捷链接管理：支持新增、编辑、删除，图标可使用站点 favicon 或 Emoji。
- 背景图片管理：支持上传、选择、删除、模糊度调整、遮罩强度调整。
- 可视化背景裁剪：裁剪框按当前窗口比例计算，并在窗口尺寸变化时自动重算。
- 本地数据持久化：链接配置、背景配置与上传图片持久化保存在服务端本地文件系统。
- 生产部署简化：Express 同时提供 API 与前端静态资源托管。

## 技术栈

- Frontend: `React 19`, `Vite`
- Backend: `Node.js`, `Express`
- Image Processing: `Sharp`
- File Upload: `Multer`
- Linting: `ESLint`

## 目录结构

```text
.
├─ src/
│  ├─ components/          # 通用 UI 组件
│  ├─ constants/           # 默认配置与静态常量
│  ├─ features/            # 按业务域拆分的前端模块
│  ├─ hooks/               # 自定义 hooks
│  ├─ services/api/        # 前端 API 封装
│  ├─ styles/              # 全局样式
│  └─ utils/               # 工具函数
├─ index.html              # Vite 前端入口
├─ vite.config.js          # Vite 配置
├─ server.js               # Express 服务与 API
├─ emoji_data.json         # Emoji 分类数据
├─ links.example.json      # 快捷链接示例配置
├─ background.example.json # 背景配置示例
├─ uploads/                # 本地运行期图片目录，默认忽略
├─ links.json              # 本地运行期链接数据，默认忽略
└─ background.json         # 本地运行期背景配置，默认忽略
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

## 启动方式

### 开发模式

开发模式下，前后端需要分别启动。

#### 终端 1：启动后端服务

在项目根目录执行：

```bash
npm run server
```

后端默认监听：

- `http://localhost:39421`

后端职责：

- 提供 `/api/*` 接口
- 提供 `/uploads/*` 图片资源访问
- 初始化本地运行期数据文件

首次启动时，如果以下文件或目录不存在，后端会自动创建：

- `uploads/`
- `links.json`
- `background.json`

#### 终端 2：启动前端开发服务器

在另一个终端、同样位于项目根目录执行：

```bash
npm run dev
```

前端开发服务器默认监听：

- `http://localhost:5173`

Vite 已配置代理，以下请求会自动转发到后端 `http://localhost:39421`：

- `/api`
- `/uploads`

因此，开发时你应当访问：

- `http://localhost:5173`

而不是直接访问后端端口。

#### 开发模式启动顺序

推荐顺序如下：

1. 先执行 `npm run server`
2. 再执行 `npm run dev`
3. 最后在浏览器打开 `http://localhost:5173`

#### 开发模式常用命令

安装依赖：

```bash
npm install
```

启动后端：

```bash
npm run server
```

启动前端：

```bash
npm run dev
```

执行静态检查：

```bash
npm run lint
```

执行构建：

```bash
npm run build
```

### 生产模式

生产模式只需要启动一个 Node.js 进程，但前提是前端资源已经完成构建。

#### 第一步：构建前端

```bash
npm run build
```

构建完成后，前端文件会输出到：

- `dist/`

#### 第二步：启动生产服务

```bash
npm start
```

生产模式下，Express 默认监听：

- `http://localhost:39421`

此时 Express 会同时负责：

- 提供 `/api/*` 接口
- 提供 `/uploads/*` 静态资源
- 托管 `dist/` 前端构建产物
- 对非 API 路由执行 SPA fallback

因此，生产模式访问地址是：

- `http://localhost:39421`

### 启动结果对照

| 模式 | 需要启动的进程 | 访问地址 | 说明 |
| --- | --- | --- | --- |
| 开发模式 | `npm run server` + `npm run dev` | `http://localhost:5173` | 前端热更新，API 由 Vite 代理到后端 |
| 生产模式 | `npm start` | `http://localhost:39421` | Express 同时提供前端页面与 API |

## 代码质量

执行静态检查：

```bash
npm run lint
```

执行生产构建：

```bash
npm run build
```

## 数据与文件说明

以下文件或目录属于本地运行期数据，默认不纳入版本控制：

- `uploads/`
- `links.json`
- `background.json`

应用首次启动时，如上述文件缺失，服务端会自动初始化默认内容。

图片上传后会自动生成两个派生版本：

- `display`：用于页面展示的优化图片
- `thumb`：用于列表预览的缩略图

## API 概览

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/links` | 读取快捷链接配置 |
| `POST` | `/api/links` | 保存快捷链接配置 |
| `GET` | `/api/background` | 读取背景配置 |
| `POST` | `/api/background` | 保存背景配置 |
| `GET` | `/api/images` | 读取已上传图片列表 |
| `POST` | `/api/upload` | 上传背景图片 |
| `DELETE` | `/api/upload/:filename` | 删除指定图片 |
| `GET` | `/api/emojis` | 读取 Emoji 分类数据 |

## 配置约定

- 背景位置使用 `positionX` / `positionY` 百分比持久化。
- 背景裁剪框始终以当前窗口宽高比计算最大可视区域。
- 前端静态资源构建输出目录固定为 `dist/`。
- 运行期图片资源目录固定为 `uploads/`。

## 开发说明

- 前端代码按功能域拆分在 `src/features/` 下。
- 通用组件放置于 `src/components/`。
- API 请求统一收敛到 `src/services/api/`。
- 统一导出入口已在 `components`、`features`、`hooks`、`constants` 等目录建立。

## License

MIT
