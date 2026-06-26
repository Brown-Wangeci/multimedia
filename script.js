// Select the video, button, and fallback message.
const video = document.getElementById("wildlifeVideo");
const toggleButton = document.getElementById("toggleVideoButton");
const videoFallback = document.getElementById("videoFallback");

// Keep the button text and aria-expanded value in sync with the video state.
function updateButtonState() {
  const isHidden = video.classList.contains("is-hidden");

  if (isHidden) {
    toggleButton.textContent = "Show and play video";
    toggleButton.setAttribute("aria-expanded", "false");
  } else if (video.paused) {
    toggleButton.textContent = "Play video";
    toggleButton.setAttribute("aria-expanded", "true");
  } else {
    toggleButton.textContent = "Pause and hide video";
    toggleButton.setAttribute("aria-expanded", "true");
  }
}

// Control the video based on whether it is hidden, playing, or paused.
toggleButton.addEventListener("click", function () {
  const isHidden = video.classList.contains("is-hidden");

  if (isHidden) {
    video.classList.remove("is-hidden");
    video.play().catch(function () {
      updateButtonState();
    });
  } else if (video.paused) {
    video.play().catch(function () {
      updateButtonState();
    });
  } else {
    video.pause();
    video.classList.add("is-hidden");
  }

  updateButtonState();
});

// Show a helpful message if wildlife.mp4 is missing or cannot load.
video.addEventListener("error", function () {
  videoFallback.hidden = false;
  updateButtonState();
});

video.addEventListener("play", updateButtonState);
video.addEventListener("pause", updateButtonState);

updateButtonState();
