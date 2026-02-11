const screens = Array.from(document.querySelectorAll(".screen"));
let step = 0;
const state = {
  food: "Helado",
  foodImg: "assets/images/comida_helado.jpg",
  activity: "Película",
  activityImg: "assets/images/actividad_pelicula.jpg",
  emotion: 6,
};

function showStep(next) {
  step = Math.max(0, Math.min(next, screens.length - 1));
  screens.forEach((s, i) => s.classList.toggle("active", i === step));
}

function setSelected(groupEl, selectedBtn) {
  groupEl.querySelectorAll(".tile").forEach((btn) => {
    btn.classList.toggle("selected", btn === selectedBtn);
  });
}

function enableNext(section) {
  const next = section.querySelector(".next");
  if (next) next.disabled = false;
}

function updateSummary() {
  const sumComida = document.getElementById("sum-comida");
  const sumComidaImg = document.getElementById("sum-comida-img");
  const sumActividad = document.getElementById("sum-actividad");
  const sumActividadImg = document.getElementById("sum-actividad-img");
  const sumEmo = document.getElementById("sum-emocion");

  if (state.food) sumComida.textContent = state.food;
  if (state.foodImg) sumComidaImg.src = state.foodImg;
  if (state.activity) sumActividad.textContent = state.activity;
  if (state.activityImg) sumActividadImg.src = state.activityImg;
  sumEmo.textContent = String(state.emotion);
}

// Step 0: Yes / No
const btnSi = document.getElementById("btn-si");
const btnNo = document.getElementById("btn-no");
const btnRow = btnNo?.parentElement;

btnSi?.addEventListener("click", () => showStep(1));

function moveNoButton() {
  if (!btnNo || !btnRow) return;
  const rowRect = btnRow.getBoundingClientRect();
  const siRect = btnSi?.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = Math.max(0, rowRect.width - btnRect.width - 8);
  const maxY = Math.max(0, rowRect.height - btnRect.height - 8);

  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  if (siRect) {
    const si = {
      left: siRect.left - rowRect.left,
      right: siRect.right - rowRect.left,
      top: siRect.top - rowRect.top,
      bottom: siRect.bottom - rowRect.top,
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
        noBox.left < si.right &&
        noBox.right > si.left &&
        noBox.top < si.bottom &&
        noBox.bottom > si.top;
      if (!overlap) break;
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      tries += 1;
    }
  }

  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
}

btnNo?.addEventListener("mouseenter", moveNoButton);
btnNo?.addEventListener("pointerenter", moveNoButton);

// Step 1: Food
const foodSection = screens[1];
const foodTiles = foodSection?.querySelectorAll(".tile") || [];
foodTiles.forEach((btn) => {
  btn.addEventListener("click", () => {
    setSelected(foodSection, btn);
    state.food = btn.dataset.food || btn.textContent.trim();
    state.foodImg = btn.dataset.img || null;
    enableNext(foodSection);
  });
});
if (foodTiles.length === 1) {
  const only = foodTiles[0];
  setSelected(foodSection, only);
  enableNext(foodSection);
}

// Step 2: Activity
const activitySection = screens[2];
const activityTiles = activitySection?.querySelectorAll(".tile") || [];
activityTiles.forEach((btn) => {
  btn.addEventListener("click", () => {
    setSelected(activitySection, btn);
    state.activity = btn.dataset.activity || btn.textContent.trim();
    state.activityImg = btn.dataset.img || null;
    enableNext(activitySection);
  });
});
if (activityTiles.length === 1) {
  const only = activityTiles[0];
  setSelected(activitySection, only);
  enableNext(activitySection);
}

// Step 3: Emotion
const emo = document.getElementById("emo");
const emoValue = document.getElementById("emo-value");
emo?.addEventListener("input", (e) => {
  state.emotion = Number(e.target.value);
  if (emoValue) emoValue.textContent = String(state.emotion);
});

// Next buttons
Array.from(document.querySelectorAll(".next")).forEach((btn) => {
  btn.addEventListener("click", () => {
    if (step === 4 || step === 5) updateSummary();
    showStep(step + 1);
  });
});

// Final button
const btnFinal = document.getElementById("btn-final");
btnFinal?.addEventListener("click", () => {
  alert("¡Confirmado! Nos vemos el 14 de febrero de 2026 a las 18:00.");
});

showStep(0);
