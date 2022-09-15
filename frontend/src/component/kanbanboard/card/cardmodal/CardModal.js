import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from './UpdateCard';
import FileUpload from './FileUpload';
import Comment from './Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Dropdown from 'react-bootstrap/Dropdown';

import "../../../../assets/css/font.css";

const CardModal = ({title, projectNo, deckNo, cardNo, setRefresh}) => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('card');

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPage('card');
    }

    return (
        <div>
            <Dropdown.Item  onClick={handleShow} style={{fontFamily: "IBMPlexSansKR-Regular"}}>카드 정보</Dropdown.Item>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{height:"520px"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='col-xl-6' style={{fontFamily: "IBMPlexSansKR-Regular"}}>{title}</Modal.Title>
                        <Box className='col-xl-4'>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button  onClick={() => { setPage("card") }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>Card</Button>
                                <Button  onClick={() => { setPage("comment") }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>Comment</Button>
                                <Button  onClick={() => { setPage("file") }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>FileUpload</Button>
                            </ButtonGroup>
                        </Box>
                    </Modal.Header>
                        {page === "card" && <UpdateCard show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} setRefresh={setRefresh}/>}
                        {page === "comment" && <Comment show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} title={title} />}
                        {page === "file" && <FileUpload show={show} setShow={setShow}/>}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CardModal;