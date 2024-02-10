import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Check, Input, Textarea } from '../../../compontent/Input';
import { ColorCircle } from '../../../compontent/Style';
import { modalOpen, writeState } from '../../../Atom/Model';
import styled from 'styled-components'
import { memoState } from '../../../Atom/Memo';
import { IoCheckmark } from "react-icons/io5";

type Props = {
  id? : number
}

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

function Write({id} : Props) {

  const setModalState = useSetRecoilState(modalOpen);
  const writeResult = useRecoilValue(writeState);
  const memoData = useRecoilValue(memoState);
/*   const [result,setResult] = useState<memoType>({
    id : 0,
    color : "purple",
    title : "",
    desc : "",
    list : []
  });

  useEffect(()=>{

    if(id){
      const filter = memoData.filter((item)=>item.id === id);
      setResult(filter[0]);
    }

  },[id]); */

  return (
    <WriteBox>
        <div className="back" onClick={()=>setModalState(false)}/>
        <div className="cont">
            <div className="select-box">
                선택된 컬러
                <div className="select-color">
                    {
                    ["purple","yellow","orange","red","skyblue"].map((item,index)=><ColorCircle select={item === writeResult.color ? writeResult.color : undefined} color={item} key={index}/>)
                    }
                </div>
            </div>
            <div className="title-box">
                제목
                <Input 
                    style={{border : "1px solid #ccc"}}
                    color='#fff'
                    fontColor='#000'
                    type="text" 
                    placeholder='제목을 입력해주세요.'
                    // defaultValue={result.title}
                />
            </div>
            <div className="text-box">
                설명
                <Textarea 
                  placeholder='설명을 입력해주세요.' 
                  // defaultValue={result.desc}
                />
            </div>
            <div className="add">
              <Check><IoCheckmark/></Check>
              <input type="text" placeholder='할 일을 입력해주세요.' />
            </div>
            <Button>등록하기</Button>
        </div>
    </WriteBox>
  )
}

export default Write