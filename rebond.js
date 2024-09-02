let canv, ctx;
let play_b = false;
let timer;

// let posArc = {
//     // Math.random() will have the numbers starting from 0, 0.1, 0.2, 0.3, 0.4 ..... 1 
//     //Math.round will give a round figure.

//     x: Math.round(Math.random() * 400),
//     y: Math.round(Math.random() * 400),

//     // génère un nombre aléatoire compris entre 1 et 6
//     // here the +1 is added to have the value from 1 
//     pasX: Math.round(Math.random() * 5) + 1,
//     pasY: Math.round(Math.random() * 5) + 1,
//     maxX: 400,
//     maxY: 400
// };
let posArcs = [];
let maxPoints = 360; // this is the maximum  no of points that we have generated in our eg
let nbPointVisu = 1; // this is the number of points that we are visualizing. 
let distanceAccroche = 30;
let speedAnim = 10;
let msDownRange_b = false;

//------------------------------- E vent OnLoad
window.onload = init;

window.onkeydown = function(e) {
    // console.log(e);
    switch (e.code) {
        case "Space":
            if (play_b) {
                stopBtn();
            } else {
                playBtn();
            }

            // console.log('inside switch keydown');
            break;

        default:
            break;
    }
}

let c;
let c2;
let c3;
//------------------------------------------ INIT
function init() {

    function chgNbBille(newVal) {
        nbPointVisu = newVal;
    }

    function distanceBille(value) {
        distanceAccroche = value;
    }

    function vitesseBille(value) {

        let valVitesse = 200 - value + 1

        speedAnim = valVitesse;
        if (play_b) {
            stopBtn();
            playBtn();

        }

    }

    c = new Curseur('cursBille', 'Bille', 20, 1, 50, ".box1", "rgb(255 0 0 / 60%)");
    c.addEvents(chgNbBille);
    chgNbBille(20);

    c2 = new Curseur('cursDistance', 'Distance', 50, 1, 200, ".box2", "rgb(0 255 0 / 45%)");
    c2.addEvents(distanceBille);


    c3 = new Curseur('cursVitesse', 'Vitesse', 30, 1, 200, ".box3", "#88f");
    c3.addEvents(vitesseBille);
    //console.log(c3.getValue());

    /*
    nbPointVisu = document.querySelector('input[name="rangeBille"]').value;
    speedAnim = document.querySelector('input[name="rangeVitesse"]').value;
    //console.log(nbPointVisu);

    //---------------------------- EVENt RANGE VITESSE
    document.querySelector('input[name="rangeVitesse"]').addEventListener('mousedown', function() {
        msDownRange_b = true;
    });
    document.querySelector('input[name="rangeVitesse"]').addEventListener('mouseup', function() {
        msDownRange_b = false;
    });
    document.querySelector('input[name="rangeVitesse"]').addEventListener('change', function() {
        vitesseBille(this);
    });
    document.querySelector('input[name="rangeVitesse"]').addEventListener('mousemove', function() {
        if (msDownRange_b) {
            vitesseBille(this);
        }
    });
*/

    // why query selector is not done ?????????????? C'est IDENTIQUE !! 
    canv = document.getElementById('canvas');

    // 2d : pas d'autres options en 2022
    ctx = canv.getContext('2d');

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#F00"; //red color its same as FF0000 
    ctx.fillStyle = "#FFF"; // White color 

    // générer les points
    for (let i = 0; i < maxPoints; i++) {
        // to create an object JSON
        posArcs[i] = {};
        posArcs[i].tailleCercle = 2;

        // génère un nombre aléatoire compris entre 1 et 6
        posArcs[i].pasX = Math.round(Math.random() * 5) + 1;
        posArcs[i].pasY = Math.round(Math.random() * 5) + 1;

        // 1 / 2 => 0 , il reste 1
        // 2 / 2 => 1 , il reste 0
        // 3 / 2 => 1 , il reste 1
        // if (i % 2) {
        // here for some values the pasX is turned negative and for some its not 
        if (Math.round(Math.random())) {
            posArcs[i].pasX = -posArcs[i].pasX;
        }
        if (Math.round(Math.random())) {
            posArcs[i].pasY = -posArcs[i].pasY;
        }

        posArcs[i].x = Math.round(Math.random() * 380) + 10;
        posArcs[i].y = Math.round(Math.random() * 380) + 10;
        posArcs[i].maxX = 400;
        posArcs[i].maxY = 400;
    }

    updateColor();

    // console.log("posArcs : " + posArcs);
    // console.log(posArcs);
    console.log("posArcs ::: %o ", posArcs);
    // console.log("posArcs ::::::", posArcs);

    // //--------------
    // ctx.beginPath();

    // ctx.moveTo(50, 50);
    // ctx.lineTo(150, 150);

    // ctx.moveTo(100, 200);
    // ctx.lineTo(155, 155);

    // ctx.stroke();

    //  carre (X, Y, cote)
    // carre(50, 50, 10);
    // carre(250, 80, 50);
}

