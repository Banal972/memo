import { IoAdd } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { modalOpen, writeState } from "../Atom/Model";
import { useSetRecoilState } from "recoil";
import styled from 'styled-components';

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
  }

`;

const Menu = styled.div`
  .menubox {
    margin: 25px auto 0;
    width: 50px;
    height: 50px;
    border-radius: 10000%;
    background: #000;
    position: relative;
    color : #fff;
    font-size: 24px;
    .box {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
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

    const setModalState = useSetRecoilState(modalOpen);
    const setWriteState = useSetRecoilState(writeState);
    const navigate = useNavigate();

    const viewHanlder = (color : string)=>{
      setWriteState(prev=>(
        {
          color : color
        }
      ))
      setModalState(true);
    }

  return (
    <HeaderLayout>
        <Link to={'/'}><img src='/image/logo.svg' width={40}/></Link>
        <Menu>
        <div className="menubox">
            <div className="box">
            <IoAdd/>
            </div>
        </div>
        <SelectColor className='selectColor'>
            {
                ['purple','yellow','orange','red','skyblue'].map((item,index)=><li
                    onClick={()=>viewHanlder(item)} 
                    className={item} 
                    key={index}
                />)
            }
        </SelectColor>
        </Menu>
        <div 
        className="logout"
        onClick={()=>{navigate('/login')}}
        ><IoMdExit/></div>
    </HeaderLayout>
  )
}

export default Header