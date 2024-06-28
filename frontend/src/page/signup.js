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
    width: 25%;
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
    p{
        margin: 0;
        font-weight: bolder;
        font-size: 13px;
    }
`;

export const SignUp = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(); 
    const [children, setChildren] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState(false);
    const [rePwd, setRePwd] = useState("");
    const [confirmRePwd, setConfirmRePwd] = useState(false);
    const [name , setName] = useState("");
    let duplicate = "";

    useEffect(()=>{
        // setChildren("약관 동의 땡땡땡");
        // setOpenModal(true);
    },[]);

    const moveTo = (url) => {
        navigate(url);
    } 
    
    const handleEmail = (e) => {
        const emailValue = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(emailValue);
        if (regex.test(emailValue)) {
            setConfirmEmail(true);
        } else {
            setConfirmEmail(false);
        }
    }

    const handlePwd = (e) => {
        const pwdValue = e.target.value;
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setPwd(pwdValue);
        if (regex.test(pwdValue)) {
            setConfirmPwd(true);
        } else {
            setConfirmPwd(false);
        }
    }

    const handleRePwd = (e) => {
        const rePwdValue = e.target.value;
        setRePwd(rePwdValue);
        if(pwd === rePwdValue){
            setConfirmRePwd(true);
        }else{
            setConfirmRePwd(false);
        }
    }

    const handleSignUp = async(e) => {
        e.preventDefault();

        const data = {
             email: email,
             memberPwd: pwd,
             memberName: "test"
         };
         if(confirmEmail && confirmRePwd){
             try {
                 const response = await MemberApi.signUp(data);
                 if(response.status === 200){
                     setOpenModal(true);
                     setChildren(response.data.message);
                 }
             } catch (error) {
                duplicate = error.response.data.message;
                setOpenModal(true);
                setChildren(error.response.data.message);
             }
         }else{
          setOpenModal(true);
          setChildren("모든 빈칸을 기재하세요.");
        }
    }; 

    const checkConfirm = () => {
        let isValid = confirmEmail && confirmRePwd;
        console.log(duplicate);
        if(isValid && name.length > 0 && duplicate){
            navigate("/login");
        }else{
            setOpenModal(false);
        }
    }

    return(
        <Container>
            <SignUpContainer>
                <h1 onClick={()=>moveTo("/")}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일 을 입력하세요." autoComplete="username" onChange={(e)=>handleEmail(e)} value={email}/>
                {email.length > 0 ? confirmEmail ? <p style={{color : 'green'}}>올바른 형식입니다.</p> : <p style={{color : 'red'}}>이메일 형식으로 입력해주세요.</p> : null}
                <input placeholder="비밀번호" type="password" autoComplete="current-password" onChange={(e)=>handlePwd(e)} value={pwd}/>
                {pwd.length > 0 ? confirmPwd ? <p style={{color : 'green'}}>안정한 비밀번호에요.</p> : <p style={{color : 'red'}}>숫자, 영문자, 특수문자를 포함한 8~25자리로 입력해주세요.</p> : null}
                <input placeholder="비밀번호 확인" type="password" autoComplete="current-password" onChange={(e)=>handleRePwd(e)} value={rePwd}/>
                {rePwd.length > 0 ? confirmRePwd ? <p style={{color : 'green'}}>비밀번호가 일치 합니다.</p> : <p style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</p> : null}
                <input placeholder="이름 을 입력하세요." autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <button onClick={(e)=>handleSignUp(e)}>회원가입</button>
            </SignUpContainer>
            <Modal 
                open={openModal} 
                children={children} 
                confirmType={true} 
                confirm={checkConfirm}
            />
        </Container>
    );
}