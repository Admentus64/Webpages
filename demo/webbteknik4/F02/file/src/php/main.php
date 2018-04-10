<?php

/**
 *	@const string TARGET_FOLDER_PATH ...
 */
define("TARGET_FOLDER_PATH", 'src/public');

/**
 *	@var array $exclude ...
 */
$exclude = array('.', '..', '.DS_Store');

/**
 *  ...
 *
 *  @return string
 */
function renderFileList() {
	global $exclude;
	$files = getFolderContent(TARGET_FOLDER_PATH, $exclude);
	return getListMarkup($files);
}

/**
 *  ...
 *
 *  @return string
 */
function renderNumFiles() {
	global $exclude;
	$files = getFolderContent(TARGET_FOLDER_PATH, $exclude);
	$numFiles = count($files);
	return "($numFiles st)";
}

/**
 *  ...
 *
 *  @return string
 */
function renderArchiveLink() {
	global $exclude; 
	$files = getFolderContent(TARGET_FOLDER_PATH, $exclude);
	if (count($files) > 0) {
		return '
			<div id="page-content-footer-wrapper">
				<a href="src/php/archive.php" download>Or download all files as a Zip-file</a>
			</div>
		';
	} else {
		return '
			<div id="page-content-footer-wrapper">
				<p>No files available for download</p>
			</div>
		';
	}
}

/**
 *  ...
 *
 *	@param string $path    ...
 *	@param array  $exclude ...
 *
 *  @return array
 */
function getFolderContent($path, $exclude) {
	$content = scandir($path);
	$content = excludeFrom($content, $exclude);

	return $content;
}

/**
 *  ...
 *
 *	@param array $list    ...
 *	@param array $exclude ...
 *
 *  @return array
 */
function excludeFrom($list, $exclude) {
	foreach ($exclude as $unwanted) {
		$index = array_search($unwanted, $list);
		if ($index !== FALSE) {
			array_splice($list, $index, 1);
		}
	}

	return $list;
}

/**
 *  ...
 *
 *	@param array $files ...
 *
 *  @return string
 */
function getListMarkup($files) {
	$output = '';
	sort($files);
	foreach ($files as $name) {
		$path = TARGET_FOLDER_PATH.'/'.$name;
		$icon = getFileIcon($path);
		$size = getFileSize($path);
		$output .= "
			<li class='file-list-item $icon'>
				<div class='file-list-item-left'>
					<p class='file-list-item-left-title'>$name</p>
					<p class='file-list-item-left-size'>$size</p>
				</div>
				<div class='file-list-item-right'>
				<a class='file-list-item-right-download' href='$path'>Download</a>
				</div>
				<div class='clear'></div>
			</li>
		";
	}

	return $output;
}

/**
 *  ...
 *
 *	@param string $path ...
 *
 *  @return void
 */
function getFileIcon($path) {
	$ext = getFileExt($path);
	switch ($ext) {
		case 'zip':
			return 'zip';
			break;

		case 'png':
			return 'png';
			break;

		case 'jpg':
			return 'jpg';
			break;
		
		default:
			return 'unknown';
			break;
	}
}

/**
 *  ...
 *
 *	@param string $path ...
 *
 *  @return string
 */
function getFileExt($path) {
	return pathinfo($path, PATHINFO_EXTENSION);
}

/**
 *  ...
 *
 *	@param string $path ...
 *
 *  @return string
 */
function getFileSize($path) {
	$size = filesize($path);
	return getSizeUnit($size);
}

/**
 *  ...
 *
 *	@param int $bytes ...
 *
 *  @return string
 */
function getSizeUnit($bytes) {
	$bytes = floatval($bytes);
    $units = array(
        0 => array(
            'UNIT' => 'TB',
            'VALUE' => pow(1024, 4)
        ),
        1 => array(
            'UNIT' => 'GB',
            'VALUE' => pow(1024, 3)
        ),
        2 => array(
            'UNIT' => 'MB',
            'VALUE' => pow(1024, 2)
        ),
        3 => array(
            'UNIT' => 'KB',
            'VALUE' => 1024
        ),
        4 => array(
            'UNIT' => 'B',
            'VALUE' => 1
        ),
    );

    $result = '0 B';
    foreach ($units as $unit) {
        if ($bytes >= $unit["VALUE"]) {
            $result = $bytes / $unit["VALUE"];
            $result = str_replace(".", "," , strval(round($result, 2)))." ".$unit["UNIT"];
            break;
        }
    }

    return $result;
}

?>