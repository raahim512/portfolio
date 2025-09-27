document.addEventListener('DOMContentLoaded', () => {
  const previewContainer = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.getElementById('close-preview');

  let isTransitioning = false;

  function showPreview(src, captionText) {
    if (isTransitioning) return;
    isTransitioning = true;

    previewImg.src = src;

    previewImg.onload = () => {
      previewContainer.classList.add('show');
      isTransitioning = false;

      const oldCaption = document.getElementById('preview-caption');
      if (oldCaption) oldCaption.remove();

      if (captionText && captionText.trim() !== '') {
        const caption = document.createElement('div');
        caption.id = 'preview-caption';
        caption.textContent = captionText;
        previewContainer.appendChild(caption);
      }
    };

    previewImg.onerror = () => {
      console.warn("Failed to load image:", src);
      isTransitioning = false;
    };
  }

  function hidePreview() {
    if (isTransitioning) return;
    isTransitioning = true;

    previewContainer.classList.remove('show');

    setTimeout(() => {
      previewImg.src = '';
      const oldCaption = document.getElementById('preview-caption');
      if (oldCaption) oldCaption.remove();
      isTransitioning = false;
    }, 300);
  }

  document.querySelector('.wrapper').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const src = e.target.src;
      const captionText = e.target.getAttribute('data-caption');
      showPreview(src, captionText);
    }
  });

  closeBtn.addEventListener('click', hidePreview);
  previewContainer.addEventListener('click', (e) => {
    if (e.target === previewContainer) {
      hidePreview();
    }
  });



});

function togglePowerOptions(show = true) {
  const panel = document.getElementById('power-options-preview');
  if (!panel) return;

  if (show) {
    panel.style.display = 'flex';
    requestAnimationFrame(() => {
      panel.classList.add('show');
    });
  } else {
    panel.classList.remove('show');
    setTimeout(() => {
      panel.style.display = 'none';
    }, 300);
  }
}
