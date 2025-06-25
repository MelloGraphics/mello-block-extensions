document.addEventListener('mello-motion-ready', () => {
  const { animate, inView, easeOut } = window.MelloMotion;

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
  
  // Use Intersection Observer API with threshold for better performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const counter = counters.find(c => c.block === entry.target);
      if (!counter || counter.animated) return;
      
      counter.animated = true; // Mark as animated to prevent repeats
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        animate(counter.starting, counter.final, {
          duration: counter.duration,
          ease: easeOut,
          round: counter.showDecimals ? 2 : 0, // More efficient than a dynamic value
          onUpdate: (latest) => {
            // Use fewer DOM updates by batching
            if (counter.showDecimals) {
              counter.figureEl.textContent = latest.toLocaleString(undefined, counter.numberFormat);
            } else {
              counter.figureEl.textContent = Math.round(latest).toLocaleString();
            }
          }
        });
      });
      
      // Unobserve once animated
      observer.unobserve(entry.target);
    });
  }, { 
    threshold: 0.15, // Start animation when 15% visible
    rootMargin: '0px 0px 50px 0px' // Start animation slightly before scrolling into view
  });
  
  // Start observing all counters
  counters.forEach(counter => {
    observer.observe(counter.block);
  });
  
  // Clean up observer when page is unloaded
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
});