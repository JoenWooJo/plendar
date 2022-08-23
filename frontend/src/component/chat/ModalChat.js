import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { height } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ModalChat = () => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('card');


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPage("card");
    }

    return (
        <div>
            <MoreVertIcon  style={{ float: 'right'}} onClick={handleShow} />
            <div className='col-xl-1'>
                <Modal size='m' show={show} onHide={handleClose}>
                    <div style={{height:"300px"}}>
                        <Modal.Header closeButton>
                            <Modal.Title className='col-xl-6'>George Boat</Modal.Title>
                            <Box className='col-xl-4'>

                            </Box>
                        </Modal.Header>
                        <div className= "ml-3 mt-3 d-flex flex-row">
                            <div  >
                                
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar" className="d-flex align-self-center me-3" width="50" />
                            </div>
                            <div className="pt-1 ml-2">
                                <p className="fw-bold mb-0">정비누 빵꾸똥꾸</p>
                                <p className="small text-muted">cocoring@gmail.com</p>
                            </div>
                            </div>{/* <hr/> */}

                    </div>

                </Modal>

            </div>
        </div>
    );
};

export default ModalChat;