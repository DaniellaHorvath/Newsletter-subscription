import { app } from "./app";
import { renderService } from "./render";
import { dataService } from "./data";

jest.mock('./render');
jest.mock('./data');

describe("app", () => {
  beforeEach(() => {
    app.state = {
      currentStep: 1,
      totalSteps: 4,
      selectedTopics: new Set(),
      selectedNewsletters: new Set(),
    };
    app.data = { topics: null, newsletters: null };
    jest.clearAllMocks();
  });

  it('should handle handleNext increments state and triggers render focus', () => {
    renderService.elements = { pageTitle: { focus: jest.fn() } };

    app.handleNext();

    expect(app.state.currentStep).toBe(2);
    expect(renderService.elements.pageTitle.focus).toHaveBeenCalled();
  });
});
