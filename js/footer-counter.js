// footer-counter.js — 访问计数器（quantum-auto-safety.top API）
(function() {
  var API = 'https://quantum-auto-safety.top/api/';

  function fetchWithTimeout(url, ms) {
    return new Promise(function(resolve, reject) {
      var controller = new AbortController();
      setTimeout(function() { controller.abort(); reject(new Error('timeout')); }, ms);
      fetch(url, { method: 'POST', signal: controller.signal }).then(resolve, reject);
    });
  }

  var totalEl = document.getElementById('site_pv');
  if (totalEl) {
    fetchWithTimeout(API + '?id=nwj6688:pv', 5000)
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d.count !== undefined) { totalEl.textContent = d.count; }
      })
      .catch(function() { totalEl.textContent = '--'; });
  }

  var pageEls = document.querySelectorAll('.page-pv');
  for (var i = 0; i < pageEls.length; i++) {
    (function(el) {
      var slug = el.getAttribute('data-pagekey');
      if (!slug) return;
      fetchWithTimeout(API + '?id=nwj6688:post:' + slug, 5000)
        .then(function(r) { return r.json(); })
        .then(function(d) {
          if (d && d.count !== undefined) { el.textContent = d.count; }
        })
        .catch(function() {});
    })(pageEls[i]);
  }
})();
