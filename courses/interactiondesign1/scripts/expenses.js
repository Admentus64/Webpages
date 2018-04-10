// JavaScript Document

var addBtn, saveBtn , removeBtn;
var budgetsTab, budgetField;


function initExpenses() {
    
    budgetsTab = document.getElementById("expensesTabs").getElementsByTagName("div");
    addBtn = document.getElementById("addExpenseBtn");
    saveBtn = document.getElementById("saveExpensesBtn");
    removeBtn = document.getElementById("removeBtn");
    budgetField = document.getElementById("expenseField");
    
    addListener(addBtn, "click", addExpense);
    addListener(saveBtn, "click", saveExpenses);
    addListener(removeBtn, "click", removeBudget);
    
    initPlanner();
    
    //addPresetBudget("Utgift");
    
}

function addExpense() { addBudget("Utgift"); }
function saveExpenses() { saveBudgets("Expenses"); }