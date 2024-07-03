import styled from "styled-components";
import { Container } from "../style/common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginContainer = styled.div`
    border: 2px solid yellow;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    margin: 50px;
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

export const Login : React.FC = () => {  
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [data, setData] = useState<{ [key: string]: boolean }>({
        confirmEmail: false,
        confirmPassword: false,
        confirmRePassword: false,
        confirmName : false
    });

    const onChangeEmail = (e:string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(regex.test(e)){
            setEmail(e)
            setData({ ...data, confirmEmail: true });
        }else{
            return;
        }
    }

    const onChangePassowrd = (e:string) => {
        setPassword(e)
    }

    const onChangeRePassowrd = (e:string) => {
        setRePassword(e);
    }

    const onChangeName = (e:string) => {
        setName(e);
    }

    return(
        <>
        <Container>
            <LoginContainer>
                <h1>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input type="text"  placeholder="이메일을 입력하세요."  onChange={(e) => onChangeEmail(e.target.value)}/>
                <input placeholder="비밀번호를 입력하세요." value={password} onChange={(e) =>  onChangePassowrd(e.target.value)}/>
                <input placeholder="비밀번호를 다시 입력하세요." value={rePassword} onChange={(e) => onChangeRePassowrd(e.target.value)}/>
                <input placeholder="이름을 입력하세요." value={name} onChange={(e) => onChangeName(e.target.value)}/>
                <button>로그인</button>
            </LoginContainer>
        </Container>
        </>
    );
}