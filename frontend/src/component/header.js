import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
`;

const NaviContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    
`;

export const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const navigateTo = (url) => {
        navigate(url)
    };

    return(
        <HeaderContainer>
            <h2>Project<span style={{color:'black', fontSize:'25px'}}>X</span></h2>
            <NaviContainer>
            {
                navi.map((navi)=>
                    <p key={navi.id} onClick={()=>navigateTo(navi.url)}>{navi.name}</p>
                )
            }
            </NaviContainer>
        
            <LoginContainer>
                <p onClick={handleLogin}>Log in</p>
                <p>Sign Up</p>
            </LoginContainer>
        </HeaderContainer>
    );
}

const navi = [
    {
        id : 1,
        name : "메뉴1",
        url : "/menu1"
    },
    {
        id : 2,
        name : "메뉴2",
        url : "/menu2"
    },
    {
        id : 3,
        name : "메뉴3",
        url : "/menu3"
    },
    {
        id : 4,
        name : "매뉴4",
        url : "/menu4"
    }
]





const naviData = {
    
}