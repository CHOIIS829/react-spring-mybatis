import { Container } from "../style/common";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../redux/store";
import { useEffect } from "react";

export const Main : React.FC = () => {  


    
    return(
        <>
            <Container>
                <h1>This is main page</h1>
            </Container>
        </>
    );
};