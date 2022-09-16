import React, { Component, useState, useEffect } from "react";
import "../../../../assets/css/cardFileUpload/cardFileUpload.css";
import Upload from "./FileUploads/Upload";
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';

const FileUpload = ({show, setShow, projectNo, cardNo, title, feedItems, item })=> {
        const [page, setPage] = useState('card');
        const userNo = localStorage.getItem("loginUserNo");

        const handleClose = () => {
            setShow(false);
            setPage("card");
        }
        
        console.log("파일업로드", feedItems)
        return (
            <>
                <Modal.Body>
                    <div className="Card1" style={{height:"360px"}}>
                        <Upload projectNo={projectNo} cardNo={cardNo} feedItems={feedItems} item={item}/>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </>
        );
    };

export default FileUpload;