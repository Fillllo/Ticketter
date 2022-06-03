function pushTicket(type) {
	titre = document.getElementById("titre").value;
	probleme = document.getElementById("probleme").value;
	var typeTicketValue = "";
	if(type =="dev"){
		typeTicket = document.getElementById("select").selectedIndex;
		
		switch(typeTicket){
			case 1:
				typeTicketValue = "Problem";
				break;
			case 2:
				typeTicketValue = "Warn";
				break;
			case 3:
				typeTicketValue = "Error";
				break;
		}
		

	}
	console.log(typeTicketValue);
	console.log(probleme);
	console.log(titre);
	$.ajax({
		url: "pushTicket.php",
		method: "POST",
		data: "probleme=" + probleme + "&titre=" + titre + "&type=" + type + "&typeTicket=" + typeTicketValue,
		success: function (response) {
			console.log(response);
		},
	});
}
var count = 0;
function changeView(type) {
	var form = document.getElementById("center");
	var list = document.getElementById("list");
	var buttonChangeView = document.getElementById("buttonChangeView");
	if (count == 0) {
		form.style.display = "none";
		list.style.display = "flex";
		list.style.flexDirection = "column";
		buttonChangeView.innerHTML = "Ecrire un ticket";
		count = 1;
		loadTickets(type);
	} else if (count == 1) {
		form.style.display = "flex";
		list.style.display = "none";
		buttonChangeView.innerHTML = "Voir mes tickets";
		count = 0;
		list.innerHTML = "";
	}
}
// Charger les tickets
function loadTickets(type) {
	var list = document.getElementById("list");

	$.ajax({
		url: "loadTickets.php",
		method: "POST",
		data: "type=" + type,
		dataType: "json",
		success: function (response) {
			console.log(response);
			response.forEach(function (ticket) {
				//Load générique
				let div = document.createElement("div");
				div.classList.add("ticket");
				div.dataset.id = ticket["id_ticket"];
				div.style.width = "80%";
				div.style.height = "100px";
				div.style.overflowY = "scroll";
				let titre = document.createElement("span");
				titre.classList.add("titre");
				let probleme = document.createElement("span");
				probleme.classList.add("probleme");
				let etat = document.createElement("span");
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
				typeTick = document.createElement("span");
				typeTick.innerHTML = ticket["type"];

				div.appendChild(etat);
				div.appendChild(titre);
				div.appendChild(probleme);
				div.appendChild(typeTick);
				

				//Load ajouté lorsqu'un développeur se connecte
				if (type == "dev" && ticket["etat"] != 2) {
					let affecter = document.createElement('button');
					let textResolution = document.createElement("input");
					let resoudre = document.createElement('button');
					//BASCULEMENT + HISTORIQUE
					let basculer = document.createElement('button');
					let historique = document.createElement('button');
				
					
					if(ticket['dev_affecte'] == ""){
						//si le ticket n'a pas d'affectation alors on le propose au developpeur
						affecter.innerHTML = "S'affecter";
						affecter.addEventListener("click", function(){
							affectDev(ticket["id_ticket"]);
							affecter.style.display = "none";
							div.appendChild(textResolution);
							etat.style.backgroundColor = "#ca5200";
							resoudre.innerHTML = "Résoudre";
							
							resoudre.addEventListener("click", function(){
								let value = textResolution.value;
								console.log(value);
								resolveTicket(ticket["id_ticket"], value );
								etat.style.backgroundColor = "#22ca00";
								resoudre.style.display = "none";
								textResolution.style.display = "none";
								basculer.style.display = "none";
							});
							div.appendChild(resoudre);
							basculer.innerHTML = "Basculer";
							div.appendChild(basculer);
						});
						div.appendChild(affecter);
					} else {
						//sinon, cela veut dire qu'il y est déja affecté et qu'il peut le résoudre où le basculer
						div.appendChild(textResolution);
						div.appendChild(historique);
						historique.innerHTML = "Historique"
						let count = 0;
						
						historique.addEventListener("click", function(){
							let table = document.createElement('table');
							table.style.border = "2px solid black";
							if(count==0){
								count = 1;
							
							//Historique des basculements
								let id_ticket = historique.parentNode.getAttribute('data-id');
								$.ajax({
									url: "getHistorique.php",
									method: "POST",
									data: "id=" + id_ticket,
									dataType: "json",
									success: function (response) {
										console.log(response);
										
										table.id = id_ticket;
										let th1 = document.createElement('th');
										th1.innerHTML = "Emetteur"
										let th2 = document.createElement('th');
										th2.innerHTML = "Recepteur"
										let th3 = document.createElement('th');
										th3.innerHTML = "Message"
										let th4 = document.createElement('th');
										th4.innerHTML = "Date"
										table.appendChild(th1);
										table.appendChild(th2);
										table.appendChild(th3);
										table.appendChild(th4);
										response.forEach(function(histo){
											let tr = document.createElement('tr');
											
											let td1 = document.createElement('td');
											td1.innerHTML = histo["id_emetteur"];
											td1.style.border = "2px solid black";
											tr.appendChild(td1);
											let td2 = document.createElement('td');
											td2.innerHTML = histo['id_recepteur'];
											td2.style.border = "2px solid black";
											tr.appendChild(td2);
											let td3 = document.createElement('td');
											td3.innerHTML = histo['message']
											td3.style.border = "2px solid black";
											tr.appendChild(td3);
											let td4 = document.createElement('td');
											td4.innerHTML = histo['date']
											td4.style.border = "2px solid black";
											tr.appendChild(td4);


											table.appendChild(tr);
										});
										div.appendChild(table);
										
										
										
									},
								});
							} else {
								count = 0;
								table.innerHTML = "";
							}
						});
						//Resoudre le ticket
						resoudre.innerHTML = "Résoudre";
						resoudre.addEventListener("click", function(){
							let value = textResolution.value;
							console.log(value);
							resolveTicket(ticket["id_ticket"], value );
							etat.style.backgroundColor = "#22ca00";
							resoudre.style.display = "none";
							textResolution.style.display = "none";
							basculer.style.display="none";
						});
						div.appendChild(resoudre);
						div.appendChild(resoudre);
						basculer.innerHTML = "Basculer";
						div.appendChild(basculer);
					}
					//Si il bascule, il doit renseigner le développeur récepteur et un message.
					basculer.addEventListener("click", function(){
						resoudre.style.display = "none";
						textResolution.style.display = "none";
						//on charge tous les développeurs sauf lui même
						$.ajax({
							url: "loadDev.php",
							method: "POST",
							data: "",
							dataType: "json",
							success: function (test) {
								console.log(test);
								let divBasculer = document.createElement('div');
								let selectDev = document.createElement('select');
								let annuler = document.createElement('button');
								let inputMessage = document.createElement('input');
								let valider = document.createElement('button');
								//INPUT MESSAGE
								
								//BOUTON VALIDER
								valider.innerHTML = "Valider";
								//Lorsqu'il valide, on récupère la valeur sélectionnée et le message et on l'envoie dans une bdd
								valider.addEventListener("click", function(){
									let message = inputMessage.value;
									let selectedValue = selectDev.options[selectDev.selectedIndex].getAttribute('data-idDev');
									let id_ticket = selectDev.parentNode.parentNode.getAttribute('data-id');
									console.log(id_ticket);
									$.ajax({
										url: "pushBasculement.php",
										method: "POST",
										data: "message=" + message + "&devDest=" + selectedValue + "&id_ticket=" + id_ticket,
										
										success: function (response) {
											console.log(response);
											div.innerHTML = "";
											let span = document.createElement("span");
											span.innerHTML = "Le ticket à bien été basculé";
											div.appendChild(span);
											
										},
									});
								});

								//BOUTON ANNULER
								annuler.innerHTML = "Annuler";
									annuler.addEventListener("click", function(){
										resoudre.style.display = "flex";
										textResolution.style.display = "flex";
										divBasculer.style.display = "none";
										basculer.style.display = "flex";

								});
								
								divBasculer.appendChild(selectDev);
								divBasculer.appendChild(inputMessage);
								divBasculer.appendChild(valider);
								test.forEach(function (dev){
									let option = document.createElement("option");
									
									option.innerHTML = dev['login'];
									option.setAttribute('data-idDev', dev['id']);
									basculer.style.display = "none";
									selectDev.appendChild(option);
									
								});
								divBasculer.appendChild(annuler);
								div.appendChild(divBasculer);
							},
						});
					});
				
				}
			
				list.appendChild(div);
			});
		},
		error: function (error) {
			console.log(error);
		},
	});
}

function affectDev(ticket, button){
	console.log(button);
	
	
	$.ajax({
		url: "updateTicket.php",
		method: "POST",
		data: "id=" + ticket + "&action=affect",
		success: function (response) {
			console.log(response);
			
		},
	});
}

function resolveTicket(ticket, resolution){
	$.ajax({
		url: "updateTicket.php",
		method: "POST",
		data: "id=" + ticket + "&resolution=" + resolution + "&action=resolve",
		success: function (response) {
			console.log(response);
			
		},
	});
}