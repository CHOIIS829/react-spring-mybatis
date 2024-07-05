import styled from "styled-components";
import { Container, Button, Input, Paragraph } from "../style/common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../style/logo";
import { memberJoin } from "../api/memberApi";
import { Modal } from "../util/modal";

const LoginContainer = styled.div`
    border: 2px solid black;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    gap: 30px;
    padding: 20px 70px;
    margin: 60px;
`;

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [confirm, setConfirm] = useState<{ [key: string]: boolean }>({
        confirmEmail: false,
        confirmPassword: false,
        confirmRePassword: false,
        confirmName: false
    });

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        updateConfirmState('confirmEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        updateConfirmState('confirmPassword', value.length >= 6); 
    }

    const onChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRePassword(value);
        updateConfirmState('confirmRePassword', value === password);
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        updateConfirmState('confirmName', value.length > 0);
    }

    const updateConfirmState = (key: string, isValid: boolean) => {
        setConfirm(prev => ({ ...prev, [key]: isValid }));
    }

    const goToSignUp = async() =>{
        const allConfirmed = Object.values(confirm).every(value => value === true);

        if(allConfirmed){
            const data = {
                email : email, 
                memberPwd : password,
                memberName : name
            }
            const response = await memberJoin(data);
            console.log(response);
   
        }else{
            console.log("false");
        }
    }

    const handleConfirm = () => {
        console.log("hello");
    };

    const handleClose = () => {
        console.log("Modal closed");
    };

    return (
        <Container> 
            <LoginContainer>
                <>
                    <Logo/>
                    <Input type="text" placeholder="이메일을 입력하세요." value={email} onChange={onChangeEmail} />
                    {console.log(confirm.confirmEmail)}
                    {email.length > 0 ? confirm.confirmEmail ? <Paragraph $valid={true}>true</Paragraph> : <Paragraph $valid={false}>false</Paragraph> : null}
                    <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onChangePassword} />
                    {password.length > 0 ? confirm.confirmPassword ? <Paragraph $valid={true}>true</Paragraph> : <Paragraph $valid={false}>false</Paragraph> : null}
                    <Input type="password" placeholder="비밀번호를 다시 입력하세요." value={rePassword} onChange={onChangeRePassword} />
                    {rePassword.length > 0 ? confirm.confirmRePassword ? <Paragraph $valid={true}>true</Paragraph> : <Paragraph $valid={false}>false</Paragraph> : null}
                    <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={onChangeName} />
                    {name.length > 0 ? confirm.confirmName ? <Paragraph $valid={true}>true</Paragraph> : <Paragraph $valid={false}>false</Paragraph> : null}
                    <Button onClick={goToSignUp}>로그인</Button>
                </>
            </LoginContainer>
            <Modal open={true} confirm={handleConfirm} close={handleClose} children="testing"/>
        </Container>
    );
}
