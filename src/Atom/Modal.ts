import { atom } from "recoil";

export const modalOpen = atom({
    key: 'ModalState',
    default: false,
});

export const writeState = atom({
    key : "WriteState",
    default : {
        color : "purple"
    }
})