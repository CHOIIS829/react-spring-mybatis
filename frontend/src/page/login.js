import styled from "styled-components";
import { Container } from "../style/common";
import { Navigate, useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 15px;
    margin-top: 50px;
    padding: 50px;
    h1{
        cursor: pointer;
    }
    input{
        box-sizing: border-box; 
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 10px;
        outline: none;
        background-color: #E9E9E9;
        padding-left: 10px;
    }
    button{
        box-sizing: border-box; 
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 10px;
        background-color: var(--main-color);
        color: white;
    }
`;

const UtilContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: small;
`;

export const Login = () =>{
    const naviagate = useNavigate();

    const backToMain = () => {
        naviagate("/");
    }

    const moveTo = (url) => {
        naviagate(url);
    }

    return(
        <Container>
            <LoginContainer>
                <h1 onClick={backToMain}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일"/>
                <input placeholder="비밀번호"/>
                <button>로그인</button>
                <UtilContainer>
                    {
                        navi.map((navi)=>
                            <p key={navi.id} onClick={()=>moveTo(navi.url)}>{navi.name}</p>
                        )
                    }
                </UtilContainer>
            </LoginContainer>
        </Container>
    );
}


const navi = [
    {
        id : 1,
        name : "아이디 찾기",
        url : "/findid"
    },
    {
        id : 2,
        name : "비밀번호 찾기",
        url : "findpwd"
    },
    {
        id : 3,
        name : "회원가입",
        url : "/signup"
    }
]