import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';
import { get } from '../../../../api/Axios';
import { Modal } from 'react-bootstrap';

const Comment = ({ projectNo, deckNo, cardNo, show, setShow }) => {
    let userNo = localStorage.getItem("loginUserNo");
    const [comment, setComment] = useState('');
    const [feedComments, setFeedComments] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [page, setPage] = useState('card');
    let nowTime = moment().format('YYYY-MM-DD HH:mm');

    const handleClose = () => {
        setShow(false);
        setPage("card");
    }

    // db에 보내기
    const post = () => {
        let body = {
            projectNo: projectNo,
            cardNo: cardNo,
            userNo: userNo,
            content: comment,
            date: nowTime
        }
        axios.post('/api/kanban/card/comment/insert', body, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            })
            .then((resp) => {
                // console.log("ddd",resp)
                // 보내고나서 보낸값 지워지기
                setComment('');
            })


    };
    const b = async () => {
        const commentList = await get(`/kanban/card/find/comment/${cardNo}`, {
            headers: {
                Authorization: window.localStorage.getItem("Authorization"),
            },
            });
        // console.log("aaaaa", a);
        // 날짜 형식 바꿔서 다시 리스트로 저장
        setFeedComments(commentList);

    }
    useEffect(() => {
        b();
    }, [comment]);



    const CommentList = ({ name, comment, date }) => {
        return (
            <div>{name} : {comment}
                <div className='float-right'>{date}</div>
            </div>
        )
    }

    return (
        <>
            <Modal.Body>
                comment
                <Card style={{ height: "200px", overflow: "auto" }} >
                    {feedComments.map((content, i) => {
                        return (
                            <Card body key={i}>
                                <CommentList
                                    name={content.userName}
                                    comment={content.content}
                                    date={content.date} />
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

export default Comment;