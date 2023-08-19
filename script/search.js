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
 * 4. Search function
 */

// Declare using variables
let petArr = JSON.parse(getFromStorage('petArr')) ?? [];
let breedType = JSON.parse(getFromStorage('breedArr')) ?? [];
let result = [];

// Select element
const findBtn = document.getElementById('find-btn');
const clearBtn = document.getElementById('clear-btn');
const tableBodyEl = document.getElementById('tbody');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

// Function to read the filter data form
const getFilterData = function () {
  const filterData = {
    id: idInput.value.toLowerCase(),
    name: nameInput.value.toLowerCase(),
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  return filterData;
};

// Function to clear the filter Form
const clearFilter = function () {
  idInput.value = '';
  nameInput.value = '';
  typeInput.value = 'Select Type';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  tableBodyEl.innerHTML = '';
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

// Function to render breed follow pet type
const showBreed = function () {
  if (typeInput.value === 'Select Type') {
    renderBreed(breedType);
  } else {
    renderBreed(breedType.filter(el => el.type === typeInput.value));
  }
};

// Function to render the pet table data
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
    }/${petDate.getFullYear()}</td>`;
    //Make the row to become child of table body
    tableBodyEl.appendChild(row);
  }
};

// Render the search result
const searchResult = function () {
  const data = getFilterData();

  result = petArr.filter(el => {
    // Nothing to search
    if (
      !data.id &&
      !data.name &&
      data.type === 'Select Type' &&
      data.breed === 'Select Breed' &&
      !data.vaccinated &&
      !data.dewormed &&
      !data.sterilized
    ) {
      return false;
    }

    // Check if pet id matches
    if (data.id && !el.id.toLowerCase().includes(data.id)) {
      return false;
    }

    // Check if pet name matches
    if (data.name && !el.name.toLowerCase().includes(data.name)) {
      return false;
    }

    // Check if pet type matches
    if (data.type !== 'Select Type' && el.type !== data.type) {
      return false;
    }

    // Check if pet breed matches
    if (data.breed !== 'Select Breed' && el.breed !== data.breed) {
      return false;
    }

    // Check if pet vaccinated matches
    if (data.vaccinated && el.vaccinated !== data.vaccinated) {
      return false;
    }

    // Check if pet dewormed matches
    if (data.dewormed && el.dewormed !== data.dewormed) {
      return false;
    }

    // Check if pet sterilized matches
    if (data.sterilized && el.sterilized !== data.sterilized) {
      return false;
    }

    return true;
  });

  renderTableData(result);

  // Alert
  if (result.length === 0) alert('No Pet matching!');
};

// Event handler for find button
findBtn.addEventListener('click', searchResult);

// Event handler for clear button
clearBtn.addEventListener('click', clearFilter);

// On change event handler to filter breed type
typeInput.addEventListener('change', showBreed);

showBreed();
