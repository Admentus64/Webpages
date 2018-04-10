// JavaScript Document

function changeSize() {
    
    // Error
    resetRemoveButton();
    if (outsideBudgetsRange()) {
        errorMsg.innerHTML = "Välj en belopp att ändra i storlek.";
        errorMsg.className = "showGreenBox";
        return
    }
    if (rowsField.value <= 2 || columnsField.value <= 2) {
        errorMsg.innerHTML = "Det krävs minst tre rader och kolumner.";
        errorMsg.className = "showRedBox";
        return
    }
    if (rowsField.value > 20 || columnsField.value > 20) {
        errorMsg.innerHTML = "Det ska vara maximalt 20 rader och kolumner för att undvika prestationsproblem.";
        errorMsg.className = "showRedBox";
        return
    }
    errorMsg.className = "hide";
    
    var budget = getFromBudgetField();
    var rowsDiff = rowsField.value - budget.rows.length + 2;
    var columnsDiff = columnsField.value - budget.rows[0].cells.length + 1 ;
    
    if (rowsDiff > 0)
        addRows(budget, rowsDiff);
    else if (rowsDiff < 0 && rowsField.value > 2)
        removeRows(budget, rowsDiff);
    
    if (columnsDiff > 0)
        addColumns(budget, columnsDiff);
    else if (columnsDiff < 0 && columnsField.value > 2)
        removeColumns(budget, columnsDiff);
        
    applyBudgetStyle(budget)
    
}

function setCellProperties(cell, cellType, cellHTML, addEvent) {
    
    cell.className = cellType;
    if (cellHTML != null)
        cell.innerHTML = cellHTML;
    else if (cellHTML == "")
        cell.innerHTML = "";
    if (addEvent) {
        addListener(cell, "mousedown", clickCell);
        addListener(cell, "keydown", preventEnter);
        cell.setAttribute("contentEditable", "true");
    }
    
}

function applyBudgetStyle(budget) {
    
    var rowSize = budget.rows.length - 1;
    var cellSize = budget.rows[rowSize].cells.length - 1;
    var cell, i, j;
    
    for (i=0; i<=rowSize; i++)
        for (j=0; j<=cellSize; j++) {
            cell = budget.rows[i].cells[j];
            if (i == 0 && j == 0)
                setCellProperties(cell, "specialCell", null, false);
            else if (i == rowSize && j != cellSize-1)
                setCellProperties(cell, "specialCell", "", false);
            else if (i == rowSize && j == cellSize-1)
                setCellProperties(cell, "specialCell", "Alla totalpriser:", false);
            else if (i == 0 && j != 0)
                setCellProperties(cell, "locationCell", getLetter(j-1), false);
            else if (i != 0 && i != rowSize && j == 0)
                setCellProperties(cell, "locationCell", i.toString(), false);
            else if (i == 1 && j != null && j != cellSize || i != rowSize && j == 1)
                setCellProperties(cell, "headerCell", null, true);
            else if (i == 1 && j == cellSize)
                setCellProperties(cell, "headerCell", "Totalpris", false);
            else setCellProperties(cell, "textCell", null, true);
        }
    
}

function addRows(budget, add) {
    
    var rowSize = budget.rows.length - 1;
    var cellSize = budget.rows[0].cells.length - 1;
    var newRow;
    
    for (i=0; i<add; i++) {
        newRow = budget.insertRow(rowSize++);
        for (j=0; j<=cellSize; j++)
            newRow.insertCell(0);
    }
    
}

function removeRows(budget, remove) {
    
    var rowSize = budget.rows.length - 1;
    for (var i=0; i<-remove; i++)
        budget.deleteRow(--rowSize);
    budget.rows[rowSize].cells[0].innerHTML = "";
    
}



function addColumns(budget, add) {
    
    var rowSize = budget.rows.length - 1;
    var columnLetter = budget.rows[0].cells.length - 2;
    var i, j, newCell, cellSize;
    
    for (i=0; i<=rowSize; i++)
        for (j=0; j<add; j++) {
            cellSize = budget.rows[i].cells.length - 1;
            newCell = budget.rows[i].insertCell(cellSize++);
        }
    
}

function removeColumns(budget, remove) {
    
    var rowSize = budget.rows.length - 1;
    var cellSize;
    
    for (var i=0; i<-remove; i++)
        for (var j=0; j<=rowSize; j++) {
            cellSize = budget.rows[j].cells.length - 1;
            budget.rows[j].deleteCell(--cellSize);
        }
    
}

function addPresetBudget(type) {
    
    budget = addBudget(type);
    addRows(budget, 1);
    addColumns(budget, 4);
    applyBudgetStyle(budget);
    
    budget.rows[1].cells[1].innerHTML = "Matt";
    budget.rows[1].cells[2].innerHTML = "Antal varje person";
    budget.rows[1].cells[3].innerHTML = "Antal styckar";
    budget.rows[1].cells[4].innerHTML = "Pris varje stycke";
    budget.rows[1].cells[5].innerHTML = "Antal varje förpackning";
    budget.rows[1].cells[6].innerHTML = "Pris varje förpackning";
    budget.rows[1].cells[7].innerHTML = "Antal förpackningar";
    
    budget.rows[2].cells[1].innerHTML = "Ostskivor";
    budget.rows[2].cells[2].innerHTML = "4";
    budget.rows[2].cells[3].innerHTML = "320";
    budget.rows[2].cells[4].innerHTML = "0.72 kr";
    budget.rows[2].cells[5].innerHTML = "32";
    budget.rows[2].cells[6].innerHTML = "23 kr";
    budget.rows[2].cells[7].innerHTML = "10";
    budget.rows[2].cells[8].innerHTML = "230 kr";
    
    budget.rows[3].cells[1].innerHTML = "Korv";
    budget.rows[3].cells[2].innerHTML = "3";
    budget.rows[3].cells[3].innerHTML = "240";
    budget.rows[3].cells[4].innerHTML = "0.83 kr";
    budget.rows[3].cells[5].innerHTML = "24";
    budget.rows[3].cells[6].innerHTML = "20 kr";
    budget.rows[3].cells[7].innerHTML = "10";
    budget.rows[3].cells[8].innerHTML = "200 kr";
    
    budget.rows[4].cells[1].innerHTML = "Pizza";
    budget.rows[4].cells[2].innerHTML = "2";
    budget.rows[4].cells[3].innerHTML = "160";
    budget.rows[4].cells[4].innerHTML = "2 kr";
    budget.rows[4].cells[5].innerHTML = "8";
    budget.rows[4].cells[6].innerHTML = "16 kr";
    budget.rows[4].cells[7].innerHTML = "20";
    budget.rows[4].cells[8].innerHTML = "320 kr";
    
    budget.rows[5].cells[1].innerHTML = "Tårta";
    budget.rows[5].cells[2].innerHTML = "1";
    budget.rows[5].cells[3].innerHTML = "80";
    budget.rows[5].cells[4].innerHTML = "4 kr";
    budget.rows[5].cells[5].innerHTML = "4";
    budget.rows[5].cells[6].innerHTML = "18 kr";
    budget.rows[5].cells[7].innerHTML = "20";
    budget.rows[5].cells[8].innerHTML = "360 kr";
    
    calcAllTotalPrices(budget);
    
}