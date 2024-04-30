import { Container } from "../style/common"
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";

const SidebarContainer = styled.div`
    min-width: 250px;
    max-width: 250px;
    background: #FFBB70;
    text-align: center;
    color: white;
    margin-left: ${props => props.$sidebar ? '0' : '-250px'};
    transition: margin-left 0.5s;
    h2{
        cursor: pointer;
    }
    h2:hover{
        color: black;
    }
`;



export const Sidebar = ({sidebarIsOpen}) =>{
    return(
        <SidebarContainer $sidebar={sidebarIsOpen}>
            <h2>Q&A</h2>
            <h2>Recruit</h2>
        </SidebarContainer>
    
    )
}