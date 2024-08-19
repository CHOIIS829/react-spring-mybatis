import React from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SidebarProps } from "../types/component";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { resetMember } from "../redux/memberSlice";

const HeaderContainer = styled.div`
    height: auto;
    background-color: var(--main-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0px 30px;

`;

const MenuIcon = styled(FiMenu)`
    font-size: 30px;
    font-weight: bolder;
    color: black;
    cursor: pointer;
    &:hover{
        color: white;
    }
`;

const LoginContainer = styled.div`
    display: flex;
    gap: 7px;
    font-weight: bolder;
    font-size: 17px;
    color: black;
    p:nth-child(odd){
        cursor: pointer;
    };
    p:nth-child(odd):hover{
        color: white;
    };
`;


const LoginRoute: RouteItem[] = [
    {path : '/login', route : 'Login'},
    {path : '', route : '|'},
    {path : '/signup', route : 'SignUp'}
];

interface RouteItem {
    path: string;
    route: string;
}

export const Header : React.FC<SidebarProps>  = ({ toggleSideBar, sideBar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); 

    const goToDestination = (path: string) => {
        if (path) {
            navigate(path);
        }
    };

    const memberState = useSelector((state: RootState) => state.member);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(resetMember());
    }

    const isLoggedin  = () => {
        if(memberState.member){
            return(
                <>
                    <p>{memberState.member?.memberName}</p> 
                    <p>|</p>
                    <p onClick={handleLogout}>Logout</p>
                </>
            ) 
        }else{
            return LoginRoute.map((value : RouteItem) =>
                <p key={value.route} onClick={()=>goToDestination(value.path)}>{value.route}</p>
            )
        }
    };
    
    return(
        <HeaderContainer>
            <MenuIcon onClick={toggleSideBar}/>
            <h2>project<span style={{color:'black', fontSize:'25px'}}>X</span></h2>
            <LoginContainer>
                {isLoggedin()}
            </LoginContainer>

        </HeaderContainer>
    );
}
