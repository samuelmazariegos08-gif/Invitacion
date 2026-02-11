const screens = Array.from(document.querySelectorAll(".screen"));
let step = 0;

function showStep(next) {
  step = Math.max(0, Math.min(next, screens.length - 1));
  screens.forEach((s, i) => s.classList.toggle("active", i === step));
}

function moveNoButton(noBtn) {
  const row = noBtn.closest(".btn-row");
  if (!row) return;
  const yesBtn = row.querySelector(".btn-yes");
  const rowRect = row.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, rowRect.width - btnRect.width - 8);
  const maxY = Math.max(0, rowRect.height - btnRect.height - 8);

  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  if (yesBtn) {
    const yesRect = yesBtn.getBoundingClientRect();
    const yes = {
      left: yesRect.left - rowRect.left,
      right: yesRect.right - rowRect.left,
      top: yesRect.top - rowRect.top,
      bottom: yesRect.bottom - rowRect.top,
    };

    let tries = 0;
    while (tries < 20) {
      const noBox = {
        left: x,
        right: x + btnRect.width,
        top: y,
        bottom: y + btnRect.height,
      };
      const overlap =
        noBox.left < yes.right &&
        noBox.right > yes.left &&
        noBox.top < yes.bottom &&
        noBox.bottom > yes.top;
      if (!overlap) break;
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      tries += 1;
    }
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

Array.from(document.querySelectorAll(".btn-no")).forEach((btn) => {
  btn.addEventListener("mouseenter", () => moveNoButton(btn));
  btn.addEventListener("pointerenter", () => moveNoButton(btn));
});

Array.from(document.querySelectorAll(".btn-yes")).forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".screen");
    const current = section ? Number(section.dataset.step) : step;
    showStep(current + 1);
  });
});

const btnFinal = document.getElementById("btn-final");
btnFinal?.addEventListener("click", () => {
  alert("¡Confirmado! Nos vemos el 14 de febrero de 2026 a las 18:00.");
});

showStep(0);
