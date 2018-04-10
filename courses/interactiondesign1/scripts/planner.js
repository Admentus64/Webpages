// JavaScript Document

var budgets, currentCell;
var nameField, dateField, cellField, valueField, rowsField, columsField;
var calcAllTotalPricesBtn, changeNameBtn, changeValueBtn, changeSizeBtn;
var tab, sortMenu, errorMsg, addBudgetMsg;



function initPlanner() {
    
    // Refer to budget elements
    budgets = document.getElementsByTagName("table");
    
    // Refer to text fields
    nameField = document.getElementById("nameField");
    dateField = document.getElementById("dateField");
    cellField = document.getElementById("cellField");
    valueField = document.getElementById("valueField");
    rowsField = document.getElementById("rowsField");
    columnsField = document.getElementById("columnsField");
    
    // Refer to buttons
    calcAllTotalPricesBtn = document.getElementById("calcAllTotalPricesBtn");
    removeBtn = document.getElementById("removeBtn");
    changeNameBtn = document.getElementById("changeNameBtn");
    changeValueBtn = document.getElementById("changeValueBtn");
    changeSizeBtn = document.getElementById("changeSizeBtn");
    
    // Refer to all other elements
    tab = document.getElementById("tabs").getElementsByTagName("input");
    sortMenu = document.getElementById("sortMenu");
    errorMsg = document.getElementById("errorMsg");
    addBudgetMsg = document.getElementById("addBudgetMsg");
    
    // Add listeners
    addListener(calcAllTotalPricesBtn, "click", calcAllTotalPrices);
    addListener(changeNameBtn, "click", changeName);
    addListener(changeValueBtn, "click", changeValue);
    addListener(changeSizeBtn, "click", changeSize);
    addListener(budgetsTab[0], "keyup", adjustValueField);
    addListener(budgetsTab[1], "keyup", adjustValueField);
    addListener(budgetsTab[2], "keyup", adjustValueField);
    
    for (var i=0; i<tab.length; i++)
		addListener(tab[i], "click", switchTab);
	addListener(sortMenu, "change", sortMenuBudgets);
    
    // Initial values
    tab[0].checked = true;
    sortMenu.selectedIndex = 0;
    currentCell = null;
    cellField.value = valueField.value = rowsField.value = columnsField.value = dateField.value = nameField.value = budgetField.value = "";
    enableActions(false);
    
}


function sortMenuBudgets() {
    
    resetRemoveButton();
    if (budgets.length < 2) {
        errorMsg.innerHTML = "Det finns för lite belopp att sortera."
        errorMsg.className = "showRedBox";
        sortMenu.selectedIndex = 0;
        return;
    }
    else errorMsg.className = "hide";
    
    if (sortMenu.selectedIndex == 1)
        runSortBudgets(true, true);
    else if (sortMenu.selectedIndex == 2)
        runSortBudgets(true, false);
    else if (sortMenu.selectedIndex == 3)
        runSortBudgets(false, true);
    else if (sortMenu.selectedIndex == 4)
        runSortBudgets(false, false);
    sortMenu.selectedIndex = 0;
    
}

function runSortBudgets(digit, asc) {
    
    var done, i;
    do {
        done = false;
        for (i=0; i<budgets.length-1; i++) {
            if (digit && asc && getBudgetId(i) > getBudgetId(i+1))
                done = swap(i);
            else if (digit && !asc && getBudgetId(i) < getBudgetId(i+1))
                done = swap(i);
            else if (!digit && asc && getBudgetName(i) > getBudgetName(i+1))
                done = swap(i);
            else if (!digit && !asc && getBudgetName(i) < getBudgetName(i+1))
                done = swap(i);
        }
    } while(done);
    
    for (i=0; i<budgets.length; i++)
        applyBudgetStyle(budgets[i]);
    
}

function swap(i) {
    
    var temp = budgets[i].cloneNode(true);
    budgets[i].innerHTML = budgets[i+1].innerHTML;
    budgets[i+1].innerHTML = temp.innerHTML;
    return true;
    
}

function switchTab() {
    
    resetRemoveButton();
    errorMsg.className = "hide";
    for (var i=0; i<budgetsTab.length; i++) {
        if (tab[i].checked == true) {
            budgetsTab[i].className = "showTab";
            if (budgetsTab[i].innerHTML == "")
                enableActions(false);
            else enableActions(true);
        }
        else budgetsTab[i].className = "hide";
    }
    
}

function getCurrentPage() {
    
    for (var i=0; i<budgetsTab.length; i++)
        if (tab[i].checked == true)
            return budgetsTab[i];
    
}

