function pushTicket() {
	titre = document.getElementById("titre").value;
	probleme = document.getElementById("probleme").value;
	console.log(probleme);
	console.log(titre);
	$.ajax({
		url: "pushTicket.php",
		method: "POST",
		data: "probleme=" + probleme + "&titre=" + titre,
		success: function (response) {
			console.log(response);
		},
	});
}
var count = 0;
function changeView() {
	var form = document.getElementById("center");
	var list = document.getElementById("list");
	var buttonChangeView = document.getElementById("buttonChangeView");
	if (count == 0) {
		form.style.display = "none";
		list.style.display = "flex";
		list.style.flexDirection = "column";
		buttonChangeView.innerHTML = "Ecrire un ticket";
		count = 1;
		loadTickets();
	} else if (count == 1) {
		form.style.display = "flex";
		list.style.display = "none";
		buttonChangeView.innerHTML = "Voir mes tickets";
		count = 0;
		list.innerHTML = "";
	}
}

function loadTickets() {
	var list = document.getElementById("list");

	$.ajax({
		url: "loadTickets.php",
		method: "GET",
		data: "",
		dataType: "json",
		success: function (response) {
			console.log(response);
			response.forEach(function (ticket) {
				div = document.createElement("div");
				div.classList.add("ticket");
				titre = document.createElement("span");
				titre.classList.add("titre");
				probleme = document.createElement("span");
				probleme.classList.add("probleme");
				etat = document.createElement("span");
				etat.classList.add("etat");
				console.log(ticket["etat"]);
				switch (ticket["etat"]) {
					case "0":
						etat.style.backgroundColor = "#ca0000";
						break;
					case "1":
						etat.style.backgroundColor = "#ca5200";
						break;
					case "2":
						etat.style.backgroundColor = "#22ca00";
						break;
				}

				titre.innerHTML = ticket["titre"];
				probleme.innerHTML = ticket["probleme"];
				div.appendChild(etat);
				div.appendChild(titre);
				div.appendChild(probleme);

				list.appendChild(div);
			});
		},
		error: function (error) {
			console.log(error);
		},
	});
}
