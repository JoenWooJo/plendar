import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from './UpdateCard';
import FileUpload from './FileUpload';
import Comment from './Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import axios from 'axios';



const CardModal = ({title, projectNo, deckNo, cardNo}) => {
    const [show, setShow] = useState(false);
    const [page, setPage] = useState('card');
    // const [cardMember, setCardMember] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPage('card');
    }

    // useEffect(() => {
    //     const findCurrentCardmember = async () => {
    //         await axios.get(`/api/kanban/card/findCurrentCardmember/${cardNo}`)
    //         .then((resp) => {
    //             const list = resp.data.data;
    //             setCardMember(list);
    //             console.log(list);
    //         })
    //     }
    //     findCurrentCardmember();
    // }, []);

    return (
        <div>
            <div onClick={handleShow} >{title}</div>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{height:"520px"}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='col-xl-6'>{title}</Modal.Title>
                        <Box className='col-xl-4'>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button  onClick={() => { setPage("card") }}>Card</Button>
                                <Button  onClick={() => { setPage("comment") }}>Comment</Button>
                                <Button  onClick={() => { setPage("file") }}>FileUpload</Button>
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

export default CardModal;