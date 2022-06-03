<?php
session_start();
include('bdd_connect.php');

if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];

        $stmt = $dbh->prepare("SELECT login, id FROM compte WHERE id != $id AND type = 'dev'");



    try {
        $stmt->execute();
        $response = $stmt->fetchAll();
        echo json_encode($response);
    } catch (Exception $e) {
        echo $e;
    }
}
