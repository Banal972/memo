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
    key: 'memo',
    default: [],
});


// 컬러
export const colorState = atom({
    key : "color",
    default : ["purple","yellow","orange","red","skyblue"]
})