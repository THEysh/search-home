# ==================== 第一阶段：安装依赖（利用缓存） ====================
FROM node:20-alpine AS deps

WORKDIR /app

# 复制 package 文件（利用 Docker 层缓存）
COPY package*.json ./

# 只安装生产依赖（--omit=dev）
RUN npm ci --omit=dev && npm cache clean --force

# ==================== 第二阶段：生产镜像 ====================
FROM node:20-alpine AS runner

WORKDIR /app

# 创建非 root 用户，提高安全性
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nextjs

# 复制生产依赖
COPY --from=deps /app/node_modules ./node_modules

# 复制项目文件（前端静态文件 + 后端代码）
COPY . .

# 确保 uploads 目录存在（虽然我们会用 volume 挂载）
RUN mkdir -p uploads \
    && chown -R nextjs:nodejs /app

# 切换到非 root 用户
USER nextjs

# 暴露端口（你的项目默认是 39421）
EXPOSE 39421

# 启动命令（推荐直接用 node 执行，而不是 npm start，更好地接收信号）
CMD ["node", "server.js"]