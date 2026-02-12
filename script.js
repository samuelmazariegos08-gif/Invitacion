const screens = Array.from(document.querySelectorAll(".screen"));
let step = 0;

function showStep(next) {
  step = Math.max(0, Math.min(next, screens.length - 1));
  screens.forEach((s, i) => s.classList.toggle("active", i === step));
}

function moveNoButton(noBtn, pointer) {
  const row = noBtn.closest(".btn-row");
  if (!row) return;
  const yesBtn = row.querySelector(".btn-yes");
  const rowRect = row.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, rowRect.width - btnRect.width - 8);
  const maxY = Math.max(0, rowRect.height - btnRect.height - 8);

  let x;
  let y;

  if (pointer) {
    const px = pointer.clientX - rowRect.left;
    const py = pointer.clientY - rowRect.top;
    const side = px < rowRect.width / 2 ? "right" : "left";
    x = side === "right" ? maxX : 0;
    y = Math.min(maxY, Math.max(0, py + (py < rowRect.height / 2 ? 18 : -18)));
  } else {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  }

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
  const row = btn.closest(".btn-row");
  btn.addEventListener("mouseenter", (e) => moveNoButton(btn, e));
  btn.addEventListener("pointerenter", (e) => moveNoButton(btn, e));
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    moveNoButton(btn, e);
  });
  if (row) {
    row.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 120) moveNoButton(btn, e);
    });
  }
});

Array.from(document.querySelectorAll(".btn-yes")).forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".screen");
    const current = section ? Number(section.dataset.step) : step;
    showStep(current + 1);
  });
});

const emo = document.getElementById("emo");
const emoValue = document.getElementById("emo-value");
emo?.addEventListener("input", (e) => {
  emoValue.textContent = e.target.value;
});

Array.from(document.querySelectorAll(".next")).forEach((btn) => {
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
