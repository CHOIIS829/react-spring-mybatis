import { Container } from "../style/common";
import Slider from "../util/slider";
import img01 from "../style/images/img01.png"
import img02 from "../style/images/img02.png"

export const Main = () =>{
    const img = [img01,img02];
    return(
        <Container>
            <Slider slides={img}/>
                
        </Container>
    );
}


