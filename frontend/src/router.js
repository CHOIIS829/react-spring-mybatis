import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/main";
import { Header } from "./component/header";
import { Login } from "./page/login";
import { Sidebar } from "./component/sidebar";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: auto;
    height: auto;
`;
export const Router = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(false);
    
    const toggleSideBar = () => {
        setSidebarOpen(!sidebarIsOpen);
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header toggleSideBar={toggleSideBar} sidebarIsOpen={sidebarIsOpen}/>
                        <Container>
                            <Sidebar sidebarIsOpen={sidebarIsOpen} />
                            <Main/>
                        </Container>
                    </>
                }/>
                <Route path="/login" element={
                    <Login/>
                }/>
            </Routes>
        </BrowserRouter>        
    );
}
