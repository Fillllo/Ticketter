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
            <span id="outil">Outil de ticket</span>
            <div>

                <span><?php echo $_SESSION['username']; ?></span>
                <button onclick="window.location.href ='ticketter.php'">Se déconnecter</button>

            </div>
        </section>
        <section>
            <button onclick="changeView('dev');" id="buttonChangeView">Voir mes tickets</button>
            <div id="center">
                <span>Description de votre problème</span>
                <select id="select">
                    <option value="type">Type</option>
                    <option value="Problem">Problem</option>
                    <option value="Warn">Warn</option>
                    <option value="Error">Error</option>
                </select>
                <input type="text" id="titre" placeholder="Titre">
                <textarea rows="5" cols="10" placeholder="Décrivez votre problème" id="probleme" maxlength="255"></textarea>
                <button onclick="pushTicket('dev');">Envoyer</button>
            </div>
            <div id="list" style="display: none;">
                <span>Liste des tickets</span>
            </div>
        </section>
    </body>

    </html>
<?php } else {
    header('Location: ticketter.php');
} ?>