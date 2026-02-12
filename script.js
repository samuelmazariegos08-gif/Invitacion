const screens = Array.from(document.querySelectorAll(".screen"));
let step = 0;

function showStep(next) {
  step = Math.max(0, Math.min(next, screens.length - 1));
  screens.forEach((s, i) => s.classList.toggle("active", i === step));
  resetNoButtons();
  if (step === 5) updateSummary();
}

function resetNoButtons() {
  document.querySelectorAll(".btn-no").forEach((btn) => {
    btn.style.position = "absolute";
    btn.style.left = "";
    btn.style.right = "16px";
    btn.style.top = "8px";
  });
}

function moveNoButton(noBtn, pointer) {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = Math.random() * (vw - btnRect.width - padding * 2) + padding;
  let y = Math.random() * (vh - btnRect.height - padding * 2) + padding;

  if (pointer) {
    const sideX = pointer.clientX < vw / 2 ? vw - btnRect.width - padding : padding;
    const sideY = pointer.clientY < vh / 2 ? vh - btnRect.height - padding : padding;
    x = sideX;
    y = sideY;
  }

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";
}

Array.from(document.querySelectorAll(".btn-no")).forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => moveNoButton(btn, e));
  btn.addEventListener("pointerenter", (e) => moveNoButton(btn, e));
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    moveNoButton(btn, e);
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton(btn, e);
  });
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
const sumEmo = document.getElementById("sum-emocion");
function updateEmoValue(e) {
  if (!emoValue) return;
  emoValue.textContent = e.target.value;
}
emo?.addEventListener("input", updateEmoValue);
emo?.addEventListener("change", updateEmoValue);

function updateSummary() {
  if (!emo || !sumEmo) return;
  sumEmo.textContent = emo.value;
}

Array.from(document.querySelectorAll(".next")).forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".screen");
    const current = section ? Number(section.dataset.step) : step;
    showStep(current + 1);
  });
});

document.addEventListener("pointermove", (e) => {
  const activeNo = document.querySelector(".screen.active .btn-no");
  if (!activeNo) return;
  const rect = activeNo.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const dist = Math.hypot(dx, dy);
  if (dist < 140) moveNoButton(activeNo, e);
});

const btnFinal = document.getElementById("btn-final");
btnFinal?.addEventListener("click", () => {
  alert("¡Confirmado! Nos vemos el 14 de febrero de 2026 a las 18:00.");
});

showStep(0);
