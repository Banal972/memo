import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { Input } from "../../compontent/Input";

const Layout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/image/background.jpg") no-repeat center/cover;
`;

const LoginBox = styled.div`
    width: 350px;
    border-radius: 5px;
    background: #4831A7;
    box-shadow: 7px 6px 7px rgba(0, 0, 0, 0.2);
    color : #fff;
    box-sizing: border-box;
    padding: 75px 25px;

    h1 {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }

    .inputbox {
        margin-top: 20px;

        input {
            margin-top: 5px;
        }

    }

`;



const Check = styled.div`
    margin-top: 15px;
    font-size: 12px;
    input {display:none;}
    label {
        display: flex;
        cursor: pointer;
        align-items: center;
        .check {
            width: 15px;
            height: 15px;
            border: 1px solid #fff;
            margin-right: 10px;
        }
    }
`;

const Button = styled.button`
    all: unset;
    display: block;
    text-align: center;
    margin: 15px auto 0;
    width: 60%;
    height: 40px;
    font-size: 14px;
    background: #fff;
    color : #000;
    border-radius: 1000px;
    cursor: pointer;
`;

function Login() {
    const navigate = useNavigate();
  return (
    <Layout>
        <LoginBox>
            <h1>로그인</h1>
            <div className="inputbox">
                <Input 
                    color="#2a167c"
                    type="text" 
                    placeholder="아이디를 입력해주세요."
                />
                <Input 
                    color="#2a167c"
                    type="password" 
                    placeholder="비밀번호를 입력해주새요."
                />
                <Check>
                    <input type="checkbox" id="save" />
                    <label htmlFor="save"> <div className="check"></div> 아이디 저장</label>
                </Check>
                <Button 
                    type="button"
                    onClick={()=>navigate('/')}
                >로그인</Button>
            </div>
        </LoginBox>
    </Layout>
  )
}

export default Login