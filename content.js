// Function to check if the current URL matches the pattern
function checkURLPattern() {
  const urlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+\/pull\/\d+\/files/;
  return urlPattern.test(window.location.href);
}

// Function to add a button and bind the click event
function addButton(text, inputSelector) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("btn-sm"); // Add a CSS class to the button element
  button.classList.add("btn"); // Add a CSS class to the button element
  button.style.marginLeft = "5px"; // Add some margin to the left of the button

  button.addEventListener("click", function () {
    // Script to execute when the button is clicked
    [...document.querySelectorAll(inputSelector)].forEach((a) => a.click());
  });

  // Add the button to the page
  const detailsContainer = document.querySelector(
    "#files_bucket > diff-file-filter > diff-layout > div.pr-toolbar.js-sticky.js-position-sticky.d-flex > div > div.flex-grow-0.flex-shrink-0.pr-review-tools"
  );

  if (detailsContainer) {
    detailsContainer.appendChild(button);
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
const activeInputsSelector =
  "div div.js-replace-file-header-review.d-flex > form > label > input:not([checked])";
const inactiveInputsSelector =
  "div div.js-replace-file-header-review.d-flex > form > label > input[checked]";

// Function to add buttons for active and inactive inputs with default text and selectors
function addDefaultButtonsForInputs() {
  addButtonForInputs(
    {
      text: "Mark all as viewed",
      selector: activeInputsSelector,
    },
    {
      text: "Mark all as unviewed",
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
