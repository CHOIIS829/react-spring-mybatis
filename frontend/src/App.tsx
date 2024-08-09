import React from 'react';
import {Router} from "./router";

const App: React.FC = () => {

  const getUserInfo = () => {
    let accessToken = localStorage.getItem('accesstoken');
    if(!accessToken){
      console.log("token is in the localstorage");
    }else{
      console.log("token is in not in the local storage");
    }
    console.log("something went wrong")
  }
  // the problem is need to figue out the lazy loading 
  return(
    <>
      {getUserInfo()}
      <Router/>
    </>
  );
}

export default App;