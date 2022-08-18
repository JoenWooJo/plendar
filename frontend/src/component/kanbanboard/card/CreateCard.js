import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';

const CreateCard = () => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Button className='col-xl-1' onClick={handleShow} > <h5>+</h5></Button>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>카드 추가하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 col-xl-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>카드 이름</Form.Label>
                            <Form.Control
                                type="title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 col-xl-5"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>설명</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CreateCard;