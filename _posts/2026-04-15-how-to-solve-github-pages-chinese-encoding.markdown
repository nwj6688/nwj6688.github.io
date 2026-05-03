---
layout: post
title: "如何解决 GitHub Pages 中文乱码问题"
date: 2026-04-15 12:00:00 +0800
tags: [Jekyll, GitHub-Pages, 实践]
excerpt: "在使用 GitHub Pages 搭建中文网站时，经常遇到中文字符显示为乱码的问题。本文将详细介绍几种解决方案，帮助你在 Jekyll 网站中完美显示中文内容。"
---

## 问题描述

在使用 GitHub Pages 构建中文网站时，可能会遇到中文内容显示为乱码的情况。这通常是因为字符编码设置不正确导致的。常见的表现包括：

- 网页标题中的中文显示为 `???` 或乱码符号
- 文章内容中的中文无法正常显示
- RSS 订阅中的中文内容乱码

## 解决方案

### 方案一：设置全局编码

在 `_config.yml` 文件中添加以下配置：

```yaml
# 编码设置
encoding: utf-8
lang: zh-CN
```

### 方案二：确保 HTML 头部包含编码声明

在 `_includes/head.html` 文件中，确保 `<meta charset="utf-8">` 出现在 `<head>` 标签的最前面，且在前 512 字节内：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <title>网站标题</title>
  ...
</head>
```

### 方案三：设置文件编码

确保所有文件都以 **UTF-8 无 BOM** 编码保存。在 VS Code 中：

1. 打开文件
2. 点击右下角的编码（如 "UTF-8"）
3. 选择 "Save with Encoding" → "UTF-8"

### 方案四：配置 Web 服务器

如果使用自定义域名或有独立服务器，在 `.htaccess` 或 Nginx 配置中添加：

```
# Apache
AddDefaultCharset UTF-8

# Nginx
charset utf-8;
```

## Jekyll 完整配置示例

以下是一个经过验证的完整 `_config.yml` 配置：

```yaml
title: 我的网站
encoding: utf-8
lang: zh-CN

markdown: kramdown
highlighter: rouge

kramdown:
  input: GFM
  syntax_highlighter: rouge
```

## 验证编码设置

部署后，可以通过以下方式验证编码是否正确：

1. 在浏览器中打开网页
2. 右键 → "检查"（或按 F12）
3. 在 Console 中输入：`document.charset`
4. 确认输出为 `UTF-8`

## 常见问题 FAQ

**Q: 为什么我的 RSS feed 中的中文还是乱码？**
A: 确保 `_config.yml` 中有 `encoding: utf-8`，并且 `feed.xml` 文件中包含 `<?xml version="1.0" encoding="UTF-8"?>`。

**Q: 使用 GitHub Pages 默认主题也会出现乱码吗？**
A: 默认主题（如 minima）通常已正确处理编码，但如果你自定义了模板，需要自行确保编码设置正确。

## 总结

解决 GitHub Pages 中文乱码问题的关键是确保从 **文件存储 → Jekyll 构建 → HTML 输出 → 浏览器渲染** 整个链路都使用 UTF-8 编码。以上几个方案结合使用，可以有效解决中文乱码问题。
