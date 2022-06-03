<?php
session_start();
if (isset($_POST['username']) && isset($_POST['password'])) {
   // connexion à la base de données
   include('bdd_connect.php');

   // on applique les deux fonctions mysqli_real_escape_string et htmlspecialchars
   // pour éliminer toute attaque de type injection SQL et XSS
   $username = $_POST['username'];
   $password = $_POST['password'];

   if ($username !== "" && $password !== "") {

      $pwd_hash = hash("md5", $password);

      $stmt = $dbh->prepare("SELECT count(*) AS count, id, type FROM compte where 
         login = :username and password = :pwd_hash ");
      $stmt->bindParam(':username', $username, PDO::PARAM_STR);
      $stmt->bindParam(':pwd_hash', $pwd_hash, PDO::PARAM_STR);

      $stmt->execute();
      $response = $stmt->fetchAll();
      print_r($response);
      $count = $response[0]['count'];
      $_SESSION['id'] = $response[0]['id'];
      $type = $response[0]['type'];
      $_SESSION['type'] = $type;


      if ($count != 0) // nom d'utilisateur et mot de passe correctes
      {
         $_SESSION['username'] = $username;
         echo $username;
         if ($type == "dev") {
            header('Location: ticketter_main_dev.php');
         } else if ($type == "user") {
            header('Location: ticketter_main_user.php');
         }
      } else {
         echo "utilisateur ou mot de passe incorrect";
      }
   } else {
      header('Location: ticketter.php?erreur=2'); // utilisateur ou mot de passe vide
   }
} else {
   header('Location: ticketter.php');
}
 // fermer la connexion
