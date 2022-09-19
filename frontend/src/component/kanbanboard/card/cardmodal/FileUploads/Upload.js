import React, {useState, useEffect, Fragment } from "react";
import Dropzone from "./Dropzone";
import "../../../../../assets/css/cardFileUpload/Upload.css";
import Progress from "./Progress";
import axios from "axios";
import { Card } from 'react-bootstrap';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {remove, getData} from '../../../../../api/Axios';
import dayjs from "dayjs";
import { set } from "date-fns";
import moment from "moment";
import { Button } from "@mui/material";

const Upload = ({ cardNo, projectNo, feedItems, item }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [successfullUploaded, setSuccessfullUploaded] = useState(false);
    

    const onFilesAdded = (files) => {
        setFiles(files);
        console.log("이건 애드파일",files);
    }

    const uploadFiles = async() =>{
        setUploadProgress({});
        setUploading(true);
        let nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const pm_user_no = localStorage.getItem("loginUserNo");
        const promises = [];
        files.forEach((file) => {
            promises.push(sendRequest(file));
        });
            let body = {
                project_no: projectNo,
                card_no: cardNo,
                user_no: pm_user_no,
                name: files[0].name,
                size: files[0].size,
                type: files[0].type,
                lastModifiedDate: nowTime,
                file: files[0]
            }
            try {
                await Promise.all(promises);
                setSuccessfullUploaded(true);
                setUploading(false);
            } catch (e) {
                // Not Production ready! Do some error handling here instead...
                setSuccessfullUploaded(true);
                setUploading(false);
            }
            await axios.post(`/api/UploadItem`, body,{
                params: {userNo: localStorage.getItem("loginUserNo")},
                headers: {
                    'Content-type':'multipart/form-data',
                    Authorization: window.localStorage.getItem("Authorization"),
                }})
              .then((result) => {
                console.log("이게 업로드 콘솔", result);
                if(result.statusText == 'OK'){
                    console.log("이게 업로드 콘솔", result);
                    communication();
            }
        })
    }

    const communication = async(e) => {
        const ItemList = await getData(`/bringItem/${projectNo}/${cardNo}`);
        item(ItemList);
    }
// ----------------------------------------------------------------------
    const sendRequest = (file) => {
        console.log("센드리퀘스트", file)
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            console.log("이건 센드리퀘스트", file);
            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    setUploadProgress(copy);
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = { ...uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                setUploadProgress(copy);
                resolve(req.response);
            });

            req.upload.addEventListener("error", event => {
                const copy = { ...uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                setUploadProgress(copy);
                reject(req.response);
            });

            const formData = new FormData();
            formData.append("file", file, file.name);

            // req.open("POST", "https://jsonplaceholder.typicode.com/photos");
            req.send(formData);
        });
    }
    //========================================================================
    const renderProgress = (file) => {
        const uploadProgresses = uploadProgress[file.name];        
        if (uploading || successfullUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgresses ? uploadProgresses.percentage : 0} />
                </div>
            );
        }
    }   
    // ================================================================

    const renderActions= () => {
        if (successfullUploaded) {
            return (
                <Button
                    onClick={() =>
                        {setFiles([]);
                        setSuccessfullUploaded(false);
                        communication();
                    }
                    }
                    variant="outlined" 
                    color="primary"
                    size="medium"
                >
                    Clear
                </Button>
            );
        } else {
            return (
                <Button
                    disabled={files.length < 0 || uploading}
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {uploadFiles()
                        setUploadProgress({})
                        setUploading(true)
                        communication();}}>
                    Upload
                </Button>
            );
        }
    }
    const removeItem = async (no, feedItems) => {
        const deleteItem = await remove(`/deleteItem/${no}`);
        communication();
    }
   
    const downloadFile = async (url, name) => {
        fetch(url, { method: 'GET' })
        .then((res) => {
            return res.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();

        })
        .catch((err) => {
            console.error('err: ', err);
        });
    };
    
    const ItemList = ({name, user_name, lastModifiedDate, no, url}) => {
        return(
            <> 
                <a className="download-name" type="download"  onClick={() => {downloadFile(url,name)} } >{name}&nbsp;</a>
                {user_name } &nbsp;
                <div className="float-right">{dayjs(lastModifiedDate).format('YY-MM-DD HH:mm')}
                <RemoveCircleOutlineIcon className="float-right ml-2" type="button" onClick={()=>{removeItem(no);}} />
                </div>
            </>
        )
    }
             
    return (
        <>
        <div className="Upload1" >
            <div className="Content1" >
                <div>
                    <Dropzone
                        onFilesAdded={onFilesAdded}
                        disabled={uploading || successfullUploaded}
                    />
                </div>

                <div className="row" style={{ height: "270px", overflow:"auto"}}>
                {feedItems.length !=0 && feedItems.map((content, i)=>{
                    return(
                    <Fragment key={i}>
                        <div className="col-xl-11 mt-1 ml-2">
                            <Card body>
                                <ItemList
                                        name={content.name} 
                                        lastModifiedDate ={content.lastModifiedDate} 
                                        user_name={content.user_name}
                                        no = {content.no}
                                        url = {content.url}
                                    />
                            </Card>
                        </div>
                    </Fragment>
                    );
                })}
                </div>
                <div className="Actions1">{renderActions() }</div>
            </div>
            <div className="Files1" style={{height:'150px'}}>
                    {files.length != 0 && files.map((file, i) => {
                        return (
                             <div key={i} style={{height:'30px'}}>
                                <span className="Filename1">{file.name}</span>
                                {renderProgress(file)
                                }
                             </div>
                        );
                    })}
            </div>
        </div>


        </>
        
    );
};

export default Upload;