import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { Form, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';
import {get} from '../../../../api/Axios';
import "../../../../assets/css/font.css";

const Comment = ({projectNo, deckNo, cardNo}) => {
    let userNo = localStorage.getItem("loginUserNo");
    const [comment, setComment] = useState('');
    const [feedComments, setFeedComments] = useState([]);
    const [isValid, setIsValid] = useState(false);
    let nowTime = moment().format('YY-MM-DD HH:mm');
   
    const clearRef = useRef();
    // db에 보내기
    const post = () =>{
        let body = {
            projectNo : projectNo,
            cardNo: cardNo,
            userNo : userNo,
            content : comment,
            date : nowTime
        }
        axios.post('/api/kanban/card/comment/insert', body, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            })
            .then(()=>{
                //인서트 후 초기화
                clearRef.current.value='';
                setComment('');
            })
    };
    
    const b = async () => {
        const commentList = await get(`/kanban/card/find/comment/${cardNo}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        setFeedComments(commentList);
    }
     useEffect(() => {
        b();
    }, [comment]);

    const CommentList = ({name, comment, date}) => {
        return(
            <div style={{fontFamily: "IBMPlexSansKR-Regular"}}>{name} : {comment } 
            <div className='float-right' style={{fontFamily: "IBMPlexSansKR-Regular"}}>{(date)=dayjs(date).format("YY-MM-DD HH:mm")}</div>
            </div>  
        )
    }

    return (
        <div className= "ml-2" style={{fontFamily: "IBMPlexSansKR-Regular"}}>
            comment
            <Card style={{ height: "270px", overflow:"auto"}} >
            {feedComments.map((content, i)=>{
                return(
                <Card body key={i}>
                       <CommentList 
                            name={content.userName} 
                            comment={content.content} 
                            date={content.date}
                        />
                </Card>
                );
            })}
              </Card>

            {/* 코멘트 입력 */}
            <hr />
            <div className='row'>
                <Form.Group
                    className="col-xl-10 mb-3 ml-4 "
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Control as="textarea" rows={3} 
                        onChange={e =>{
                            setComment(e.target.value);
                            
                        }}
                        ref = {clearRef}
                        onKeyUp={e=>{
                            e.target.value.length > 0
                            ?setIsValid(true)
                            :setIsValid(false);
                        }}
                        
                    />
                </Form.Group>

                <Button style={{ height: "50px", fontFamily: "IBMPlexSansKR-Regular" }} className="col-xl-1 mt-3"
                             variant="primary"
                             onClick={post}
                             disabled={isValid?false:true}
                        >
                    확인
                </Button>
                
            </div>
        </div>
    );
};

export default Comment;