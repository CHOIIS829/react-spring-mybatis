import styled from "styled-components";

// 모달창 수정 필요 animation open 시 fade effect 적용 되나 닫으면 적용 필요. 
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
        animation: modal-bgs-show 0.8s
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
        padding: 60px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal > section > footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 15px 15px 15px;
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

export const Modal = (props) => {
    const {open, confirm, close, confirmType, children, closeType} = props;

    return(
        <ModalContainer>
            <div className={open ? "openModal modal" : "modal"}>
            <section>
                <header>
                <p>project<span style={{color:'black', fontSize:'20px'}}>X</span></p>
                </header>
                <main>{children}</main>
                <footer>
                    {confirmType && <button onClick={confirm}>확인</button>}
                    {closeType && <button onClick={close}>취소</button>}
                </footer>
            </section>
            </div>
        </ModalContainer>
    );
}