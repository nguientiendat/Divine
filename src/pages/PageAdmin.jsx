import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';

const PageAdmin = () => {
    const user = useSelector((state => state.auth.login.currentUser))
    console.log(user)
    const navigate = useNavigate()
    const handleAdmin = () => {
        if (user != null) {
            console.log(user)
        } else {
            alert("quay ve trang chu")
            navigate('/')
        }
    }

    useEffect(() => {
        handleAdmin()
    }, [])
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        original_price: '',
        discount: '',
        status: '',
        src: '',
        category: ''
    });

    // Hàm cập nhật state khi nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Hàm xử lý khi gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Gửi dữ liệu sản phẩm
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Sản phẩm đã được thêm:', data);

            // Reset form sau khi thêm thành công
            setProduct({
                name: '',
                description: '',
                price: '',
                original_price: '',
                discount: '',
                status: '',
                src: '',
                category_id: ''
            });
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };
    const [productId, setProductId] = useState("");
    const handleChange2 = (e) => {
        setProductId(e.target.value);
    };

    // Hàm xử lý xóa sản phẩm
    const handleDelete = async () => {
        if (!productId) {
            alert("Vui lòng nhập ID sản phẩm cần xóa!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/products/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert(`Sản phẩm với ID ${productId} đã được xóa thành công!`);
                setProductId(""); // Reset trường nhập liệu
            } else {
                alert(`Không tìm thấy sản phẩm với ID ${productId}.`);
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Đã xảy ra lỗi khi xóa sản phẩm!");
        }
    }


    return (
        <div>
            <div>
                <Container className="my-3 bg-white p-4 rounded">
                    <h2 className="mb-4">Thêm sản phẩm</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="productName">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Nhập tên sản phẩm"
                                        value={product.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="productDescription">
                                    <Form.Label>Mô tả sản phẩm</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Nhập mô tả"
                                        value={product.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group controlId="productPrice">
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        placeholder="Nhập giá"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="productOriginalPrice">
                                    <Form.Label>Giá gốc</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="original_price"
                                        placeholder="Nhập giá gốc"
                                        value={product.original_price}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="productDiscount">
                                    <Form.Label>Giảm giá (%)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="discount"
                                        placeholder="Nhập giảm giá"
                                        value={product.discount}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="productStatus">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        placeholder="Nhập trạng thái"
                                        value={product.status}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="productImage">
                                    <Form.Label>Link ảnh</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="image"
                                        placeholder="Nhập link ảnh"
                                        value={product.src}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="productCategory">
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="category_id"
                                        placeholder="Nhập loại sản phẩm"
                                        value={product.category_id}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Thêm sản phẩm
                        </Button>
                    </Form>
                </Container>
            </div>
            <div>
                <Container className="bg-white p-4 rounded">
                    <h2>Xóa sản phẩm</h2>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="productId">
                                    <Form.Label>ID Sản phẩm muốn xóa</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={productId}
                                        onChange={handleChange2}
                                        placeholder="Nhập ID sản phẩm"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" onClick={handleDelete}>
                            Xóa sản phẩm
                        </Button>
                    </Form>
                </Container>

            </div>
        </div>
    )
}
export default PageAdmin