'use strict';

/**
 * ASM2:
 * 1. Sidebar animation
 */

// 1.1 Select sidebar
const navBar = document.querySelector('#sidebar');

// 1.2 Event handler for sidebar
navBar.addEventListener('click', function (e) {
  // if click in sidebar header, toggle 'active" class
  if (e.target.closest('.sidebar-header')) {
    this.classList.toggle('active');
  } else {
    return;
  }
});

/**
 * ASM2:
 * 3. Edit pet function
 */

// Select element
const editForm = document.querySelector('#container-form');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const tableBodyEl = document.getElementById('tbody');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const breedInput = document.getElementById('input-breed');
const colorInput = document.getElementById('input-color-1');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

// Declare using variables
let petArr = JSON.parse(getFromStorage('petArr')) ?? [];
let breedType = JSON.parse(getFromStorage('breedArr')) ?? [];

// Function to render the pet table data for edit
const renderTableData = function (arr) {
  tableBodyEl.innerHTML = '';
  // Scan through all pet data
  for (let i = 0; i < arr.length; i++) {
    const petDate = new Date(arr[i].date);
    // Creat a table row
    const row = document.createElement('tr');
    // Fill the table
    row.innerHTML = `<th scope="row">${arr[i].id}</th>
    <td>${arr[i].name}</td>
    <td>${arr[i].age}</td>
    <td>${arr[i].type}</td>
    <td>${arr[i].weight} kg</td>
    <td>${arr[i].length} cm</td>
    <td>${arr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
    </td>    
    <td><i class="bi bi-${
      arr[i].vaccinated ? 'check' : 'x'
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      arr[i].dewormed ? 'check' : 'x'
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      arr[i].sterilized ? 'check' : 'x'
    }-circle-fill"></i></td>
    <td>${petDate.getDate()}/${
      petDate.getMonth() + 1
    }/${petDate.getFullYear()}</td>
    <td>
      <button type="button" class="btn btn-warning btn-edit" onclick="startEditPet('${
        arr[i].id
      }')">Edit</button>
    </td>`;
    //Make the row to become child of table body
    tableBodyEl.appendChild(row);
  }
};

// Function to show the input form when edit pet
const toggleForm = function () {
  editForm.classList.toggle('hide');
};

// Function to create option element
const renderBreedOption = function (content) {
  const option = document.createElement('option');
  option.innerHTML = `${content}`;
  breedInput.appendChild(option);
};

// Function handler to render Breed type
const renderBreed = function (inputBreedArr) {
  breedInput.innerHTML = ``;
  renderBreedOption('Select Breed');
  inputBreedArr.forEach(element => renderBreedOption(element.breed));
};

// Function to validate the input data
const validateData = function (data) {
  // No name input
  if (!data.name) {
    alert('Please input Pet Name');
    return false;

    // Age must between (1-15)
  } else if (!(data.age >= 1 && data.age <= 15)) {
    alert('Age must be between 1 and 15!');
    return false;

    // Type is a must
  } else if (data.type === 'Select Type') {
    alert('Please select Type');
    return false;

    // Weight must between (1-15)
  } else if (!(data.weight >= 1 && data.weight <= 15)) {
    alert('Weight must be between 1 and 15!');
    return false;

    // Length must between (1-100)
  } else if (!(data.length >= 1 && data.length <= 100)) {
    alert('Length must be between 1 and 100!');
    return false;

    // Breed is a must
  } else if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
    return false;

    // Data validate successfully
  } else {
    return true;
  }
};

// Function to show the saved data in Form
const showPetData = function (petIndex) {
  idInput.value = petArr[petIndex].id;
  nameInput.value = petArr[petIndex].name;
  ageInput.value = petArr[petIndex].age;
  typeInput.value = petArr[petIndex].type;
  weightInput.value = petArr[petIndex].weight;
  lengthInput.value = petArr[petIndex].length;

  showBreed();
  breedInput.value = petArr[petIndex].breed;

  colorInput.value = petArr[petIndex].color;
  vaccinatedInput.checked = petArr[petIndex].vaccinated;
  dewormedInput.checked = petArr[petIndex].dewormed;
  sterilizedInput.checked = petArr[petIndex].sterilized;
};

// Handle the disable attribute in some button
const disableEditButtons = function () {
  const editBtns = document.querySelectorAll('.btn-edit');
  editBtns.forEach(btn => (btn.disabled = true));
};

const enableEditButtons = function () {
  const editBtns = document.querySelectorAll('.btn-edit');
  editBtns.forEach(btn => (btn.disabled = false));
};

// Function to render breed follow pet type
const showBreed = function () {
  if (typeInput.value === 'Select Type') {
    renderBreed(breedType);
  } else {
    renderBreed(breedType.filter(el => el.type === typeInput.value));
  }
};

// Function to start edit pet
const startEditPet = function (petId) {
  const petIndex = petArr.findIndex(element => element.id === petId);
  disableEditButtons();
  toggleForm();
  showPetData(petIndex);
};

// On change event handler to filter breed type
typeInput.addEventListener('change', showBreed);

// Event handler when click submit button to finish edit
submitBtn.addEventListener('click', function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const validate = validateData(data);

  // If validate is success
  if (validate) {
    // Remove old data and replace updated one
    petArr.splice(
      petArr.findIndex(element => element.id === data.id),
      1,
      data
    );

    // Save pet to localStorage
    saveToStorage('petArr', JSON.stringify(petArr));

    // Render table again
    renderTableData(petArr);
  }
  enableEditButtons();
  toggleForm();
});

// Cancel edit pet
cancelBtn.addEventListener('click', function () {
  toggleForm();
  enableEditButtons();
});

renderTableData(petArr);
