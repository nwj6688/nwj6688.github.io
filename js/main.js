---
---
// 平滑滚动
document.addEventListener('DOMContentLoaded', function() {
  // 处理导航栏滚动效果
  var navbar = document.querySelector('.site-header');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 年份过滤器 - 新闻页面
  var yearFilter = document.querySelector('.year-filter');
  if (yearFilter) {
    yearFilter.addEventListener('change', function() {
      var year = this.value;
      var items = document.querySelectorAll('.news-item');
      items.forEach(function(item) {
        if (year === 'all' || item.dataset.year === year) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 标签筛选
  var tagLinks = document.querySelectorAll('.tag-filter a');
  tagLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var tag = this.dataset.tag;
      var posts = document.querySelectorAll('.blog-post-item');
      posts.forEach(function(post) {
        if (tag === 'all' || post.dataset.tags.indexOf(tag) !== -1) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
      tagLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  // 移动端菜单切换
  var menuToggle = document.querySelector('.menu-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // 视频画廊 - 模态框控制
  var videoModal = document.getElementById('videoModal');
  if (videoModal) {
    var videoPlayer = document.getElementById('videoPlayer');
    var videoTitle = document.getElementById('videoModalTitle');
    var videoDesc = document.getElementById('videoModalDesc');

    // 点击视频卡片打开模态框（事件委托，兼容动态内容）
    document.addEventListener('click', function(e) {
      var card = e.target.closest('.video-card');
      if (!card) return;
      var src = card.dataset.videoSrc;
      var title = card.dataset.videoTitle;
      var desc = card.dataset.videoDesc || '';
      if (src) {
        videoPlayer.src = src;
        videoPlayer.load();
        videoTitle.textContent = title;
        if (videoDesc) {
          videoDesc.textContent = desc;
        }
        // 使用 Bootstrap 4 modal API
        try {
          $(videoModal).modal('show');
        } catch (e) {
          // fallback: 直接显示
          videoModal.classList.add('show');
          videoModal.style.display = 'block';
          document.body.classList.add('modal-open');
        }
      }
    });

    // 模态框关闭时暂停并卸载视频
    try {
      $(videoModal).on('hidden.bs.modal', function() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = '';
      });
    } catch (e) {
      // fallback: 监听原生事件
      videoModal.addEventListener('hidden.bs.modal', function() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = '';
      });
    }
  }

  // 回到顶部按钮
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
