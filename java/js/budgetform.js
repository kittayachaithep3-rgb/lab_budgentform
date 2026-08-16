const budgetArray = [];
const budgetForm = document.getElementById('budgetform');

budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const amount = Number(document.querySelector('#number').value);
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const incomeExpense = document.getElementById('incomeExpense').value;

    const budgetData = {
        name: name,
        amount: amount,
        date: date,
        time: time,
        incomeExpense: incomeExpense
    };

    budgetArray.push(budgetData);

    console.log('budgetArray:', budgetArray);

    renderTransactions();
    updateSummary();

    budgetForm.reset();
});

function renderTransactions() {
    const incomeList = document.getElementById('Incomelist');
    const expensesList = document.getElementById('Expenseslist');

    incomeList.innerHTML = '';
    expensesList.innerHTML = '';

    budgetArray.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.name} - ${transaction.amount} `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'ลบ';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', function () {
            deleteTransaction(index);
        });

        listItem.appendChild(deleteBtn);

        if (transaction.incomeExpense === 'Income') {
            incomeList.appendChild(listItem);
        } else {
            expensesList.appendChild(listItem);
        }
    });
}

function deleteTransaction(index) {
    budgetArray.splice(index, 1);
    renderTransactions();
    updateSummary();
}

function updateSummary() {
    const totalIncome = budgetArray
        .filter(item => item.incomeExpense === 'Income')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = budgetArray
        .filter(item => item.incomeExpense === 'Expenses')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    document.getElementById('TotalIncome').textContent = `ยอดรวมรายรับ: ${totalIncome}`;
    document.getElementById('TotalExpenses').textContent = `ยอดรวมรายจ่าย: ${totalExpenses}`;
    document.getElementById('TotalBalance').textContent = `ยอดคงเหลือ: ${totalBalance}`;
}