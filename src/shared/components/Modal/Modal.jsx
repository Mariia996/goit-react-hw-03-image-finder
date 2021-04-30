import {createPortal} from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal =()=> {
        return createPortal(
            <div className={styles.modalContainer}>
                <div className={styles.backdrop}></div>
                    <div className={styles.modal}>
                    <div className={styles.modalContent}></div>
                </div>
            </div>, modalRoot)
}

export default Modal;