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

// Select element
const importBtn = document.querySelector('#import-btn');
const exportBtn = document.querySelector('#export-btn');

// Save data to file
const saveStaticDataToFile = function () {
  let blob = new Blob([getFromStorage('petArr')], {
    type: 'text/plain;charset=utf-8',
  });

  saveAs(blob, 'Pet-data.JSON');
};

// Import pet database from file
const importDataFromFile = function () {
  let file = document.getElementById('input-file').files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      saveToStorage('petArr', evt.target.result);
      alert('Import complete! Please check your new Pet!');
    };
    reader.onerror = function (evt) {
      alert('error reading file');
    };
  } else {
    alert('No file');
  }
};

// Event handler for import button
importBtn.addEventListener('click', importDataFromFile);

// Event handler for export button
exportBtn.addEventListener('click', saveStaticDataToFile);
