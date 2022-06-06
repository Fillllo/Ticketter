<?php session_start();
if ($_SESSION['username'] != null) { ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=*, initial-scale=1.0">
        <link rel="stylesheet" href="css/ticketter.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="ticketter.js"></script>
        <title>Ticketter</title>
    </head>

    <body>
        <section id="header">
            <span id="outil">Ticketer</span>
            <button onclick="changeView('user');" id="buttonChangeView">Voir mes tickets</button>
            <div>
                <span>Bienvenue, <?php echo $_SESSION['username']; ?></span>
                <button id="deconnexion" onclick="window.location.href ='ticketter.php'">Se déconnecter</button>

            </div>
        </section>
        <section>
            <div id="center">
                <span>Description de votre problème</span>
                <input type="text" id="titre" placeholder="Titre">
                <textarea rows="5" cols="10" placeholder="Décrivez votre problème" id="probleme" maxlength="255"></textarea>
                <button onclick="pushTicket('user');">Envoyer le ticket</button>
            </div>
            <div id="list" style="display: none;">
                <span id="titleList">Liste des tickets</span>
            </div>
        </section>
    </body>

    </html>
<?php } else {
    header('Location: ticketter.php');
} ?>