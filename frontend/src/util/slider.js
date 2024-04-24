import styled from "styled-components";
import { useState, useEffect, useCallback } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Next = styled(MdNavigateNext)`
    position: absolute;
    top: 40%;
    right: 20px;
`;

const Before = styled(MdNavigateBefore)`
    position: absolute;
    top: 40%;
    left: 20px;
`;

const SlideImg = styled.img`
    margin-top: 10px;
    display: flex;
    height: 60vh;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    width: 100%;
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
        }, 3000);
        return () => clearTimeout(interval);
      }, [rightHandle]);

    return(
        <>
            <Before onClick={leftHandle}/>
            <Next onClick={rightHandle}/>
            {props.slides.map((slide, index) => {
                return (
                    <div key={index}>{cur === index && <SlideItem slide={slide} />}
                    </div>
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
  