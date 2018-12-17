


function commencer(){
	var el = document.getElementById("player1");
	localStorage.setItem("joueur1",el.value);

	var el2 = document.getElementById("player2");
	localStorage.setItem("joueur2",el2.value);

	var el3 = document.getElementById("nomDePartie");
	localStorage.setItem("nomDePartie",el3.value);

	window.location = "/Morpion/Morpion1.html";
}
