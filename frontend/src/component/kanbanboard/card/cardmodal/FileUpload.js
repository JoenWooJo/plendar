import React, { Component, useState } from "react";
import "../../../../assets/css/cardFileUpload/cardFileUpload.css";
import Upload from "./FileUploads/Upload";
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';

const FileUpload = ({show, setShow}) => {
        const [page, setPage] = useState('card');
        const handleClose = () => {
            setShow(false);
            setPage("card");
        }
    
        return (
            <>
                <Modal.Body>
                    <div className="Card2" style={{height:"350px"}}>
                        <Upload />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </>
        );
    };

export default FileUpload;