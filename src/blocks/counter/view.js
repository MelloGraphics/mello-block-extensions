import { animate, inView } from 'motion';

/* eslint-disable no-console */
const counterBlocks = document.querySelectorAll('.wp-block-mello-block-counter');

counterBlocks.forEach((block) => {
  const figureEl = block.querySelector('.wp-block-mello-block-counter__figure');
  if (!figureEl) return;

  const starting = parseFloat(block.dataset.startingFigure || 0);
  const duration = parseFloat(block.dataset.animationDuration || 2);
  const final = parseFloat(figureEl.textContent.replace(/[^0-9.-]+/g, ''));

  if (isNaN(final)) return;

  inView(block, () => {
    animate(figureEl, { innerText: [starting, final] }, {
      duration: duration,
      easing: 'ease-out',
      round: 1
    });
  }, { once: true });
});
/* eslint-enable no-console */