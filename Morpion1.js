// Recuperation du Canvas
var c = document.getElementById("canvasMorpion");
var ctx = c.getContext("2d");

// Recuperation taille Canvas
var largeur = c.width;
var hauteur = c.height;

// Choix taille grille
var nbColonnes = 3 ;
var nbLignes = 3 ;

// Calcul taille cases
var hauteurLigne = hauteur/nbLignes ;
var largeurColonne = largeur/nbColonnes ;

//Aspect symbole croix
var ratioCroix = 0.7;
var epaisseurCroix = 1;
var couleurCroix = "red";

//Aspect symbole O
var ratioRond = 65.5;
var epaisseurRond = 1;
var couleurRond = "red";

// Choix de la victoire
var nbCoupsVictoire = 3 ;

//deroulement du jeu
var jeu = true;
var joueurActuel = true;
var coups = [];


//récupération du formulaire
var joueur1 = localStorage.getItem( "joueur1");
document.getElementById("joueur1").innerHTML = joueur1;

var joueur2 = localStorage.getItem( "joueur2");
document.getElementById("joueur2").innerHTML = joueur2;

var nomDePartie = localStorage.getItem( "nomDePartie");
document.getElementById("nomDePartie").innerHTML = nomDePartie;


//Remplissage de la grille
for(var i = 0; i < nbLignes ; i++){
	for (var j = 0; j < nbColonnes; j++) {
		coups.push([]);
		coups[i].push(false)
	}
}

// Couleur de fond du canvas + contour
ctx.fillStyle = "#565453" ;
ctx.strokeStyle = "black";
ctx.fillRect(0,0,largeur,hauteur);
ctx.strokeRect(0,0,largeur,hauteur);

//grille
ctx.beginPath()
ctx.lineWidth = 1;
ctx.strokeStyle = "black";

// Creation de la grille
for(var i = 0 ; i < nbLignes-1 ; i++) 
{
	// Creation ligne
	ctx.moveTo(0,(i+1)*(hauteurLigne));
	ctx.lineTo(largeur,(i+1)*(hauteurLigne));
	ctx.stroke();
}

for(var j = 0 ; j < nbColonnes-1 ; j++)
{
	// Creation case (colonne)
	ctx.moveTo((j+1)*(largeurColonne),0);
	ctx.lineTo((j+1)*(largeurColonne),hauteur);
	ctx.stroke();
}

ctx.closePath();

// Evenement clic
c.addEventListener("click", play, false);

// Creation de croix
function createCroix(x,y)
{
	// x,y est le centre de la croix
	ctx.beginPath();
	ctx.lineWidth = epaisseurCroix;
	ctx.strokeStyle  = couleurCroix;
	ctx.moveTo(x - (largeurColonne/2)*ratioCroix, y - (hauteurLigne/2)*ratioCroix );
	ctx.lineTo(x + (largeurColonne/2)*ratioCroix, y + (hauteurLigne/2)*ratioCroix );

	ctx.moveTo(x + (largeurColonne/2)*ratioCroix, y - (hauteurLigne/2)*ratioCroix );
	ctx.lineTo(x - (largeurColonne/2)*ratioCroix, y + (hauteurLigne/2)*ratioCroix );

	ctx.stroke();
	ctx.closePath();
}

// Creation de rond
function createRond(x,y)
{
    // x,y est le centre du rond
    ctx.beginPath();
    ctx.lineWidth = epaisseurRond ;
    ctx.strokeStyle = couleurRond ;
    ctx.arc(x,y,ratioRond,0,2*Math.PI);
    ctx.stroke();
}

// verification fin
function end()
{
	for(var  i = 0 ; i < nbLignes ; i++)
	{
		for(var j = 0 ; j < nbColonnes ; j++)
		{
			if(coups[i][j] == false)
			{
				return false ;
			}
		}
	}
	return true ;
}

