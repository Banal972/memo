import { atom } from "recoil";

export const modalOpen = atom({
    key: 'modal',
    default: false,
});

interface writeType {
    color : string
    id : number | null
}

export const writeState = atom<writeType>({
    key : "write",
    default : {
        color : "purple",
        id : null
    }
})