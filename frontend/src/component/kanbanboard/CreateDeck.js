import React,{ useState } from 'react';
import {Form, Modal, Button} from 'react-bootstrap';


const CreateDeck = () => {
    
const handleShow = () => setShow(true);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);

    return (
        <div>
      <Button variant="primary" onClick={handleShow}>덱 추가하기</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>덱 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>덱 이름</Form.Label>
              <Form.Control
                type="title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
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

export default CreateDeck;