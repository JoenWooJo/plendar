import React,{ useState } from 'react';
import {Form, Modal} from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router';


const CreateDeck = ({setCreateResult}) => {

const params = useParams(); 
const projectNo = params.no;
const [title, setTitle]=useState('');
const handleShow = () => setShow(true);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);

// 덱 생성하기
const createDeck = () => {
  axios.post('/api/kanban/deck/create',{
      title: title,
      projectNo :projectNo
  }).then((resp)=>{
      console.log(resp);
      setCreateResult(createResult => !createResult);
      handleClose();
  }).catch((err)=>{
      console.error(err)});
};

const keyEnter = (e) => {
  if(e.key == "Enter"){
     return(
    title==''? handleClose() : createDeck()
     );
  }
}

    return (
        <div>
      <Button variant="primary" onClick={handleShow}>덱 추가하기</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>덱 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>덱 이름</Form.Label>
              <Form.Control
                type="title"
                autoFocus
                onChange={(e)=>{setTitle(e.target.value)}}
                onKeyPress={keyEnter}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
          <Button variant="primary" 
                  onClick={title==''?handleClose:createDeck}
          >
            Add
          </Button>
          
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default CreateDeck;