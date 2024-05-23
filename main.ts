enum Tile { hills , forest , mountain , fields , pasture , desert };
enum Resource { brick , wood , ore , wheat , sheep , random };
enum Color { red , white , orange , blue};

type settlement = {
    color: Player
    is_city: boolean
}
type node = {
    resources: Resource[]
    edges: edge[]
    settlement: settlement
}
type edge = {
    road: Player
    nodes: node[]
}

function randomize(arr: any[], size: number): any[]{
    return arr.map((e:any, i:number, a:any[])=>{
        let r = Math.random()*size;
        let temp = arr[r];
        arr[r] = e;
        return temp;
    });
}
class Board {
    /* (harbor)
               (00)(01) 02 (03)(04) 05  06  
           (07) 08  09  10  11  12  13 (14)(15)
        16 (17) 18  19  20  21  22  23  24  25 (26)
        27 (28) 29  30  31  32  33  34  35  36 (37)
           (38) 39  40  41  42  43  44 (45)(46)
               (47)(48) 49 (50)(51) 52  53
    */
   
    tile_amt = 19;
    terrain_layout: Tile[];
    token_layout: number[];
    robber: number;
    corners_amt = 54;

    harbor_amt = 18;
    harbors: number[] = [0, 1, 3, 4, 7, 14, 15, 17, 26, 28, 37, 38, 45, 46, 47, 48, 50, 51];
    
    game_state: {nodes: node[], edges: edge[]};
    player_amt: number;
    
    public constructor(player_amt: number) {
        this.player_amt = player_amt;
        this.terrain_layout = randomize(this.terrain_layout, this.tile_amt)
        this.token_layout = randomize(this.token_layout, this.tile_amt)
        let rows = [7, 9, 11, 11, 9, 7]
        this.game_state.nodes.map((e:node, i:number)=>{
            e.resources[].add
        })
    }
    public getTile(i:number): Tile {

        return this.terrain_layout[0];
    }
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

        for(let i = 0, cards = 0; i < deck.length && cards <= nums; i++, cards++){
            
        }
    }

    removeCard(index: number): boolean {
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

class Player{
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

