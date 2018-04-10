<?php
error_reporting(E_ALL);
header('Content-type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<department>'; // Root element

if (isset($_GET["file"])) {
	$fileUrl = $_GET["file"];
	$doc = new DomDocument('1.0','UTF-8');
	$doc->load($fileUrl); // Load the XML file
	$notFound = true;
	if (isset($_GET["id"])) { // Get the departmentinfo
		$id = $_GET["id"];
		$department = $doc->getElementsByTagName("department");
		foreach ($department as $d) {
			$depid = $d->getAttribute("id");
			if ($id == $depid) {
				$info = $d->getElementsByTagName("info");
				echo $doc->saveXML($info->item(0));
				$notFound = false;
				break;
			}
		}
	}
	if ($notFound) echo '<info>Ingen info om institutionen.</info>';
}
else echo '<info>Ingen fil angiven</info>';

echo '</department>'; // End of root element
?>