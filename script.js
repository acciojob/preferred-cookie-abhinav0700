//your JS code here. If required.
// Select elements
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");
const form = document.querySelector("form");

// Helper function to set cookie
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Helper function to get cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Apply saved preferences (if cookies exist)
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  const root = document.documentElement;
  if (savedFontSize) {
    root.style.setProperty("--fontsize", savedFontSize + "px");
    fontSizeInput.value = savedFontSize;
  }
  if (savedFontColor) {
    root.style.setProperty("--fontcolor", savedFontColor);
    fontColorInput.value = savedFontColor;
  }
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const size = fontSizeInput.value;
  const color = fontColorInput.value;

  // Save preferences as cookies
  setCookie("fontsize", size);
  setCookie("fontcolor", color);

  // Apply preferences immediately
  document.documentElement.style.setProperty("--fontsize", size + "px");
  document.documentElement.style.setProperty("--fontcolor", color);
});

// Apply preferences on page load
applyPreferences();
