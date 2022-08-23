import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from './UpdateCard';
import FileUpload from './FileUpload';
import Comment from './Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { height } from '@mui/system';


const CardModal = () => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('card');


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPage("card");
    }

    return (
        <div>
            <div onClick={handleShow} >카카카드드드</div>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{height:"450px"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='col-xl-6'>ㅇㅇㅇ카드입니다</Modal.Title>
                        <Box className='col-xl-4'>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button onClick={() => { setPage("card") }}>Card</Button>
                                <Button onClick={() => { setPage("comment") }}>Comment</Button>
                                <Button onClick={() => { setPage("file") }}>FileUpload</Button>
                            </ButtonGroup>
                        </Box>
                    </Modal.Header>
                    <Modal.Body>

                        {page === "card" && <UpdateCard />}
                        {page === "comment" && <Comment />}
                        {page === "file" && <FileUpload />}

                       
                    </Modal.Body>
                    </div>
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
        </div>
    );
};

export default CardModal;