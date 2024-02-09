import styled from "styled-components"

interface InputType {
    color? : string
    fontColor? : string
}

export const Input = styled.input<InputType>`
    border: 0;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 1em;
    background : ${props=>props.color ? props.color : "#2a167c"};
    color : ${props=>props.fontColor ? props.fontColor: "#fff"};
`;

export const Textarea = styled.textarea`
    border: 1px solid #ccc;
    width: 100%;
    height: 75px;
    resize: none;
    box-sizing: border-box;
    padding: 1em;
    background: #fff;
    color: #000;
`;


export const Button = styled.button`
    all: unset;
    display: block;
    text-align: center;
    margin: 0 auto 0;
    width: 30%;
    height: 50px;
    font-size: 14px;
    background: #000;
    color : #fff;
    border-radius: 1000px;
    cursor: pointer;
`;