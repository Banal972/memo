import { FaPen } from "react-icons/fa";
import { MemoColorType } from "../../types/customType";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalOpen, writeState } from '../../Atom/Modal';
import { memoState, memoType } from '../../Atom/Memo';
import { Check } from "../../compontent/Input";
import { IoCheckmark } from "react-icons/io5";
import styled from 'styled-components'
import Write from './Write/Write';
import { useEffect, useState } from "react";
import axios from "axios";

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
    font-size: 14px;
    > div {
      margin-right: 10px;
    }
    + .checkList {
      margin-top: 15px;
    }

    &.checked {
      text-decoration: line-through;

      div {
        background: #fff;
        svg {
          color: #000;
        }
      }

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

  const setWriteState = useSetRecoilState(writeState);
  const [modalState,setModalState] = useRecoilState(modalOpen);
  const [memoData,setMemoData] = useRecoilState(memoState);
  const [filter, setFilter] = useState<memoType[]>([]);
  
  useEffect(()=>{
    axios.get('http://localhost:9999/memo')
    .then(({data} : {data : memoType[]})=>{
      setMemoData(prev=>
        [...prev,...data]
      );
    })
    .catch(e=>{
      // 에러가 발생했을때 실행해줍니다.
    })
  },[])

  useEffect(()=>{
    setFilter(memoData);
  },[memoData]);

  // 리스트 체크 핸들러
  const listCheckHandler = (id : number,listId : number)=>{
    /* 
      타입은 memoType[] 이기 때문에
      map 으로 새로운 함수를 만들때 
      [{},{}] 이런 형태로 return 을 해줘야 합니다.
    */
    setMemoData(prev => {
      return prev.map(memo => {
        if(memo.id === id){
          return { // {} 로 return 해주고
            ...memo, // 안에 있는 내용 그대로 가져오기
            list : memo.list.map((item)=>{ // list의 chk만 변경
              if(item.listId === listId){
                return {
                  ...item,
                  chk : !item.chk
                }
              }else{
                return item; // id가 다르면 그대로 냅두기
              }
            })
          }
        }else{
          return memo;
        }
      })
    })
  }

  // view 페이지 보여주기
  const viewHanlder = (id : number)=>{
    setWriteState(prev=>(
      {
        ...prev,
        id
      }
    ))
    setModalState(true);
  }

  // 검색
  const onSearchHandler = (e : React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter") { 
      const input = e.currentTarget.value;
      const search = memoData.filter(item=>item.title.includes(input));
      setFilter(search);
    }
  }
  
  return (
    <>
      <div className='main'>

        <SearchBox 
          type='input' 
          placeholder='제목을 입력해주세요.'
          onKeyDown={(e)=>onSearchHandler(e)}
        />

        <Grid>
          {
            filter.map((item,index)=>(
              <Memo color={item.color} key={index}>
                <h1>{item.title}</h1>
                <p className="desc">
                  {item.desc}
                </p>
                {
                  item.list.map((list,index)=>(
                    <div 
                      className={`checkList ${list.chk ? "checked" : ""}`}
                      key={index}
                    >
                      <Check 
                        onClick={()=>listCheckHandler(item.id,list.listId)}
                      ><IoCheckmark/></Check>
                      {list.target}
                    </div>
                  ))
                }
                <div className="view" onClick={()=>viewHanlder(item.id)}><FaPen/></div>
              </Memo>
            ))
          }
        </Grid>
        
        {
          modalState && <Write/>
        }
        
      </div>
    </>
  )
}


export default Main