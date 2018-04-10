<?php

/**
 *  Returns the text content of the header (h1) to be printed on the website
 *
 *  @return string
 */
function getPageHeader() {
    $day    = date('j');
    $month  = getCurrentMonth(date('n'));
    $month  = strtolower($month);
    $year   = date('Y');
    $day    = date('N');

    return "$day $month $year";
}

/**
 *  Returns the text content of the paragraph (p) to be printed on the website
 *
 *  @return string
 */
function getPageParagraph() {
    $day  = getCurrentDay();
    $time = date('G:i');
    
    return "$day, kl $time";
}

/**
 *  Returns a text representation of the current month. The string is printed 
 *  in Swedish.
 *
 *  @return String
 */
function getCurrentMonth($month) {
    switch (date('n')) {
        case 1:
            return 'Januari';
            break;

        case 2:
            return 'Februari';
            break;

        case 3:
            return 'Mars';
            break;

        case 4:
            return 'April';
            break;

        case 5:
            return 'Maj';
            break;

        case 6:
            return 'Juni';
            break;

        case 7:
            return 'Juli';
            break;

        case 8:
            return 'Augusti';
            break;

        case 9:
            return 'September';
            break;

        case 10:
            return 'Oktober';
            break;

        case 11:
            return 'November';
            break;
        
        default:
            return 'December';
            break;
    }
}

/**
 *  Returns a text representation of the current day. The string is printed 
 *  in Swedish.
 *
 *  @return String
 */
function getCurrentDay() {
    switch (date('N')) {
        case 1:
            return 'Måndag';
            break;

        case 2:
            return 'Tisdag';
            break;

        case 3:
            return 'Onsdag';
            break;

        case 4:
            return 'Torsdag';
            break;

        case 5:
            return 'Fredag';
            break;

        case 6:
            return 'Lördag';
            break;
        
        default:
            return 'Söndag';
            break;
    }
}

?>