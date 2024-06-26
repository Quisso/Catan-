export enum Tile { hills , forest , mountain , fields , pasture , desert };
export enum Resource { brick , wood , ore , wheat , sheep , random };
export enum Color { red , white , orange , blue};

export type settlement = {
    color: Color
    is_city: boolean
}
export type node = {
    resources: Resource[]
    edges: edge[]
    settlement: settlement
}
export type edge = {
    road: Color
    nodes: node[]
}