function resetTextFields() {
    
    budgetField.value = "";
    nameField.value = "";
    dateField.value = "";
    cellField.value = "",
    valueField.value = "";
    rowsField.value = "";
    columnsField.value = "";
    
}

function enableActions(bool) {
    
    sortMenu.disabled = !bool;
    saveBtn.disabled = !bool;
    budgetField.disabled = !bool;
    calcAllTotalPricesBtn.disabled = !bool;
    removeBtn.disabled = !bool;
    nameField.disabled = !bool;
    dateField.disabled = !bool;
    changeNameBtn.disabled = !bool;
    valueField.disabled = !bool;
    changeValueBtn.disabled = !bool;
    rowsField.disabled = !bool;
    columnsField.disabled = !bool;
    changeSizeBtn.disabled = !bool;
    
    if (!bool) {
        resetTextFields();
        addBudgetMsg.className = "showGreenBox";
    }
    else addBudgetMsg.className = "hide";
    
}

function addBudget(type) {
    
    resetRemoveButton();
    enableActions(true);
    errorMsg.className = "hide";
    
    var i, j, newRow, newCell;
    var newBudget = document.createElement("table");
    for (i=0; i<6; i++) {
        newRow = newBudget.insertRow(0);
        for (j=0; j<5; j++)
            newCell = newRow.insertCell(0);
    }
    
    getCurrentPage().appendChild(newBudget);
    newBudget.id = budgets.length;
    newBudget.rows[0].cells[0].innerHTML =  type + ": " + newBudget.id;
    rowSize = newBudget.rows.length - 1;
    cellSize = newBudget.rows[0].cells.length - 1;
    applyBudgetStyle(newBudget);
    return newBudget;
    
}

function saveBudgets(budgetType) {
    
    // Error handling
    resetRemoveButton();
    errorMsg.className = "hide";
    
    var rowSize, cellSize;
    var store = {};
    store["header"] = [];
    store["total"] = [];
    for (var i=0; i<budgets.length; i++) {
        store["header"].push(budgets[i].rows[1].cells[1].innerHTML);
        rowSize = budgets[i].rows.length - 1;
        cellSize = budgets[i].rows[0].cells.length - 1;
        store["total"].push(budgets[i].rows[rowSize].cells[cellSize].innerHTML);
    }
    
    sessionStorage.setItem(budgetType, JSON.stringify(store));
    
}

function removeBudget() {
    
    // Error
    if (outsideBudgetsRange() && removeBtn.className == "remove") {
        resetRemoveButton();
        errorMsg.innerHTML = "Ingen belopp ar vald för radering.";
        errorMsg.className = "showRedBox";
        return
    }
    if (outsideBudgetsRange() && removeBtn.className == "confirmRemove") {
        resetRemoveButton();
        errorMsg.innerHTML = "Beloppet inte längre vald.";
        errorMsg.className = "showRedBox";
        return
    }
    errorMsg.className = "hide";
    
    if (removeBtn.className == "remove") {
        removeBtn.value = "Tryck igen att bekräfta borttagning";
        removeBtn.className = "confirmRemove";
        return;
    }
    
    resetRemoveButton();
    getCurrentPage().removeChild(getFromBudgetField());
    for (var i=0; i<budgets.length; i++)
        setBudgetId(i, i+1);
    resetTextFields();
    if (budgets.length == 0)
        enableActions(false);
    
}

function resetRemoveButton() {
    
    if (removeBtn.className != "remove") {
        removeBtn.value = "Ta bort";
        removeBtn.className = "remove";
    }
    
}

function changeName() {
    
    // Error handling
    resetRemoveButton();
    if (outsideBudgetsRange())
        errorMsg.innerHTML = "Välj en belopp att ändra i namn och datum.";
    else if (nameField.value == "" || dateField.value == "")
        errorMsg.innerHTML = "Ange en namn eller datum. Det saknas inmatning i textfälten.";
    if (outsideBudgetsRange() || nameField.value == "" && dateField.value == "") {
        errorMsg.className = "showGreenBox";
        return;
    }
    errorMsg.className = "hide";
    
    getFromBudgetField().rows[1].cells[1].innerHTML = nameField.value;
    
}

function changeValue() {
        
    // Error
    resetRemoveButton();
    if (currentCell == null || outsideBudgetsRange()) {
        errorMsg.innerHTML = "Välj en cell först att ändra.";
        errorMsg.className = "showGreenBox";
        return;
    }
    if (currentCell.innerHTML == "" && valueField.value == "")
        errorMsg.innerHTML = "Cellen är redan tomt.";
    else if (currentCell.innerHTML == valueField.value)
        errorMsg.innerHTML = "Cellen är redan samma värde.";
    if (currentCell.innerHTML == "" && valueField.value == "" || currentCell.innerHTML == valueField.value) {
        errorMsg.className = "showRedBox";
        return;
    }
    errorMsg.className = "hide";
    currentCell.innerHTML = valueField.value;
    
}

