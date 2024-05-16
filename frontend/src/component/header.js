// Header.js
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const MenuIcon = styled(FiMenu)`
    font-size: 30px;
    font-weight: bolder;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0px 30px;
    background-color: var(--main-color);
    color: white;
`;

const LoginContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 16px;
    font-weight: bolder;
    p:hover{
        color: black;
    }
`;



export const Header = ({ toggleSideBar }) => {
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url)
    };


    return(
        <HeaderContainer>
            <MenuIcon onClick={toggleSideBar}/>
            <h2>project<span style={{color:'black', fontSize:'25px'}}>X</span></h2>
            <LoginContainer>
                <p onClick={()=>navigateTo("/login")}>Log in</p> | 
                <p onClick={()=>navigateTo("/signup")}>Sign Up</p>
            </LoginContainer>
        </HeaderContainer>
    );
}
