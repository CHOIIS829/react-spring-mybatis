import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/main";
import { Header } from "./component/header";
import { Login } from "./page/login";
import { Sidebar } from "./component/sidebar";
import { useState } from "react";

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
                        <Sidebar toggleSideBar={toggleSideBar} sidebarIsOpen={sidebarIsOpen} />
                        <Main sidebarIsOpen={sidebarIsOpen}/>
                    </>
                }/>
                <Route path="/login" element={
                    <Login/>
                }/>
            </Routes>
        </BrowserRouter>        
    );
}
