# 基于官方 Node.js 映像创建
FROM node:latest

# 创建工作目录
WORKDIR /opt/app

# 将项目源代码复制到工作目录
COPY . .

# 安装 PM2
# 安装项目依赖
RUN npm config set registry https://registry.npmmirror.com && \
  npm install -g pm2 cnpm && \
  cnpm install

# 对外暴露的端口号(根据你的实际情况修改)
EXPOSE 6688

# 容器启动时运行 npm start
CMD [ "npm", "start" ]