<?php

/**
 *  @const string TARGET_FOLDER_PATH ...
 */
define("TARGET_FOLDER_PATH", 'src/public');

/**
 *  ...
 *
 *  @param array   $path      ...
 *  @param string  $exclude   ...
 *  @param booelan $overwrite ...
 *
 *  @return boolean
 */
function create_zip($files = array(), $destination = '', $overwrite = FALSE) {
    if (file_exists($destination) === TRUE && $overwrite === FALSE) {
        return false;
    }

    if (($files)) {
        $zip = new ZipArchive();
        if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }

        foreach ($files as $file) {
            $zip->addFile($file, basename($file));
        }
    
        $zip->close();
        return file_exists($destination);

    } else {
        return false;
    }
}

/**
 *  ...
 *
 *  @param string $source      ...
 *  @param string $destination ...
 *
 *  @return void
 */
function addzip($source, $destination) {
    $files_to_zip = glob($source . '/*');
    create_zip($files_to_zip, $destination);
}

// BOOTSTRAP
addzip('../public', '../zip/1me324_02_files.zip', true);
header('location: ../zip/1me324_02_files.zip');

?>