# THETA@BJTU - 北京交通大学人工智能安全实验室

北京交通大学人工智能安全实验室 (THETA Lab, Thorough Evaluation on Threats of AI) 官方网站。

## 技术栈

- [Jekyll](https://jekyllrb.com/) - 静态网站生成器
- [GitHub Pages](https://pages.github.com/) - 网站托管
- Bootstrap 4 - CSS 框架
- 原生 CSS 变量 - 支持暗色模式

## 本地开发

### 前提条件

- Ruby 2.7+
- Bundler

### 安装和运行

```bash
bundle install
bundle exec jekyll serve
```

打开浏览器访问 http://localhost:4000

## 目录结构

```
.
├── _config.yml          # 站点配置
├── _data/               # 数据文件
├── _includes/           # 可复用组件
├── _layouts/            # 页面模板
├── _posts/              # 博客文章
├── _news/               # 新闻集合
├── research/            # 研究方向
├── papers/              # 论文列表
├── team/                # 团队成员
├── news/                # 新闻页面
├── blog/                # 技术博客
├── join/                # 加入我们
├── css/                 # 样式文件
├── js/                  # JavaScript
└── images/              # 图片资源
```

## 部署

推送到 GitHub 仓库的 `main` 分支即可自动部署到 GitHub Pages。
