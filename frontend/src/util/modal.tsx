import { useNavigate } from "react-router-dom";
import { ModalProps } from "../types/util";
import styled from "styled-components";

const ModalContainer = styled.div`
    .modal {
        display: none; 
        position: fixed; 
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.6);
        animation: modal-bg-show 0.8s
    }
    .openModal {
        display: flex; 
        align-items: center;
        animation: modal-show 0.8s;
    }
    .modal > section {
        width: 90%;
        max-width: 400px;
        text-align: center;
        margin: 0 auto;
        border-radius: 0.3rem;
        overflow: hidden;
    }
    .modal > section > header {
        position: relative;
        padding: 10px 10px 10px;
        background-color: var(--main-color);
        display: flex;
        justify-content: center;
    }
    .modal > section > header > p {
        margin: 0px;
        color: white;
        font-weight: bolder;
    }
    .modal > section > main {
        padding: 30px;
        font-size: 15px;
        background-color: white;
        height: 200px;
        overflow-y: scroll;
    }
    .modal > section > main::-webkit-scrollbar{
        width: 5px;
    }

    .modal > section > footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 15px 15px 15px;
        gap: 30px;
    }
    .modal > section > footer > button {
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: bold;
        background-color: transparent;
        cursor: pointer;
    }
    @keyframes modal-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes modal-bg-unshow {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

export const Modal: React.FC<ModalProps> = (props) => {
    const { open, confirmStatus ,confirm, closeStatus, close, children } = props;    

    const navigate = useNavigate();

    const goToRoute = (e:string) => {
        navigate(e);
    }

    return(
        <ModalContainer>
            <div className={open ? "openModal modal" : "modal"}>
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
            </div>
        </ModalContainer>
    );
}
