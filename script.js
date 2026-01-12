document.addEventListener("DOMContentLoaded", () => {
  const gift = document.getElementById("gift");
  const hint = document.getElementById("hint");
  const intro = document.getElementById("intro");
  const card = document.getElementById("card");
  const star = document.getElementById("star");
  const finalText = document.getElementById("final");

  const bgm = document.getElementById("bgm");
  const popSound = document.getElementById("popSound");

  let clickCount = 0;
  let bgmStarted = false;

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  hint.textContent = isMobile ? "Tap it." : "Click it.";

  gift.addEventListener("click", () => {
    clickCount++;

    if (!bgmStarted) {
      bgm.volume = 0.25;
      bgm.play().catch(() => {}); // ignore autoplay errors
      bgmStarted = true;
    }

    if (clickCount === 1) {
      popSound.volume = 0.2;
      popSound.play().catch(() => {});
      gift.classList.add("shake");
      hint.textContent = "Because today matters.";
      setTimeout(() => gift.classList.remove("shake"), 400);
    }

    if (clickCount === 2) {
      gift.classList.add("open");
      hint.textContent = "You've been part of my story longer than you know.";
      setTimeout(() => pinataBurst(gift), 200); // sync burst with lid/bow
    }

    if (clickCount === 3) {
      gift.style.display = "none";
      hint.style.display = "none";
      intro.style.display = "none";
      card.style.display = "block";
      gift.style.pointerEvents = "none"; // lock clicks
    }
  });

  star.addEventListener("click", () => {
    finalText.style.display = "block";
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💗";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight - 40 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }
  });

  function pinataBurst(origin) {
    const colors = ["#ffb3c1", "#ffd6a5", "#cdb4db", "#bde0fe", "#ffc8dd"];
    const rect = origin.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollLeft = window.scrollX || window.pageXOffset;

    for (let i = 0; i < 20; i++) {
      const piece = document.createElement("div");
      piece.className = "streamer";
      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      const x = (Math.random() - 0.5) * 300 + "px";
      const y = -Math.random() * 300 - 100 + "px";
      piece.style.setProperty("--x", x);
      piece.style.setProperty("--y", y);

      piece.style.left = rect.left + rect.width / 2 + scrollLeft + "px";
      piece.style.top = rect.top + scrollTop + "px";

      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1600);
    }
  }

  star.addEventListener("click", () => {
    finalText.style.display = "block";

    const emojis = ["💗", "💖", "💝", "💞", "✨"];

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div");
      heart.className = "heart-float";
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      // random posisi X di layar
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight - 40 + "px";

      // random ukuran
      heart.style.setProperty("--size", 12 + Math.random() * 16 + "px");

      // random durasi naik
      heart.style.setProperty("--duration", 2 + Math.random() * 2 + "s");

      document.body.appendChild(heart);

      // hapus setelah selesai animasi
      setTimeout(() => heart.remove(), 2500 + Math.random() * 500);
    }
  });
});
