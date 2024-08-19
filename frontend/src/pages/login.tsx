import { Container, Button, Input } from "../style/common";
import styled from "styled-components";
import { Logo } from "../style/logo";
import { useState } from "react";
import { memberLogin } from "../api/memberApi";
import { useNavigate } from "react-router-dom";
import { Modal } from "../util/modal";
import { modalState } from "../types/modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchMemberData } from "../redux/memberSlice";


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
    p{
        white-space: nowrap;
    }
    p:nth-child(odd):hover{
        cursor: pointer;
        color: var(--main-color);
    }
`;

export const Login : React.FC = () => {  
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modal, setModal] = useState<modalState>({
        confrimState :false,
        cancelState : false, 
        children : "",
        confirm : false
    });
    const dispatch = useDispatch<AppDispatch>(); 

    const LoginHandler = async() => {
        const data = {
            email : email,
            memberPwd : pwd
        }
        const response = await memberLogin(data);
        if(response){
            switch(response.status){
                case 200 :
                    await dispatch(fetchMemberData())
                    navigate("/");
                    break;
                case 401 : 
                    setModalStatus(true);
                    setModal({
                        confrimState : true,
                        cancelState : false,
                        children : "아디디 와 비밀번호를 확인하세요",
                        confirm : false
                    })
                    break;
                default : 
                    setModalStatus(true);
                    setModal({
                        confrimState : true,
                        cancelState : false,
                        children : "아디디 와 비밀번호를 확인하세요",
                        confirm : false
                    })
                    break;
            }
        }else{
            setModalStatus(true)
            setModal({
                confrimState : true,
                cancelState : false,
                children : "아디디 와 비밀번호를 확인하세요",
                confirm : false
            })
        }

        
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        let email = e.target.value;
        setEmail(email);
    }

    const handePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        let pwd = e.target.value;
        setPwd(pwd);
    }

    const handleConfirmClose = () => {
        setModalStatus(false);
    }

    const handleRoute = (e : number) =>{
        switch(e){
            case 1: 
                navigate("/signup");
                break;
            case 2: 
                navigate("/findpwd");
                break;
            case 3:
                navigate("/findemail");
                break;
                
        }
    }

    return(
        <Container>
            <SignUpContainer>
                <Logo/>
                <Input placeholder="이메일을 입력하세요." onChange={handleEmail} value={email}/>
                <Input type="password" placeholder="비밀번호를 입력하세요." onChange={handePwd} value={pwd}/>
                <div className="loginNav">
                    <p onClick={()=>handleRoute(1)}>회원가입</p>
                    <p>|</p>
                    <p onClick={()=>handleRoute(2)}>비밀번호 찾기</p>
                    <p>|</p>
                    <p onClick={()=>handleRoute(3)}>이메일 찾기</p>
                </div>
                <Button onClick={LoginHandler}>로그인</Button>
            </SignUpContainer>
            <Modal open={modalStatus} confirmStatus={modal.confrimState} confirm={handleConfirmClose} closeStatus={modal.cancelState} close={handleConfirmClose} children={modal.children}/>
        </Container>
    );
};