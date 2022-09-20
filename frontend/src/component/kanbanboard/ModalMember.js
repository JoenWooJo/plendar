import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const ModalMember = ({ projectNo }) => {
    const [show, setShow] = useState(false);
    const [member, setMember] = useState([]);
    
    const handleClose = () => {
        setShow(false);
    }

    const findMember = async () => {
        const resp = await axios.get(`/api/project/find/member/${projectNo}`, {
            headers: {
              Authorization: window.localStorage.getItem("Authorization"),
            },
          });
        setMember(resp.data.data);
    };


    useEffect(()=>{
        findMember();
        console.log(member);
    },[show])

    return (
        <>
        <PeopleAltIcon style={{marginBottom: "5px"}} fontSize="large" onClick={() => setShow(true)} color="primary"/>
        <Modal size='L' show={show} onHide={handleClose} style={{ height: '100%' }} >
            <div style={{ height: "auto" }}>
                <Modal.Header closeButton>
                    <Modal.Title className='col-xl-6' style={{ fontFamily: "IBMPlexSansKR-Regular" }}>Member</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {
                        member.length != 0 && member.map((e,i)=>(
                            <div className="ml-3 mt-3 d-flex flex-row" key={i}>
                                <div>
                                    <img src={e.profile} style={{ borderRadius: '70%' }}
                                        alt="avatar" className="d-flex align-self-center me-3" width="50" />
                                </div>
                                <div className="pt-1 ml-2">
                                    <p className="fw-bold mb-0" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>{e.name} {e.leader == 1 ? " - leader" : e.leader == 0 && e.manager == 1 ? " - manager" : ""}</p>
                                    <p className="small text-muted" style={{ fontFamily: "IBMPlexSansKR-Regular" }}>{e.email}</p>
                                    
                                </div>
                            </div>
                        ))
                    }
                </Modal.Body>

            </div>

        </Modal>
        </>
    );
};

export default ModalMember;