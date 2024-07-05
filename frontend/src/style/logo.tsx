import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = styled.div`
    cursor: pointer;
`;

export const Logo : React.FC = () =>{
    const navigate = useNavigate();

    const goToHome = () =>{
        navigate("/")
    };

    return(
        <LogoContainer onClick={goToHome}>
            <h1>project<span style={{ color: '#F26F23', fontSize: '35px' }}>X</span></h1>
        </LogoContainer>
    );
};