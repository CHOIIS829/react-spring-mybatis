import styled from "styled-components";
import { useState, useEffect, useCallback } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Next = styled(MdNavigateNext)`
    position: absolute;
    font-size: 50px;
    top: 40%;
    right: 20px;
    `;

const Before = styled(MdNavigateBefore)`
    position: absolute;
    font-size: 50px;
    top: 40%;
    left: 20px;
`;

const SlideImg = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    width: 100%;
    border: 1px solid black;
`;

const Test = styled.div`
    border: 10px solid yellow;
    width: 100%;
    margin-top: 3px;
`;

export default function Slider(props){
    const [cur, setCur] = useState(0);
    const len = props.slides.length;

    const leftHandle = () => {
      setCur(cur - 1 < 0 ? len - 1 : cur - 1);
    };
  
    const rightHandle = useCallback(() => {
      setCur(cur + 1 > len - 1 ? 0 : cur + 1);
    }, [cur, len]);
    
    useEffect(() => {
        const interval = setTimeout(() => {
          rightHandle();
        }, 5000);
        return () => clearTimeout(interval);
      }, [rightHandle]);

    return(
        <>
            <Before onClick={leftHandle}/>
            <Next onClick={rightHandle}/>
            {props.slides.map((slide, index) => {
                return (
                    <Test key={index}>
                        {cur === index && <SlideImg src={slide} />}
                    </Test>
                    );
            })}
        </>
    );
};



const SlideItem = ({ slide }) => {
    return (
        <SlideImg src={slide}/>
    );
};
  