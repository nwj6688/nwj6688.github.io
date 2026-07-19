// blog-page.js — 博客列表页标签筛选
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
});
