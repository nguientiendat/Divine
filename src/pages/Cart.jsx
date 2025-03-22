import React, { useState, useEffect, useCallback } from "react";
import QuantitySelector from "../components/body/QuantitySelector";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
    const [products, setProducts] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev); // Đảo ngược trạng thái
    };
    const user = useSelector((state => state.auth.login.currentUser))
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productQuantities, setProductQuantities] = useState({}); // Track product quantities

    useEffect(() => {
        // Fetch cart data
        fetchUserCart();
    }, []);

    useEffect(() => {
        // Initialize product quantities when products are loaded
        if (products.length > 0) {
            const initialQuantities = {};
            products.forEach(product => {
                initialQuantities[product.id] = product.quantity || 1;
            });
            setProductQuantities(initialQuantities);
        }
    }, [products]);

    const fetchUserCart = async () => {
        try {
            setLoading(true);
            // Using local json-server until MongoDB server is implemented
            const response = await fetch('http://localhost:5000/cart');

            if (!response.ok) {
                throw new Error('Failed to fetch user cart');
            }

            const data = await response.json();
            // Filter products if user is logged in to simulate user-specific cart
            // In a real implementation, this would be handled by the MongoDB server
            const filteredData = user && user._id 
                ? data.filter(item => !item.userId || item.userId === user._id)
                : data;
                
            setProducts(filteredData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load your cart. Please try again later.');
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            // Using local json-server until MongoDB server is implemented
            const response = await fetch(`http://localhost:5000/cart/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Lỗi khi xóa sản phẩm: ${response.statusText}`);
            }

            // Cập nhật state, loại bỏ sản phẩm đã xóa
            setProducts(products.filter(product => product.id !== productId));
            console.log(`Sản phẩm với ID ${productId} đã bị xóa.`);
            // Update quantities state after deletion
            setProductQuantities(prev => {
                const newQuantities = { ...prev };
                delete newQuantities[productId];
                return newQuantities;
            });
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    const handleQuantityChange = useCallback((productId, quantity) => {
        setProductQuantities(prev => {
            if (prev[productId] === quantity) return prev;
            return {
                ...prev,
                [productId]: quantity
            };
        });
    }, []);

    const handlePrice = () => {
        let price = 0;
        for (let i = 0; i < products.length; i++) {
            const quantity = productQuantities[products[i].id] || 1;
            price += products[i].price * quantity;
        }
        return price;
    }

    const showQr = () => {
        setIsVisible((prev) => !prev);
    }

    const ammountAdded = () => {
        if (!user || !user.account_balance) return 0;
        
        let amountAdd
        if (+user.account_balance >= handlePrice()) {
            amountAdd = 0;
            return amountAdd
        } else {
            amountAdd = handlePrice() - (+user.account_balance)
            return amountAdd
        }
    }

    const [show, setShow] = useState(false);
    const [confirmationSuccess, setConfirmationSuccess] = useState(false);

    const handleConfirmation = async () => {
        try {
            const totalPrice = handlePrice();
            const currentBalance = +user.account_balance;

            // Check if user has sufficient balance
            if (currentBalance < totalPrice) {
                alert(`Số dư tài khoản không đủ. Bạn cần nạp thêm ${(totalPrice - currentBalance).toLocaleString('vi-VN')} VND để hoàn tất thanh toán.`);
                setShow(false);
                return;
            }

            // Get current timestamp
            const currentDate = new Date().toISOString();
            
            // Create sold items from cart products with quantities
            const soldItems = products.map((product, index) => ({
                id: Date.now() + index,
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: productQuantities[product.id] || 1,
                total_price: product.price * (productQuantities[product.id] || 1),
                sold_at: currentDate,
                userId: user._id // Add user ID to track purchases
            }));

            // Temporarily update account balance locally
            // In a real implementation, this would be handled by the MongoDB server
            const updatedBalance = currentBalance - totalPrice;
            
            // Add items to sold database
            for (const item of soldItems) {
                const response = await fetch('http://localhost:5000/sold', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item)
                });

                if (!response.ok) {
                    throw new Error('Failed to add item to sold database');
                }
            }

            // Clear cart by deleting all products
            for (const product of products) {
                await fetch(`http://localhost:5000/cart/${product.id}`, {
                    method: 'DELETE'
                });
            }

            setConfirmationSuccess(true);
            setProducts([]); // Clear products from state
            setProductQuantities({}); // Clear quantities
            setShow(false); // Close modal
            
            // Update user state in Redux
            dispatch({
                type: "UPDATE_ACCOUNT_BALANCE",
                payload: updatedBalance
            });

            alert(`Đơn hàng đã được xác nhận thành công! Số dư còn lại: ${updatedBalance.toLocaleString('vi-VN')} VND`);
        } catch (error) {
            console.error('Error during confirmation:', error);
            alert("Có lỗi xảy ra khi xác nhận đơn hàng!");
        }
    };

    if (loading) {
        return (
            <div className="my-5 text-center">
                <Container>
                    <div className="bg-white p-4 rounded">
                        <p>Đang tải giỏ hàng...</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-5 text-center">
                <Container>
                    <div className="bg-white p-4 rounded">
                        <p className="text-danger">{error}</p>
                        <Button variant="primary" onClick={fetchUserCart}>Thử lại</Button>
                    </div>
                </Container>
            </div>
        );
    }

    // Kiểm tra user tồn tại để tránh lỗi khi truy cập user.account_balance 
    const userBalance = user && user.account_balance ? +user.account_balance : 0;

    return (
        <div className="my-5">
            <Container>
                <div className='bg-white bg-white p-4 rounded d-flex w-100  '>
                    <div style={{ minWidth: "75%" }}>
                        {products.length === 0 ? (
                            <div className="text-center p-4">
                                <p>Giỏ hàng của bạn đang trống</p>
                            </div>
                        ) : (
                            products.map((product) => {
                                return (
                                    <div className="d-flex border p-4 rounded my-3 position-relative" key={product.id} style={{ maxWidth: "1000px" }}>
                                        <div className="mx-3">
                                            <img className="ct-img" src={product.src} alt="" />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <p className="fw-bold">{product.name}</p>
                                            <QuantitySelector 
                                                price={product.price.toLocaleString('vi-VN')}
                                                sale={product.original_price ? product.original_price.toLocaleString('vi-VN') : null}
                                                discount={product.discount}
                                                initialQuantity={productQuantities[product.id] || 1}
                                                onQuantityChange={handleQuantityChange}
                                                productId={product.id}
                                            />
                                        </div>
                                        <Button variant="outline-danger"
                                            onClick={() => {
                                                deleteProduct(product.id)
                                            }}
                                            className="position-absolute"
                                            style={{ bottom: '10px', right: '10px' }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                )
                            })
                        )}
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
                            <div className="fw-bold">{userBalance.toLocaleString('vi-VN')}</div>
                        </div>
                        <div className="d-flex justify-content-between my-2">
                            <div>Số tiền cần nạp thêm: </div>
                            <div className="fw-bold">{ammountAdded().toLocaleString('vi-VN')}</div>
                        </div>
                        <Button style={{ width: "100%" }}>Nạp thêm vào tài khoản</Button>

                        <div className="text-center">Quét mã thanh toán không cần nạp</div>
                        <Button onClick={showQr} style={{ width: "100%", marginBottom: "15px", backgroundColor: ' #005BAA' }}>Mua siêu tốc qua Mobile Banking</Button>
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
                            <Button variant="danger" onClick={handleConfirmation}>
                                Xác nhận
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </div>
    )
}

export default Cart;