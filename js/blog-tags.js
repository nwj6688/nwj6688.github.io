// blog-tags.js — 博客标签筛选页
$(function() {
  $('.btn-year').click(function(e) {
    e.preventDefault();
    var tag = $(this).data('tag');
    $('.btn-year').removeClass('active');
    $(this).addClass('active');
    if (tag === 'all') {
      $('.blog-item').show();
    } else {
      $('.blog-item').hide();
      $('.blog-item').each(function() {
        var tags = $(this).data('tags') || '';
        if (tags.indexOf(tag) !== -1) {
          $(this).show();
        }
      });
    }
  });

  // 从URL哈希中获取初始标签（已过滤防注入）
  var hash = window.location.hash.substr(1);
  if (hash) {
    $('.btn-year').each(function() {
      if ($(this).data('tag') === hash) {
        $(this).click();
      }
    });
  }
});
