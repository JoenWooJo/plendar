import React ,{useState, useEffect} from 'react';
import {Form, Modal} from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import "../../../assets/css/font.css";

const AddTask = ({cardNo, setRefresh}) => {

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [content, setContent]= useState('');

    //task 추가하기
    const createTask = () => {
      axios.post('/api/kanban/task/create', {
        content: content,
        cardNo : cardNo }, {
          headers: {
              Authorization: window.localStorage.getItem("Authorization"),
          },
      }).then((resp)=>{
          setRefresh(refresh => ! refresh);
          handleClose();
      }).catch((err)=>{
          console.error(err)});
    };

    const handleOnKeyPress = e => {
      if (e.key === 'Enter') {
      createTask();
      e.preventDefault();
    }
    };

    return (
        <>
        <Dropdown.Item onClick={handleShow} style={{fontFamily: "IBMPlexSansKR-Regular"}}>테스크 추가</Dropdown.Item>
        {/* <MenuItem onClick={handleShow}>테스크 추가</MenuItem> */}
        {/* <form type="button"><AddIcon onClick={handleShow} /></form> */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title style={{fontFamily: "IBMPlexSansKR-Regular"}}>테스크 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontFamily: "IBMPlexSansKR-Regular"}}>테스크 이름</Form.Label>
              <Form.Control
                type='title'
                autoFocus
                onChange={(e)=>setContent(e.target.value)}
                onKeyPress={handleOnKeyPress}
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{fontFamily: "IBMPlexSansKR-Regular"}}>
            Close
          </Button>
          <Button variant="primary" onClick={createTask} style={{fontFamily: "IBMPlexSansKR-Regular"}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
};

export default AddTask;