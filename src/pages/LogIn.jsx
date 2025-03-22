import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
function LogIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password
        };
        loginUser(newUser, dispatch, navigate)
    }


    return (
        <div className="my-5  ">
            <Container>

                <div className="mx-5 ct-w p-4 rounded ct ">
                    <h2 className="fw-bold my-4">Đăng Nhập</h2>
                    <Form onSubmit={handleLogin}>
                        {/* Input tài khoản */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control type="user" placeholder="Nhập tài khoản" className="ct"
                                onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        {/* Input mật khẩu */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Nhập mật khẩu" className="ct"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {/* Nút đăng nhập */}

                        <Button variant="primary" type="submit">
                            Đăng nhập
                        </Button>
                    </Form>

                </div>

            </Container>
        </div>
    )
}

export default LogIn