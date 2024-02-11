import { atom } from "recoil";

export const modalOpen = atom({
    key: 'modal',
    default: false,
});

export const writeState = atom({
    key : "write",
    default : {
        color : "purple"
    }
})