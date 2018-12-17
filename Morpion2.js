//récupération du formulaire
var statutPartie = localStorage.getItem( "statutPartie");
var nomDuGagnant = localStorage.getItem( "nomDuGagnant");	

console.log(statutPartie);
console.log(nomDuGagnant);

if (statutPartie == "0") {
	document.getElementById("statutPartie").innerHTML = "Félicitation, " + nomDuGagnant + " a gagné !";
	document.getElementById("coupe").src = "image/coupe.png";
} else if (statutPartie == "1") {
	document.getElementById("statutPartie").innerHTML = "Félicitation, " + nomDuGagnant + " a gagnée !";
	document.getElementById("coupe").src = "image/coupe.png";
} else if (statutPartie ==  "2") {
	document.getElementById("statutPartie").innerHTML = "Personne n'a gagné";
	document.getElementById("perdant").src = "image/perdant.png";
}


function recommencer(){
	
	window.location = "Morpion.html";
}

