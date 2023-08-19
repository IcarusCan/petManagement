'use strict';

/**
 * ASM2:
 * 2. Store data in local storage
 */

// 2.1 Save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// 2.2 Get from storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
