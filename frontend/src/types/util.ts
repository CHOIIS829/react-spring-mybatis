export interface ModalProps{
    open: boolean;
    confirm: ()=> void;
    close: ()=> void;
    children: string; 
}