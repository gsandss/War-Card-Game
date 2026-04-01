const slider = document.getElementById("musicVolume");
const output = document.getElementById("musicValue");
const featureButtons = document.querySelectorAll(".feature-button");
const featurePanes = document.querySelectorAll(".feature-pane");

function setActiveFeature(targetId) {
  featureButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.target === targetId);
  });

  featurePanes.forEach(pane => {
    pane.classList.toggle("active", pane.id === targetId);
  });
}

featureButtons.forEach(button => {
  button.addEventListener("click", () => {
    setActiveFeature(button.dataset.target);
  });
});

if (slider && output) {
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
  };
}

const sfxSlider = document.getElementById("sfxVolume");
const sfxOutput = document.getElementById("sfxValue");

if (sfxSlider && sfxOutput) {
    sfxOutput.innerHTML = sfxSlider.value;
    sfxSlider.oninput = function() {
        sfxOutput.innerHTML = this.value;
    }
};

const backButton = document.getElementById("backButton");
const confirmButton = document.getElementById("confirmButton");
const confirmModal = document.getElementById("confirmModal");
const confirmModalOk = document.getElementById("confirmModalOk");
const confirmModalCancel = document.getElementById("confirmModalCancel");
const confirmModalText = document.querySelector(".confirm-modal-content p");
const resetButton = document.getElementById("resetButton");
let pendingModalAction = null;
const initialMusicValue = slider ? slider.value : null;
const initialSfxValue = sfxSlider ? sfxSlider.value : null;

function openConfirmModal(message, okLabel, action) {
  if (!confirmModal || !confirmModalOk || !confirmModalText) return;
  pendingModalAction = action;
  confirmModalText.textContent = message;
  confirmModalOk.textContent = okLabel;
  confirmModal.classList.add("active");
}

function closeConfirmModal() {
  if (!confirmModal) return;
  pendingModalAction = null;
  confirmModal.classList.remove("active");
}

function resetSettings() {
  if (sfxSlider) {
    sfxSlider.value = 50;
  }
  if (sfxOutput) {
    sfxOutput.innerHTML = "50";
  }
  if (slider) {
    slider.value = 50;
  }
  if (output) {
    output.innerHTML = "50";
  }
  if (bgMusic) {
    bgMusic.volume = 0.5;
  }
  localStorage.clear();
}

function hasUnsavedChanges() {
  const musicChanged = slider && slider.value !== initialMusicValue;
  const sfxChanged = sfxSlider && sfxSlider.value !== initialSfxValue;
  return musicChanged || sfxChanged;
}

function handleBackButtonClick(event) {
  event.preventDefault();
  if (hasUnsavedChanges()) {
    openConfirmModal("You have unsaved changes. Leave without saving?", "Leave", "leave");
  } else {
    window.location.href = "../index.html";
  }
}

if (backButton) {
  backButton.addEventListener("click", handleBackButtonClick);
}

if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    openConfirmModal("Are you sure?", "Confirm", "confirm");
  });
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    openConfirmModal("Reset all settings? This action cannot be undone.", "Reset", "reset");
  });
}

if (confirmModalOk) {
  confirmModalOk.addEventListener("click", () => {
    if (pendingModalAction === "confirm" || pendingModalAction === "leave") {
      window.location.href = "../index.html";
    } else if (pendingModalAction === "reset") {
      resetSettings();
      closeConfirmModal();
    }
  });
}

if (confirmModalCancel) {
  confirmModalCancel.addEventListener("click", closeConfirmModal);
}


const bgMusic = document.getElementById("bgMusic");
const sliderMusic = document.getElementById("musicVolume");
if (bgMusic && sliderMusic) {
  bgMusic.volume = sliderMusic.value / 100;
  sliderMusic.addEventListener("input", () => {
    bgMusic.volume = sliderMusic.value / 100;
  });
}

