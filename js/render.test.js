import { renderService } from "./render";

describe("renderService", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <header style="display:block"></header>
        <button id="btn-back"></button>
        <span id="step-indicator"></span>
        <button id="btn-next"></button>
        <div id="progress-fill"></div>
        <h1 id="page-title"></h1>
        <p id="page-content"></p>
        <div id="content-area"></div>
    `;

    renderService.elements = {
        btnBack: document.getElementById("btn-back"),
        btnNext: document.getElementById("btn-next"),
        stepIndicator: document.getElementById("step-indicator"),
        progressFill: document.getElementById("progress-fill"),
        pageTitle: document.getElementById("page-title"),
        pageContent: document.getElementById("page-content"),
        contentArea: document.getElementById("content-area"),
    };
  });

  it('should update updateheader accurately map steps and progress', () => {
    renderService.updateHeader(2, 4);

    expect(renderService.elements.stepIndicator.textContent).toBe('Step 2 of 4');
    expect(renderService.elements.progressFill.style.width).toBe('50%');
    expect(renderService.elements.btnBack.disabled).toBe(false);
  });

  it('should update updateHeader changes Next button to Done on final step', () => {
    renderService.updateHeader(4, 4);

    expect(renderService.elements.btnNext.innerHTML).toContain('Done');
  });

  it('should create createCard build element with correct SVG img and test wrappers', () => {
    const mockItem = { id: 'news', title: 'News', descriptions: 'Tech desc' };
    const selectedSet = new Set();

    const card = renderService.createCard(mockItem, selectedSet, jest.fn());

    expect(card.tagName).toBe('BUTTON');

    // validate the flexbox wrapper are correctly generated for layout
    expect(card.querySelector('.option-text-content')).not.toBeNull();
    expect(card.querySelector('.option-title-wrapper')).not.toBeNull();

    // validate the SVG image tag was generated correctly pointing to the local asset folder
    const img = card.querySelector('img.option-icon');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('asset/icons/news.svg');
  });

  it('should create createCard toggles visual state locally on click without external re-render', () => {
    const mockItem = { id: 'sports', title: 'Sports', description: 'Desc' };
    const selectedSet = new Set();
    
    // mock the callback to update the Set 
    const mockCallback = jest.fn(() => {
        selectedSet.add('sports');
    });

    const card =renderService.createCard(mockItem, selectedSet, mockCallback);

    // initial state
    expect(card.classList.contains('selected')).toBe(false);

    // simulate click
    card.click();

    // validate internal DOM toggle independently
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(card.classList.contains('selected')).toBe(true);
    expect(card.getAttribute('aria-pressed')).toBe('true');
  });

  it('should clear clearContent the main area', () => {
    renderService.elements.contentArea.innerHTML = '<div>Old Content</div>';
    renderService.clearContent();

    expect(renderService.elements.contentArea.innerHTML).toBe('');
  })
});

