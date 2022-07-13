const space = document.querySelector("#game_space");

const ctx = space.getContext('2d');
//
space.width = space.clientWidth
space.height = space.clientHeight
//
let cpt = 0; // le nombre d'iteration du jeu
let speed = 5; // La vitesse du jeu (vitesse de deplacement)
const shots = []; // Stocker l'ensemble des missiles affichées sur l'ecran
//
//Denifir les touches de direction du jeu
const controllers = {
    left: {pressed:false},
    right: {pressed:false},
    //TODO : up and down
};

//=======================Classes=====================
class Player{
    constructor(){
        this.width = 35;//Nouvel Attribut width qui est la largeur du joueur
        this.height = 35; // hauteur du joueur
        this.velocity = {
            x:0, //Vitesse de deplacement horizontal
            y:0 //Vitesse de deplacement vertical
        }; 
        this.position = {
            x: (space.width - this.width)/2,
            y: space.height - this.height
        };   
    }
    //Methode pour dessiner le joueur
    print(ctx){
        ctx.fillStyle = 'white'; //Couleur du dessin
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    //Mettre a jour le joueur : Redessiner
    updatePosition(){
        if(controllers.left.pressed && this.position.x >=0){
            //deplacer le joueur vers la gauche
            this.velocity.x = -speed;
        }else if(controllers.right.pressed && this.position.x <= space.width - this.width){
            this.velocity.x = speed;
        }else{
            this.velocity.x = 0;
        }
        //Repositionner le joueur
        this.position.x += this.velocity.x;
        this.print(ctx);
    }
}

//====================Lancement du jeu===============
const player = new Player();

function startGame() {
     //Pour faire une boucle infinie sur l'animation
     //(cette fonction permet de ne pas faire planter le navigateur)
    requestAnimationFrame(startGame);
    //Effacer l'ancien contenu
    ctx.clearRect(0,0,space.width,space.height);
    player.updatePosition();
}



startGame();





//=======================Evenements==================
//Apui ou appui long sur les touches de direction
addEventListener('keydown',({key})=>{
    switch (key) {
        case 'ArrowLeft':
            controllers.left.pressed = true;
            break;
        case 'ArrowRight':
            controllers.right.pressed = true;
            break;
    }
});

//Arreter le deplacement
addEventListener('keyup',({key})=>{
    switch (key) {
        case 'ArrowLeft':
            controllers.left.pressed = false;
            break;
        case 'ArrowRight':
            controllers.right.pressed = false;
            break;
        case ' ':
            //Feu!!!!!
            break;
    }
});


