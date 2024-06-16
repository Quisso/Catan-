"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.developement_Cards = void 0;
const catan_1 = require("../include/catan");
// enum differentcards_developement { //25 cards = 14 Soldier + 6 Progress + 5 Victory
//     Soldier, Progress, Victory
// }
// function getrandomcards(){
//     //randomizer 
//     switch (differentcards_developement){   
//         case :
//         case ://card name 
//         //function card
//         case : 
//     }
// } 
let deck = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3]; // 1 = knight, 2 = progress, 3 = victory
class developement_Cards {
    cardsInHand_developement;
    constructor() {
        this.cardsInHand_developement = [];
    }
    Drawhand_developement(nums) {
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array
        randomize(deck, deck.length);
        for (let i = 0; i < nums; i++) {
            this.cardsInHand_developement.push(deck[i]);
            deck.pop();
        }
    }
    remove_developementcard(index) {
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }
    //usecard (arr: number[], index: number){
    // }
    getCards() {
        return this.cardsInHand_developement;
    }
}
exports.developement_Cards = developement_Cards;
class Player {
    resources;
    settlement_count;
    roads_count;
    roads_location;
    victory_points;
    color;
    constructor(color) {
        this.color = color;
        this.resources = {
            [catan_1.Resource.brick]: 0,
            [catan_1.Resource.wood]: 0,
            [catan_1.Resource.ore]: 0,
            [catan_1.Resource.wheat]: 0,
            [catan_1.Resource.sheep]: 0,
        };
        this.settlement_count = 0;
        this.roads_count = 0;
        this.roads_location = [];
        this.victory_points = 0;
    }
    //if player are in these terrain add to resources
    increment_resource(num, territorytype) {
        this.resources[territorytype] += num;
    }
    getResources_types(resourceType) {
        return this.resources[resourceType];
    }
    roadscounter() {
        this.roads_count++;
    }
    toStringHand() {
        return "\n" +
            "Brick: " + this.resources[catan_1.Resource.brick] + "\n" +
            "Wood: " + this.resources[catan_1.Resource.wood] + "\n" +
            "Ore: " + this.resources[catan_1.Resource.ore] + "\n" +
            "Wheat: " + this.resources[catan_1.Resource.wheat] + "\n" +
            "Sheep: " + this.resources[catan_1.Resource.sheep] + "\n" +
            +"\n";
    }
    toString() {
        return "\n" +
            "Color: " + this.color +
            "\nVictory Points: " + this.victory_points +
            "\nResources: " + this.toStringHand();
    }
}
exports.Player = Player;
function randomize(deck, length) {
    throw new Error("Function not implemented.");
}
