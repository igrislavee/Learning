
let xp = 0;
let health = 100;
let gold = 50;
let curWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [{name: "stick", power: 5}];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNametext = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

let weaponNum = 0;
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    },


];

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"town square\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 Health (10 gold)", "Buy weapon (30 gold)", "Go to town square"], //30 gold needs to change to 50 then 100 for the weapon store.
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town squere"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You entered a cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "killed",
        "button text": ["Go to town squere", "Go to town squere", "Go to town squere"],
        "button functions": [goTown, goTown, goTown],
        text: "You have killed a monster."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You have died."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You have killed the great dragon."
    }
];

const monsters = [
    {
        name: "slime",
        health: 15,
        level: 2
    },
    {
        name: "beast",
        health: 60,
        level: 8
    },
    {
        name: "dragon",
        health: 300,
        level: 20
    }
];


// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations) {
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    text.innerText = locations.text;

    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];


}
function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if(gold >= 10) {
        gold -= 10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
    } else {text.innerText = "Not enough gold to buy health.";}
}

function buyWeapon() {
     if(gold >= weapons[curWeapon + 1].power && curWeapon < weapons.length - 1){
         gold -=  weapons[curWeapon + 1].power;
         goldText.innerText = gold;
         inventory.push(weapons[curWeapon + 1]);
         curWeapon++;
         text.innerText = "You now have a " + weapons[curWeapon].name + ".";
         text.innerText += "\nIn your inventory you have: ";
         for(let i = 0; i < inventory.length; i++) {
            text.innerText += " " + inventory[i].name + ", ";
         }
    } else if(curWeapon < weapons.length - 1) {
        text.innerText = `Not enough gold to buy a ${weapons[curWeapon + 1].name}`;
    } else {text.innerText += "You have the most powerful weapon";}
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNametext.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[curWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[curWeapon].power + Math.floor(Math.random() * xp) + 1; 
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0) {
        lose();
    }
    else if(monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
} 

function dodge() {
    text.innerText = "You dodge the attack fron the " + monsters[fighting].name + ".";
}

function lose() {
    update(locations[5]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    curWeapon = 0;
    inventory = [{name: "stick", power: 5}];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function winGame() {
    update(locations[6]);
}