function preventEnter(e) {
    
    if (e.keyCode == 13)
        e.preventDefault();
    
}

function clickCell() {
    
    resetRemoveButton();
    errorMsg.className = "hide";    
    
    if (this.className.indexOf("Selected") < 0)
        this.className = this.className + "Selected";
    if (currentCell != null && currentCell.className.indexOf("Selected") >= 0 && currentCell != this)
        currentCell.className = currentCell.className.substring(0, currentCell.className.indexOf("Selected"));
    currentCell = this;
    
    budgetField.value = this.parentNode.parentNode.parentNode.rows[0].cells[0].innerHTML;
    nameField.value = this.parentNode.parentNode.parentNode.rows[1].cells[1].innerHTML;
    cellField.value = getLetter(this.cellIndex-1) + " : " + this.parentNode.rowIndex;
    
    valueField.value = this.innerHTML;
    if (valueField.value.indexOf("<br>") >= 0)
        valueField.value = valueField.value.substring(0, valueField.value.indexOf( "<br>"));
    
    rowsField.value = this.parentNode.parentNode.rows.length - 2;
    columnsField.value = this.parentNode.cells.length - 1;
    
}

function calcAllTotalPrices() {
    
    // Error
    resetRemoveButton();
    if (outsideBudgetsRange()) {
        errorMsg.innerHTML = "Välj en belopp att beräkna.";
        errorMsg.className = "showGreenBox";
        return
    }
    else errorMsg.className = "hide";
    
    var budget = getFromBudgetField();
    var rowSize = budget.rows.length -1;
    var cellSize = budget.rows[rowSize].cells.length -1;
    var sum = 0;
    var tmp;
    
    for (var i=2; i<rowSize; i++) {
        tmp = budget.rows[i].cells[cellSize].innerHTML;
        sum += parseFloat(tmp);
        sum = twoDecimal(sum);
    }
    budget.rows[rowSize].cells[cellSize].innerHTML = sum + " kr";
    
    if (budget.rows[rowSize].cells[cellSize].innerHTML == "NaN kr") {
        budget.rows[rowSize].cells[cellSize].innerHTML = "Ej beräknad";
        errorMsg.innerHTML = "Beloppet är ej att beräkna. Fyll in alla celler under totalpris med svenska kronor.";
        errorMsg.className = "showRedBox";
    }
    
}

function getFromBudgetField() {
    
    var number;
    if (budgetField.value.indexOf("Inkomst: ") >= 0)
        number = parseInt(budgetField.value.substring(9));
    else if (budgetField.value.indexOf("Utgift: ") >= 0)
        number = parseInt(budgetField.value.substring(8));
    else number = parseInt(budgetField.value);
    
    if (!parseInt(number))
        return null;
    return budgets[--number];

}

function setBudgetId(i, id) {
    
    var str = budgets[i].rows[0].cells[0].innerHTML;
    str = str.substring(0, str.indexOf(":")+2);
    budgets[i].rows[0].cells[0].innerHTML = str + id;
    
}

function getBudgetId(i) {
    
    var id = budgets[i].rows[0].cells[0].innerHTML;
    id = id.substring(id.indexOf(":")+2);
    return parseInt(id);
    
}

function outsideBudgetsRange() {
    
    var number;
    if (budgetField.value.indexOf("Inkomst: ") >= 0)
        number = parseInt(budgetField.value.substring(9));
    else if (budgetField.value.indexOf("Utgift: ") >= 0)
        number = parseInt(budgetField.value.substring(8));
    else number = parseInt(budgetField.value);
    
    if (!parseInt(number))
        return true;
    if (number-1 < 0 || number-1 >= budgets.length)
        return true;
    return false;

}

function adjustValueField() {
    
    resetRemoveButton();
    valueField.value = currentCell.innerHTML;
    if (currentCell == getFromBudgetField().rows[1].cells[1])
        nameField.value = getFromBudgetField().rows[1].cells[1].innerHTML;
    
    if (valueField.value == "<br>") {
        currentCell.innerHTML = "";
        valueField.value = "";
    }
    
}

function getLetter(val) { return String.fromCharCode('A'.charCodeAt() + val) }
function isNumeric(obj) { return obj - parseFloat(obj) >= 0; }
function twoDecimal(num) { return Number(Math.round(num + 'e2') + 'e-2'); }
function setBudgetName(i, str) { budgets[i].rows[1].cells[1].innerHTML = str; }
function getBudgetName(i, str) { return budgets[i].rows[1].cells[1].innerHTML; }