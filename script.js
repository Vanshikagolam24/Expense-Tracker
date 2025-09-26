const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalBalance = document.getElementById('total-balance');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// LOAD SAVED EXPENSES
expenses.forEach(expense => addExpenseToDOM(expense));
updateTotal();

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());

  if (name !== '' && !isNaN(amount) && amount > 0) {
    const expense = { id: Date.now(), name, amount };
    expenses.push(expense);
    addExpenseToDOM(expense);
    updateTotal();
    saveExpenses();

    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
});

function addExpenseToDOM(expense) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${expense.name} - ₹${expense.amount}
    <button class="delete-btn">X</button>
  `;

  li.querySelector('.delete-btn').addEventListener('click', () => {
    expenses = expenses.filter(e => e.id !== expense.id);
    li.remove();
    updateTotal();
    saveExpenses();
  });

  expenseList.appendChild(li);
}

function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalBalance.textContent = `₹${total}`;
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}


// const ExpenseForm = document.getElementById('expense-form');
// const expenseNameInput = document.getElementById('expense-name');
// const expenseAmountInput = document.getElementById('expense-amount');
// const expenseList = document.getElementById('expense-list');
// const totalBalance = document.getElementById('total-balance');

// let expenses =JSON.parse(localStorage.getItem('expenses')) || [];

// // LOAD SAVED EXPENSES

// expenseList.forEach(expense => addExpenseToDOM(expense));
// updateTotal();

// ExpenseForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const name = expenseNameInput.ariaValueMax.trim();
//     const amount = parseFloat(expenseAmountInput.ariaValueMax.trim());

//     if(name !== '' && !isNaN(amount) && amount > 0) {
//         const expense = {id: Date.now(), name,amount};
//         expense.push(expense);
//         addExpenseToDOM(expense);
//         updateTotal();
//         saveExpenses();

//         expenseNameInput.value = '';
//         expenseAmountInput.value = '';
//     }
// });

// function addExpenseToDOM(expense) {
//     const li = document.createElement('li');
//     li.innerHTML = `
//     ${expense.name} - ₹${expense.amount}
//     <button class="delete-btn">X</button>
//   `;

//   li.querySelector('.delete-btn').addEventListener('click', () => {
//     expenses = expense.filter (E => E.id !== expense.id);
//     li.remove();
//     updateTotal();
//     saveExpenses();
//   });

//   expenseList.appendChild(li);
// }

// function updateTotal() {
//     const total = expenses.reduce((sum,expense) => sum + expense.amount, 0);
//     totalBalance.textContent = `₹${total}`;
// }

// function saveExpenses() {
//     localStorage.setItem('expenses',JSON.stringify(expenses));
// }