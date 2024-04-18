import styled from "styled-components";
import { Container } from "../style/common";

const LoginContainer = styled.div`
    width: 27%;
    height: 570px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 30px;
    border-radius: 15px;
    margin-top: 50px;
`

export const Login = () =>{
    return(
        <Container>
            <LoginContainer>
                <h2>Project<span style={{color:'#F26F23', fontSize:'25px'}}>X</span></h2>
                <input placeholder="이메일"/>
                <input placeholder="비밀번호"/>
                <button>로그인</button>
                <div>
                    <p>아이디(이메일)찾기</p>
                    |
                    <p>비밀번호 찾기</p>
                    |
                    <p>회원가입</p>
                </div>
            </LoginContainer>
        </Container>
    );
}