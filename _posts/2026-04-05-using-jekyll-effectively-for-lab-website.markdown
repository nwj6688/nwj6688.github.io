---
layout: post
title: "使用 Jekyll 高效构建实验室网站：完整指南"
date: 2026-04-05 12:00:00 +0800
tags: [Jekyll, GitHub-Pages, 实践]
excerpt: "Jekyll 是构建静态实验室网站的绝佳工具。本文从项目结构、模板系统、数据驱动设计到部署运维，全面介绍如何使用 Jekyll 构建一个专业、高效、易维护的学术实验室网站。"
---

## 为什么选择 Jekyll + GitHub Pages

对于学术实验室网站，Jekyll + GitHub Pages 提供了独特的优势：

1. **零成本部署**：GitHub Pages 免费托管静态网站
2. **Markdown 编写**：无需 HTML 知识即可撰写内容
3. **版本控制**：天然集成 Git 管理所有内容变更
4. **自动化构建**：推送即部署，无需手动操作
5. **无限扩展**：支持自定义主题和插件

## 项目结构设计

一个典型的实验室 Jekyll 项目结构如下：

```
.
├── _config.yml          # 全局配置
├── _layouts/            # 页面模板
│   ├── default.html     # 默认布局
│   ├── page.html        # 页面布局
│   └── post.html        # 文章布局
├── _includes/           # 可复用组件
│   ├── head.html        # <head> 部分
│   ├── header.html      # 导航栏
│   └── footer.html      # 页脚
├── _data/               # 数据文件
│   └── navigation.yml   # 导航数据
├── _posts/              # 博客文章
├── css/                 # 样式文件
├── js/                  # JavaScript
├── images/              # 图片资源
├── research/            # 研究方向页
├── papers/              # 论文列表页
├── team/                # 团队成员页
├── blog/                # 博客首页
└── index.html           # 首页
```

## 模板系统深入

### 1. 布局继承 (Layout Inheritance)

Jekyll 的布局系统支持多重继承，这是组织页面结构的核心：

```liquid
---
layout: page       # page 继承自 default
---
```

```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html>
<head>
  {% include head.html %}
</head>
<body>
  {% include header.html %}
  <div class="container">
    {{ content }}
  </div>
  {% include footer.html %}
</body>
</html>
```

### 2. 数据驱动设计 (Data-Driven Design)

将可变数据从模板中分离，使用 `_data` 目录管理：

```yaml
# _data/members.yml
- name: 牛温佳
  role: 教授
  homepage: http://faculty.bjtu.edu.cn/9120/
```

然后在模板中遍历：

```liquid
{% for member in site.data.members %}
<div class="team-card">
  <h3>{{ member.name }}</h3>
  <p>{{ member.role }}</p>
  <a href="{{ member.homepage }}">个人主页</a>
</div>
{% endfor %}
```

## 集合 (Collections) 的使用

对于新闻等结构化内容，使用集合比 _posts 更灵活：

```yaml
# _config.yml
collections:
  news:
    output: true
    permalink: /news/:year/:month/:day/:title/
```

## 性能优化技巧

### 1. 减少 Liquid 模板开销

避免在循环中进行复杂的 Liquid 运算：

```liquid
{# 不推荐：在循环中多次调用过滤器 #}
{% for item in items %}
  {% assign processed = item | slugify | upcase %}
{% endfor %}

{# 推荐：预处理后使用 #}
{% assign processed_items = items | map: "title" | slugify | upcase %}
{% for item in processed_items %}
  ...
{% endfor %}
```

### 2. 启用增量构建

在本地开发时启用 `--incremental` 标志：

```bash
bundle exec jekyll serve --incremental
```

## 部署自动化

### 使用 GitHub Actions

创建 `.github/workflows/jekyll.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/jekyll-build-pages@v1
      - uses: actions/upload-pages-artifact@v1
```

## SEO 优化

确保每篇文章都有良好的 SEO 设置：

```yaml
# 在 _config.yml 中
plugins:
  - jekyll-seo-tag

# 在 head.html 中
{% seo %}
```

## 监控与维护

1. **定期检查外部链接**：确保论文链接、个人主页链接可用
2. **更新毕业生信息**：每学期更新毕业生去向
3. **备份**：Git 本身就是最好的备份

## 总结

Jekyll 为学术实验室网站提供了一个强大而灵活的框架。通过合理的项目结构、数据驱动的设计和自动化的部署流程，你可以创建一个既专业又易于维护的实验室网站。记住：**内容重于形式**——选择一个适合你的工作流，让内容创作变得简单愉快。
