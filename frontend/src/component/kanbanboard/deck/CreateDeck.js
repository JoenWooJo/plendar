import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router';
import { get } from '../../../api/Axios';

import '../../../assets/css/font.css';

const CreateDeck = ({ setCreateResult }) => {

  const params = useParams();
  const projectNo = params.no;
  const [title, setTitle] = useState('');
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [leaderNO, setLeaderNo] = useState([]);

  // 덱 생성하기
  const createDeck = () => {
    axios.post('/api/kanban/deck/create', {
      title: title,
      projectNo: projectNo,
    }, {
      headers: { Authorization: localStorage.getItem("Authorization"), },
    }).then((resp) => {
      setCreateResult(createResult => !createResult);
      handleClose();
    }).catch((err) => {
      console.error(err)
    });
  };

  console.log("projectNo: ", projectNo);

  const keyEnter = (e) => {
    if (e.key == "Enter") {
      return (
        title == '' ? handleClose() : createDeck()
      );
    }
  }

  const projectComplete = async () => {
    const resp = await axios.put(`/api/project/finish/${projectNo}`, {}, {
      headers: {
        Authorization: window.localStorage.getItem("Authorization"),
      },
    })
  }

  const findMember = async () => {
    const list = await get(`/project/find/member/${projectNo}`);
    setLeaderNo(list);
  }

  //멤버의 리더만 뽑기 
  const leaderList = leaderNO.filter((m) => {
    return (
      m.leader == 1
    );
  })

  // 처음 들어갔을 때 리더멤버 가져오기
  useEffect(() => {
    findMember();
  }, [])

  //로컬스토리지 유저 뽑기
  const uu = localStorage.getItem('loginUserNo');
  //리더멤버의 넘버 가져오기
  const uuarr = leaderList.filter((m) => (m.no == uu))
  
  return (
    <div>
      {/* 덱 추가 버튼 */}
      <Button sx={{ mb: 2, ml: 2 }} variant="contained" size="medium" onClick={handleShow} style={{fontFamily: "IBMPlexSansKR-Regular"}}>덱 추가하기</Button>

      {/* 리더만 보이는 프로젝트완료 */}
      {(uuarr.length !== 0)
        &&
        <Link to="/project/completepage">
          <Button variant="contained" type="submit" size="medium" sx={{ mb: 2, ml: 1 }} onClick={() => { projectComplete() }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>프로젝트 완료</Button>
        </Link>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title style={{fontFamily: "IBMPlexSansKR-Regular"}}>덱 추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontFamily: "IBMPlexSansKR-Regular"}}>덱 이름</Form.Label>
              <Form.Control
                type="title"
                autoFocus
                onChange={(e) => { setTitle(e.target.value) }}
                onKeyPress={keyEnter}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{fontFamily: "IBMPlexSansKR-Regular"}}>
            Close
          </Button>

          <Button variant="primary" onClick={title == '' ? handleClose : createDeck} style={{fontFamily: "IBMPlexSansKR-Regular"}}>
            Add
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateDeck;