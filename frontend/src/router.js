import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/main";
import { Header } from "./component/header";
import { Login } from "./page/login";

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header/>
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