import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button';
import utils from './utils';

ReactDOM.render(
  <Button/>,
  document.getElementById('root')
);

(async function() {

console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementsByClassName("close-modal-button");

var listElement = document.getElementsByClassName("grid-container");

function initModalButton() {
  return new Promise((resolve) => {
    var dataLoaded = false;
    modalButton.addEventListener("click", function () {
      modalContainer.classList.toggle("hidden");
      console.log("Clicked Button!");
      if (dataLoaded === false) {
        utils.loadData(() => {
          resolve();
          dataLoaded = true;
        });
      }
    });
  });
}

closeModalButton[0].addEventListener("click", function () {
  console.log("Clicked Close Modal Button!");
  modalContainer.classList.toggle("hidden");
});

console.log("BEFORE initModalButton is called");
await initModalButton();
console.log("AFTER initModalButton is called");

})();
