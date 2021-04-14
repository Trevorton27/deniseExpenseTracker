const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];
const tableBody = document.getElementById('expenseTbl');

const expenseDate = document.getElementById('dateInput');
const expenseDescription = document.getElementById('descrInput');
const expenseAmount = document.getElementById('amountInput');
const expenseVendor = document.getElementById('vendorInput');

const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (isValidateForm()) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  expenseItem = {
    id: Date.now(),
    date: expenseDate.value,
    description: expenseDescription.value,
    amount: expenseAmount.value,
    vendor: expenseVendor.value
  };

  addExpense(expenseItem);

  document.getElementById('form').reset();
});

function addExpense(expense) {
  renderRow(expense);
  expenseArray.push(expense);
  pushToLocalStorage(expense);
}

function pushToLocalStorage(expense) {
  localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
}

function renderRow(expense) {
  const tableRow = document.createElement('tr');
  tableBody.appendChild(tableRow);

  const dateCell = createDateCell(expense);
  tableRow.appendChild(dateCell);

  const descriptionCell = createDescriptionCell(expense);
  tableRow.appendChild(descriptionCell);

  const amountCell = createAmountCell(expense);
  tableRow.appendChild(amountCell);

  const vendorCell = createVendorCell(expense);
  tableRow.appendChild(vendorCell);

  const deleteButton = createDeleteButton(expense);
  tableRow.appendChild(deleteButton);
}

function createDateCell(expense) {
  const dateCell = document.createElement('td');
  dateCell.textContent = expense.date;
  return dateCell;
}

function createDescriptionCell(expense) {
  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = expense.description;
  return descriptionCell;
}

function createAmountCell(expense) {
  const amountCell = document.createElement('td');
  amountCell.textContent = expense.amount;
  return amountCell;
}

function createVendorCell(expense) {
  const vendorCell = document.createElement('td');
  vendorCell.textContent = expense.vendor;
  return vendorCell;
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.setAttribute('id', 'deleteButton');

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteExpenseRow(deleteButton, expense.id);
  });
  return deleteButton;
}

function deleteExpenseRow(deleteButton, id) {
  deleteButton.parentElement.remove();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      pushToLocalStorage(expenseArray);
    }
  }
}

function isValidateForm() {
  const isInputEmpty =
    !expenseDate.value ||
    !expenseDescription.value ||
    !expenseAmount.value ||
    !expenseVendor.value;

  return isInputEmpty ? true : false;
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray.forEach((expense) => {
    renderRow(expense);
  });
});
