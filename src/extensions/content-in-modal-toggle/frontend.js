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
        if (modalWrapper) modalWrapper.classList.remove("mello-modal--loaded");
      },
    });
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

    const modalContent = document.getElementById("modal-content");
    const loader = document.getElementById("modal-loader");
    const modalWrapper = document.getElementById("modal-identifier");

    if (modalContent) modalContent.innerHTML = "";
    if (loader) loader.hidden = false;

    MicroModal.show("modal-identifier");

    if (modalWrapper) {
      modalWrapper.classList.add("mello-modal--loading");
      modalWrapper.classList.remove("mello-modal--loaded");
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
        document.getElementById("modal-content").innerHTML =
          contentElement.innerHTML;

        if (modalWrapper) {
          modalWrapper.classList.remove("mello-modal--loading");
          modalWrapper.classList.add("mello-modal--loaded");
        }

        MicroModal.show("modal-identifier");

        updateNavButtons();
      } else {
        console.error("Post content element not found in the loaded HTML.");
      }
    } catch (error) {
      console.error("Error fetching post content:", error);
      if (modalWrapper) modalWrapper.classList.remove("mello-modal--loading");
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
