import { Container } from "../style/common";
import Slider from "../util/slider";

export const Main = () =>{
    const img = [1,2,3];
    return(
        <Container>
            <Slider slides={img}/>
                
        </Container>
    );
}


