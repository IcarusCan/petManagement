'use strict';

// 0. Get all neccessary element
const submitBtn = document.getElementById('submit-btn');
const healthyBtn = document.getElementById('healthy-btn');
const bmiBtn = document.getElementById('bmi-btn');
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
const tableBodyEl = document.getElementById('tbody');
const navBar = document.querySelector('#sidebar');

// Declare using variables
let petArr, healthyPetArr, healthyCheck, breedType;

// Function to check the input petID with the database petID
const isUniqueId = function (petId, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === petId) {
      return false;
    }
  }
  return true;
};

// Function to validate the input data
const validateData = function (data) {
  // No ID input
  if (!data.id) {
    alert('Please input Pet ID');
    return false;

    // ID must be unique before continue
  } else if (!isUniqueId(data.id, petArr)) {
    alert('ID must be unique!');
    return false;

    // No name input
  } else if (!data.name) {
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

// Function to clear the input data in Form
const clearInput = function () {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = 0;
  typeInput.value = 'Select Type';
  weightInput.value = 0;
  lengthInput.value = 0;
  breedInput.value = 'Select Breed';
  colorInput.value = '#000000';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
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
    <td>${arr[i].bmi ? `${arr[i].bmi}` : '?'}</td>
    <td>${petDate.getDate()}/${
      petDate.getMonth() + 1
    }/${petDate.getFullYear()}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="deletePet('${
        arr[i].id
      }')">Delete</button>
    </td>`;
    //Make the row to become child of table body
    tableBodyEl.appendChild(row);
  }
};

// Function to get healthy pet
const healthyPet = function (arr) {
  return arr.filter(
    element => element.vaccinated && element.dewormed && element.sterilized
  );
};

// Function handler to delete a pet
const deletePet = function (petId) {
  // Function to take each element of petArr and compare to petId
  const checkId = element => element.id === petId;

  // Confirm before deletePet
  if (confirm('Are you sure?')) {
    // Find the index of petId then remove
    petArr.splice(petArr.findIndex(checkId), 1);

    // Update localStorage
    saveToStorage('petArr', JSON.stringify(petArr));

    // Get healthy pet
    healthyPetArr = healthyPet(petArr);

    // If delete pet when healthyCheck = true, render table with petArr
    // else render table with healthyPetArr
    healthyCheck ? renderTableData(petArr) : renderTableData(healthyPetArr);
  }
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

// Init function
const init = function () {
  // Get pet database from localStorage
  petArr = JSON.parse(getFromStorage('petArr')) ?? [];
  breedType = JSON.parse(getFromStorage('breedArr')) ?? [];

  // Init healthy pet array
  healthyPetArr = [];

  // State variable to check healthyBtn status
  healthyCheck = true;

  // Display stored pet in the table on page load
  renderTableData(petArr);

  // Display breed type
  renderBreed(breedType);
};

init();

// 1. Add event handler for "Submit" button
submitBtn.addEventListener('click', function () {
  // 2. Read data from Input Form, save to data object
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
    bmi: 0,
  };

  // 3. Validate input data
  const validate = validateData(data);

  // If validate is success
  if (validate) {
    // 4. Add pet to pet list
    petArr.push(data);

    // Save pet to localStorage
    saveToStorage('petArr', JSON.stringify(petArr));

    // 5. Display pet list
    renderTableData(petArr);

    // 6. Remove input data in Input Form
    clearInput();

    // Make the healthyCheck state back to normal when submit
    healthyCheck = true;
    healthyBtn.textContent = 'Show Healthy Pet';
  }
});

// Add event handler for Healthy button
healthyBtn.addEventListener('click', function () {
  // Check current healthyCheck state variable
  // if true --> show healthy Pet and display "Show All Pet"
  if (healthyCheck) {
    healthyCheck = false; // Reverse the state
    healthyBtn.textContent = 'Show All Pet';
    // Get healthy pet
    healthyPetArr = healthyPet(petArr);
    renderTableData(healthyPetArr);

    // if false --> show all Pet and display "Show Healthy Pet"
  } else {
    healthyCheck = true; // Reverse the state
    healthyBtn.textContent = 'Show Healthy Pet';
    renderTableData(petArr);
  }
});

// Add event handler for BMI button
bmiBtn.addEventListener('click', function () {
  let noOfPet = petArr.length;
  // Scan pet data
  for (let i = 0; i < noOfPet; i++) {
    // Check if pet has already had bmi
    if (!petArr[i].bmi) {
      if (petArr[i].type === 'Dog') {
        petArr[i].bmi = (
          (petArr[i].weight * 703) /
          petArr[i].length ** 2
        ).toFixed(2);
      } else if (petArr[i].type === 'Cat') {
        petArr[i].bmi = (
          (petArr[i].weight * 886) /
          petArr[i].length ** 2
        ).toFixed(2);
      } else {
        alert('Your pet is not dog or cat!');
      }
      // Update localStorage
      saveToStorage('petArr', JSON.stringify(petArr));
    }
  }

  // If delete pet when healthyCheck = true, render table with petArr
  // else render table with healthyPetArr
  healthyCheck ? renderTableData(petArr) : renderTableData(healthyPetArr);
});

/**
 * ASM2:
 * 1. Sidebar animation
 */
navBar.addEventListener('click', function (e) {
  // if click in sidebar header, toggle 'active" class
  if (e.target.closest('.sidebar-header')) {
    this.classList.toggle('active');
  } else {
    return;
  }
});

// On change event handler to filter breed type
typeInput.addEventListener('change', function () {
  if (typeInput.value === 'Select Type') {
    renderBreed(breedType);
  } else {
    renderBreed(breedType.filter(el => el.type === typeInput.value));
  }
});
