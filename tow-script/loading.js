document.addEventListener("DOMContentLoaded", () => {
  const loadingBarBox = document.getElementById("loadingBarBox");
  const fillLayer = document.getElementById("fillLayer");
  const startText = document.getElementById("startText");

  let progress = 0;
  let isFinished = false;

  const loadingInterval = setInterval(() => {
    progress += 2;

    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      isFinished = true;

      startText.classList.add("visible");
      loadingBarBox.classList.add("ready");
    }

    fillLayer.style.width = `${progress}%`;
  }, 50);

  document.addEventListener("click", () => {
    if (!isFinished) return;
    window.location.href = "welcome.html";
  });
});