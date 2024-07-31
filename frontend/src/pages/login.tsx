import { Container, Button, Input } from "../style/common";
import styled from "styled-components";
import { Logo } from "../style/logo";
import { useState } from "react";
import { memberLogin } from "../api/memberApi";

const SignUpContainer = styled.div`
    border: 2px solid black;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    gap: 30px;
    padding: 20px 70px;
    margin: 100px;
    .loginNav{
        display: flex;
        gap: 10px;
        font-size: small;

    }
`;

export const Login : React.FC = () => {  
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const LoginHandler = async() => {
        const data = {
            email : email,
            memberPwd : pwd
        }
        const response = await memberLogin(data);
        const accessToken = response.headers; 
        console.log(accessToken);
        console.log(response);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        let pwd = e.target.value;
        setPwd(pwd);
    }

    return(
        <Container>
            <SignUpContainer>
                <Logo/>
                <Input placeholder="이메일을 입력하세요." onChange={handleEmail} value={email}/>
                <Input placeholder="비밀번호를 입력하세요." onChange={handePwd} value={pwd}/>
                <div className="loginNav">
                    <p>회원가입</p>
                    <p>|</p>
                    <p>비밀번호 찾기</p>
                </div>
                <Button onClick={LoginHandler}>로그인</Button>
            </SignUpContainer>
        </Container>
    );
};