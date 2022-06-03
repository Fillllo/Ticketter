<?php
session_start();
include('bdd_connect.php');
$devDest = $_POST['devDest'];
$id_ticket = $_POST['id_ticket'];
$date = date("Y-m-d-h-m-s");
$data = [
    $_SESSION['id'],
    $devDest,
    $_POST['message'],
    $id_ticket,
    $date
    
];

if (isset($_POST['message'])) {
    $stmt = $dbh->prepare("INSERT INTO historique_basculement (id_emetteur, id_recepteur, message, id_ticket, date) VALUES (?, ?, ?, ?, ?);");
    $stmt2 = $dbh->prepare("UPDATE ticket SET dev_affecte = $devDest WHERE id_ticket = $id_ticket");

    try {
        $stmt->execute($data);
        $stmt2->execute();
        echo "salut";
        
    } catch (Exception $e) {
        echo $e;
    }
}

?>