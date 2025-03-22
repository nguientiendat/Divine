import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { registerUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        registerUser(newUser, dispatch, navigate)
    }
    return (
        <div className="my-5  ">
            <Container>

                <div className="mx-5 ct-w p-4 rounded ct ">
                    <h2 className="fw-bold my-4">Đăng kiểm</h2>
                    <Form onSubmit={handleRegister}>
                        {/* Input tài khoản */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control type="user" placeholder="Nhập tài khoản" className="ct"
                                onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" className="ct"
                                onChange={(e) => setEmail(e.target.value)} />
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
                            Đăng ký
                        </Button>
                    </Form>

                </div>

            </Container>
        </div>
    )
}
export default Register