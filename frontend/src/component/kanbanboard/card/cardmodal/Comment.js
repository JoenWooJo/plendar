import React from 'react';
import { Form, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';

const Comment = () => {
    return (
        <div>
            comment
            <Card style={{ height: "200px" }} >
                
                <Card body >
                    곽도훈: 점심 뭐드실?
                    <div className='float-right'>
                        2022/08/22
                    </div>
                </Card>

                <Card body >
                    김채원: 마라샹궈먹으러 가자
                    <div className='float-right'>
                        2022/08/22
                    </div>
                </Card>
            </Card>

            {/* 코멘트 입력 */}
            <hr />
            <div className='row'>
                <Form.Group
                    className="col-xl-10 mb-3 ml-4 "
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button style={{ height: "50px" }} className="col-xl-1 mt-3" variant="primary">
                    확인
                </Button>
            </div>
        </div>
    );
};

export default Comment;