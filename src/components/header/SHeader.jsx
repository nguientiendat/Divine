import React from 'react'
import { Link, useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import avatar from "../../assets/images/avatar.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import CartShopping from './CartShopping';


function SHeader() {
    const user = useSelector((state => state.auth.login.currentUser))
    const checkAccount = () => {
        let account;
        if (user != null) {
            if (user.admin === true) {
                account = user.admin
                alert('You are admin')
                return account
            } else {
                account = user.admin
                alert('you are not admin')
            }
        } else if (user === null) {
            alert("chua dang nhap")
        }

    }
    // const checkAcc = checkAccount();
    // checkAccount()




    return (
        <div className="set-bg-2 ">
            <Container>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="custom-ctn py-1" >
                        <div className="fheader d-flex justify-content-between py-1">
                            <div className="logo">
                                <Link to="" className="tw fs-2 fw-semibold"> DivineShop</Link>
                            </div>
                            <div className="search">
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            className=" mr-sm-2 w-100"
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="user w-25">
                                {user ? (<div >


                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" className="set-bg-2 ">
                                            <img src={avatar} className="avatar rounded-circle mx-2" />{user.email}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item  >
                                                <div>Số dư hiện tại: </div>
                                                <div className="fw-bold fs-4">{(+user?.account_balance).toLocaleString('vi-VN')}</div>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/napthemtien">
                                                Nạp thêm tiền vào
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/manage-account">
                                                Quản lý tài khoản
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/order-history">
                                                Lịch sử đơn hàng
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/favorite-products">
                                                Sản phẩm yêu thích
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/logout">
                                                Đăng xuất
                                            </Dropdown.Item>
                                            {checkAccount() ? (<>
                                                <Dropdown.Item as={Link} to="/pageadmin">
                                                    Quản lý
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/dashboard">
                                                    DashBoard
                                                </Dropdown.Item></>) : (<div></div>)}
                                                
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>) : (<>
                                    <Link to="/login"><Button type="submit" className="ctm-btn-2 no-hover"><FontAwesomeIcon icon={faUser} /></Button></Link>
                                    <Link to="/login" className="tw fw-semibold ">Đăng nhập/ </Link>
                                    <Link to="/register" className="tw fw-semibold">Đăng ký</Link>
                                </>)}
                            </div>
                            <CartShopping />
                        </div>

                    </div>
                </div >




                <div className="d-flex justify-content-center">
                    <div className="custom-ctn py-2" >
                        <div className="nav justify-content-between">
                            <div className="tutorial ">
                                <Link className="t-tutorial tw fs-6" to="/" ><FontAwesomeIcon icon={faEye} /> Sản phẩm bạn vừa xem</Link>

                            </div>
                            <div className="tutorial ">
                                <Link className="t-tutorial tw fs-6" to="/" ><FontAwesomeIcon icon={faEye} /> Sản phẩm bạn vừa xem</Link>

                            </div>
                            <div className="tutorial ">
                                <Link className="t-tutorial tw fs-6" to="/" ><FontAwesomeIcon icon={faEye} /> Sản phẩm bạn vừa xem</Link>

                            </div>
                            <div className="tutorial ">
                                <Link className="t-tutorial tw fs-6" to="/" ><FontAwesomeIcon icon={faEye} /> Sản phẩm bạn vừa xem</Link>

                            </div>
                            <div className="tutorial ">
                                <Link className="t-tutorial tw fs-6" to="/" ><FontAwesomeIcon icon={faEye} /> Sản phẩm bạn vừa xem</Link>

                            </div>
                        </div>
                    </div>
                </div>

            </Container >
        </div >



    )
}

export default SHeader