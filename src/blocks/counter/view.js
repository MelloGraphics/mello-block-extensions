import { animate, easeOut, inView } from 'motion';

const counterBlocks = document.querySelectorAll('.wp-block-mello-block-counter');

counterBlocks.forEach((block, index) => {
  const figureEl = block.querySelector('.wp-block-mello-block-counter__figure');
  if (!figureEl) {
    return;
  }

  const starting = parseFloat(block.dataset.startingFigure || 0);
  const duration = parseFloat(block.dataset.animationDuration || 2);
  const final = parseFloat(figureEl.textContent.replace(/[^0-9.-]+/g, ''));

  if (isNaN(final)) {
    return;
  }

  const showDecimals = block.dataset.showDecimals === 'true';

  inView(block, () => {
    animate(starting, final, {
      duration,
      ease: easeOut,
      round: showDecimals ? 2 : 1,
      onUpdate: (latest) => {
        figureEl.textContent = showDecimals
          ? latest.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })
          : Math.round(latest).toLocaleString();
      }
    });
  }, { once: true });
});