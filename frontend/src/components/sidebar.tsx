import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { SidebarProps } from "../types/component";

const SidebarContainer = styled.div<{ $sidebar: boolean }>`
    min-width: 250px;
    max-width: 250px;
    background: var(--main-color);
    text-align: center;
    color: white;
    margin-left: ${props => props.$sidebar ? '0' : '-250px'};
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 3;
    transition: margin-left 0.5s;
    h2{
        cursor: pointer;
    }
    h2:hover{
        color: black;
    }
    .controlContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
`;

const Close = styled(IoMdClose)`
    position: absolute;
    right: 10px;
    font-size: 25px;
    cursor: pointer;
    &:hover{
        color: black;
    }
`;


export const Sidebar: React.FC<SidebarProps> = ({ toggleSideBar, sideBar }) => {
	return (
		<SidebarContainer $sidebar = {sideBar}>
		<div className="controlContainer">
			<h1>project<span style={{color:'black', fontSize:'35px'}}>X</span></h1>
			<Close onClick={toggleSideBar}/>
		</div>
		<h2>Q&A</h2>
		<h2>Recruit</h2>
		</SidebarContainer>	
	);
};

