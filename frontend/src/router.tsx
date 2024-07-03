import { BrowserRouter,Routes, Route } from "react-router-dom";
import {Main} from "./pages/main"
import { Header } from "./components/header";

export const Router : React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header/>
                        <Main/>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    );

}