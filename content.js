// Function to check if the current URL matches the pattern
function checkURLPattern() {
  const urlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/pull\/\d+\/files/;
  return urlPattern.test(window.location.href);
}

// Function to add a button and bind the click event
function addButton(text, inputSelector) {
  const button = document.createElement("button");
  button.textContent = text;

  button.addEventListener("click", function () {
    // Script to execute when the button is clicked
    [
      ...document.querySelectorAll(inputSelector),
    ].forEach((a) => a.click());
  });

  // Add the button to the page
  const detailsContainer = document.querySelector('div.diffbar.details-collapse.js-details-container.Details.flex-1.d-flex.flex-items-center.width-full');
  if (detailsContainer) {
    const secondChildDiv = detailsContainer.children[1];
    secondChildDiv.appendChild(button);
  }
}

// Function to add buttons for active and inactive inputs
function addButtonForInputs(active, inactive) {
  if (checkURLPattern()) {
    addButton(active.text, active.selector);
    addButton(inactive.text, inactive.selector);
  }
}

// Constants for selectors
const activeInputsSelector = "div div.js-replace-file-header-review.d-flex > form > label > input:not([checked])";
const inactiveInputsSelector = "div div.js-replace-file-header-review.d-flex > form > label > input[checked]";

// Function to add buttons for active and inactive inputs with default text and selectors
function addDefaultButtonsForInputs() {
  addButtonForInputs(
    {
      text: "View all",
      selector: activeInputsSelector,
    },
    {
      text: "Undo view all",
      selector: inactiveInputsSelector,
    }
  );
}

// Check URL pattern on initial page load
addDefaultButtonsForInputs();

// Listen for URL changes
window.addEventListener("popstate", function () {
  addDefaultButtonsForInputs();
});
