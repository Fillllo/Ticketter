<?php
session_start();
include('bdd_connect.php');
$id_ticket = $_POST['id'];

if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    if($_POST['action'] == "affect") {
        $stmt = $dbh->prepare("UPDATE `ticket` SET dev_affecte = $id, etat = 1 WHERE id_ticket = $id_ticket");
    } else if($_POST['action'] == "resolve") {
        $resolution = $_POST['resolution'];
        $stmt = $dbh->prepare("UPDATE `ticket` SET etat = 2, resolution = '$resolution' WHERE id_ticket = $id_ticket");
    }

    try {
        $stmt->execute();
    } catch (Exception $e) {
        echo $e;
    }
}


?>