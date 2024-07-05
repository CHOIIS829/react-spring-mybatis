import { ModalProps } from "../types/util";
import { Logo } from "../style/logo";
import styled from "styled-components";

const ModalContainer = styled.div`
    .closeModal{
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.6);
        animation: modal-bg-show 0.8s;
    }
    .openModal{
        display: flex;
        align-items: center;
        animation: modal-show 0.8s;
    }
    .closeModal > section {
        width: 90%;
        max-width: 490px;
        text-align: center;
        margin: 0 auto;
        border-radius: 0.3rem;
        overflow: hidden;
    }
    .closeModal > section > header {
        position: relative;
        padding: 10px 10px 10px;
        background-color: var(---main-color);
        display: flex;
        justify-content: center;
    }
    .closeModal > section > main {
        padding: 60px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 15px 15px;
    }
    .closeModal > section > footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 15px 15px 15px;
    }
    .closeModal > section > footer > button {
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: bold;
        background-color: transparent;
        cursor: pointer;
    }
`;

export const Modal: React.FC<ModalProps> = (props) => {
    const { open, confirm, close, children } = props;    

    return(
        <ModalContainer>
            <div className={open ? "openModal" : "closeModal"}>
            <section>
                <header>
                    <Logo/>
                </header>
                <main>{children}</main>
                <footer>
                    <button onClick={confirm}>확인</button>
                    <button onClick={close}>취소</button>
                </footer>
            </section>
            </div>
        </ModalContainer>
    );
}
