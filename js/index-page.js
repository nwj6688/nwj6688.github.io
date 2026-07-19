// index-page.js — 首页脚本（画廊轮播、新闻筛选、一键复制论文、视频弹窗）
$(function() {
  // baguetteBox 灯箱
  baguetteBox.run('.gallery-scroll', { captions: true });
  baguetteBox.run('.news-images', { captions: false });

  // 团建照片 - 滚动播放
  var $scroll = $('#galleryScroll');
  var $counter = $('#galleryCounter');
  var scrollTimer;
  var autoScroll = true;

  function updateCounter() {
    var total = $scroll.children().length;
    var w = $scroll.width();
    var scrollLeft = $scroll.scrollLeft();
    var idx = Math.round(scrollLeft / 228) + 1;
    if (idx < 1) idx = 1;
    if (idx > total) idx = total;
    $counter.text(idx + ' / ' + total);
  }

  function doAutoScroll() {
    if (!autoScroll) return;
    var maxScroll = $scroll[0].scrollWidth - $scroll.width();
    var cur = $scroll.scrollLeft();
    var step = 228;
    var next = cur + step;
    if (next >= maxScroll - 10) next = 0;
    $scroll.animate({ scrollLeft: next }, 600, 'swing', updateCounter);
  }

  scrollTimer = setInterval(doAutoScroll, 3000);

  $scroll.on('mouseenter', function() { autoScroll = false; clearInterval(scrollTimer); });
  $scroll.on('mouseleave', function() {
    autoScroll = true;
    clearInterval(scrollTimer);
    scrollTimer = setInterval(doAutoScroll, 3000);
  });

  $('.gallery-prev').click(function() {
    autoScroll = false;
    var cur = $scroll.scrollLeft();
    var maxScroll = $scroll[0].scrollWidth - $scroll.width();
    var step = 232;
    var next = cur - step;
    if (next < 0) next = maxScroll;
    $scroll.animate({ scrollLeft: next }, 400, updateCounter);
  });
  $('.gallery-next').click(function() {
    autoScroll = false;
    var cur = $scroll.scrollLeft();
    var maxScroll = $scroll[0].scrollWidth - $scroll.width();
    var step = 232;
    var next = cur + step;
    if (next >= maxScroll - 10) next = 0;
    $scroll.animate({ scrollLeft: next }, 400, updateCounter);
  });

  $scroll.on('scroll', updateCounter);

  // 新闻年份筛选
  $('.news-card').hide();
  $('.news-card[data-year="2026"]').show();

  $('.btn-year').click(function(e) {
    e.preventDefault();
    var year = $(this).data('year');
    $('.btn-year').removeClass('active');
    $(this).addClass('active');
    if (year === 'all') {
      $('.news-card').show();
    } else {
      $('.news-card').hide();
      $('.news-card[data-year="' + year + '"]').show();
    }
  });

  // 一键复制论文列表（带序号和 Toast 提示）
  $('.btn-copy-papers').on('click', function() {
    var $ol = $(this).closest('p').next('ol.papers-list');
    if (!$ol.length) return;
    var items = $ol.find('li');
    var lines = [];
    items.each(function(i) {
      var $clone = $(this).clone();
      $clone.find('img').remove();
      var text = $clone.text().replace(/\s+/g, ' ').trim();
      lines.push((i + 1) + '. ' + text);
    });
    navigator.clipboard.writeText(lines.join('\n')).then(function() {
      var $toast = $('<div class="copy-toast">✅ 已复制 ' + items.length + ' 篇论文到剪贴板</div>');
      $('body').append($toast);
      setTimeout(function() { $toast.fadeOut(300, function() { $toast.remove(); }); }, 2000);
    }).catch(function() {
      alert('❌ 复制失败，请手动选择复制');
    });
  });

  // 视频 Lightbox
  $('.video-card').on('click', function() {
    var src = $(this).data('video-src');
    var title = $(this).data('title') || '';
    if (!src) return;
    $('#videoPlayer').attr('src', '');
    $('#videoModalTitle').text(title);
    $('#videoModalDesc').text(title);
    $('#videoLoading').show();
    $('#videoError').hide();
    $('#videoModal').modal('show');
    $('#videoPlayer').attr('src', src);
  });

  $('#videoModal').on('hidden.bs.modal', function() {
    $('#videoPlayer').attr('src', '');
  });

  $('#videoPlayer').on('loadedmetadata', function() {
    $('#videoLoading').hide();
  });
  $('#videoPlayer').on('error', function() {
    $('#videoLoading').hide();
    $('#videoError').show();
  });
});
