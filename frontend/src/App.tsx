import React, { useEffect } from 'react';
import {Router} from "./router";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchMemberData } from './redux/memberSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const memberState = useSelector((state: RootState) => state.member);
  
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
       dispatch(fetchMemberData());
    }
  },[])

  return(
    <>
      <Router/>
    </>
  );
}



export default App;