import React, { useState, useEffect } from "react";
import QuantitySelector from "../components/body/QuantitySelector";
import Container from "react-bootstrap/Container";
import { useSelector } from 'react-redux';
import { Button, Modal } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
    // deleteCartProduct()
    const [products, setProducts] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev); // Đảo ngược trạng thái
    };
    const user = useSelector((state => state.auth.login.currentUser))

    useEffect(() => {
        fetch('http://localhost:5000/cart')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);
    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi xóa sản phẩm: ${response.statusText}`);
            }

            // Cập nhật state, loại bỏ sản phẩm đã xóa
            setProducts(products.filter(product => product.id !== productId));
            console.log(`Sản phẩm với ID ${productId} đã bị xóa.`);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    // Gọi hàm fetchProducts khi component được render lần đầu
    // useEffect(() => {
    //     fetchProducts();
    // }, []);
    const handlePrice = () => {
        let price = 0;
        for (let i = 0; i < products.length; i++) {
            price += products[i].price;
        }

        return price;

    }
    handlePrice()
    const showQr = () => {
        setIsVisible((prev) => !prev); //
    }
    const ammountAdded = () => {
        let amountAdd
        if (+user.account_balance >= handlePrice()) {
            amountAdd = 0;
            return amountAdd
        } else {
            amountAdd = handlePrice() - (+user.account_balance)
            return amountAdd
        }
    }
    useEffect(() => {
        ammountAdded()
    }, [+user.account_balance])
    const [show, setShow] = useState(false);




    return (
        <div className="my-5">
            <Container>

                <div className='bg-white bg-white p-4 rounded d-flex w-100  '>
                    <div style={{ minWidth: "75%" }}>
                        {products.map((product) => {
                            return (
                                <div className="d-flex border p-4 rounded my-3 position-relative" key={product.id} style={{ maxWidth: "1000px" }}>
                                    <div className="mx-3">
                                        <img className="ct-img" src={product.src} alt="" />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p className="fw-bold">{product.name}</p>
                                        <QuantitySelector price={product.price.toLocaleString('vi-VN')}
                                            sale={product.original_price.toLocaleString('vi-VN')}
                                            discount={product.discount}

                                        />
                                    </div>
                                    <Button variant="outline-danger"
                                        onClick={() => {
                                            deleteProduct(product.id)
                                            console.log(typeof product.id)
                                        }}
                                        className="position-absolute"
                                        style={{ bottom: '10px', right: '10px' }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>

                                </div>
                            )
                        })}
                    </div>
                    <div className="w-100 mx-3 " >
                        <p className="m-0 fw-bold mx-5 my-3">Thanh Toán</p>
                        <div className="d-flex justify-content-between ">
                            <div>Tổng giá</div>
                            <div>{handlePrice().toLocaleString('vi-VN')}</div>
                        </div>
                        <div className="lw my-2 "></div>
                        <div className="d-flex justify-content-between ">
                            <div>Tổng giá trị phải thanh toán</div>
                            <div className="fw-bold">{handlePrice().toLocaleString('vi-VN')}</div>

                        </div>
                        <div className="d-flex justify-content-between my-2 ">
                            <div>Số dư hiện tại: </div>
                            <div className="fw-bold">{+user.account_balance.toLocaleString('vi-VN')}</div>

                        </div>
                        <div className="d-flex justify-content-between my-2">
                            <div>Số tiền cần nạp thêm: </div>
                            <div className="fw-bold">{ammountAdded().toLocaleString('vi-VN')}</div>

                        </div>
                        <Button style={{ width: "100%" }}>Nạp thêm vào tài khoản</Button>

                        <div className="text-center">Quét mã thanh toán không cần nạp</div>
                        <Button onClick={showQr} style={{ width: "100%", marginBottom: "15px", backgroundColor: ' #005BAA' }}>Mua siêu tốc qua Mobile Banking</Button>
                        {/* <Button style={{ width: "100%", backgroundColor: ' #AE2070' }}>Mua siêu tốc với MoMo</Button> */}
                        <img style={{ display: isVisible ? "block" : "none", width: '100%' }}
                            src={`https://img.vietqr.io/image/mbbank-0352290387-compact2.jpg?amount=${handlePrice()}&addInfo=dong%20gop%20quy%20vac%20xin&accountName=nguyen%20tien%20dat%20`} />
                        <Button onClick={() => setShow(true)} style={{ width: "100%", marginBottom: "15px", backgroundColor: ' #AE2070' }}>Mua Ngay</Button>
                        </div>
                        <Modal show={show} onHide={() => setShow(false)} centered>
                            <Modal.Header closeButton>
                            <Modal.Title>Xác nhận</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn có chắc chắn mua sản phẩm này không?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Hủy
                            </Button>
                            <Button variant="danger"  onClick={() => {
                                alert("DONE!!");
                                // window.location.reload(); // Reload lại trang
                                console.log(+user.account_balance)
                                console.log(handlePrice())
                                }}>
                                Xác nhận
                            </Button>
                            </Modal.Footer>
                        </Modal>

                </div>


            </Container>
        </div>





    )
}
export default Cart