import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ModalChat = ({ roomNo }) => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('card');
    const [chatMember, setChatMember] = useState([]);

    const handleClose = () => {
        setShow(false);
        setPage("card");
    }

    useEffect(()=>{
        axios.get('/api/chat/room/member', {
            params: {
              roomNo: roomNo
            }
          })
            .then((resp)=>{
                setChatMember(resp.data.data);
            }).catch((err)=>{
                console.error(err);
            })
    },[show])

    return (
        <div>
            <MoreVertIcon  style={{ float: 'right'}} onClick={()=>setShow(true)}  />
            <div className='col-xl-1'>
                <Modal size='L' show={show} onHide={handleClose} style={{height:'100%'}} >
                    <div style={{height:"auto"}}>
                        <Modal.Header closeButton>
                            <Modal.Title className='col-xl-6'>Member</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            {
                                chatMember.map((e, i) => (
                                    <div className="ml-3 mt-3 d-flex flex-row" key={i}>
                                        <div>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="avatar" className="d-flex align-self-center me-3" width="50" />
                                        </div>
                                        <div className="pt-1 ml-2">
                                            <p className="fw-bold mb-0">{e.name }</p>
                                            <p className="small text-muted">{e.email }</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </Modal.Body>

                    </div>

                </Modal>

            </div>
        </div>
    );
};

export default ModalChat;