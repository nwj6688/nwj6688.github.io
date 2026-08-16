// competition-page.js — 竞赛招募页筛选脚本
$(function() {
  $('.btn-status').click(function(e) {
    e.preventDefault();
    var status = $(this).data('status');
    $('.btn-status').removeClass('active');
    $(this).addClass('active');
    if (status === 'all') {
      $('.comp-card').show();
    } else {
      $('.comp-card').hide();
      $('.comp-card[data-status="' + status + '"]').show();
    }
  });
});
