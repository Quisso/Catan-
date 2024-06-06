export enum Hex { hills , forest , mountain , fields , pasture , desert, harbor }
export enum Resource { brick , wood , ore , wheat , sheep , nothing , random }
export enum Color { red , white , orange , blue}
export type tile = {
    hex: Hex
    resource: Resource
    token: number
    nodes: node[]
}
export type settlement = {
    color: Color//player
    is_city: boolean
}
export type node = {
    settlement: settlement | null
    tiles: tile[]
    edges: edge[]
}
export type edge = {
    road: Color | null//player
    nodes: node[]
}
export function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function production_conversion(prod: Hex | Resource): Hex | Resource {
    return prod as number;
}   
export class Board{

    /* (harbor)
               (00)(01) 02 (03)(04) 05  06  
           (07) 08  09  10  11  12  13 (14)(15)
        16 (17) 18  19  20  21  22  23  24  25 (26)
        27 (28) 29  30  31  32  33  34  35  36 (37)
           (38) 39  40  41  42  43  44 (45)(46)
               (47)(48) 49 (50)(51) 52  53
    */
    
    tile_amt = 19
    tile_config: readonly { hex:Hex , amt:number }[] = [
        { hex:Hex.hills, amt:3 },
        { hex:Hex.forest, amt:4 },
        { hex:Hex.mountain, amt:3 },
        { hex:Hex.fields, amt:4 },
        { hex:Hex.pasture, amt:4 },
        { hex:Hex.desert, amt:1 },
    ];
    tile_layout: tile[];
    token_layout: number[];
    //robber: number;

    node_amt = 54;
    edge_amt = 72;
    game_state: {nodes: node[], edges: edge[]};
    player_amt: number;

    harbor_amt = 18;
    harbors = [0, 1, 3, 4, 7, 14, 15, 17, 26, 28, 37, 38, 45, 46, 47, 48, 50, 51];


    
    node_rows = [7, 9, 11, 11, 9, 7]
    tile_rows = [3, 4, 5, 4, 3]
    public constructor(player_amt: number) {
        this.player_amt = player_amt;
        
        //token_layout population
        this.token_layout = []
        for(let i = 1; i<=12; i++){
            if(i != 7){
                if(i != 1 && i != 12) this.token_layout.push(i);
                this.token_layout.push(i);
            }
        }
        
        //tile_layout population
        this.tile_layout = []
        for(let i = 0; i<this.tile_config.length; i++){
            for(let j = 0; j < this.tile_config[i].amt; j++){
                this.tile_layout.push({
                    hex: this.tile_config[i].hex,
                    resource: production_conversion(this.tile_config[i].hex) as Resource,
                } as tile)
            }
        }

        //board randomization 
        this.token_layout = shuffleArray(this.token_layout)
        this.tile_layout = shuffleArray(this.tile_layout)
        this.tile_layout.map((e:tile, i:number)=>{
            e.token = this.token_layout[i]
        })

        //game state init
        this.game_state = {nodes: new Array<node>(this.node_amt), 
                           edges: new Array<edge>(this.edge_amt)}
        for(let i = 0; i<this.node_amt; i++){
            this.game_state.nodes[i] = {
                settlement: null,
                tiles: [],
                edges: [],
            }
        }
        for(let i = 0; i<this.edge_amt; i++){
            this.game_state.edges[i] = {
                road: null,
                nodes: [],
            }
        }

        //tiles and nodes linkage
        this.tile_layout.map((t, ti)=>
            this.getTileNodes(ti)
                .map(ni=>this.game_state.nodes[ni])
        )
        //nodes and edges linkage
        //this.game_state.nodes.map() 
    }
    getRow(index:number, row_amts:number[]):number{
        if(index<0) return -1
        for(let i = 0; i < row_amts.length; i++){
            if(index < row_amts[i]) return i
            index-=row_amts[i]
        }
        return -1;
    }
    getCol(index:number, row_amts:number[]):number{
        if(index<0) return -1
        for(let row of row_amts){
            if(index < row) return index
            index-=row
        }
        return -1;
    }
    getIndex(row:number, col:number, row_amts:number[]):number{
        if(row<0||col<0) return -1
        return row_amts.reduce((acc, e)=>{
            if(row === 0) acc+=col
            if(row > 0) acc+=e
            row--
            return acc
        }, 0)
    }
    getTileNodes(tIndex:number): number[]{
        let nIndex:number[] = []
        let node_rows = [7, 9, 11, 11, 9, 7]
        let tile_rows = [3, 4, 5, 4, 3] 
        let row = this.getRow(tIndex, tile_rows)
        let col = this.getCol(tIndex, tile_rows)*2

        let topRowOffset = row>Math.floor(tile_rows.length/2) ? 1:0
        let bottomRowOffset = row<Math.floor(tile_rows.length/2) ? 1:0
        
        for(let c = col; c<col+3; c++){
            nIndex.push(this.getIndex(row, c+topRowOffset, node_rows))
        }
        for(let c = col; c<col+3; c++){
            nIndex.push(this.getIndex(row+1, c+bottomRowOffset, node_rows))
        }
        return nIndex;
    }
    
}