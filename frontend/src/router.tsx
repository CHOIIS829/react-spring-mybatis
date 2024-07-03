import { BrowserRouter,Routes, Route } from "react-router-dom";
import {Main} from "./pages/main"
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { useState } from "react";
import { Login } from "./pages/login";

export const Router : React.FC = () => {
    const [sideBar, setSideBar] = useState<boolean>(false);

    const toggleSlideBar = () => {
        setSideBar(!sideBar);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header toggleSideBar={toggleSlideBar} sideBar={sideBar}/>
                        <Sidebar toggleSideBar={toggleSlideBar} sideBar={sideBar}/>
                        <Main/>
                    </>
                }/>
                <Route path="/login" element={
                    <Login/>
                }/>
            </Routes>
        </BrowserRouter>
    );

}