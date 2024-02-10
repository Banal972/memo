import { FaPen } from "react-icons/fa";
import {MemoColorType} from "../../types/customType";
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalOpen } from '../../Atom/Model';
import { memoState } from '../../Atom/Memo';
import { useState } from 'react';
import styled from 'styled-components'
import Write from './Write/Write';
import { Check } from "../../compontent/Input";

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
}

const Memo = styled.div<MemoColorType>`

  background: ${props=>colorHandler(props.color).back};
  color: ${props=>colorHandler(props.color).font};
  box-sizing: border-box;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 25px 15px;

  h1 {
    font-size: 18px;
    font-weight: 600;
  }

  .desc {
    margin-top: 20px;
    word-break: keep-all;
    line-height: 1.3;
    font-size: 12px;
  }

  .checkList {
    margin-top: 20px;
    display: flex;
    align-items: center;
    > div {
      margin-right: 10px;
    }
    + .checkList {
      margin-top: 15px;
    }
  }
  
  .view {
    width: 25px;
    height: 25px;
    border-radius: 1000px;
    background: #000;
    color: #fff;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 40%;
    }
  }

`;

const SearchBox = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  padding: 0 1em;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px 0;
  align-items: flex-start;

  > div {
    flex: 0 1 calc(100%/5 - 30px);
    margin: 30px 15px 0;
  }

`;

function Main() {

  const [modalState,setModalState] = useRecoilState(modalOpen);
  const memoData = useRecoilValue(memoState);
  const [id,setId] = useState(0);
  
  const viewHanlder = (id : number)=>{
    setId(id);
    setModalState(true);
  }
  
  return (
    <>
      <div className='main'>

        <SearchBox type='input' placeholder='제목을 입력해주세요.'/>

        <Grid>
          {
            memoData.map((item,index)=>(
              <Memo color={item.color} key={index}>
                <h1>{item.title}</h1>
                <p className="desc">
                  {item.desc}
                </p>
                {
                  item.list.map((item,index)=>(
                    <div 
                      className='checkList' 
                      key={index}
                    >
                      <Check width={15}/>
                      {item.target}
                    </div>
                  ))
                }
                <div className="view" onClick={()=>viewHanlder(item.id)}><FaPen/></div>
              </Memo>
            ))
          }
        </Grid>
        
        {
          modalState && <Write id={id} />
        }
        
      </div>
    </>
  )
}




export default Main