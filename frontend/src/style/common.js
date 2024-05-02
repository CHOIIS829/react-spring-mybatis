import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .isOpen{
        position: fixed; 
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.6);
    }
`;