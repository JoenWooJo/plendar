import React, { useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from '../kanbanboard/card/cardmodal/UpdateCard';
import FileUpload from '../kanbanboard/card/cardmodal/FileUpload';
import Comment from '../kanbanboard/card/cardmodal/Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


const EventCardModal = ({ title, projectNo, show, cardNo, callback }) => {
    const [page, setPage] = useState('card');
    console.log({title});
    return (
        <div>
            <div className="col-xl-6 modal-title h4">{title}</div>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={() => { callback(false); }}>
                    <div style={{ height: "450px" }}>
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
                        <Modal.Body>
                            {page === "card" && <UpdateCard />}
                            {page === "comment" && <Comment projectNo={projectNo} cardNo={cardNo} />}
                            {page === "file" && <FileUpload />}
                        </Modal.Body>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            callback(false);
                        }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            callback(false);
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default EventCardModal;