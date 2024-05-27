import { useNavigate } from 'react-router-dom';
import {Container} from '../style/common'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Modal } from '../util/modal';
import { MemberApi } from '../api/memberApi';

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
    const [openModal, setOpenModal] = useState(); 
    const [children, setChildren] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        setChildren("약관 동의 땡땡땡");
        setOpenModal(true);
    },[]);

    const moveTo = (url) => {
        navigate(url);
    } 
    
    const handleEmail = (e) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(regex.test(e.target.value)){
            setEmail(e.target.value);
        }else{
            console.log(false);
        }
    }

    const handlePassword = (e) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if(regex.test(e.target.value)){
            setPassword(e.target.value);
        }else{
            console.log(false)
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            memberPwd: password,
            memberName: "test"
        };
        try {
            console.log("Sign-up data:", data);
            const response = MemberApi.signUp(data);
            console.log("API response:", response);
            // Handle successful response, e.g., navigate to another page, show success message, etc.
        } catch (error) {
            console.error("Error in handleSignUp:", error);
            // Handle error, e.g., show error message to the user
        }
    }; 

    return(
        <Container>
            <SignUpContainer>
                <h1 onClick={()=>moveTo("/")}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일 을 입력하세요." autoComplete="username" onChange={(e)=>handleEmail(e)}/>
                <input placeholder="비밀번호" type="password" autoComplete="current-password" onChange={(e)=>handlePassword(e)}/>
                <button onClick={(e)=>handleSignUp(e)}>회원가입</button>
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