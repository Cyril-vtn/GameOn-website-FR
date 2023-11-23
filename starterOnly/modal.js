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
// Form data
const formDatas = {
  first: '',
  last: '',
  email: '',
  birthdate: '',
  quantity: 0,
  location: '',
  terms: false,
  eventNotificationCheckbox: false,
};

const ErrorText = {
  first: 'Le champ doit comporté au moins 2 caractères',
  last: 'Le champ doit comporté au moins 2 caractères',
  email: 'L\'adresse e-mail n\'est pas valide',
  birthdate: 'Vous devez entrer votre date de naissance',
  quantity: 'Vous devez entrer un nombre',
  location: 'Vous devez choisir une ville',
  checkbox1: 'Vous devez accepter les conditions d\'utilisation',
};

function resetInputError(formDataDiv) {
  formDataDiv.setAttribute('data-error', '');
  formDataDiv.setAttribute('data-error-visible', 'false');
}

function handleInputError(formDataDiv, errorMessage) {
  formDataDiv.setAttribute('data-error', errorMessage);
  formDataDiv.setAttribute('data-error-visible', 'true');
}

function validateForm(input, formDataDiv, formDatas, checkbox, radio) {
  let isValid = true;

  switch (input.name || checkbox.id || radio.name) {
    case 'first':
    case 'last':
      if (input.value === '' || input.value.length < 2) {
        handleInputError(formDataDiv, ErrorText[input.name]);
        isValid = false;
      } else {
        formDatas[input.name] = input.value;
      }
      break;
    case 'email':
      const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
      if (input.value === '' || !regex.test(input.value)) {
        handleInputError(formDataDiv, ErrorText[input.name]);
        isValid = false;
      } else {
        formDatas.email = input.value;
      }
      break;
    case 'birthdate':
      if (input.value === '') {
        handleInputError(formDataDiv, ErrorText[input.name]);
        isValid = false;
      } else {
        formDatas.birthdate = input.value;
      }
      break;
    case 'quantity':
      if (input.value === '') {
        handleInputError(formDataDiv, ErrorText[input.name]);
        isValid = false;
      } else {
        formDatas.quantity = input.value;
      }
      break;
    case 'location':
      if (radio.length === 0) {
        handleInputError(formDataDiv, ErrorText[input.name]);
        isValid = false;
      } else {
        formDatas.location = radio[0].value;
      }
      break;
    case 'checkbox1':
      if (!checkbox.checked) {
        handleInputError(formDataDiv, ErrorText[checkbox.id]);
        isValid = false;
      } else {
        formDatas.terms = checkbox.checked;
      }
      break;
    case 'checkbox2':
      if (checkbox.checked) {
        formDatas.eventNotificationCheckbox = checkbox.checked;
      }
  }
  return isValid;
}




// Add a "click" event handler to the "submit" button
submitBtn.addEventListener('click', function (event) {
  // Prevent the default behavior of the "submit" button
  event.preventDefault();

  // Initialize isFormValid to true
  let isFormValid = true;

  // Iterate through all form fields
  htmlFormData.forEach((data) => {
    // Reset the errors
    data.setAttribute('data-error', '');
    data.setAttribute('data-error-visible', 'false');

    // Retrieve the field values
    const input = data.querySelector('input');
    const checkbox = data.querySelector('input[type="checkbox"]');
    const radio = data.querySelectorAll('input[type="radio"]:checked');

    // Validate the field values
    if (!validateForm(input, data, formDatas, checkbox, radio)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    // All form fields are valid, continue with form submission or display other content
    form.style.display = "none";
    document.getElementById('thankyouMessage').style.display = "flex";
  }
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
closeModalBtn.addEventListener('click', function () {
  // reset error messages
  htmlFormData.forEach((data) => {
    resetInputError(data);
  });
  // reset input field values
  form.reset();
  document.getElementById('thankyouMessage').style.display = "none";
  form.style.display = "block";
  modalbg.style.display = "none";
});


// close confirmation modal
closeConfirmBtn.addEventListener('click', function () {
  // reset error messages
  htmlFormData.forEach((data) => {
    resetInputError(data);
  });

  // reset input field values
  form.reset();

  // hide confirmation modal
  document.getElementById('thankyouMessage').style.display = "none";
  form.style.display = "block";
  modalbg.style.display = "none";
});
