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
 * 5. Breed management function
 */
// 5.1 Select neccessary element
const submitBtn = document.getElementById('submit-btn');
const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const tableBodyEl = document.getElementById('tbody');

// 5.2 Get breed data from localStorage
let breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];

// 5.3 Function to get input from the form
const getInputBreed = function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  return breedData;
};

// Handler exist data
const isBreedExist = function (checkData, savedData) {
  for (let i = 0; i < savedData.length; i++) {
    if (
      savedData[i].breed === checkData.breed &&
      savedData[i].type === checkData.type
    ) {
      return false;
    }
  }
  return true;
};

// 5.4 Function to validate the data
const validateData = function (data) {
  // No breed input
  if (!data.breed) {
    alert('Please input Breed');
    return false;
    // No type selected
  } else if (data.type === 'Select Type') {
    alert('Please Select Type of your Pet');
    return false;
  } else if (!isBreedExist(data, breedArr)) {
    alert('Breed data exists!');
    return false;
  } else {
    return true;
  }
};

// 5.5 Clear input
const clearInput = function () {
  breedInput.value = '';
  typeInput.value = 'Select Type';
};

// 5.6 Function to render breed table
const renderBreedTable = function (inputArr) {
  tableBodyEl.innerHTML = '';
  inputArr.forEach((element, index) => {
    // Creat a table row
    const row = document.createElement('tr');
    // Fill the table
    row.innerHTML = `
     <td>${index + 1}</td>
     <td>${element.breed}</td>
     <td>${element.type}</td>
     <td>
       <button type="button" class="btn btn-danger" onclick="deleteBreed('${
         element.breed
       }','${element.type}')">Delete</button>
     </td>`;
    //Make the row to become child of table body
    tableBodyEl.appendChild(row);
  });
};

// 5.7 Function handler to delete a breed
const deleteBreed = function (breed, type) {
  // Function to take each element of breedArr and compare to breedId
  const checkId = element => {
    return element.breed === breed && element.type === type;
  };

  // Confirm before deleteBreed
  if (confirm('Are you sure?')) {
    // Find the index of breedId then remove
    breedArr.splice(breedArr.findIndex(checkId), 1);

    // Update localStorage
    saveToStorage('breedArr', JSON.stringify(breedArr));

    // Render table again
    renderBreedTable(breedArr);
  }
};

// 5.8 Handler submit button event
submitBtn.addEventListener('click', function () {
  const data = getInputBreed();
  const isDataValid = validateData(data);

  if (!isDataValid) return;

  // Update breed array
  breedArr.push(data);

  // Save breed data to localStorage
  saveToStorage('breedArr', JSON.stringify(breedArr));

  clearInput();

  // Render breed table
  renderBreedTable(breedArr);
});

// Testing only
// localStorage.removeItem('breedArr');
// console.log(localStorage.breedArr);

// Init
renderBreedTable(breedArr);