function gain(x, y) // on va chercher a verifier si il y a N symboles identiques alignés
{
	let symbole = coups[y][x];

	// On vérifie la colonne
	let win = true;
	for (let i = 0; i < nbColonnes; i++) {
		if (coups[i][x] != symbole) {
			win = false;
		}
	}

	if (win) {
		return "colonne";
	}

	// On vérifie la ligne
	win = true;
	for (let i = 0; i < nbLignes; i++) {
		if (coups[y][i] != symbole) {
			win = false;
		}
	}

	if (win) {
		return "ligne";
	}
	
	// on vérifie que c'est vrai
	if (symbole === coups[0][0] && symbole === coups[1][1] && symbole === coups[2][2]) {
		return "diagonale1";
	}

	if (symbole === coups[0][2] && symbole === coups[1][1] && symbole === coups[2][0]) {
		return "diagonale2";
	}

	return false;
}


function play(event){
	x = event.clientX - c.offsetLeft + document.documentElement.scrollLeft ;
	y= event.clientY - c.offsetTop + document.documentElement.scrollTop;
	var caseX = parseInt(x/(largeur/nbColonnes));
	var caseY = parseInt(y/(hauteur/nbLignes));

	var milieuX = caseX*largeurColonne + largeurColonne/2 ;
	var milieuY = caseY*hauteurLigne + hauteurLigne/2 ;

	if(jeu) // Si jeu en route
	{
		if(!coups[caseY][caseX]) // Si pas déjà quelque chose sur la meme case
		{       
			console.log("avant le coup, joueur = " + joueurActuel); 
	        if(joueurActuel)
			{
				createCroix(milieuX,milieuY);
				coups[caseY][caseX] = "croix" ; 
				document.getElementById("joueur").innerHTML = "Au joueur de placer un rond";
			}
			else
			{
				createRond(milieuX,milieuY);
				coups[caseY][caseX] = "rond" ; 
				document.getElementById("joueur").innerHTML = "Au joueur de placer une croix";
			}

			joueurActuel = !joueurActuel ;
			console.log("apres le coup, joueur = " + joueurActuel); 
		}
	}

	let win = gain(caseX, caseY)
	if (win) {
		console.log(win);

		if (joueurActuel) {
			if (win === "colonne"){
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur rond en colonne !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",0);
				localStorage.setItem("nomDuGagnant",joueur2);
				window.location = "/Morpion/Morpion2.html"
			}
		} else {
			if (win === "colonne") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur croix en colonne !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",1);
				localStorage.setItem("nomDuGagnant",joueur1);
				window.location = "/Morpion/Morpion2.html"
			}
		}

		if (joueurActuel){
			if (win === "ligne") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur rond en ligne !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",0);
				localStorage.setItem("nomDuGagnant",joueur2);
				window.location = "/Morpion/Morpion2.html"
			}
		} else {
			if (win === "ligne") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur croix en ligne !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",1);
				localStorage.setItem("nomDuGagnant",joueur1);
				window.location = "/Morpion/Morpion2.html"
			}
		}

		if (joueurActuel) {
			if (win === "diagonale1") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur rond en diagonale1 !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",0);
				localStorage.setItem("nomDuGagnant",joueur2);
				window.location = "/Morpion/Morpion2.html"
			}
		} else {
			if (win === "diagonale1") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur croix en diagonale1 !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",1);
				localStorage.setItem("nomDuGagnant",joueur1);
				window.location = "/Morpion/Morpion2.html"
			}
		}

		if (joueurActuel) {
			if (win === "diagonale2") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur rond en diagonale2 !" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",0);
				localStorage.setItem("nomDuGagnant",joueur2);
				window.location = "/Morpion/Morpion2.html"
			}
		} else {
			if (win === "diagonale2") {
				document.getElementById("joueur").innerHTML = "Victoire pour le joueur croix en diagonale2" ;
				jeu = false ;
				document.getElementById("rejouer").style.display = "initial";
				localStorage.setItem("statutPartie",1);
				localStorage.setItem("nomDuGagnant",joueur1);
				window.location = "/Morpion/Morpion2.html"
			}
		}
	} else {
		if (end()){
		
			jeu = false ;
			document.getElementById("joueur").innerHTML = "Terminé. Personne n'a gagné.";
			document.getElementById("rejouer").style.display = "visible";
			localStorage.setItem("statutPartie",2);
			window.location = "/Morpion/Morpion2.html"
		}
	}
}




