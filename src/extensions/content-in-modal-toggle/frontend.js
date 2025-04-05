import MicroModal from "micromodal";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize MicroModal once
  const modalTriggerExists = document.querySelector('[data-micromodal-trigger]');

  if (modalTriggerExists) {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true,
      debugMode: false
    });
  }

  // Flag to track if we're currently processing a mutation
  let isProcessingMutation = false;

  // Function to bind modal triggers
  function bindModalTriggers() {
    if (isProcessingMutation) return;

    const modalTriggers = document.querySelectorAll(".is-open-mello-modal:not([data-mello-modal-bound])");
    if (modalTriggers.length === 0) return;

    isProcessingMutation = true;
    console.log(`Found ${modalTriggers.length} new modal triggers`);

    modalTriggers.forEach((trigger) => {
      trigger.setAttribute("data-mello-modal-bound", "true");

      trigger.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log("Modal trigger clicked");
        const url = trigger.getAttribute("href");
        if (!url) {
          console.error("No URL found on trigger.");
          return;
        }

        try {
          console.log(`Fetching content from: ${url}`);
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const html = await response.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const contentElement = doc.querySelector(".entry-content");

          if (contentElement) {
            document.getElementById("modal-content").innerHTML = contentElement.innerHTML;
            MicroModal.show("modal-identifier");
          } else {
            console.error("Post content element not found in the loaded HTML.");
          }
        } catch (error) {
          console.error("Error fetching post content:", error);
        }
      });
    });

    setTimeout(() => {
      isProcessingMutation = false;
    }, 50);
  }

  // Initial binding on page load
  bindModalTriggers();

  // Improved MutationObserver approach with debouncing
  let debounceTimer;
  const debounceDelay = 250; // ms
  
  function setupMutationObserver() {
    const contentArea = document.querySelector('.search-filter-results') || 
                        document.querySelector('.content-area') || 
                        document.querySelector('main') || 
                        document.querySelector('#content');
    
    if (contentArea) {
      console.log("Setting up mutation observer with debouncing");
      const observer = new MutationObserver(function(mutations) {
        // Only process mutations that might affect our modal triggers
        const relevantMutation = mutations.some(mutation => {
          // Check if the mutation affects our links
          return Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType === 1) { // ELEMENT_NODE
              // Either the node itself is a link or contains links
              return node.classList?.contains('is-open-mello-modal') || 
                     node.querySelector?.('.is-open-mello-modal');
            }
            return false;
          });
        });
        
        if (relevantMutation) {
          console.log("Relevant DOM mutation detected");
          // Clear any existing timer
          clearTimeout(debounceTimer);
          // Set a new timer
          debounceTimer = setTimeout(bindModalTriggers, debounceDelay);
        }
      });
      
      observer.observe(contentArea, { childList: true, subtree: true });
      return true;
    }
    return false;
  }
  
  const observerSet = setupMutationObserver();
  
  if (!observerSet) {
    console.log("Could not set up mutation observer, falling back to events only");
  }

  // Event listeners as additional fallbacks
  document.addEventListener("sf:ajaxfinish", function() {
    console.log("sf:ajaxfinish event detected");
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(bindModalTriggers, debounceDelay);
  });
  
  // Additional event names to try
  const sfEvents = ["sf:ajax:complete", "sf:ajax", "sf:init", "sf:ajaxform"];
  sfEvents.forEach(eventName => {
    document.addEventListener(eventName, function() {
      console.log(`${eventName} event detected`);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(bindModalTriggers, debounceDelay);
    });
  });
});