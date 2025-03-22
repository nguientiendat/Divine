import React from 'react'
import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTag, faCreditCard, faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addToCart } from '../redux/apiRequest';


const ProductDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState([]);


    const dispatch = useDispatch();
    const navigate = useNavigate()



    useEffect(() => {

        fetch(`http://localhost:5000/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data)

            });

    }, [id]);

    useEffect(() => {
        if (product) {
            console.log(product.name); // Đảm bảo rằng product đã được cập nhật trước khi log
        }
    }, [product]); // Chạy khi `product` thay đổi

    // Lay mot mang san pham de hien thi random
    useEffect(() => {

        fetch(`http://localhost:5000/products`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data)

            });

    }, []);
    if (!product) {
        return <div>Loading...</div>;
    }


    const handleAddProduct = () => {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            original_price: product.original_price,
            discount: product.discount,
            src: product.src
        };
        addToCart(data, dispatch, navigate)
    }
    return (

        <Container>
            <div className="d-flex my-4 py-3 b bg-white justify-content-between ">

                <div>
                    <img className="ct-img2 rounded" src={product.src} alt="" />
                </div>
                <div className="px-4">
                    <p className="m-0">Sản phẩm</p>
                    <h3>{product.name}</h3>
                    <p > <FontAwesomeIcon icon={faBox} /> Tình trạng: <span className='ct-color-green'>{product.status}</span></p>
                    <p ><FontAwesomeIcon icon={faTag} />Thể loại: App, Giải trí, Game</p>
                    <h4>{product.price}đ</h4>
                    <div className="d-flex align-items-center">
                        <h5 className="ct-c m-0">{product.original_price}đ </h5>
                        <span className="sale rounded fw-bold mx-2 p-1 " >-{product.discount}%</span>
                    </div>
                    <div className="border w-100 my-3"></div>
                    <div >
                        <Button type="submit" className="ctm-btn-3 no-hover" onClick={handleAddProduct}><FontAwesomeIcon icon={faCreditCard} /><Link to = "/Cart" className ="text-white">Mua Ngay</Link> </Button>
                        <Button type="submit" className="ctm-btn-3 no-hover bg-white t-blue border  " onClick={handleAddProduct}><FontAwesomeIcon icon={faCartShopping} />Thêm vào giỏ Hàng</Button>


                    </div>
                </div>
                <div>
                    <h5>Mã giảm giá</h5>
                    <div className="d-flex ct-input">
                        <Form.Control
                            type="text"
                            placeholder="Ma Giam Gia"
                            className=" mr-sm-2 "
                        />
                        <Button type="submit" className="ctm-btn mx-2" ><FontAwesomeIcon icon={faCheck} /></Button>

                    </div>
                </div>

            </div>
            {/* <div>
                <h5 className="fw-bold">Sản phẩm khác của shop</h5>
                <Row>

                    <ProductGrid products={products} />

                </Row>
            </div> */}
        </Container>



    )
}


export default ProductDetail