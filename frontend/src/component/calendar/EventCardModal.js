import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { get, } from '../../api/Axios';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import UpdateCard from '../kanbanboard/card/cardmodal/UpdateCard';
import FileUpload from '../kanbanboard/card/cardmodal/FileUpload';
import Comment from '../kanbanboard/card/cardmodal/Comment';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { getData} from "../../api/Axios";
import "../../assets/css/font.css";


const EventCardModal = ({ show, setShow, title, cardNo, projectNo, deckNo}) => {
    const [page, setPage] = useState('card');

    const [member, setMember] = useState([]);
    const [manager, setManager] = useState([]);
    const [cuList, setCuList] = useState([]);
    const [feedItems, setFeedItems] = useState([]);
    const handleFeedItems = () => setFeedItems("");

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        setPage('card');
    }
   
     // 카드의 현재 유저 불러오기
     useEffect(() => {
        const findCurrentCardmember = async () => {
            await axios.get(`/api/kanban/card/findCurrentCardmember/${cardNo}`, {
                headers: {
                    Authorization: window.localStorage.getItem("Authorization"),
                },
            })
                .then((resp) => {
                    const list = resp.data.data;
                    setMember(list);
                })
        }
        findCurrentCardmember();
    }, [show]);

  
    const findMember = async () => {
      const list = await get(`/project/find/member/${projectNo}`);
      const managerList = list.filter((m) => {
        return (
          m.leader == 1 || m.manager == 1
        )
      });
      //리더, 매니저 가져오기
      setManager(managerList.filter((m) => (m.no == localStorage.getItem('loginUserNo'))));
       console.log("dddd", list, projectNo);
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
            <div className="col-xl-6 modal-title h4" style={{fontFamily: "IBMPlexSansKR-Regular"}}>{title}</div>
            <div className='col-xl-1'>
                <Modal size='lg' show={show} onHide={handleClose}>
                    <div style={{ height: "520px" }}>
                        <Modal.Header closeButton>
                            <Modal.Title className='col-xl-6'>{title}</Modal.Title>
                            <Box className='col-xl-4'>
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button onClick={() => { setPage("card") }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>Card</Button>
                                    <Button onClick={() => { setPage("comment") }} style={{fontFamily: "IBMPlexSansKR-Regular"}}>Comment</Button>
                                    <Button onClick={() => { 
                                      setPage("file")
                                      BringItem() }} 
                                      style={{fontFamily: "IBMPlexSansKR-Regular"}}>FileUpload</Button>
                                </ButtonGroup>
                            </Box>
                        </Modal.Header>
                            {page === "card" && <UpdateCard show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} setMember={setMember} member={member} manager={manager}/>}
                            {page === "comment" && <Comment show={show} setShow={setShow} projectNo={projectNo} deckNo={deckNo} cardNo={cardNo} title={title} />}
                            {page === "file" && <FileUpload show={show} setShow={setShow} projectNo={projectNo} cardNo={cardNo} feedItems={feedItems} item={returnItem}/>}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EventCardModal;