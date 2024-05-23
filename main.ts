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
