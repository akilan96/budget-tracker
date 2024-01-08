const add = document.querySelector(".add");
let transactions = localStorage.getItem("tracker")!== null ? JSON.parse(localStorage.getItem("tracker")):[];
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");
const balance = document.getElementById("balance");
const expense = document.getElementById ("expense");
const income = document.getElementById("income");

function generateTemplate(id,source,amount,time)
{ 
  return  `<li data-id="${id}">
    <p>
        <span>${source}</span>
        <span id="time">${time}</span>
    </p>
    <span>$${Math.abs(amount)}</span>
    <i class="bi bi-trash-fill delete"></i>
</li>`;
}

function updateStatistics() {

    updatedIncome = transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((total, transaction) => total += (Number(transaction.amount)), 0);
      console.log(updatedIncome);
  
    updatedExpense = transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);
      console.log(updatedExpense);

      updatedBalance = updatedIncome - updatedExpense

      income.textContent = updatedIncome;
      expense.textContent = updatedExpense;
      balance.textContent = updatedBalance;
  }

  

function addTranscationDom(id,source,amount,time)
{
 if(amount >0)
 {
    incomeList.innerHTML+= generateTemplate(id,source,amount,time);
 }
 else{
    expenseList.innerHTML+= generateTemplate(id,source,amount,time);
 }
}

function addTransaction(source,amount)
{
    const time = new Date();
    const transaction = {
        id : Math.floor(Math.random()*100000),
        source : source,
        amount : amount,
        time : `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem ("tracker", JSON.stringify(transactions))
    addTranscationDom(transaction.id,source,amount,transaction.time)
    updateStatistics();
}

add.addEventListener("submit", event => {
    event.preventDefault();
    if(add.source.value.trim() === "" || add.amount.value === "")
    {
        return alert ("Please enter proper values");
    }
    addTransaction(add.source.value.trim(),add.amount.value);
    updateStatistics();
    add.reset();
})

function getTransaction()
{
    
    transactions.forEach( transaction => {
        if(transaction.amount > 0)
        {
            incomeList.innerHTML+= generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);
        }
        else{
            expenseList.innerHTML+=  generateTemplate(transaction.id,transaction.source,transaction.amount,transaction.time);
         }
    })
}


function deleteTransaction(id)
{
   
 transactions = transactions.filter(transaction =>{
    
    return transaction.id !== id;
});
    localStorage.setItem("tracker",JSON.stringify(transactions));
    
  
}


incomeList.addEventListener("click",event=>{

    if(event.target.classList.contains("delete"))
    {
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics();


    }
})
expenseList.addEventListener("click",event=>{

    if(event.target.classList.contains("delete"))
    {
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStatistics();


        
    }
})

function init(){
updateStatistics();
getTransaction();
}

init();