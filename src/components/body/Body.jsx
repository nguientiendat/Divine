import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from "react";
import Option from "./Option"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
function Body() {
    const [images, setImages] = useState([]);

    // Hàm getData để gọi API
    const getData = async () => {
        const url = "http://localhost:5000/products?category_id=4000";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(`NOTICE: ${json}`);
            setImages(json);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    // console.log(images.products)


    return (
        <div className="my-3 w-100">
            <Container>
                <Row >
                    <Col className="mx-2 set-bg-3 rounded">
                        <Row className="d-flex flex-column justify-content-between">

                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Lam Viec</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Hoc Tap</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Game Steam</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Edit Anh</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />WinDow</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Google</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Steam Wallet</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Diệt Virus</Link>
                            <Link className='tw tb mg fs-5 '><FontAwesomeIcon icon={faGamepad} style={{ color: "#404245" }} className="mx-2" />Xbox, iTunes Gift Card</Link>


                        </Row>
                    </Col>
                    <Col className=" mx-2 p-0   " xs={6}>
                        <Carousel>
                            {images.map((image) => (
                                <Carousel.Item key={image.id} interval={1500}>
                                    <img
                                        className="d-block w-100 p-0  rounded"
                                        src={image.src}

                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col className="p-0 mx-3 ct-row ">
                        <Row className="">
                            <img className=" ctm-img p-0 rounded hc " src="https://cdn.divineshop.vn/image/catalog/Banner mới/VPN-61865.png?hash=1735200289 "></img>
                        </Row>
                        <Row className="">
                            <img className='ctm-img p-0 rounded ' src=" https://cdn.divineshop.vn/image/catalog/Banner mới/AI-58645.png?hash=1735200362"></img>

                        </Row>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col className="p-0 mx-1 ct-row "><img className=" ctm-img p-0 rounded " src="https://cdn.divineshop.vn/image/catalog/Banner mới/VPN-61865.png?hash=1735200289 "></img>
                    </Col>
                    <Col className="p-0 mx-2 ct-row "><img className=" ctm-img p-0 rounded" src="https://cdn.divineshop.vn/image/catalog/Banner mới/VPN-61865.png?hash=1735200289 "></img>
                    </Col>
                    <Col className="p-0 mx-2 ct-row "><img className=" ctm-img p-0 rounded " src="https://cdn.divineshop.vn/image/catalog/Banner mới/VPN-61865.png?hash=1735200289 "></img>
                    </Col>
                    <Col className="p-0 mx-2 ct-row "><img className=" ctm-img p-0 rounded " src="https://cdn.divineshop.vn/image/catalog/Banner mới/VPN-61865.png?hash=1735200289 "></img>
                    </Col>
                </Row>
            </Container>
            <Option name="Học tập" value_id="1000" />
            <Option name="Giải trí" value_id="2000" />
            <Option name="Giải trí" value_id="3000" />

        </div>
    )
}

export default Body