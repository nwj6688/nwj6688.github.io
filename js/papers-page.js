// papers-page.js — 论文页一键复制
$(function() {
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
});
