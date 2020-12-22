Install a local Apache and MySQL server. On Windows the software "XAMPP" can be used.

Used languages:
- HTML5
- CSS
- JavaScript
- PHP
- MySQL
- Mocha
- Chai

Used software:
- XAMPP (for PHP and MySQL server)
- Komodo Edit for webpages (code editing tool)

Connect to any port you like (requires port changes in XAMPP). By default this is port 80.
Run the webpage on: "http://localhost/web/boxinator/boxinator.html" (default port 80).

The page can be switched in either "Add Box" (#addbox) or "List Boxes" (#listboxes) mode. Supported URL hashes are:
- http://localhost/web/boxinator/boxinator.html#addbox
- http://localhost/web/boxinator/boxinator.html#listboxes

The script will automaticially sent a MySQL request through PHP to create a new database if it does not exist yet.
The same also applies for creating a new table if it does not exist yet.
A MySQL request is sent through adding a new box, listing all boxes or resetting all boxes.

The database can be added manually. Open XAMPP and click on the Admin button for MySQL.
From there in your web browser of choice add a new database. In this example the database is called "boxinator".
Once the database is created add a new table. In this example the database is called "boxes".

If you like to use different credentials open the PHP file "database.php" and edit the first four lines of written code.
In this example the following credentials were used:
- Server:	localhost	(database server)
- Name:		boxinator	(database name)
- User:		root		(user trying to access the database)
- Password:			(password user trying to access the database)
- Table:	Boxes		(name for the database table)
In this example there is no password, thus the password is blank.
The "server", "user" and "password" credentials are the default values that are installed with XAMPP.

The webpage comes with four debug views:
- Add Box (view mode for adding a new box)
- List Boxes (view mode for listing all boxes present in the database)
- Reset (empties and resets the database)
- Unit Tests (toggles the display for the unit tests in Mocha)

How to add a new box into the database:
1) Fill in name. There is a max text limit.
2) Fill in weight. There is a max text limit. Only positive digits. Up to 2 decimals.
3) Select colour. No blue allowed.
4) Select country from predefined dropdown menu.

All Unit Compentent tests are based on the Logic.js script.
Logic.js focuses on checking values so that Main.js can parse them and forward those into the database.