// JavaScript Document

function init() {
    
    if (document.location.href.indexOf("incomes") > 1)
        initIncomes();
    else if (document.location.href.indexOf("expenses") > 1)
        initExpenses();
    else if (document.location.href.indexOf("overview") > 1)
        initOverview();
        
    //window.location.hash="1";
    //window.location.hash="2";
    
}
addListener(window, "load", init);

//addListener(window, "hashchange", preventBack);
//function preventBack() { window.location.hash="1"; }