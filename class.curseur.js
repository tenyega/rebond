class Curseur {

    constructor(name, libelle, valeur, min, max, classParent, color) {
        this.valeur = valeur;

        this.name = name;
        this.libelle = libelle;
        this.parent = document.querySelector(classParent);
        this.spanValeur;
        this.min = min;
        this.max = max;
        this.posXmouseStart = 0;

        let html = "";
        html += "<div class='curseur " + this.name + "'>";
        html += "<label>" + this.libelle + " : </label>";
        html += "<span class='valeur'>" + this.valeur + "</span>";
        html += "</div>";
        this.parent.innerHTML += html;
        document.querySelector('.curseur.' + this.name + ' .valeur').style.backgroundColor = color;
    }

    getValue() {
        return this.valeur;
    }

    addEvents(callBack) {
        // here the this (our cursor here ) is been replaced by our windows coz its the window which has called the function 
        // change cursor so we need to change it to our cursor obj thats why its assigned to another variable to be able to access 
        // within our changeCurseur function.
        let ici = this;
        let doubleClick = document.querySelector('.curseur.' + ici.name + ' .valeur');


        function changeCurseur(e) {
            let diffValeurX = e.clientX - ici.posXmouseStart;
            let newVal = parseInt(ici.valeur) + diffValeurX;

            if (newVal > ici.max) {
                newVal = ici.max;
            }
            if (newVal < ici.min) {
                newVal = ici.min;
            }

            document.querySelector('.curseur.' + ici.name + ' .valeur').innerHTML = newVal;
            callBack(newVal);
        }


        function removeListener() {
            window.removeEventListener('mousemove', changeCurseur);
            window.removeEventListener('mouseup', removeListener);
            ici.valeur = document.querySelector('.curseur.' + ici.name + ' .valeur').innerHTML;
            callBack(ici.valeur);
        }

        this.parent.addEventListener('mousedown', function(e) {
            // crée les écouteurs
            window.addEventListener('mousemove', changeCurseur);
            window.addEventListener('mouseup', removeListener);

            ici.posXmouseStart = e.clientX;
            console.log(ici.posXmouseStart);
        });


        doubleClick.addEventListener("dblclick", function() {
            // alert('doub');
            doubleClick.innerHTML = 0;
            ici.valeur = 0;
            callBack(ici.valeur);

        });

    }

}