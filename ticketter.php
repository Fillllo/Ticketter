<?php 
session_start();
$_SESSION['username'] = null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/connection.css">
    <title>Ticketter</title>
</head>
<body>
    
    <section id="main">
        <h1>Connexion à Ticketter</h1>
        <form id="connection" action="connection.php" method="POST">
            <input type="text" placeholder="Login" name="username" required>
            <input type="password" placeholder="Mot de passe" name="password" required>
            <input id="submit" type="submit" value="Se connecter">
        </form>
    </section>


</body>
</html>