<?php

	require_once 'src/php/user/Users.php';
	$users = new Users();
?>
<!DOCTYPE html>
<html>

    <head>

        <meta charset="UTF-8">

        <title>1ME324: Webbteknik 4 - MySQLi</title>

    </head>

    <body>
    	
    	<h1>Users</h1>
    	<p>Complete list of all the system's users.</p>
    	<?php echo $users->getUsersList(); ?>
    	<hr />

    	<h1>Create new user</h1>
    	<p>Creates a new user in the database.</p>
    	<form action="src/php/script/createUser.php" method="post">
    		
    		<p>Username:</p>
    		<input type="text" placeholder="username" name="username">
    		<p>Password:</p>
    		<input type="password" placeholder="password" name="password">
    		<p>Email</p>
    		<input type="text" placeholder="email" name="email"><br /><br />
    		<input type="submit" name="submit">

    	</form>
    	<hr />

    	<h1>Restore</h1>
    	<p>Did you mess up this example? Click the restore link to repair this example.</p>
    	<a href="src/php/script/restoreUser.php">Restore database</a>
    	<hr />

    </body>

</html>