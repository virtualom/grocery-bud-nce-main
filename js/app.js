import { createItems } from "./items.js";
import { createForm } from "./form.js";

function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// Initialize items from local storage
let items = getLocalStorage();
let editId = null;

// Alert State
let alertConfig = { show: false, msg: "", type: "" };

function displayAlert(show = false, msg = "", type = "") {
  alertConfig = { show, msg, type };
  render();
  if (show) {
    setTimeout(() => {
      displayAlert(false, "", "");
    }, 3000);
  }
}


// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Create Alert Element
  if (alertConfig.show) {
    const alert = document.createElement("p");
    alert.classList.add("alert", `alert-${alertConfig.type}`);
    alert.textContent = alertConfig.msg;
    app.appendChild(alert);
  }

  // Handlers to pass down
  const formHandlers = {
    addItem,
    updateItemName,
    showAlert: (msg, type) => displayAlert(true, msg, type)
  };

  const itemHandlers = {
    editCompleted,
    removeItem,
    setEditId,
    clearItems
  };

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
    formHandlers
  );
  const itemsElement = createItems(items, itemHandlers);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}


// Initialize App
render();

// Update Item Name Function
// Update Item Function
function updateItemName(newName, newDate) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName, date: newDate };
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  render();
  displayAlert(true, "item value changed", "success");
}


// Set Edit ID Function
function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}

function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();
  displayAlert(true, "item removed", "danger");
}

function clearItems() {
  items = [];
  setLocalStorage(items);
  render();
  displayAlert(true, "empty list", "danger");
}


// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add Item Function
// Add Item Function
function addItem(itemName, itemDate) {
  const newItem = {
    name: itemName,
    date: itemDate,
    completed: false,
    id: generateId(),
  };
  items = [...items, newItem];
  setLocalStorage(items);
  render();
  displayAlert(true, "item added to the list", "success");
}

