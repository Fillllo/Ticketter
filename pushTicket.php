<?php
session_start();
require('bdd_connect.php');
if($_POST['type'] == "user") {
    $data = [
        $_SESSION['id'],
        $_POST['titre'],
        $_POST['probleme'],
        "Problem"
    ];
} else if($_POST['type'] == "dev") {
    $data = [
        $_SESSION['id'],
        $_POST['titre'],
        $_POST['probleme'],
        $_POST['typeTicket']
    ];
}

if (isset($_POST['probleme'])) {
    $stmt = $dbh->prepare("INSERT INTO ticket (id_user, titre, probleme, type) VALUES (?, ?, ?, ?);");


    try {
        $stmt->execute($data);
        echo "salut";
    } catch (Exception $e) {
        echo $e;
    }
}
