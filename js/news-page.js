// news-page.js — 新闻动态页脚本
$(function() {
  baguetteBox.run('.news-images', { captions: false });
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
});
