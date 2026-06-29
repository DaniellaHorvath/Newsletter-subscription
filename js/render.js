const renderService = {
  elements: {
    btnBack: document.getElementById("btn-back"),
    btnNext: document.getElementById("btn-next"),
    stepIndicator: document.getElementById("step-indicator"),
    progressFill: document.getElementById("progress-fill"),
    pageTitle: document.getElementById("page-title"),
    pageContent: document.getElementById("page-content"),
    contentArea: document.getElementById("content-area"),
  },

  triggerFade() {
    this.elements.contentArea.classList.remove("fade-in");
    void this.elements.contentArea.offsetWidth; // Force reflow
    this.elements.contentArea.classList.add("fade-in");
  },

  updateHeader(currentStep, totalSteps) {
    this.elements.stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
    const percentage = (currentStep / totalSteps) * 100;
    this.elements.progressFill.style.width = `${percentage}%`;
    this.elements.btnBack.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
      this.elements.btnNext.innerHTML =
        'Done <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
    } else {
      this.elements.btnNext.innerHTML =
        'Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
    }
  },

  clearContent() {
    this.elements.contentArea.innerHTML = "";
  },

  renderStep1(data, selectedSet, onToggle) {
    this.elements.pageTitle.textContent = data.title;
    this.elements.pageContent.textContent = data.subtitle;

    const grid = document.createElement("div");
    grid.className = "grid";

    data.choices.forEach((topic) => {
      const card = this.createCard(topic, selectedSet, () =>
        onToggle(topic.id),
      );
      grid.appendChild(card);
    });

    this.elements.contentArea.appendChild(grid);
  },

  renderStep2(data, selectedSet, onToggle) {
    this.elements.pageTitle.textContent = data.title;
    this.elements.pageContent.textContent = data.subtitle;

    const grid = document.createElement("div");
    grid.className = "grid";

    data.choices.forEach((newsletter) => {
      const card = this.createCard(
        newsletter,
        selectedSet,
        () => onToggle(newsletter.id),
        true,
      );
      grid.appendChild(card);
    });

    this.elements.contentArea.appendChild(grid);
  },

  renderStep3(topicsData, newsData, selectedTopics, selectedNews) {
    this.elements.pageTitle.textContent = "Thank you for your submission!";
    this.elements.pageContent.textContent =
      "Your preferences have been saved successfully.";

    const container = document.createElement("div");
    container.className = "summary-container";

    const topicsBox = this.createSummaryBox(
      "Your topics",
      topicsData.choices,
      selectedTopics,
    );
    const newsBox = this.createSummaryBox(
      "Your newsletters",
      newsData.choices,
      selectedNews,
    );

    container.appendChild(topicsBox);
    container.appendChild(newsBox);
    this.elements.contentArea.appendChild(container);
  },

  // --- Component Builders ---
  createCard(item, selectedSet, onClickCallback, isNewsletter = false) {
    const btn = document.createElement("button");
    const isInitiallySelected = selectedSet.has(item.id);

    btn.className = `option-card ${isInitiallySelected ? "selected" : ""}`;
    btn.setAttribute("aria-pressed", isInitiallySelected);

    let iconDiv = null;

    if (isNewsletter && item.frequency) {
      const badge = document.createElement("div");
      badge.className = "badge";
      badge.textContent = item.frequency;
      btn.appendChild(badge);
    } else {
      iconDiv = document.createElement("div");
      iconDiv.className = "icon-placeholder";
      iconDiv.textContent = isInitiallySelected ? "✓" : "⭐";
      btn.appendChild(iconDiv);
    }

    const titleEl = document.createElement("div");
    titleEl.className = "option-title";
    titleEl.textContent = item.title;

    const contentEl = document.createElement("div");
    contentEl.className = "option-content";
    contentEl.textContent = item.description;

    btn.appendChild(titleEl);
    btn.appendChild(contentEl);

    // Attach click listener to handle ONLY local UI changes
    // to prevent the jump/re-render of the entire view
    btn.addEventListener("click", () => {
      onClickCallback(); // Run logic to update the data Set

      const isNowSelected = selectedSet.has(item.id);
      btn.classList.toggle("selected", isNowSelected);
      btn.setAttribute("aria-pressed", isNowSelected);

      if (iconDiv) {
        iconDiv.textContent = isNowSelected ? "✓" : "⭐";
      }
    });

    return btn;
  },

  createSummaryBox(titleText, allItems, selectedIdsSet) {
    const box = document.createElement("div");
    box.className = "summary-box";

    const title = document.createElement("h3");
    title.textContent = titleText;
    box.appendChild(title);

    if (selectedIdsSet.size === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-state";
      emptyMsg.textContent = "None selected";
      box.appendChild(emptyMsg);
      return box;
    }

    const list = document.createElement("ul");
    list.className = "summary-list";

    const selectedItems = allItems.filter((item) =>
      selectedIdsSet.has(item.id),
    );

    selectedItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      list.appendChild(li);
    });

    box.appendChild(list);
    return box;
  },
};
