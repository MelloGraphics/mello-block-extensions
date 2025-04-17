import { animate, easeOut, inView } from 'motion';

const counterBlocks = document.querySelectorAll('.wp-block-mello-block-counter');
console.log('[Counter Block] Found:', counterBlocks.length);

counterBlocks.forEach((block, index) => {
  console.log(`[Counter Block ${index}] Initialising...`);

  const figureEl = block.querySelector('.wp-block-mello-block-counter__figure');
  if (!figureEl) {
    console.warn(`[Counter Block ${index}] Missing .wp-block-mello-block-counter__figure`);
    return;
  }

  const starting = parseFloat(block.dataset.startingFigure || 0);
  const duration = parseFloat(block.dataset.animationDuration || 2);
  const final = parseFloat(figureEl.textContent.replace(/[^0-9.-]+/g, ''));

  console.log(`[Counter Block ${index}] Data:`, { starting, final, duration });

  if (isNaN(final)) {
    console.warn(`[Counter Block ${index}] Final number is invalid`);
    return;
  }

  inView(block, () => {
    console.log(`[Counter Block ${index}] In view — animating`);
    animate(starting, final, {
      duration,
      ease: easeOut,
      round: 1,
      onUpdate: (latest) => {
        figureEl.textContent = latest.toLocaleString(); // optional: format with commas
      }
    });
  }, { once: true });
});