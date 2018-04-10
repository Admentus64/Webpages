// JavaScript Document

var focusTable, incomesTable, expensesTable, balanceTable;
var focusMsg, incomesErr, expensesErr, balanceErr;
var totalIn, totalOut;
var noPriceMsg, noNameMsg, enlargedBudgetText;
var currentCell;



function initOverview() {
    
    // Refer to elements
    focusTable = document.getElementById("focusTable");
    incomesTable = document.getElementById("incomesTable");
    expensesTable = document.getElementById("expensesTable");
    balanceTable = document.getElementById("balanceTable");
    
    focusMsg = document.getElementById("focusMsg");
    incomesErr = document.getElementById("incomesErr");
    expensesErr = document.getElementById("expensesErr");
    balanceErr = document.getElementById("balanceErr");
    
    noPriceMsg = document.getElementById("noPriceMsg");
    noNameMsg = document.getElementById("noNameMsg");
    enlargedBudgetText = document.getElementById("enlargedBudgetText");
    
    // Get local storage
    storeIn = JSON.parse(sessionStorage.getItem("Incomes"));
    storeOut = JSON.parse(sessionStorage.getItem("Expenses"));
    currentCell = null;
    
    // Set incomes, expenses and balance
    if (storeIn != null)
        totalIn = setBudget(incomesTable, storeIn.header, storeIn.total);
    else incomesErr.className = "showLongGreenBox";
    
    if (storeOut != null)
        totalOut = setBudget(expensesTable, storeOut.header, storeOut.total);
    else expensesErr.className = "showLongGreenBox";
    
    if (storeIn != null && storeOut != null)
        setBalance();
    else balanceErr.className = "showLongGreenBox";
    
    if (incomesErr.className == "showLongGreenBox" && expensesErr.className == "showLongGreenBox") {
        focusMsg.className = "hide";
        enlargedBudgetText.className = "hide";
    }
    
}

function clickHeaderInfo() {
    
    if (focusTable.id == this.id) {
        this.className = "headerCell";
        focusTable.innerHTML = "";
        focusMsg.className = "showLongGreenBox";
        focusTable.id = "-";
        return;
    }
    
    if (focusTable.innerHTML != "")
        focusTable.innerHTML = "";
    
    var i, j, newRow, newCell;
    var highlightBudget = document.createElement("table");
    for (i=0; i<4; i++) {
        newRow = highlightBudget.insertRow(0);
        for (j=0; j<4; j++) {
            newCell = newRow.insertCell(0);
            if (i == 3 || j == 3)
                newCell.className = "headerCell";
            else newCell.className = "textCell";
        }
    }
    
    if (currentCell != null)
        currentCell.className = "headerCell";
    currentCell = this;
    this.className = "headerCellSelected";
    highlightBudget.rows[0].cells[0].innerHTML = this.innerHTML;
    focusTable.id = this.id;
    focusTable.appendChild(highlightBudget);
    focusMsg.className = "hide";
    
}

function addCell(row, cellClass, html, cursor, id) {
    
    var cell = row.insertCell(0);
    cell.innerHTML = html;
    cell.className = cellClass;
    if (cell.className == "headerCell" && cell.innerHTML == "") {
        cell.innerHTML = "EJ NAMN";
        noNameMsg.className = "showLongRedBox";
    }
    if (cell.className == "textCell" && cell.innerHTML == "") {
        cell.innerHTML = "EJ PRIS";
        noPriceMsg.className = "showLongRedBox";
    }
    if (cell.className == "textCell" && cell.innerHTML == "NaN kr") {
        cell.innerHTML = "EJ BERÄKNAD";
        noPriceMsg.className = "showLongRedBox";
    }
    
    cell.style.cursor = cursor;
    if (cursor == "pointer")
        addListener(cell, "click", clickHeaderInfo);
    if (id != null && id != "" && id.length > 0 )
        cell.id = id;
    
}

function setBudget(budget, header, total) {
    
    var i, newRow, sum = 0;
    
    newRow = budget.insertRow(0);
    for (i=0; i<total.length; i++)
        sum += parseInt(total[i]);
    addCell(newRow, "textCell", sum + " kr", "default");
    addCell(newRow, "headerCell", "Totalt", "default");
    
    for (i=0; i<header.length; i++) {
        newRow = budget.insertRow(0);
        addCell(newRow, "textCell", total[i], "default");
        addCell(newRow, "headerCell", header[i], "pointer", budget.id + i);
    }
    
    return sum;
    
}

function setBalance() {
    
    for (var i=0; i<3; i++)
         balanceTable.insertRow(0);
    
    addCell(balanceTable.rows[0], "textCell", totalIn + " kr", "default");
    addCell(balanceTable.rows[0], "headerCell", "Inkomster", "default");
    addCell(balanceTable.rows[1], "textCell", totalOut + " kr", "default");
    addCell(balanceTable.rows[1], "headerCell", "Utgifter", "default");
    addCell(balanceTable.rows[2], "textCell", totalIn - totalOut + " kr", "default");
    addCell(balanceTable.rows[2], "headerCell", "Balans", "default");
    
}