import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMoneyBill, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { Container } from 'react-bootstrap';
import { Link } from 'react-router';
import { Container } from 'react-bootstrap';
function FHeader() {
    return (
        <div className="set-bg">
            <Container>
                <div className=" d-flex justify-content-center">

                    <div className="custom-ctn" >
                        <div className="fheader d-flex justify-content-between py-1">
                            <div className="list-text d-flex " >
                                <Link className="chill tw" to="/"> Giai tri cuc chill</Link>
                            </div>
                            <div className="three-icon d-flex ">
                                <div className="tutorial bi">
                                    <Link className="t-tutorial tw px-3" to="/"><FontAwesomeIcon icon={faBook} /> Hướng dẫn mua hàng</Link>
                                </div>
                                <div className="sale-ctm bi">
                                    <Link className="t-sale-ctm tw px-3" to="/"><FontAwesomeIcon icon={faMoneyBill} /> Khuyến mãi hot</Link>
                                </div>
                                <div className="contact bi">
                                    <Link className="t-contact tw px-3" to="/"><FontAwesomeIcon icon={faPhone} /> Số điện thoại liên hệ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    )
}

export default FHeader