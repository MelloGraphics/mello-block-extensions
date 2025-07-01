document.addEventListener('mello-motion-ready', () => {
  const { animate } = window.MelloMotion;

  // Get all counters once instead of querying in the scroll handler
  const counterBlocks = document.querySelectorAll('.wp-block-mello-block-counter');

  // Pre-process all counters to reduce work during animation
  const counters = Array.from(counterBlocks).map(block => {
    const figureEl = block.querySelector('.wp-block-mello-block-counter__figure');
    if (!figureEl) return null;

    const starting = parseFloat(block.dataset.startingFigure || 0);
    const duration = parseFloat(block.dataset.counterDuration || 2);
    const final = parseFloat(figureEl.textContent.replace(/[^0-9.-]+/g, ''));
    const showDecimals = block.dataset.showDecimals === 'true';

    if (figureEl) {
      figureEl.textContent = showDecimals
        ? starting.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })
        : Math.round(starting).toLocaleString();
    }

    if (isNaN(final)) return null;

    // Pre-configure number formatting options
    const numberFormat = showDecimals
      ? { minimumFractionDigits: 1, maximumFractionDigits: 2 }
      : undefined;

    return {
      block,
      figureEl,
      starting,
      final,
      duration,
      showDecimals,
      numberFormat,
      animated: false // Track whether this counter has been animated
    };
  }).filter(Boolean); // Remove any invalid counters

  // Start observing all counters with custom rootMargin per instance
  counters.forEach(counter => {
    const margin = counter.block.dataset.triggerPoint || -25; // Changed from counterTriggerPoint
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const currentCounter = counters.find(c => c.block === entry.target);
        if (!currentCounter || currentCounter.animated) return;

        currentCounter.animated = true;

        requestAnimationFrame(() => {
          animate(currentCounter.starting, currentCounter.final, {
            duration: currentCounter.duration,
            ease: [0.25, 1, 0.5, 1],
            round: currentCounter.showDecimals ? 2 : 0,
            onUpdate: (latest) => {
              if (currentCounter.showDecimals) {
                currentCounter.figureEl.textContent = latest.toLocaleString(undefined, currentCounter.numberFormat);
              } else {
                currentCounter.figureEl.textContent = Math.round(latest).toLocaleString();
              }
            }
          });
        });

        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: `0px 0px ${margin}% 0px`,
      threshold: 0.15
    });

    observer.observe(counter.block);
  });
});