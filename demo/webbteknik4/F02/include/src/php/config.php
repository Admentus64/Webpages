<?php

/**
 *	@const string PAGE_MAIN_TITLE ...
 */
define('PAGE_MAIN_TITLE', 'Nuno Otero');

/*
 *	@var string $page_title ...
 */
$page_title = 'Work';

/*
 *	@var string $page_meta ...
 */
$page_meta = 'Nuno holds a PhD from Sussex University in the UK and he is a Senior Lecturer at CeLeKT and a Research Fellow at the Department of Information Systems at University of Minho in Portugal.';


function get_page_title() {
	global $page_title;
	return PAGE_MAIN_TITLE.' - '.$page_title;
}

?>