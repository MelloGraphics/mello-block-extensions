import MicroModal from "micromodal";

document.addEventListener("DOMContentLoaded", () => {
  let currentModalIndex = 0;

  // Initialize MicroModal once
  const modalTriggerExists = document.querySelector(
    "[data-micromodal-trigger]"
  );

  if (modalTriggerExists) {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true,
      debugMode: false,
      onClose: () => {
        const modalContent = document.getElementById("modal-content");
        if (modalContent) modalContent.innerHTML = "";
        const modalWrapper = document.getElementById("modal-identifier");
        if (modalWrapper) {
          modalWrapper.classList.remove("mello-modal--loaded");
          // Remove any category/format classes
          removeMetadataClasses(modalWrapper);
        }
      },
    });
  }

  // Helper function to remove all category/format classes
  function removeMetadataClasses(element) {
    if (!element) return;

    // Get all classes
    const classes = element.className.split(' ');

    // Filter out category/format/type classes
    const newClasses = classes.filter(cls => {
      return !(cls.startsWith('category-') ||
        cls.startsWith('format-') ||
        cls.startsWith('type-'));
    });

    // Update element's classes
    element.className = newClasses.join(' ');
  }

  // Helper function to add metadata classes
  function addMetadataClasses(element, trigger) {
    if (!element || !trigger) return;

    // Add category classes
    const categories = trigger.getAttribute('data-post-categories');
    if (categories) {
      element.className += ' ' + categories;
    }

    // Add custom taxonomy classes
    const customTaxonomies = trigger.getAttribute('data-post-custom-taxonomies');
    if (customTaxonomies) {
      element.className += ' ' + customTaxonomies;
    }

    // Add format class
    const format = trigger.getAttribute('data-post-format');
    if (format) {
      element.className += ' ' + format;
    }

    // Add post type class
    const postType = trigger.getAttribute('data-post-type');
    if (postType) {
      element.className += ' ' + postType;
    }
  }

  // Delegated event listener for modal triggers
  document.addEventListener("click", async (event) => {
    const trigger = event.target.closest(".is-open-mello-modal");
    if (!trigger) return;

    // Retrieve all triggers and determine the first occurrence for grouping navigation
    const allTriggers = Array.from(document.querySelectorAll(".is-open-mello-modal"));
    const firstOccurrence = allTriggers.find(t => t.getAttribute("href") === trigger.getAttribute("href"));

    // Build an array of unique triggers based on their href attribute
    const uniqueTriggers = allTriggers.filter((t, i, self) => i === self.findIndex(el => el.getAttribute("href") === t.getAttribute("href")));
    // Set currentModalIndex to the index of the first occurrence among unique triggers
    currentModalIndex = uniqueTriggers.indexOf(firstOccurrence);

    event.preventDefault();
    const url = trigger.getAttribute("href");
    if (!url) {
      console.error("No URL found on trigger.");
      return;
    }

    // Get content selector from data attribute or use default
    const contentSelector = trigger.getAttribute("data-content-selector") || ".entry-content";

    const modalContent = document.getElementById("modal-content");
    const loader = document.getElementById("modal-loader");
    const modalWrapper = document.getElementById("modal-identifier");

    if (modalContent) modalContent.innerHTML = "";
    if (loader) loader.hidden = false;

    // First show the modal
    MicroModal.show("modal-identifier");

    if (modalWrapper) {
      // Apply category/format classes to the modal
      removeMetadataClasses(modalWrapper);
      addMetadataClasses(modalWrapper, trigger);

      modalWrapper.classList.add("mello-modal--loading");
      modalWrapper.classList.remove("mello-modal--loaded");
    }

    try {
      console.log(`Fetching content from: ${url} with selector: ${contentSelector}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const contentElement = doc.querySelector(contentSelector);

      if (contentElement) {
        document.getElementById("modal-content").innerHTML =
          contentElement.innerHTML;

        if (modalWrapper) {
          modalWrapper.classList.remove("mello-modal--loading");
          modalWrapper.classList.add("mello-modal--loaded");
        }

        // Process any scripts in the loaded content if needed
        const scripts = Array.from(document.getElementById("modal-content").querySelectorAll('script'));
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Apply class to modal content if needed
        if (modalContent) {
          // You can also add classes to the content itself if needed
          // addMetadataClasses(modalContent, trigger);
        }

        // Make sure we're showing the modal (redundant here but keeping it for safety)
        MicroModal.show("modal-identifier");

        updateNavButtons();
      } else {
        console.error(`Content element with selector "${contentSelector}" not found in the loaded HTML.`);
        if (modalContent) {
          modalContent.innerHTML = `<div class="modal-error">Content not found using selector "${contentSelector}"</div>`;
        }
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      if (modalWrapper) modalWrapper.classList.remove("mello-modal--loading");
      if (modalContent) {
        modalContent.innerHTML = `<div class="modal-error">Error loading content: ${error.message}</div>`;
      }
    } finally {
      if (loader) loader.hidden = true;
    }
  });

  // Navigation functionality for modal buttons
  function navigateModal(direction) {
    const allTriggers = Array.from(document.querySelectorAll(".is-open-mello-modal"));
    const uniqueTriggers = allTriggers.filter((t, i, self) => i === self.findIndex(el => el.getAttribute("href") === t.getAttribute("href")));
    if (!uniqueTriggers.length) return;
    let targetIndex;
    if (direction === "next") {
      if (currentModalIndex >= uniqueTriggers.length - 1) {
        return; // Already at the last element
      } else {
        targetIndex = currentModalIndex + 1;
      }
    } else if (direction === "prev") {
      if (currentModalIndex <= 0) {
        return; // Already at the first element
      } else {
        targetIndex = currentModalIndex - 1;
      }
    }
    currentModalIndex = targetIndex;
    uniqueTriggers[targetIndex].click();
  }

  function updateNavButtons() {
    const allTriggers = Array.from(document.querySelectorAll(".is-open-mello-modal"));
    const uniqueTriggers = allTriggers.filter((t, i, self) => i === self.findIndex(el => el.getAttribute("href") === t.getAttribute("href")));
    const prevBtn = document.querySelector(".modal__prev");
    const nextBtn = document.querySelector(".modal__next");
    if (prevBtn) {
      if (currentModalIndex === 0) {
        prevBtn.classList.add("disabled");
        prevBtn.onclick = null;
      } else {
        prevBtn.classList.remove("disabled");
        prevBtn.onclick = () => navigateModal("prev");
      }
    }
    if (nextBtn) {
      if (currentModalIndex === uniqueTriggers.length - 1) {
        nextBtn.classList.add("disabled");
        nextBtn.onclick = null;
      } else {
        nextBtn.classList.remove("disabled");
        nextBtn.onclick = () => navigateModal("next");
      }
    }
  }

  // Keyboard navigation for modal
  document.addEventListener("keydown", (event) => {
    const modalWrapper = document.getElementById("modal-identifier");
    // Only proceed if the modal is open (aria-hidden is false)
    if (!modalWrapper || modalWrapper.getAttribute("aria-hidden") === "true") return;

    switch (event.key) {
      case "ArrowLeft":
        navigateModal("prev");
        break;
      case "ArrowRight":
        navigateModal("next");
        break;
      case "Escape":
        MicroModal.close("modal-identifier");
        break;
    }
  });
});