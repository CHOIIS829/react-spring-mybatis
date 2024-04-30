import styled from "styled-components";
import { useState, useEffect, useCallback } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Next = styled(MdNavigateNext)`
    font-size: 50px;
`;

const Before = styled(MdNavigateBefore)`
    font-size: 50px;
`;

const SlideImg = styled.img`
    object-fit: contain;
    border: 5px solid black;
    width: 70%
`;


export default function Slider(props){
    
    return(
        <>
            <SlideImg src={props.img}/>
        </>
    );
};

