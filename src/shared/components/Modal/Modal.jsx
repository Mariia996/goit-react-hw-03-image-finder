import React, {Component} from 'react'
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
            if (e.code === "Escape") {
                this.props.onClose();
            }
    }

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
                <div className={styles.backdrop} onClick={this.handleBackdropClick}>
                    <div className={styles.modal}>
                    <div className={styles.modalContent}>{this.props.children}</div>
                </div>
            </div>, modalRoot)
    }
}

export default Modal;