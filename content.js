class URLPatternChecker {
  static checkURLPattern(url, pattern) {
    const urlPattern = new RegExp(pattern);
    return urlPattern.test(url);
  }
}

class Button {
  constructor(text, onClick, parentElementSelector, pattern) {
    this.text = text;
    this.onClick = onClick;
    this.pattern = pattern;
    this.parentElementSelector = parentElementSelector;
    this.button = document.createElement("button");
    this.button.textContent = this.text;
    this.button.classList.add("btn-sm", "btn");
    this.button.style.marginLeft = "5px";
    this.button.addEventListener("click", this.handleButtonClick.bind(this));
  }

  handleButtonClick() {
    this.onClick();
  }

  appendToContainer() {
    const parentElement = document.querySelector(this.parentElementSelector);
    if (parentElement) {
      parentElement.appendChild(this.button);
    }
  }
}

class ButtonManager {
  constructor(buttons) {
    this.buttons = buttons.map((button) => {
      const { text, onClick, parentElementSelector, pattern } = button;
      return new Button(text, onClick, parentElementSelector, pattern);
    });
  }

  addButtons() {
    const currentURL = window.location.href;

    this.buttons.forEach((button) => {
      if (URLPatternChecker.checkURLPattern(currentURL, button.pattern)) {
        button.appendToContainer();
      }
    });
  }
}

const parentElementSelector =
  "#files_bucket > diff-file-filter > diff-layout > div.pr-toolbar.js-sticky.js-position-sticky.d-flex > div > div.flex-grow-0.flex-shrink-0.pr-review-tools";

const buttons = [
  {
    text: "Mark all as viewed",
    pattern:
      "^https:\\/\\/github\\.com\\/[\\w-]+\\/[\\w-]+\\/pull\\/\\d+\\/files",
    onClick: function markAllAsViewed() {
      const activeInputs = document.querySelectorAll(
        "div div.js-replace-file-header-review.d-flex > form > label > input:not([checked])"
      );
      activeInputs.forEach((input) => input.click());
    },
    parentElementSelector: parentElementSelector,
  },
  {
    text: "Mark all as unviewed",
    pattern:
      "^https:\\/\\/github\\.com\\/[\\w-]+\\/[\\w-]+\\/pull\\/\\d+\\/files",
    onClick: function markAllAsUnviewed() {
      const inactiveInputs = document.querySelectorAll(
        "div div.js-replace-file-header-review.d-flex > form > label > input[checked]"
      );
      inactiveInputs.forEach((input) => input.click());
    },
    parentElementSelector: parentElementSelector,
  },
];

const buttonManager = new ButtonManager(buttons);

function addButtons() {
  buttonManager.addButtons();
}

addButtons();

window.addEventListener("turbo:render", addButtons);

console.log("Github PR helper loaded");
