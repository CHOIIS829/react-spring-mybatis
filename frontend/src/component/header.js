// Header.js
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const MenuIcon = styled(FiMenu)`
    font-size: 30px;
    font-weight: bolder;
`;

const CloseIcon = styled(IoMdClose)`
    font-size: 30px;
    font-weight: bolder;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 9vh;
    cursor: pointer;
    padding: 0px 20px;
    background-color: var(--main-color);
    color: white;
    box-shadow: 0px 25px 23px -12px rgba(0,0,0,0.45);
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

export const Header = ({ toggleSideBar, sidebarIsOpen }) => {
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url)
    };


    return(
        <HeaderContainer>
            {sidebarIsOpen ? 
                <CloseIcon onClick={toggleSideBar}/>
                :<MenuIcon onClick={toggleSideBar}/>
            }
            <h2>project<span style={{color:'black', fontSize:'25px'}}>X</span></h2>
            <LoginContainer>
                <p onClick={()=>navigateTo("/login")}>Log in</p> | 
                <p>Sign Up</p>
            </LoginContainer>
        </HeaderContainer>
    );
}
