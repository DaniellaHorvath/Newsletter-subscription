import { dataService } from "./data.js";
import { renderService } from "./render.js";

export const app = {
  state: {
    currentStep: 1,
    totalSteps: 4,
    selectedTopics: new Set(),
    selectedNewsletters: new Set(),
  },
  data: {
    topics: null,
    newsletters: null,
  },

  async init() {
    renderService.elements.btnNext.addEventListener("click", () =>
      this.handleNext(),
    );
    renderService.elements.btnBack.addEventListener("click", () =>
      this.handleBack(),
    );

    renderService.elements.pageTitle.textContent = "Loading...";

    // Fetch data concurrently using our dataService
    const [topicsData, newsData] = await Promise.all([
      dataService.fetchTopics(),
      dataService.fetchNewsletters(),
    ]);

    if (topicsData && newsData) {
      this.data.topics = topicsData;
      this.data.newsletters = newsData;
      this.renderCurrentStep();
    } else {
      renderService.elements.pageTitle.textContent = "Error loading data.";
    }
  },

  handleNext() {
    if (this.state.currentStep === this.state.totalSteps) {
      // Clicked 'Done' on the success page - clear everything and go back to step 1
      this.state.currentStep = 1;
      this.state.selectedTopics.clear();
      this.state.selectedNewsletters.clear();
      this.renderCurrentStep();
      renderService.elements.pageTitle.focus();
    } else if (this.state.currentStep < this.state.totalSteps) {
      this.state.currentStep++;
      this.renderCurrentStep();
      renderService.elements.pageTitle.focus();
    }
  },

  handleBack() {
    if (this.state.currentStep > 1) {
      this.state.currentStep--;
      this.renderCurrentStep();
      renderService.elements.pageTitle.focus();
    }
  },

  toggleTopic(id) {
    if (this.state.selectedTopics.has(id)) {
      this.state.selectedTopics.delete(id);
    } else {
      this.state.selectedTopics.add(id);
    }
    // Removed full render trigger to stop page jumping
  },

  toggleNewsletter(id) {
    if (this.state.selectedNewsletters.has(id)) {
      this.state.selectedNewsletters.delete(id);
    } else {
      this.state.selectedNewsletters.add(id);
    }
    // Removed full render trigger to stop page jumping
  },

  renderCurrentStep() {
    renderService.triggerFade();
    renderService.updateHeader(this.state.currentStep, this.state.totalSteps);
    renderService.clearContent();

    switch (this.state.currentStep) {
      case 1:
        renderService.renderStep1(
          this.data.topics,
          this.state.selectedTopics,
          (id) => this.toggleTopic(id),
        );
        break;
      case 2:
        renderService.renderStep2(
          this.data.newsletters,
          this.state.selectedNewsletters,
          (id) => this.toggleNewsletter(id),
        );
        break;
      case 3:
        renderService.renderStep3(
          this.data.topics,
          this.data.newsletters,
          this.state.selectedTopics,
          this.state.selectedNewsletters,
        );
        break;
      case 4:
        renderService.renderStep4()
        break;
    }
  },
};

// Jest automatically sets process.env.NODE_ENV = 'test', so this safely ignores the auto-start during testing.
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    app.init();
}