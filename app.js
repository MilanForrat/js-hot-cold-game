// déclaration de variables : éléments du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// modèle de coeurs
const coeurVide = "<svg id=\"heart-outline\" xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\"><path d=\"M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z\"/></svg>";
const coeurPlein = "<svg id=\"heart\" xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\"><path d=\"M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z\"/></svg>";

// fond d'écran :
const bgFroid = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
const bgTiede = "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)";
const bgChaud = "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)";
const bgBrulant = "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)";
const bgWin = "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)";
const bgLoose = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";

// jeu
const play = () => {
    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() *101);
    // nombre de vies
    const totalVies = 5;
    let vies = totalVies;
    // afin d'observer le chiffre choisi par l'ordinateur :
    console.log(randomNumber);

    // actualisation à chaque essai : 
    formulaire.addEventListener('submit', (e) => {
        // empêcher l'envoie du formulaire :
        e.preventDefault();
        // je récupère la valeur de l'input et transofrme la chaine de caractère (string) en number grâce à parseInt
        const valeurInput = parseInt(input.value);

        // 1ère possibilité : si la valeur de l'input ne respecte pas les règles du jeu 
        if(valeurInput < 0 ||valeurInput > 100) return;

        // 2ème possibilité : si la valeur de l'input est égale au randomNumber => gagné
        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            // les backticks (alt-gr + 7 permettent de mélanger variables et texte)
            message.textContent = `🥳 BRAVO !!! Le nombre était bien ${randomNumber} 🥳`;
            // on affiche le bouton rejouer qui était en display none
            rejouerBtn.style.display = 'block';
            essayerBtn.style.display="none";
            
        }

        // 3ème possibilité : si la valeur est différente que le randomNumber
        if(valeurInput !== randomNumber){
            // 1er interval +/- 2 BRULANT :
            if(randomNumber <= valeurInput +2 && randomNumber >= valeurInput-2){
                body.style.backgroundImage = bgBrulant;
                message.textContent = `🔥🌶️♨️ C'est Brûlant !! ♨️🌶️🔥`;
            }
            //2ème interval +/- 5 CHAUD :
            else if(randomNumber <= valeurInput +5 && randomNumber >= valeurInput-5){
                body.style.backgroundImage = bgChaud;
                message.textContent = `🔥🤠 C'est Chaud !! 🤠🔥`;
            }
            //3ème interval +/- 10 TIEDE :
            else if(randomNumber <= valeurInput +10 && randomNumber >= valeurInput-10){
                body.style.backgroundImage = bgTiede;
                message.textContent = `😐🙃 C'est Tiède !! 🙂😐`;
            }
            //4ème interval + 10 CHAUD :
            else{
                body.style.backgroundImage = bgFroid;
                message.textContent = `🥶❄️ C'est Froid !! 🥶❄️`;
            }
            // on retire à la variable vie, 1 unité
            vies--;
            // on éxécute la fonction verifyLoose
            verifyLoose();
        }

        // on va actualiser le nombre de vie après chaque essai
        actualiseCoeurs(vies);

    })
    // fonction qui vérifie si l'utilisateur a perdu
    const verifyLoose = () => {
        if(vies === 0){
            body.backgroundImage = bgLoose;
            body.style.color = '#990000';
            // on désactive le bouton essayer 
            essayerBtn.setAttribute("disabled", "");
            message.textContent= `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    // fonction qui actualise les vies/coeurs 
    const actualiseCoeurs = (vies) => {
        // on retire tout ce qui se trouve dans la div 
        divVies.innerHTML="";
        // on créer le tableau qui contient les vies
        let tableauDeVies=[];
        for(let i = 0; i < vies; i++){
            // ajoute un coeur plein dans le tableau selon le nombre de vies
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            // on fait de même avec les coeurs vides : totalVies = 6 - vies (le nb de vies restantes)
            tableauDeVies.push(coeurVide);
        }
        // on génère notre tableau dans le html à l'aide d'une boucle forEach (pour chaque élément du tableau...)
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    // on lance la fonction pour le début du jeu
    actualiseCoeurs();

    rejouerBtn.addEventListener('click', () => {
        // on cache les messages
        message.style.display = "none";
        // on refresh la page afin de relancer la fonction play
        document.location.reload(true);
    })
}
// on exécute la fonction play
play();