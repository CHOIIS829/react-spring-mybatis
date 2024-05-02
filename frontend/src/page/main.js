import { Container } from "../style/common";
import img01 from '../style/images/img01.jpg'
import img02 from '../style/images/img02.jpg'

export const Main = ({sidebarIsOpen}) =>{
    const img = [img01, img02]
    return(
        <Container>
            {sidebarIsOpen && <div className="isOpen"></div>}
        </Container>
    );
}


