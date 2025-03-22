import React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import { Container } from 'react-bootstrap';

function THeader() {
    return (
        <div className="set-bg-3">
            <Container>
                <div className="d-flex justify-content-center ">
                    <div className="custom-ctn py-2 " >
                        <div className="nav  justify-content-between align-items-center">
                            <div className="tutorial">
                                <Link to="/" className="t-tutorial tw fs-6 tb fw-semibold " ><FontAwesomeIcon icon={faBars} /> Danh mục sản phẩm </Link>
                            </div>
                            <div className="trick">
                                <Link to="/" className="tw tb mx-2"><img src="https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg?hash=1640449820" /> Thủ thuật và tin tức</Link>
                                <Link to="/" className="tw tb mx-2"><img src="https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg?hash=1640449820" /> Thủ thuật và tin tức</Link>
                                <Link to="/" className="tw tb mx-2"><img src="https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg?hash=1640449820" /> Thủ thuật và tin tức</Link>
                                <Link to="/" className="tw tb mx-2"><img src="https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg?hash=1640449820" /> Thủ thuật và tin tức</Link>
                            </div>
                        </div>

                    </div>

                </div>
            </Container>
        </div>
    )
}

export default THeader