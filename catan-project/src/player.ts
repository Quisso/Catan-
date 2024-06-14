import { Hex, Resource, edge, node } from "./main";

export function randomize(arr: any[], size: number): any[]{
    return arr.map((e:any, i:number, a:any[])=>{
        let r = Math.random()*size;
        let temp = arr[r];
        arr[r] = e;
        return temp;
    });
}

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

//enum card = [knight, progress, victory];
//maybe double hashmap

//make it an array of type cards

let deck = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3]; // 1 = knight, 2 = progress, 3 = victory


export class developement_Cards {
    cardsInHand_developement: number[];
    
    constructor() {
        this.cardsInHand_developement = [];
    }

    //check_resource_amt(this.player){} 

    Drawhand_developement(nums: number){ 
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array

        randomize(deck, deck.length);
        for(let i = 0; i < nums; i++){
            this.cardsInHand_developement.push(deck[i]);
            deck.pop();
        }
    }

    remove_developementcard(index: number): boolean{
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }

    //usecard (player_deck: number[], index: number){
        //use this player's deck arr and the index represent which card
        //call the game rule (which is just the functions of the cards)
        //maybe a switch statement and 
    // }



    getCards(): number[]{
        return this.cardsInHand_developement;
    }
}

export class Player{
    resources: { [key in Resource]: number };
    settlement_count: number;
    roads_count: number;
    roads_location: number[];
    // terrain: Map<Hex, Resource>;
    //hashmap: Map<number, Map<number, number>>;

    constructor() { //if player are in these terrain add to resources
        

        this.resources = {
            [Resource.brick]: 0,
            [Resource.wood]: 0,
            [Resource.ore]: 0,
            [Resource.wheat]: 0,
            [Resource.sheep]: 0,
            [Resource.nothing]: 0,
            [Resource.random]: 0,
        };
        
        //this.terrain = new Map<Hex, Resource>();

        //this.hashmap = new Map<1, Map<1, 2>>;

        // this.terrain.set(Hex.hills, Resource.brick);
        // this.terrain.set(Hex.forest, Resource.wood);
        // this.terrain.set(Hex.mountain, Resource.ore);
        // this.terrain.set(Hex.fields, Resource.wheat);
        // this.terrain.set(Hex.pasture, Resource.sheep);
        // this.terrain.set(Hex.desert, Resource.nothing);
        // this.terrain.set(Hex.harbor, Resource.random);


        this.settlement_count = 0;
        this.roads_count = 0;
        this.roads_location = [];
    
    }


    // checkResource(terrain_type: Hex): Resource{
    //     //takes in a type of Hex an return a type of Resource 
    //     const resource = this.terrain.get(terrain_type);

    //     if (resource !== undefined){ //make sure it isn't undefined
    //         return resource;
    //     }

    //     throw new Error("Invalid terrain type");
    // }

    // terrain_nearby(terrain_type:Hex, is_city: boolean){
    //     //takes in the type of terrain and settlement, call the incrementation func inc resource

    //     const resource = this.terrain.get(terrain_type);
        
    //     if (resource !== undefined) {
    //         const incrementValue = is_city ? 2 : 1;
    //         this.increment_resource(incrementValue, resource);
    //     } 

    // }

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
