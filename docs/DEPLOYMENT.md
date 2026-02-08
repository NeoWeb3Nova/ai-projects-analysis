# 部署指南

本文档提供了将 AI 案例拆解平台部署到生产环境的详细步骤。

## 📋 部署前检查清单

- [x] 所有功能测试通过
- [x] 生产构建成功 (`npm run build`)
- [x] 环境变量已配置
- [x] 数据库已设置（Supabase 配置已就绪）
- [ ] 域名已准备（可选）

## 🚀 部署选项

### 选项 1: Vercel（推荐）

Vercel 是 Next.js 的官方部署平台，提供最佳的开箱即用体验。

#### 步骤：

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署到生产环境**
   ```bash
   vercel --prod
   ```

4. **配置环境变量**
   - 在 Vercel Dashboard 中添加环境变量
   - 设置 `NEXT_PUBLIC_SUPABASE_URL`
   - 设置 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **自定义域名（可选）**
   - 在 Vercel Dashboard 的 Domains 部分添加自定义域名
   - 按照提示配置 DNS 记录

#### 优势：
- ✅ 零配置部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动预览部署
- ✅ Git 集成

### 选项 2: Netlify

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **部署**
   ```bash
   netlify deploy --prod
   ```

4. **配置**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - 在 Netlify Dashboard 中设置环境变量

### 选项 3: 自托管（Docker）

1. **创建 Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci

   # Build
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # Production
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **构建 Docker 镜像**
   ```bash
   docker build -t ai-case-study-platform .
   ```

3. **运行容器**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SUPABASE_URL=your_url \
     -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
     ai-case-study-platform
   ```

### 选项 4: 云服务器（VPS）

适用于 AWS EC2, DigitalOcean, Linode 等。

1. **安装 Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **克隆项目**
   ```bash
   git clone your-repo-url
   cd ai_projects_analysis
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   # 编辑 .env.local 添加实际的环境变量
   ```

5. **构建项目**
   ```bash
   npm run build
   ```

6. **使用 PM2 运行**
   ```bash
   npm install -g pm2
   pm2 start npm --name "ai-case-study" -- start
   pm2 save
   pm2 startup
   ```

7. **配置 Nginx 反向代理**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **配置 SSL（Let's Encrypt）**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 🔐 环境变量配置

### 必需的环境变量

```env
# Supabase（如果使用）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 可选的环境变量

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 其他服务
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## 📊 性能优化建议

### 1. 启用压缩

在 `next.config.js` 中：
```javascript
module.exports = {
  compress: true,
}
```

### 2. 图片优化

使用 Next.js Image 组件：
```tsx
import Image from 'next/image';

<Image 
  src="/path/to/image.jpg" 
  width={500} 
  height={300} 
  alt="Description"
/>
```

### 3. 启用 ISR（增量静态再生）

对于案例详情页：
```typescript
export const revalidate = 3600; // 每小时重新生成
```

### 4. CDN 配置

- 使用 Vercel 的全球 CDN
- 或配置 Cloudflare CDN

## 🔍 监控和日志

### Vercel Analytics

在 Vercel Dashboard 中启用 Analytics 功能。

### 自定义监控

集成 Sentry 进行错误追踪：

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🔄 持续集成/持续部署 (CI/CD)

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🐛 故障排查

### 构建失败

1. **检查 Node.js 版本**
   ```bash
   node --version  # 应该 >= 18.0.0
   ```

2. **清除缓存**
   ```bash
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run build
   ```

### 运行时错误

1. **检查环境变量**
   - 确保所有必需的环境变量都已设置
   - 在 Vercel/Netlify Dashboard 中验证

2. **查看日志**
   ```bash
   # Vercel
   vercel logs

   # PM2
   pm2 logs ai-case-study
   ```

### 性能问题

1. **启用生产模式**
   ```bash
   NODE_ENV=production npm start
   ```

2. **检查包大小**
   ```bash
   npm run build
   # 查看 .next/analyze/ 目录
   ```

## 📈 扩展建议

### 数据库扩展

- 使用 Supabase 的连接池
- 启用数据库索引
- 考虑使用 Redis 缓存

### 负载均衡

对于高流量场景：
- 使用多个服务器实例
- 配置负载均衡器（Nginx, AWS ELB）
- 使用 Kubernetes 进行容器编排

## 🔒 安全检查

- [ ] HTTPS 已启用
- [ ] 环境变量不在代码中硬编码
- [ ] API 密钥已保护
- [ ] CORS 已正确配置
- [ ] 依赖包已更新到最新安全版本

```bash
npm audit
npm audit fix
```

## 📞 支持

如遇到部署问题，请：
1. 查看 Next.js 官方文档
2. 检查 Vercel 社区论坛
3. 提交 GitHub Issue

---

**最后更新**: 2026-02-08  
**适用版本**: Next.js 16.1.6
