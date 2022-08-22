import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';

const Comment = () => {
    let [userName] = useState('김채원');
    const [comment, setComment] = useState('');
    const [feedComments, setFeedComments] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

    let post = e =>{
        setFeedComments([...feedComments, comment]);
        setComment('');
    };

    const CommentList = ({name, comment}) => {
        return(
            <div>{name} : {comment } 
            <div className='float-right'> {nowTime}</div>
            </div>  
        )
    }

    return (
        <div>
            comment
            <Card style={{ height: "200px" }} >
            {feedComments.map((commentArr, i)=>{
                return(
                <Card body key={i}>
                       <CommentList name={userName} comment={commentArr}/>
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
                        onKeyUp={e=>{
                            e.target.value.length > 0
                            ?setIsValid(true)
                            :setIsValid(false);
                        }}
                        value={comment}
                    />
                </Form.Group>

                <Button style={{ height: "50px" }} className={"col-xl-1 mt-3",
                        comment.length > 0
                            ?'submitCommentActive'
                            :'submitCommentInactive'}
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