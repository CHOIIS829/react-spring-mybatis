import styled from "styled-components";
import { Container } from "../style/common";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../util/modal";

const LoginContainer = styled.form`
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
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [children, setChildren] = useState("");
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    },[]);

    const moveTo = (url) => {
        naviagate(url);
    }

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
  
    const handelPwd = (e) =>{
        setPwd(e.target.value);
    }

    
    return(
        <>
        <Container>
            <LoginContainer>
                <h1 onClick={()=>moveTo("/")}>project<span style={{color:'#F26F23', fontSize:'35px'}}>X</span></h1>
                <input placeholder="이메일" ref={inputRef} onChange={handleEmail} autoComplete="username"/>
                <input placeholder="비밀번호" type="password" onChange={handelPwd} autoComplete="current-password" />
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
        <Modal open={openModal} children={children} confirmType={true} confirm={()=>setOpenModal(false)}/>
        </>
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
        url : "/findpwd"
    },
    {
        id : 3,
        name : "회원가입",
        url : "/signup"
    }
]