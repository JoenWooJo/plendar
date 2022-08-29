import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';
import {get} from '../../../../api/Axios';

const Comment = ({ projectNo, deckNo, cardNo }) => {
    let userNo = localStorage.getItem("loginUserNo");
    const [comment, setComment] = useState('');
    //const [name,setName] = useState('');
    const [feedComments, setFeedComments] = useState([]);
    const [isValid, setIsValid] = useState(false);
    //const [commentList, setCommentList] = useState([]);
    let nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

     //코멘트 가져오기
     const t = async () => {
        const list = await get(`/kanban/find/comment/${cardNo}`);
        setFeedComments((prevcFeedComments) => prevcFeedComments.concat(list));
        console.log(feedComments);
    }

    useEffect(() => {
        t();
       },[])

    // db에 보내기
    const post = () => {
        let body = {
            projectNo: projectNo,
            cardNo: cardNo,
            userNo: userNo,
            content: comment,
            date: nowTime,
        }
        axios.post('/api/kanban/deck/comment/insert', body)
            .then((resp) => {
                console.log("ddd", resp)
            })

        setComment('');
    };

    // const CommentList = ({ name, comment, date }) => {
    //     return (
    //         <div>{name} : {comment}
    //             <div className='float-right'>{date}</div>
    //         </div>
    //     )
    // }

    return (
        <div>
            comment
            <Card style={{ height: "200px", overflow: "auto" }} >
                {feedComments.map((m, i) => {
                    return (
                        <Card body key={i}>
                           <div>{m.name} : {m.comment}
                                <div className='float-right'>{m.date}</div>
                            </div>
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
                        onChange={e => {
                            setComment(e.target.value);
                        }}
                        onKeyUp={e => {
                            e.target.value.length > 0
                                ? setIsValid(true)
                                : setIsValid(false);
                        }}
                        value={comment}
                    />
                </Form.Group>

                <Button style={{ height: "50px" }} className="col-xl-1 mt-3"
                    variant="primary"
                    onClick={post}
                    disabled={isValid ? false : true}
                >
                    확인
                </Button>
            </div>
        </div>
    );
};

export default Comment;