import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ControlContainer = styled.div`
    position: absolute;
    top: 27%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 90%;
    width: 100%;
`;

const Next = styled(MdNavigateNext)`
    font-size: 50px;
`;

const Before = styled(MdNavigateBefore)`
    font-size: 50px;
`;

const SlideImg = styled.img`
    width: 100%;
    height: 50vh;
`;

const Slider = (props) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null); 

    const startTimer = useCallback(() => {
        const id = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                (prevIndex + 1) % props.img.length
            );
            console.log("working");
        }, 7000);
        setIntervalId(id); 
    }, [props.img]);

    useEffect(() => {
        startTimer(); 

        
        return () => clearInterval(intervalId);
    }, [props.img, startTimer, intervalId]); 

    const resetTimer = useCallback(() => {
        clearInterval(intervalId); 
        startTimer(); 
    }, [intervalId, startTimer]); 

    const nextImage = useCallback(() => {
        setCurrentImageIndex(prevIndex =>
            (prevIndex + 1) % props.img.length
        );
        resetTimer(); 
    }, [props.img, resetTimer]); 

    const prevImage = useCallback(() => {
        setCurrentImageIndex(prevIndex =>
            (prevIndex - 1 + props.img.length) % props.img.length
        );
        resetTimer(); 
    }, [props.img, resetTimer]); 

    return (
        <>
            <ControlContainer>
                <Before onClick={prevImage} />
                <Next onClick={nextImage} />
            </ControlContainer>
            <SlideImg src={props.img[currentImageIndex]} />
        </>
    );
};

export default Slider;
