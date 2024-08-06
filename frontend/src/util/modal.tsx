import { useNavigate } from "react-router-dom";
import { ModalProps } from "../types/util";
import styled from "styled-components";

const ModalContainer = styled.div<{ open: boolean }>`
    position: fixed; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    opacity: ${props => (props.open ? 1 : 0)};
    pointer-events: ${props => (props.open ? 'auto' : 'none')};
    transition: opacity 0.5s ease-in;
    align-items: center;    
    section {
        opacity: ${props => (props.open ? 1 : 0)};
        width: 90%;
        max-width: 400px;
        text-align: center;   
        margin: 0 auto;
        border-radius: 0.3rem;
        overflow: hidden;
    }
    section > header {
        position: relative;
        padding: 10px 10px 10px;
        background-color: var(--main-color);
        display: flex;
        justify-content: center;
    }
    section > header > p {
        margin: 0px;
        color: white;
        font-weight: bolder;
    }
    section > main {
        padding: 30px;
        font-size: 15px;
        background-color: white;
        max-height: 400px;
        overflow-y: scroll;
    }
    section > main::-webkit-scrollbar{
        width: 5px;
    }
    section > footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 15px 15px 15px;
        gap: 30px;
    }
    section > footer > button {
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: bold;
        background-color: transparent;
        cursor: pointer;
    }
`;

export const Modal: React.FC<ModalProps> = (props) => {
    const { open, confirmStatus ,confirm, closeStatus, close, children } = props;    

    return(
        <ModalContainer open={open}>
            <section>
                <header>
                    <p>project<span style={{color:'black', fontSize:'20px'}}>X</span></p>
                </header>
                <main>{children}</main>
                <footer>
                {confirmStatus && <button onClick={confirm}>확인</button>}
                {closeStatus && <button onClick={close}>취소</button> }
                </footer>
            </section>
        </ModalContainer>
    );
}
