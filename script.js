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
        //Creation de l'image du joueur
        const avatar = new Image(); 
        avatar.src = 'avion.png';
        avatar.onload = ()=>{// attendre que le chargement de l'image
            //Creation de l'attribut image pour la classe Player
            this.image = avatar;
            //Prendre la taille de l'image comme taille du joueur
            this.width =  this.image.width * 1;
            this.height = this.image.height * 1;
            //Faire remonter un peu le joueur
            this.position.y -= 30
        }
    }
    
    //Methode pour dessiner le joueur
    print(ctx){
        ctx.fillStyle = 'white'; //Couleur du dessin
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    //Methode pour afficher l'image du joueur
    printImage(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }

    //Mettre a jour la positio du joueur
    updatePosition(){
        if(this.image){ // Verifier si l'image est deja chargée
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
            //Mettre a jour le joueur : Redessiner (sans image)
            // this.print(ctx);
            //Mettre a jour le joueur : Redessiner (avec image)
            this.printImage(ctx);
        }
    }

    //Tirer une missile
    fire(){
        //1. Creer une missile
        shots.push(new Missile({
            position:{
                x : this.position.x + this.width/2, 
                y :this.position.y
            }
        }));
    }
}

//Classe Missile
class Missile{
    constructor({position}){
        this.position = position;
        this.velocity = -(speed * 3)/2;
        this.width = 3;
        this.height =10;
    }

    print(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        ctx.fillRect(this.position.x-10,this.position.y-10,this.width,this.height);
        ctx.fillRect(this.position.x-20,this.position.y,this.width,this.height);
    }

    updatePosition(){
        this.position.y += this.velocity;
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
    //afficher les missiles du tableau shots
    shots.forEach((missile,i)=>{
        if(missile.position.y + missile.height <=0){ // si la missile sort de l'espace de jeu
            shots.splice(i,1); // on supprime la missile du tableau shots
        }else{
            missile.updatePosition();
        }
    });
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
            player.fire();
            console.log(shots);
            break;
    }
});


