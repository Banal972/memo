import styled from 'styled-components'
import { FaPen } from "react-icons/fa";
import { Button, Input, Textarea } from '../../compontent/Input';

interface MemoType {
  color? : "purple" | "yellow" | "orange" | "red" | "skyblue"
}

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

const Memo = styled.div<MemoType>`

  width : 250px;
  background: ${props=>colorHandler(props.color).back};
  color: ${props=>colorHandler(props.color).font};
  box-sizing: border-box;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 25px 15px;

  h1 {
    font-size: 20px;
  }

  .desc {
    margin-top: 20px;
    word-break: keep-all;
    line-height: 1.3;
  }

  .checkList {
    margin-top: 10px;
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
  return (
    <>
      <div className='main'>

        <SearchBox type='input' placeholder='제목을 입력해주세요.'/>

        <Grid>
          <Memo color='purple'>
            <h1>메모 사이트 구축하기</h1>
            <p className="desc">
              포트폴리오의 메모 사이트를 구축합니다.
            </p>
            <div className='checkList'><input type="checkbox" name="" id="" /> 체크리스트1 입니다.</div>
            <div className='checkList'><input type="checkbox" name="" id="" /> 체크리스트2 입니다.</div>
            <div className='checkList'><input type="checkbox" name="" id="" /> 체크리스트3 입니다.</div>
            <div className="view"><FaPen/></div>
          </Memo>
          <Memo color='yellow'>
            <h1>제목</h1>
            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusantium qui impedit id minus eos explicabo recusandae tempore in deserunt, temporibus sint reprehenderit iste doloremque expedita ea nisi doloribus libero.
              Neque vero doloribus ab id ullam quia aliquam corporis, itaque sed quaerat, natus ut, saepe fugiat sint beatae odit. Dicta sint molestiae beatae illo doloremque eos aut ut voluptas eveniet.
            </p>
            <div className="view"><FaPen/></div>
          </Memo>
          <Memo color="skyblue">
            <h1>제목</h1>
            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusantium qui impedit id minus eos explicabo recusandae tempore in deserunt, temporibus sint reprehenderit iste doloremque expedita ea nisi doloribus libero.
              Neque vero doloribus ab id ullam quia aliquam corporis, itaque sed quaerat, natus ut, saepe fugiat sint beatae odit. Dicta sint molestiae beatae illo doloremque eos aut ut voluptas eveniet.
            </p>
            <div className="view"><FaPen/></div>
          </Memo>
          <Memo color="orange">
            <h1>제목</h1>
            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusantium qui impedit id minus eos explicabo recusandae tempore in deserunt, temporibus sint reprehenderit iste doloremque expedita ea nisi doloribus libero.
              Neque vero doloribus ab id ullam quia aliquam corporis, itaque sed quaerat, natus ut, saepe fugiat sint beatae odit. Dicta sint molestiae beatae illo doloremque eos aut ut voluptas eveniet.
            </p>
            <div className="view"><FaPen/></div>
          </Memo>
          <Memo color="red">
            <h1>제목</h1>
            <p className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusantium qui impedit id minus eos explicabo recusandae tempore in deserunt, temporibus sint reprehenderit iste doloremque expedita ea nisi doloribus libero.
              Neque vero doloribus ab id ullam quia aliquam corporis, itaque sed quaerat, natus ut, saepe fugiat sint beatae odit. Dicta sint molestiae beatae illo doloremque eos aut ut voluptas eveniet.
            </p>
            <div className="view"><FaPen/></div>
          </Memo>
        </Grid>
        
        <WriteBox>
          <div className="cont">
            제목
            <Input 
              style={{border : "1px solid #ccc"}}
              color='#fff'
              fontColor='#000'
              type="text" 
              placeholder='제목을 입력해주세요.'
            />
            <div className="text-box">
              설명
              <Textarea placeholder='설명을 입력해주세요.' />
            </div>
            <div className="add">
              <div className="check"></div>
              <input type="text" placeholder='할 일을 입력해주세요.' />
            </div>
            <div className="add">
              <div className="check"></div>
              <input type="text" placeholder='할 일을 입력해주세요.' />
            </div>
            <div className="add">
              <div className="check"></div>
              <input type="text" placeholder='할 일을 입력해주세요.' />
            </div>
            <Button>등록하기</Button>
          </div>
        </WriteBox>

      </div>
    </>
  )
}


const WriteBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  &::after {
    content: '';
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
      margin-top: 10px;
    }

    button {
      margin-top: 30px;
    }

    .text-box {
      margin-top: 15px;
      textarea {
        margin-top: 5px;
      }
    }

    .add {
      margin-top: 15px;
      display: flex;
      align-items: center;

      + .add {
        margin-top: 10px;
      }
      .check {
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
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

  }

`

export default Main