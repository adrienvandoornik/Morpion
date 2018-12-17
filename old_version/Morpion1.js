// Recuperation du canvas

var c = document.getElementById("canvasMorpion");

var ctx = c.getContext("2d");


// Recuperation tailles

var largeur = c.width;

var hauteur = c.height;


// Choix taille grille

var nbColonnes = 3 ;

var nbLignes = 3 ;


// Calcul taille cases

var hauteurLigne = hauteur/nbLignes ;

var largeurColonne = largeur/nbColonnes ;


// Choix aspect croix

var ratioCroix = 0.7 ;

var epaisseurCroix = 1 ;

var couleurCroix = "blue";


// Choix aspect rond

var ratioRond = 0.7 ;

var epaisseurRond = 1 ;

var couleurRond = "red";

var rayonRond = largeurColonne ;

if(largeurColonne > hauteurLigne)

{

    rayonRond = hauteurLigne ;

}

rayonRond /= 2;

rayonRond *= ratioRond ;



// Choix de la victoire

var nbCoupsVictoire = 3 ;


// Couleur de fond du canvas + contour

ctx.fillStyle = "white" ;

ctx.strokeStyle = "black";

ctx.fillRect(0,0,largeur,hauteur);

ctx.strokeRect(0,0,largeur,hauteur);


// Initialisation du jeu

var jeu = true ;

var joueurActuel = true;

var coups = [];


// Creation de la grille lignes*colonnes

ctx.beginPath()

ctx.lineWidth = 1;

ctx.strokeStyle = "black";



// Creation de la grille physique

for(var i = 0 ; i < nbLignes-1 ; i++)

{

    // Creation ligne

    ctx.moveTo(0,(i+1)*(hauteurLigne));

    ctx.lineTo(largeur,(i+1)*(hauteurLigne));

    ctx.stroke();

}

for(var j = 0 ; j < nbColonnes-1 ; j++) // Creation colonne

{

    // Creation case (colonne)

    ctx.moveTo((j+1)*(largeurColonne),0);

    ctx.lineTo((j+1)*(largeurColonne),hauteur);

    ctx.stroke();

}


ctx.closePath();



// Evenement clic

c.addEventListener("click", play, false);


// Creation du tableau pour la grille

for(var i = 0 ; i < nbLignes ; i++)

{

    for(var j = 0 ; j < nbColonnes ; j++)

    {

        coups.push([]);

        coups[i].push(false);

    }

}


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

    ctx.arc(x,y,rayonRond,0,2*Math.PI);

    ctx.stroke();

}


// Verification fin

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


// Verification gagnant

function gain(symbole,y,x) // on va chercher a verifier si il y a N symboles identiques alignés

{

    var test = 0 ;


    // Verification sur la meme ligne = sur le meme Y

    for(var i=0 ; i < nbColonnes ; i++)

    {

        if(coups[y][i]==symbole)

        {

            test++;

            if(test>=nbCoupsVictoire)

            {

                return true ;

            }

        }

        else

        {

            test = 0 ;

        }

    }


    test = 0 ;

    // Verification sur la meme colonne = sur le meme X

    for(var i=0 ; i < nbLignes ; i++)

    {

        if(coups[i][x]==symbole)

        {

            test++;

            if(test>=nbCoupsVictoire)

            {

                return true ;

            }

        }

        else

        {

            test = 0 ;

        }

    }


    var x2 = x*1 ;

    var y2 = y*1 ;

    // Verification diagonale descendante

    while(x2>0 && y2>0)

    {

        x2--;

        y2--;

    }


    test = 0;

    while(x2<nbColonnes && y2<nbLignes)

    {

        if(coups[y2][x2] == symbole)

        {

            test ++ ;

            if(test>=nbCoupsVictoire)

            {

                return true ;

            }

        }

        else

        {

            test = 0 ;

        }

        x2 ++;

        y2 ++;

    }


    x2 = x*1 ;

    y2 = y*1 ;

    // Verification diagonale asscendante

    while(x2<nbColonnes-1 && y2>0)

    {

        x2++;

        y2--;

    }


    test = 0;

    while(x2>=0 && y2<nbLignes)

    {

        if(coups[y2][x2] == symbole)

        {

            test ++ ;

            if(test>=nbCoupsVictoire)

            {

                return true ;

            }

        }

        else

        {

            test = 0 ;

        }

        x2 --;

        y2 ++;

    }


    return false;

}


// Lorsqu on clique

function play(event)

{

    x = event.clientX - c.offsetLeft ;

    y = event.clientY - c.offsetTop + document.documentElement.scrollTop;


    var caseX = parseInt(x/(largeur/nbColonnes));

    var caseY = parseInt(y/(hauteur/nbLignes));


    var milieuX = caseX*largeurColonne + largeurColonne/2 ;

    var milieuY = caseY*hauteurLigne + hauteurLigne/2 ;


    if(jeu) // Si jeu en route

    {

        if(!coups[caseY][caseX]) // Si pas déjà quelque chose sur la meme case

        {

            if(joueurActuel)

            {

                createCroix(milieuX,milieuY);

                coups[caseY][caseX] = "croix" ;

                var temp = "croix";

                document.getElementById("joueur").innerHTML = "Au joueur de placer un rond";

            }

            else

            {

                createRond(milieuX,milieuY);

                coups[caseY][caseX] = "rond" ;

                var temp = "rond";

                document.getElementById("joueur").innerHTML = "Au joueur de placer une croix";

            }


            joueurActuel = !joueurActuel ;


            if(gain(temp,caseY,caseX))

            {

                if(joueurActuel)

                {

                    document.getElementById("joueur").innerHTML = "Victoire pour le joueur rond !" ;

                    jeu = false ;

                    document.getElementById("rejouer").style.display = "initial";

                }

                else

                {

                    document.getElementById("joueur").innerHTML = "Victoire pour le joueur croix !" ;

                    jeu = false ;

                    document.getElementById("rejouer").style.display = "initial";

                }

            }

            else

            {

                if(end())

                {

                    jeu = false ;

                    document.getElementById("joueur").innerHTML = "Terminé. Personne n'a gagné.";

                    document.getElementById("rejouer").style.display = "visible";

                }

            }

        }

    }


}
