import styled from "styled-components";
import { MemoColorType } from "../types/customType";

const colorHandler = (color? : string)=>{
    switch(color){
      case "purple" :
        return {back : "#907CDE", font : "#ffff"};
      case "yellow" :
        return {back : "#FFF85A", font : "#000"};
      case "orange" :
        return {back : "#FF9900", font : "#fff"};
      case "red" :
        return {back : "#FF3C3C", font : "#fff"};
      case "skyblue" :
        return {back : "#87A9EB", font : "#fff"};
      default :
        return {back : "#907CDE", font : "#ffff"};
    }
};

export const ColorCircle = styled.div<MemoColorType>`
  width: 20px;
  border-radius: 10000px;
  background: ${props=>colorHandler(props.color).back};
  border: ${props=> props.select ? "2px solid #000" : ""};
  box-sizing: border-box;
  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;