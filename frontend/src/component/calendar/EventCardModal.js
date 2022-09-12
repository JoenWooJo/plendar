import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from '../kanbanboard/card/cardmodal/UpdateCard';
import FileUpload from '../kanbanboard/card/cardmodal/FileUpload';
import Comment from '../kanbanboard/card/cardmodal/Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


const EventCardModal = ({ show, setShow, title, cardNo, projectNo, deckNo}) => {
    const [page, setPage] = useState('card');
    const handleClose = () => {
        setShow(false);
        setPage('card');
    }
    
    return (
        <div>
            <div className="col-xl-6 modal-title h4">{title}</div>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{ height: "520px" }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='col-xl-6'>{title}</Modal.Title>
                            <Box className='col-xl-4'>
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button onClick={() => { setPage("card") }}>Card</Button>
                                    <Button onClick={() => { setPage("comment") }}>Comment</Button>
                                    <Button onClick={() => { setPage("file") }}>FileUpload</Button>
                                </ButtonGroup>
                            </Box>
                        </Modal.Header>
                            {page === "card" && <UpdateCard show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo}/>}
                            {page === "comment" && <Comment show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} title={title} />}
                            {page === "file" && <FileUpload show={show} setShow={setShow}/>}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EventCardModal;