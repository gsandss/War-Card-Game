

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

const confirmButton = document.getElementById("confirmButton");
const confirmModal = document.getElementById("confirmModal");
const confirmModalOk = document.getElementById("confirmModalOk");
const confirmModalCancel = document.getElementById("confirmModalCancel");

if (confirmButton && confirmModal && confirmModalOk) {
  confirmButton.addEventListener("click", () => {
    confirmModal.classList.add("active");
  });

  confirmModalOk.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  confirmModalCancel.addEventListener("click", () => {
    confirmModal.classList.remove("active");
  });
}
