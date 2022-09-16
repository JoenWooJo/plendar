import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from '../kanbanboard/card/cardmodal/UpdateCard';
import FileUpload from '../kanbanboard/card/cardmodal/FileUpload';
import Comment from '../kanbanboard/card/cardmodal/Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Dropdown from 'react-bootstrap/Dropdown';
import { getData} from "../../api/Axios";


const EventCardModal = ({ show, setShow, title, cardNo, projectNo, deckNo}) => {
    const [page, setPage] = useState('card');
    const [feedItems, setFeedItems] = useState([]);
    const handleFeedItems = () => setFeedItems("");

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPage('card');
    }
    

    const communication = async(e) => {
        const ItemList = await getData(`/bringItem/${projectNo}/${cardNo}`);
        setFeedItems((ItemList));
    }
    useEffect(() => {

    }, [feedItems]);
    const BringItem = () => {
        communication();
    }
    const returnItem = (value) => {
        setFeedItems(value);
    }

    console.log("이건 프롭",{ show, setShow, title, cardNo, projectNo, deckNo})
    return (
        <div>
            <Dropdown.Item  onClick={handleShow}>카드 정보</Dropdown.Item>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{ height: "520px" }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='col-xl-6'>{title}</Modal.Title>
                            <Box className='col-xl-4'>
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button onClick={() => { setPage("card") }}>Card</Button>
                                    <Button onClick={() => { setPage("comment") }}>Comment</Button>
                                    <Button onClick={() => { 
                                    setPage("file")
                                    BringItem();
                                    }}>
                                FileUpload
                                </Button>
                                {console.log("이건 피드",{feedItems})}
                                </ButtonGroup>
                            </Box>
                        </Modal.Header>
                            {page === "card" && <UpdateCard show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} />}
                            {page === "comment" && <Comment show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} title={title} />}
                            {page === "file" && <FileUpload show={show} setShow={setShow} projectNo={projectNo} cardNo={cardNo} feedItems={feedItems} item={returnItem}/>}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EventCardModal;