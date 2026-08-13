const budgetArray = [];
let transactions = [];
const budgetForm = document.getElementById('budgetform');

budgetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.querySelector('#name').value;
    const amount = document.querySelector('#number').value;
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const incomeExpense = document.getElementById('Income&Expense').value;

    console.log('Name:', name);
    console.log('Amount:', amount);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Income/Expense:', incomeExpense);

    
    const budgetData = {
        name: name,
        amount: amount,
        incomeExpense: incomeExpense  
    };

    budgetArray.push(budgetData);

    
    console.log("budgetArray:", budgetArray);
});
function renderTransactions() {
    const incomeList = document.getElementById('Incomelist');
    const expensesList = document.getElementById('Expenseslist');

    incomeList.innerHTML = '';
    expensesList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.name} - ${transaction.amount} - ${transaction.type}`;
        
        if (transaction.incomeExpense === 'Income') {
            incomeList.appendChild(listItem);
        } else {
            expensesList.appendChild(listItem);
        }
    });
}
function updateSummary() {
    const totalIncome = budgetArray
        .filter(item => item.incomeExpense === 'Income')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = budgetArray
        .filter(item => item.incomeExpense === 'Expense')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    document.getElementById('TotalIncome').textContent = `ยอดรวมรายรับ: ${totalIncome}`;
    document.getElementById('TotalExpenses').textContent = `ยอดรวมรายจ่าย: ${totalExpenses}`;
    document.getElementById('TotalBalance').textContent = `ยอดคงเหลือ: ${totalBalance}`;
}