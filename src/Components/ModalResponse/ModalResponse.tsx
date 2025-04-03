import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './ModalResponse.module.css'

interface ModalResponseProps {
    show: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const ModalResponse: React.FC<ModalResponseProps> = ({ show, onClose, title, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header className={styles['content-modal-response']} closeButton>
                <Modal.Title className={styles['content-modal-response-title']}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles['content-modal-response-body']}>{message}</Modal.Body>
            <Modal.Footer className={styles['content-modal-response-footer']}>
                <Button className={styles['content-modal-response-btn-close']} variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalResponse;