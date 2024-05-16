import { useNavigate } from 'react-router-dom';
import {Container} from '../style/common'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Modal } from '../util/modal';

const SignUpContainer = styled.form`
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 15px;
    margin-top: 10%;
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

export const SignUp = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true); 
    const [children, setChildren] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(()=>{
    },[]);

    const moveTo = (url) => {
        navigate(url);
    }

    const handleSignUp = () => {
    }   

    return(
        <Container>
            <SignUpContainer>
                <h1 onClick={()=>moveTo("/")}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일 을 입력하세요." autoComplete="username" onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="비밀번호" type="password" autoComplete="current-password" onChange={(e)=>setPwd(e.target.value)}/>
                <button onClick={handleSignUp}>회원가입</button>
            </SignUpContainer>
            <Modal 
                open={openModal} 
                children={children} 
                confirmType={true} 
                confirm={()=>setOpenModal(false)}
            />
        </Container>
    );
}