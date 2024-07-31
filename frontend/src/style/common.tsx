import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Button = styled.button`
    box-sizing: border-box; 
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: var(--main-color);
    color: white;
    font-weight: bolder;
`;

export const Input = styled.input`
    box-sizing: border-box; 
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: #E9E9E9;
    padding-left: 10px;
`;

export const Shader = styled.div`
    position: fixed; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const Paragraph = styled.p<{ $valid: boolean }>`
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: bolder;
    font-size: 15px;
    color: ${props => props.$valid ? 'green' : 'red'};

`;