// this function is to draw a square in our canvas
function carre(x, y, cote) {
    /* 
    1er point   HG      x           y
    2eme        HD      x+cote      y
    3eme        BD      x+cote      y+cote
    4eme        BG      x           y+cote
    */

    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + cote, y);
    ctx.lineTo(x + cote, y + cote);
    ctx.lineTo(x, y + cote);
    ctx.lineTo(x, y);

    ctx.stroke();
}

function playBtn() {

    if (play_b == false) {
        timer = setInterval(function() {
            rebond();
        }, speedAnim);
        play_b = true;
    }
}

function stopBtn() {
    play_b = false;
    clearInterval(timer);
}

function rebond() {

    // efface le canvas
    ctx.clearRect(0, 0, canv.width, canv.height);


    // mise à jour de la position
    for (let i = 0; i < nbPointVisu; i++) {
        let tailleC = posArcs[i].tailleCercle * 2;

        //console.log('taille C :' + tailleC);

        posArcs[i].x += posArcs[i].pasX;
        posArcs[i].y += posArcs[i].pasY;

        if (posArcs[i].x > posArcs[i].maxX - tailleC || posArcs[i].x < tailleC) {
            posArcs[i].pasX = -posArcs[i].pasX;
        }

        if (posArcs[i].y > posArcs[i].maxY - tailleC || posArcs[i].y < tailleC) {
            posArcs[i].pasY = -posArcs[i].pasY;
        }

    }


    // test de distance et trait de lien
    for (let ref = 0; ref < nbPointVisu; ref++) {
        posArcs[ref].tailleCercle = 1

        for (let i = ref; i < nbPointVisu; i++) {
            // posArcs[i].tailleCercle = 2

            let largeur = posArcs[ref].x - posArcs[i].x;
            let hauteur = posArcs[ref].y - posArcs[i].y;
            let distance = Math.sqrt(largeur * largeur + hauteur * hauteur);
            // console.log('distance ' + distance);
            // console.log('distanceAcc ' + distanceAccroche);

            if (distance <= distanceAccroche) {
                // trait entre posArcs[ref].x et posArcs[i].x
                posArcs[ref].tailleCercle += 1;
                // posArcs[i].tailleCercle += 5;

                ctx.beginPath();
                ctx.moveTo(posArcs[ref].x, posArcs[ref].y);
                ctx.lineTo(posArcs[i].x, posArcs[i].y);
                ctx.stroke();
            }
        }
    }


    // dessin des cercles.
    for (let i = 0; i < nbPointVisu; i++) {

        ctx.fillStyle = posArcs[i].color;
        //console.log("color ::" + posArcs[i].color);
        ctx.beginPath();
        ctx.arc(posArcs[i].x, posArcs[i].y, posArcs[i].tailleCercle, 0, Math.PI * 2);
        ctx.fill();
        //ctx.stroke();
    }


}


//--------------------------------------------------- RANGE FX
function msDownRange(bool) {
    msDownRange_b = bool;
}

function rangeValueMove(range) {
    if (msDownRange_b) {
        rangeValue(range);
    }
}


function rangeValue(range) {
    range.nextSibling.innerHTML = range.value;

    nbPointVisu = range.value;
    updateColor();
}


function distanceBille(range) {

    range.nextSibling.innerHTML = range.value;
    distanceAccroche = range.value;
}

function distanceBilleMove(range) {
    if (msDownRange_b) {
        distanceBille(range);
    }

}

function vitesseBille(range) {
    // value = 1  =>    span = 50
    // value = 50 =>    span = 1
    let valVitesse = parseInt(range.max) - range.value + 1
    range.nextSibling.innerHTML = range.value;

    speedAnim = valVitesse;
    if (play_b) {
        stopBtn();
        playBtn();

    }
    // console.log('speed dans vitesse function' + speedAnim);

}



function updateColor() {
    let pasCouleur = Math.round(360 / nbPointVisu); // to get a random number for our pas variable.

    for (let i = 0; i < nbPointVisu; i++) {
        posArcs[i].color = "hsl(" + (i * pasCouleur) + ", 70%, 60%)";
    }
}


// marge pour que les points  ne sortent pas.

// créer un trait entre les points prochent
// mettre un curseur pour changer la distance
// mettre un curseur pour changer la vitesse.

// faire grossir la bille, à chaque fois qu'elle accrochée à une autre bille.

// faire start ou stop en appuyant sur la barre d'espace.