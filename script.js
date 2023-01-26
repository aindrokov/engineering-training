console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");

modalButton.addEventListener("click", function () {
  console.log("Clicked Button!");
  modalContainer.classList.toggle("hidden");
});

console.log("closeModalButton", closeModalButton);
