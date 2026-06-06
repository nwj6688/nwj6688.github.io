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
    var videoLoading = document.getElementById('videoLoading');
    var videoError = document.getElementById('videoError');
    var loadTimer;

    function resetVideoState() {
      if (videoLoading) videoLoading.style.display = 'none';
      if (videoError) videoError.style.display = 'none';
      videoPlayer.poster = '';
      videoPlayer.removeAttribute('poster');
      videoPlayer.src = '';
      clearTimeout(loadTimer);
    }

    videoPlayer.addEventListener('loadedmetadata', function() {
      if (videoLoading) videoLoading.style.display = 'none';
      clearTimeout(loadTimer);
    });

    videoPlayer.addEventListener('canplay', function() {
      if (videoLoading) videoLoading.style.display = 'none';
      clearTimeout(loadTimer);
    });

    videoPlayer.addEventListener('error', function() {
      if (videoLoading) videoLoading.style.display = 'none';
      if (videoError) videoError.style.display = 'block';
      clearTimeout(loadTimer);
    });

    function startLoadTimer() {
      clearTimeout(loadTimer);
      loadTimer = setTimeout(function() {
        if (videoLoading) videoLoading.style.display = 'none';
      }, 15000);
    }

    // ----- 关闭 modal（不依赖 Bootstrap data-dismiss）-----
    function hideModal() {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      resetVideoState();
      // 移除 Bootstrap modal 相关类
      videoModal.classList.remove('show');
      videoModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      var backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }

    // 关闭按钮直接绑定（不依赖 Bootstrap 的 data-dismiss）
    var closeBtn = videoModal.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideModal);
    }

    // 点击 modal 外部（灰色背景）关闭
    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) hideModal();
    });

    // ESC 键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        hideModal();
      }
    });

    // ----- 打开 modal -----
    function showModal() {
      // 先用 Bootstrap API（干净，有过渡效果）
      try {
        $(videoModal).modal('show');
      } catch (e) {
        // Bootstrap 不可用时手动显示
        videoModal.classList.add('show');
        videoModal.style.display = 'block';
        document.body.classList.add('modal-open');
        var backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.addEventListener('click', hideModal);
        document.body.appendChild(backdrop);
      }
    }

    // 点击视频卡片打开模态框
    document.addEventListener('click', function(e) {
      var card = e.target.closest('.video-card');
      if (!card) return;
      var src = card.dataset.videoSrc;
      var poster = card.dataset.videoPoster || '';
      var title = card.dataset.videoTitle;
      var desc = card.dataset.videoDesc || '';
      if (src) {
        resetVideoState();
        if (videoLoading) videoLoading.style.display = 'flex';
        if (videoError) videoError.style.display = 'none';
        videoPlayer.poster = poster;
        videoPlayer.src = src;
        videoPlayer.load();
        startLoadTimer();
        videoTitle.textContent = title;
        if (videoDesc) {
          videoDesc.textContent = desc;
        }
        showModal();
      }
    });
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
