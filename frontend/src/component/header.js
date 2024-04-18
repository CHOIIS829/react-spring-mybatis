import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border: 1px solid black;
`;

export const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return(
        <HeaderContainer>
            <h1>Logo</h1>
            <h1 onClick={handleLogin}>Log in</h1>
            <h1>Sign Up</h1>
        </HeaderContainer>
    );
}