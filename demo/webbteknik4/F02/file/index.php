<?php require_once 'src/php/main.php' ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

	<link rel="stylesheet" type="text/css" href="src/css/style.css">

	<title>1ME324: Webbteknik 4 - Files</title>

</head>
<body>

<div id="page-wrapper">
	
	<div id="page-content-wrapper">

		<div id="page-content-header-wrapper">

			<h1>Public files <?php echo renderNumFiles() ?></h1>
			<p>Public file sharing</p>

		</div>

		<ul class="file-list">

			<?php echo renderFileList(); ?>

		</ul>

		<?php echo renderArchiveLink(); ?>

	</div>

</div>

</body>
</html>