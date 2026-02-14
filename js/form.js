// Create Form Element
export function createForm(editId, itemToEdit, { addItem, updateItemName, showAlert }) {
  const form = document.createElement("form");

  // added value and dynamic button name
  form.innerHTML = `
    <h2>grocery bud</h2>
    <div class="form-control">
      <input
        type="text"
        class="form-input"
        placeholder="e.g. bread, milk"
        value="${itemToEdit ? itemToEdit.name : ""}"
      />
      <input
        type="date"
        class="form-input"
        placeholder="mm/dd/yyyy"
        value="${itemToEdit && itemToEdit.date ? itemToEdit.date : ""}"
      />
      <button type="submit" class="btn">
        ${editId ? "edit item" : "Add Item"}
      </button>
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll(".form-input");
    const name = inputs[0].value.trim();
    const date = inputs[1].value;

    if (!name || !date) {
      showAlert("please provide value and date", "danger");
      return;
    }


    // added conditions
    if (editId) {
      updateItemName(name, date);
    } else {
      addItem(name, date);
    }

    inputs[0].value = "";
    inputs[1].value = "";
  });

  return form;
}
