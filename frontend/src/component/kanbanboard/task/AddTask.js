import React ,{useState, useEffect} from 'react';
import {Form, Modal} from 'react-bootstrap';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AddTask = ({cardNo, setRefresh}) => {

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [content, setContent]= useState('');

    //task 추가하기
    const createTask = () => {
      axios.post('/api/kanban/task/create',{
          content: content,
          cardNo : cardNo
      }).then((resp)=>{
          setRefresh(refresh => ! refresh);
          handleClose();
      }).catch((err)=>{
          console.error(err)});
    };

    return (
        <div className='col-xl-2'>
        <form type="button"><AddIcon onClick={handleShow} /></form>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>테스크 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>테스크 이름</Form.Label>
              <Form.Control
                type='title'
                autoFocus
                onChange={(e)=>{setContent(e.target.value);}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default AddTask;