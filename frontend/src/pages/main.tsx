import { Container } from "../style/common";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../redux/store";
import { useEffect } from "react";

export const Main : React.FC = () => {  
    const dispatch = useDispatch<AppDispatch>();
    const member = useSelector((state: RootState) => state.member.member);
    const loading = useSelector((state: RootState) => state.member.loading);
    const error = useSelector((state: RootState) => state.member.error);
    
    useEffect(()=>{
        console.log(member);
        console.log(loading);
        console.log(error);
    },[])

    
    return(
        <>
            <Container>
                <h1>This is main page</h1>
            </Container>
        </>
    );
};