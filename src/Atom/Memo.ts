import { atom } from "recoil";

interface listType {
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
    default: [
        {
            id : 1,
            color : "purple",
            title : "제목입니다.",
            desc : "설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.",
            list : [
                {
                    chk : false,
                    target : "11111111111"
                },
                {
                    chk : true,
                    target : "1231231231232131"
                }
            ]
        },
        {
            id : 2,
            color : "orange",
            title : "제목입니다.",
            desc : "설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.",
            list : [
                {
                    chk : false,
                    target : "11111111111"
                }
            ]
        }
    ],
});