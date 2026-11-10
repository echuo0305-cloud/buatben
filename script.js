const intro = document.querySelector("#intro");
const letter = document.querySelector("#letter");
const cake = document.querySelector("#blow-out");
const celebration = document.querySelector("#celebration");
const musicWidget = document.querySelector(".music-widget");
const musicButton = document.querySelector("#music-button");
const musicStatus = document.querySelector("#music-status");
const backgroundMusic = document.querySelector("#background-music");
const photoViewer = document.querySelector("#photo-viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCaption = document.querySelector("#viewer-caption");

cake.addEventListener("click", () => {
  if (cake.disabled) return;

  cake.disabled = true;
  cake.classList.add("is-out");
  playMusic();

  window.setTimeout(() => {
    intro.hidden = true;
    letter.hidden = false;
    document.title = "Happy Belated Birthday, Ben! ♡";
    document.querySelector("#letter-title").focus({ preventScroll: true });
    releaseConfetti();
  }, 550);
});

function releaseConfetti() {
  const colors = ["#ff626b", "#f2b6a4", "#ffe0aa", "#fff3e7", "#d58765"];
  const shapes = ["✦", "✧", "♡", "·"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 38; index += 1) {
    const piece = document.createElement("span");
    const delay = Math.random() * 1.1;
    const duration = 3.2 + Math.random() * 2.2;
    piece.className = "confetti";
    piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    piece.style.setProperty("--left", `${Math.random() * 100}%`);
    piece.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
    piece.style.setProperty("--delay", `${delay}s`);
    piece.style.setProperty("--duration", `${duration}s`);
    piece.style.setProperty("--size", `${10 + Math.random() * 13}px`);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    fragment.append(piece);
    window.setTimeout(() => piece.remove(), (delay + duration) * 1000);
  }

  celebration.replaceChildren(fragment);
}

musicButton.addEventListener("click", () => {
  if (backgroundMusic.paused) playMusic();
  else backgroundMusic.pause();
});

backgroundMusic.addEventListener("play", () => {
  musicWidget.classList.add("is-playing");
  musicButton.setAttribute("aria-label", "Pause birthday music");
  musicStatus.textContent = "now playing · enjoy the birthday vibes";
});

backgroundMusic.addEventListener("pause", () => {
  musicWidget.classList.remove("is-playing");
  musicButton.setAttribute("aria-label", "Play birthday music");
  musicStatus.textContent = "music paused · tap to play";
});

backgroundMusic.addEventListener("error", () => {
  musicWidget.classList.remove("is-playing");
  musicStatus.textContent = "couldn't load the song · check the audio file";
});

function playMusic() {
  backgroundMusic.play().catch(() => {
    musicStatus.textContent = "tap the music note to start the song";
  });
}

document.querySelectorAll(".photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    viewerImage.src = photo.dataset.photo;
    viewerImage.alt = photo.querySelector("img").alt;
    viewerCaption.textContent = photo.dataset.caption || "";
    photoViewer.showModal();
  });
});

document.querySelector("#viewer-close").addEventListener("click", () => {
  photoViewer.close();
});

photoViewer.addEventListener("click", (event) => {
  if (event.target === photoViewer) photoViewer.close();
});
