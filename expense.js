const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];
const tableBody = document.getElementById('tblBody');

const expenseDate = document.getElementById('dateInput');
const expenseDescription = document.getElementById('descrInput');
const expenseAmount = document.getElementById('amountInput');
const expenseVendor = document.getElementById('vendorInput');
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  expenseItem = {
    id: Math.random(),
    date: expenseDate.value,
    description: expenseDescription.value,
    amount: expenseAmount.value,
    vendor: expenseVendor.value
  };

  validateForm()
    ? alert('Please fill out all fields before submitting.')
    : addExpense(expenseItem);

  console.log(validateForm());
});

console.log(validateForm());

function addExpense(expense) {
  renderRow(expense);
  expenseArray.push(expense);
  pushToLocalStorage(expense);
}
function renderRow(expense) {
  const tableRow = document.createElement('tr');
  tableBody.appendChild(tableRow);

  const dateCell = document.createElement('td');
  dateCell.textContent = expense.date;
  tableRow.appendChild(dateCell);

  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = expense.description;
  tableRow.appendChild(descriptionCell);

  const amountCell = document.createElement('td');
  amountCell.textContent = expense.amount;
  tableRow.appendChild(amountCell);

  const vendorCell = document.createElement('td');
  vendorCell.textContent = expense.vendor;
  tableRow.appendChild(vendorCell);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.setAttribute('id', 'deleteButton');
  tableRow.appendChild(deleteButton);

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteExpenseRow(deleteButton, expense.id);
  });

  document.getElementById('form').reset();
}

function pushToLocalStorage(expense) {
  localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
}

function validateForm() {
  const isInputEmpty =
    !expenseDate.value ||
    !expenseDescription.value ||
    !expenseAmount.value ||
    !expenseDescription.value;

  return isInputEmpty ? true : false;

  //   if (
  //     !expenseDate.value ||
  //     !expenseDescription.value ||
  //     !expenseAmount.value ||
  //     !expenseVendor.value
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
}

function deleteExpenseRow(deleteButton, id) {
  deleteButton.parentElement.remove();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
    }
  }
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray.forEach((expense) => {
    renderRow(expense);
  });
});
