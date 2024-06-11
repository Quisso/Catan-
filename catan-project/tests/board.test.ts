import { shuffleArray , Board , node , tile} from "../src/main.ts"

describe('randomize', () => {
    test('randomized simple array', () => {

        
    });
    test('randomized array contains all original numbers', () => {
        let arr: number[] = [];
        for(let j = 0; j<100; j++)
            arr[j] = j
        let rand_arr:number[] = shuffleArray(arr)
        for(let i = 0; i<arr.length; i++){
            expect(rand_arr).toContain(arr[i]);
        }
    });
});
describe('board.getRow', () => {
    function check_bounds_of_rows(arr:number[], rows:number[]){
        let i = 0;
        for(let r = 0; r<rows.length; r++){
            expect(arr[i]).toBe(r)
            i+=rows[r]-1
            expect(arr[i]).toBe(r)
            i++
        }
    }
    test('returns correct row for 54 nodes', () => {
        let board = new Board(4);
        let node_rows = [7, 9, 11, 11, 9, 7]
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr.push(board.getRow(i, node_rows))
        }
        check_bounds_of_rows(arr, node_rows)
    });
    test('returns correct row for 19 tiles', () => {
        let board = new Board(4);
        let tile_rows = [3, 4, 5, 4, 3]
        let arr:number[]  = []
        for(let i = 0; i<19; i++){
            arr.push(board.getRow(i, tile_rows))
        }
        check_bounds_of_rows(arr, tile_rows)
    });
});
describe('board.getCol', () => {
    function check_bounds_of_cols(arr:number[], rows:number[]){
        let i = 0;
        for(let c = 0; c<rows.length; c++){
            expect(arr[i]).toBe(0)
            i+=rows[c]-1
            expect(arr[i]).toBe(rows[c]-1)
            i++
        }
    }
    test('returns correct columns for 54 nodes', () => {
        let board = new Board(4);
        let node_rows = [7, 9, 11, 11, 9, 7]
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr.push(board.getCol(i, node_rows))
        }
        check_bounds_of_cols(arr, node_rows)
    });
    test('returns correct columns for 19 tiles', () => {
        let board = new Board(4);
        let tile_rows = [3, 4, 5, 4, 3]
        let arr:number[]  = []
        for(let i = 0; i<19; i++){
            arr.push(board.getCol(i, tile_rows))
        }
        check_bounds_of_cols(arr, tile_rows)
    });
});
describe('board.getIndex', () => {
    test('can get index of all tiles using getRow and getCol', () => {
        let tile_rows = [3, 4, 5, 4, 3]
        let board = new Board(4)
        let arr:number[] = []
        for(let i = 0; i<19; i++){
            arr[i] = i;
        }
        arr.map(e=>{
            expect(board.getIndex(
                board.getRow(e, tile_rows),
                board.getCol(e, tile_rows), 
                tile_rows
            )).toBe(e)
        })
    });
    test('can get index of all nodes using getRow and getCol', () => {
        let node_rows = [7, 9, 11, 11, 9, 7]
        let board = new Board(4)
        let arr:number[] = []
        for(let i = 0; i<54; i++){
            arr[i] = i;
        }
        arr.map(e=>{
            expect(board.getIndex(
                board.getRow(e, node_rows),
                board.getCol(e, node_rows), 
                node_rows
            )).toBe(e)
        })
    });
});

describe('Board getTileNodes', () => {
    test('indices are sorted so that they are circular', () => {
        let board = new Board(4)
        for(let i=0; i<19; i++){
            let nodes = board.getTileNodes(i)
            let n =0
            for(;n<nodes.length/2; n++){
                expect(nodes[n]).toBeLessThan(nodes[n+1])
            }
            for(;n<nodes.length; n++){
                expect(nodes[n]).toBeGreaterThan(nodes[((n+1)%nodes.length)])
            }
        }
    });
});

describe('Board tile_layout', () => {
    test('tiles have 6 nodes and nodes are found in nodes array', () => {
        let board = new Board(4)
        board.tile_layout.map(t=>{
            expect(t.nodes).toHaveLength(6)
            t.nodes.map((n:node)=>{
                expect(board.game_state.nodes.find(v=>n===v)).toBeTruthy()
            })
        })
    });
});
describe('board makeEdge', () => {
    test('makeEdge instantiates both nodes', () => {
        let board = new Board(4)
        let n1 = {} as node
        n1.edges = []
        let n2 = {} as node
        n2.edges = []
        board.makeEdge(n1, n2)
        expect(n1.edges[0]).toStrictEqual(n2.edges[0])
    });
    test('makeEdge makes a new edge', () => {
        let board = new Board(4)
        let n1 = {} as node
        n1.edges = []
        let n2 = {} as node
        n2.edges = []
        expect(board.makeEdge(n1, n2)).not.toBeNull()
        expect(n1.edges[0].road).toEqual(null)
        expect(n2.edges[0].road).toEqual(null)
        expect(n1.edges[0].nodes).toContain(n1)
        expect(n1.edges[0].nodes).toContain(n2)
        expect(n2.edges[0].nodes).toContain(n1)
        expect(n2.edges[0].nodes).toContain(n2)
    });
    test('makeEdge does not make an edge if nodes already have an edge', () => {
        let board = new Board(4)
        let n1 = {} as node
        n1.edges = []
        let n2 = {} as node
        n2.edges = []
        let n3 = {} as node
        n3.edges = []
        board.makeEdge(n1, n2)
        board.makeEdge(n2, n3)
        board.makeEdge(n3, n1)
        expect(board.makeEdge(n2, n1)).toEqual(null)
        expect(board.makeEdge(n3, n2)).toEqual(null)
        expect(board.makeEdge(n1, n3)).toEqual(null)
        expect(n1.edges).toHaveLength(2)
        expect(n2.edges).toHaveLength(2)
        expect(n3.edges).toHaveLength(2)
    });
});

describe('board game_state', () => {
    test('game_state has nodes and edges with correct linkages to each other', () => {
        let board = new Board(4)
        expect(board.game_state.nodes).toHaveLength(54)
        expect(board.game_state.edges).toHaveLength(72)
        for(let node of board.game_state.nodes){
            expect(node.edges.length).toBeGreaterThanOrEqual(2)
            expect(node.edges.length).toBeLessThanOrEqual(3)
        }
        for(let edge of board.game_state.edges){
            expect(edge.nodes).toHaveLength(2)
        }

    });
});

describe('', () => {
    test('', () => {
    });
});