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
    gap: 20px;
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
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(()=>{
        //setChildren("약관 동의 땡땡땡");
        //setOpenModal(true);
    },[]);

    const moveTo = (url) => {
        navigate(url);
    } 
    
    const handleEmail = (e) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(regex.test(e.target.value)){
            setConfirmEmail(true);
            setEmail(e.target.value);
        }else{
            setConfirmEmail(false);
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

    const handleSignUp = async(e) => {
        e.preventDefault();

        const data = {
            email: email,
            memberPwd: password,
            memberName: "test"
        };
        if(confirmEmail){
            try {
                const response = await MemberApi.signUp(data);
                if(response.status === 200){
                    setOpenModal(true);
                    setChildren(response.data.message);
                }
            } catch (error) {
                setOpenModal(true);
                setChildren(error.response.data.message);
            }
        }else{
            setOpenModal(true);
            setChildren("기재하삼.");
        }
    }; 

    return(
        <Container>
            <SignUpContainer>
                <h1 onClick={()=>moveTo("/")}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일 을 입력하세요." autoComplete="username" onChange={(e)=>handleEmail(e)}/>
                {console.log(email.length)}
                <input placeholder="비밀번호" type="password" autoComplete="current-password" onChange={(e)=>handlePassword(e)}/>
                <input placeholder="비밀번호 확인" type="password" autoComplete="current-password" onChange={(e)=>handlePassword(e)}/>
                <input placeholder="이름 을 입력하세요." autoComplete="name"/>
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