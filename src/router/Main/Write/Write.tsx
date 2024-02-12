import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Check, Input, Textarea } from '../../../compontent/Input';
import { ColorCircle } from '../../../compontent/Style';
import { modalOpen, writeState } from '../../../Atom/Modal';
import styled from 'styled-components'
import { colorState, listType, memoState } from '../../../Atom/Memo';
import { IoCheckmark } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';

const WriteBox = styled.div`
  
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }

  .cont {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    background: #fff;
    z-index: 5;
    padding: 50px 30px;
    width: 50%;
    box-sizing: border-box;
    transform: translate(-50%,-50%);

    > * {
      margin-top: 20px;
    }

    .select-box {
      margin-top: 0;
      .select-color {
        display: flex;
        margin: 10px -5px 0;
        > div {
          margin: 0 5px;
        }
      }
    }

    .title-box {
      input {
        margin-top: 5px;
      }
    }

    .text-box {
      textarea {
        margin-top: 5px;
      }
    }

    .add {
      display: flex;
      align-items: center;

      + .add {
        margin-top: 10px;
      }
      input {
        margin-left: 10px;
        width: 100%;
        border: 1px solid #ccc;
        padding: 0 1em;
        box-sizing: border-box;
        height: 30px;
      }
    }

    button {
      margin-top: 30px;
    }

  }

`;

function Write() {

  // listRef
  const listRef = useRef<HTMLInputElement | null>(null);

  const setModalState = useSetRecoilState(modalOpen); // 모달창
  const color = useRecoilValue(colorState); // 컬러 atom 가져오기
  const writeResult = useRecoilValue(writeState); // 작성 전달 props
  const [memoData,setMemoData] = useRecoilState(memoState); // 메모 state

  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [list,setList] = useState<listType[]>([
    {
      listId : 1,
      chk : false,
      target : ""
    }
  ]);

  // id props를 받았을때 데이터를 가져와서 넣어줍니다.
  useEffect(()=>{
    
    if(writeResult.id){
      const filter = memoData.filter(item=>item.id === writeResult.id)[0];
      setTitle(filter.title);
      setDesc(filter.desc);
      setList(filter.list);
    }

  },[writeResult.id,memoData])

  // 인풋박스 핸들러
  const inputHandler = (e:React.FormEvent<any>,action : React.Dispatch<React.SetStateAction<any>>)=>{
    e.preventDefault();
    action(e.currentTarget.value);
  }

  // 리스트 인풋 핸들러
  const listInputHanlder = (e:React.FormEvent<HTMLInputElement>,id : number)=>{
    const input = e.currentTarget.value;
    setList((prev)=>{
      return prev.map((item)=>{
        if(item.listId === id){
          return {...item,target : input}
        }else{
          return item;
        }
      })
    })
  }

  // 리스트 체크 핸들러
  const listCheckHandler = (id : number)=>{
    setList(prev => {
      return prev.map(item => {
        if(item.listId === id){
          return {
            ...item,
            chk : !item.chk
          }
        }else{
          return item;
        }
      })
    })
  }

  // 리스트 추가
  const listAddHandler = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      setList((prev)=>{
        const prevData = [...prev];
        const lastId = prevData[prevData.length-1].listId + 1;
        prevData.push(
          {
            listId : lastId,
            chk : false,
            target : ""
          }
        )
        return prevData;
      });
      setTimeout(()=>{
        if(list.length >= 1){ // 리스트에 변동이 생기면 focus를 이동시킵니다. (버그로 인해서 이전껄로 focus 잡힘)
          if(listRef.current) listRef.current.focus();
        }
      },10)
    }
  }

  // 등록버튼
  const onSubmitHandler = ()=>{
    if(title === "") return alert('제목을 입력해주세요.');
    setMemoData(prev=>{
      const prevData = [...prev];
      const lastId = prevData.length > 0 ? prevData[prevData.length-1].id + 1 : 1;
      prevData.push({
        id : lastId,
        color : writeResult.color,
        title,
        desc,
        list
      })
      return prevData;
    });
    setModalState(false);
  }

  // 수정버튼
  const onUpdateHandler = ()=>{
    if(title === "") return alert('제목을 입력해주세요.');
    setMemoData(prev=>{
      return prev.map((memo)=>{
        if(memo.id === writeResult.id){
          return {
            ...memo,
            color : writeResult.color,
            title,
            desc,
            list
          }
        }else{
          return memo;
        }
      })
    });
    setModalState(false); // 모달창 닫기
  }

  // 삭제버튼
  const onDeleteHandler = ()=>{
    setMemoData(prev=>{
      const filter = prev.filter((memo)=>memo.id !== writeResult.id);
      return filter;
    });
    setModalState(false); // 모달창 닫기
  }

  return (
    <WriteBox>
        <div 
          className="back" 
          onClick={()=>setModalState(false)}
        />
        <div className="cont">
            <div className="select-box">
                선택된 컬러
                <div className="select-color">
                    {
                    color.map((item,index)=>
                      <ColorCircle 
                        $select={item === writeResult.color ? writeResult.color : undefined} 
                        $color={item} 
                        key={index}
                      />)
                    }
                </div>
            </div>
            <div className="title-box">
                제목
                <Input 
                    style={{border : "1px solid #ccc"}}
                    $color='#fff'
                    $fontcolor='#000'
                    type="text" 
                    placeholder='제목을 입력해주세요.'
                    onInput={(e)=>inputHandler(e,setTitle)}
                    defaultValue={title}
                />
            </div>
            <div className="text-box">
                설명
                <Textarea 
                  placeholder='설명을 입력해주세요.' 
                  onInput={(e)=>inputHandler(e,setDesc)}
                  defaultValue={desc}
                />
            </div>
            {
              list.map((item,index)=>
                <div className="add" key={index}>
                  <Check
                    className={item.chk ? "checked" : ""}
                    onClick={()=>listCheckHandler(item.listId)}
                  >
                    <IoCheckmark/>
                  </Check>
                  <input 
                    type="text" 
                    placeholder='할 일을 입력해주세요.'
                    ref={index === list.length - 1 ? listRef : undefined}
                    defaultValue={item.target}
                    onInput={(e)=>listInputHanlder(e,item.listId)}
                    onKeyDown={(e)=>listAddHandler(e)}
                  />
                </div>
              )
            }
            {
              !writeResult.id ?
                <Button 
                  onClick={onSubmitHandler}
                >등록하기</Button>
              : 
                <div style={{display:"flex"}}>
                  <Button
                    $color={"#3c9dff"}
                    onClick={onUpdateHandler}
                    style={{marginRight: 0}}
                  >수정하기</Button>
                  <Button
                    $color={"#FF3C3C"}
                    onClick={onDeleteHandler}
                    style={{marginLeft: 25}}
                  >삭제하기</Button>
                </div>
            }
        </div>
    </WriteBox>
  )
}

export default Write