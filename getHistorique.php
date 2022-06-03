<?php
session_start();
include('bdd_connect.php');

if (isset($_SESSION['id'])) {
    $id = $_POST['id'];

        $selectEmmetteur = $dbh->prepare("SELECT id_emetteur, id_recepteur, message, date FROM historique_basculement WHERE id_ticket = $id");



    try {
        $selectEmmetteur->execute();
        $response = $selectEmmetteur->fetchAll();
        echo json_encode($response);
    } catch (Exception $e) {
        echo $e;
    }
}
