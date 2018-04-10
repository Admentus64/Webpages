<?php include 'src/php/main.php'; ?>
<!DOCTYPE html>
<html>

    <head>

        <meta charset="UTF-8">

        <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="./../common/css/style.css">

        <title>1ME324: Webbteknik 4 - Sign in</title>

    </head>

    <body>

        <div id="page-wrapper">
            
            <div id="page-content-wrapper">

                <div id="page-content-promt-wrapper">

                    <div id="page-content-promt-content-wrapper">

                       <?php echo render_error_message('<h1>Sign in to discover the universe</h1>'); ?>
                        
                        <form action="index.php" method="POST">
                            
                            <label>Email</label>
                            <input placeholder="Enter your email address" type="text" name="email"><br>

                            <label>Password</label>
                            <input placeholder="Enter password" type="password" name="password"><br>

                            <input type="submit" value="Sign in">

                        </form>

                        <div id="page-content-promt-content-footer-wrapper">
                        
                            <a href="./../signup/">or sign up for a user account</a>

                        </div>

                    </div>

                    <div id="page-content-promt-side-wrapper" class="signin"></div>

                </div>

            </div>

        </div>

    </body>

</html>