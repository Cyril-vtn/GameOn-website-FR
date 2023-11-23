function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const htmlFormData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector('.close')
const submitBtn = document.querySelector('.btn-submit');
const form = document.querySelector('form[name="reserve"]')
const closeConfirmBtn = document.getElementById('closeConfirmBtn');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


