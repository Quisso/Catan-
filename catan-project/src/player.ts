import { Resource } from "./main";


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

//card effect
type card = {
    name:string;
    description: string;
    function: () => void;
}

let deck = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3]; // 1 = knight, 2 = progress, 3 = victory

class developement_Cards {
    cardsInHand_developement: number[];
    
    constructor() {
        this.cardsInHand_developement = [];
    }

    Drawhand_developement(nums: number) {
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array

        randomize(deck, deck.length);
        for(let i = 0; i < nums; i++){
            this.cardsInHand_developement.push(deck[i]);
            deck.pop();
        }
    }

    remove_developementcard(index: number): boolean {
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }

    //usecard (arr: number[], index: number){
        
    // }



    getCards(): number[] {
        return this.cardsInHand_developement;
    }
}

export class Player{
    resources: { [key in Resource]: number };
    settlement_count: number;
    roads_count: number;
    roads_location: number[];


    constructor() { //if player are in these terrain add to resources
        this.resources = {
            [Resource.brick]: 0,
            [Resource.wood]: 0,
            [Resource.ore]: 0,
            [Resource.wheat]: 0,
            [Resource.sheep]: 0,
            [Resource.random]: 0,
            [Resource.nothing]:0
        };
        
        this.settlement_count = 0;
        this.roads_count = 0;
        this.roads_location = [];
    
    }

    increment_resource(num: number, territorytype: Resource){
        this.resources[territorytype] += num;
    }

    getResources_types(resourceType: Resource){ //see resource amounts
        return this.resources[resourceType];
    }

    roadscounter(){ 
        this.roads_count++;
    }


}

function randomize(deck: number[], length: number) {
    throw new Error("Function not implemented.");
}

