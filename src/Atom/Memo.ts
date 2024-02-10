import { atom } from "recoil";

export interface listType {
    listId : number
    chk : boolean
    target : string
}

export interface memoType {
    id : number
    color : string
    title : string
    desc : string
    list : listType[]
}

export const memoState = atom<memoType[]>({
    key: 'memoState',
    default: [],
});