import { IoAdd } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { modalOpen, writeState } from "../Atom/Modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { colorState } from "../Atom/Memo";
import { useEffect, useRef } from "react";
import styled from 'styled-components';
import gsap from "gsap";

const HeaderLayout = styled.header`
  border-right: 1px solid #D9D9D9;
  text-align: center;
  padding: 25px 0;
  height: 100vh;
  box-sizing: border-box;
  position: relative;

  a {
    font-size: 32px;
  }

  .logout {
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    bottom: 25px;
    font-size: 32px;
    cursor: pointer;
    svg {
      color : #907CDE;
    }
  }

`;

const Menu = styled.div`
  .menubox {
    margin: 25px auto 0;
    width: 40px;
    height: 40px;
    border-radius: 10000%;
    background: #000;
    position: relative;
    color : #fff;
    font-size: 24px;
    z-index: 2;
    .box {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const SelectColor = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    width: 20px;
    border-radius: 10000px;
    margin-top: 15px;
    cursor: pointer;
    
    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }

    &.purple {
      background: #907CDE;
    }
    &.orange {
      background: #FF9900;
    }
    &.yellow {
      background: #FFF85A;
    }
    &.red {
      background: #FF3C3C;
    }
    &.skyblue {
      background: #87A9EB;
    }

  }
`;

function Header() {

  // 내비게이터
  const navigate = useNavigate();

  // MenuRef
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBoxRef = useRef(null);

  // 컴포넌트가 다 불러왔을때 GSAP 애니메이션 세팅
  useEffect(()=>{

    menuRef.current?.querySelectorAll('ul li').forEach((item)=>{
      gsap.set(item,{
        y : -50,
        opacity : 0
      })
    })

  },[]);
  
  const menuBoxMouseOverHandler = ()=>{
    menuRef.current?.querySelectorAll('ul li').forEach((item,index)=>{
      gsap.to(item,{
        y : 0,
        opacity : 1,
        duration : 0.4,
        delay : index * 0.2
      })
    })
  }

  const menuMouseLeaveHandler = ()=>{
    menuRef.current?.querySelectorAll('ul li').forEach((item,index)=>{
      gsap.to(item,{
        y : -50,
        opacity : 0,
        duration : 0.4,
        delay : index * 0.15
      })
    })
  }

  const color = useRecoilValue(colorState);
  const setModalState = useSetRecoilState(modalOpen);
  const setWriteState = useSetRecoilState(writeState);

  // 작성페이지, 뷰페이지 모달창
  const viewHanlder = (color : string)=>{
    setWriteState({
      color : color,
      id : null
    });
    setModalState(true);
  }

  return (
    <HeaderLayout>
      <Link to={'/'}><img src={process.env.PUBLIC_URL+"/image/logo.svg"} width={40} alt="로고"/></Link>
      <Menu 
        ref={menuRef}
        onMouseLeave={menuMouseLeaveHandler}
      >
        <div 
          className="menubox" 
          ref={menuBoxRef}
          onMouseOver={menuBoxMouseOverHandler}
        >
            <div className="box">
            <IoAdd/>
            </div>
        </div>
        <SelectColor className='selectColor'>
          {
            color.map((item,index)=><li
              onClick={()=>viewHanlder(item)} 
              className={item} 
              key={index}
            />)
          }
        </SelectColor>
      </Menu>
      <div 
        className="logout"
        onClick={()=>{navigate('/')}}
      ><IoMdExit/></div>
    </HeaderLayout>
  )
}

export default Header