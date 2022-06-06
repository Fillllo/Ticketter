<?php
session_start();
include('bdd_connect.php');

if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    if($_POST['type'] == "user") {
        $stmt = $dbh->prepare("SELECT id_ticket, titre, probleme, etat, type, resolution  FROM ticket WHERE id_user=$id");
    } else if($_POST['type'] == "dev") {
        $stmt = $dbh->prepare("SELECT id_ticket, titre, probleme, etat, type, dev_affecte FROM ticket WHERE dev_affecte = $id OR dev_affecte = ''");
    }

    try {
        $stmt->execute();
        $response = $stmt->fetchAll();
        echo json_encode($response);
    } catch (Exception $e) {
        echo $e;
    }
}
