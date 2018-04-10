// JavaScript Document

var addBtn, saveBtn, removeBtn;
var budgetsTab, budgetField;



function initIncomes() {
    
    budgetsTab = document.getElementById("incomesTabs").getElementsByTagName("div");
    addBtn = document.getElementById("addIncomeBtn");
    saveBtn = document.getElementById("saveIncomesBtn");
    removeBtn = document.getElementById("removeBtn");
    budgetField = document.getElementById("incomeField");
    
    addListener(addBtn, "click", addIncome);
    addListener(saveBtn, "click", saveIncomes);
    addListener(removeBtn, "click", removeBudget);
    
    initPlanner();
    
    //addPresetBudget("Inkomst");
    //addIncome("Inkomst");
    //addIncome("Inkomst");
    //setBudgetName(1, "Läsk");
    //setBudgetName(2, "Tält");
    
}

function addIncome() { addBudget("Inkomst"); }
function saveIncomes() { saveBudgets("Incomes"); }