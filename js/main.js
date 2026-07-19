// main.js — 视频 Lightbox 控制
document.addEventListener('DOMContentLoaded', function() {
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
      clearTimeout(loadTimer);
    }

    videoPlayer.addEventListener('loadedmetadata', function() {
      if (videoLoading) videoLoading.style.display = 'none';
      if (videoError) videoError.style.display = 'none';
      clearTimeout(loadTimer);
    });

    videoPlayer.addEventListener('canplay', function() {
      if (videoLoading) videoLoading.style.display = 'none';
      if (videoError) videoError.style.display = 'none';
      clearTimeout(loadTimer);
    });

    videoPlayer.addEventListener('error', function() {
      if (videoPlayer.src === '' || !videoPlayer.src) return;
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

    function hideModal() {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.src = '';
      resetVideoState();
      videoModal.classList.remove('show');
      videoModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      var backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }

    var closeBtn = videoModal.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideModal);
    }

    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) hideModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        hideModal();
      }
    });

    function showModal() {
      try {
        $(videoModal).modal('show');
      } catch (e) {
        videoModal.classList.add('show');
        videoModal.style.display = 'block';
        document.body.classList.add('modal-open');
        var backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
    }

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
});
