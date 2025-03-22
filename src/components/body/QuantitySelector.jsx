import { Button, InputGroup, FormControl } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const QuantitySelector = ({ price, sale, discount, initialQuantity = 1, onQuantityChange, productId }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    
    // Use useEffect to sync with initialQuantity when it changes from parent
    useEffect(() => {
        if (initialQuantity !== quantity) {
            setQuantity(initialQuantity);
        }
    }, [initialQuantity]);

    // Notify parent of quantity changes, but only when quantity actually changes 
    useEffect(() => {
        if (onQuantityChange) {
            onQuantityChange(productId, quantity);
        }
    }, [quantity, productId, onQuantityChange]);

    const handlePrev = () => {
        setQuantity(prev => prev + 1);
    }

    const handleNext = () => {
        setQuantity(prev => {
            if (prev <= 1) {
                alert('Số lượng tối thiểu cần mua là 1');
                return 1;
            }
            return prev - 1;
        });
    }

    const handleValue = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (isNaN(newValue) || newValue < 1) {
            setQuantity(1);
        } else {
            setQuantity(newValue);
        }
    }

    // Calculate the total price based on quantity
    const totalPrice = (parseInt(price.replace(/\./g, ''), 10) * quantity).toLocaleString('vi-VN');
    const totalOriginalPrice = sale ? (parseInt(sale.replace(/\./g, ''), 10) * quantity).toLocaleString('vi-VN') : null;

    return (
        <div className="d-flex mx-5" style={{ minWidth: '250px' }}>
            <InputGroup style={{ maxWidth: '115px', maxHeight: "1vh", marginRight: "20px" }}>
                <Button variant='light' onClick={handleNext}>-</Button>
                <FormControl
                    type="number"
                    style={{ textAlign: 'center' }}
                    value={quantity}
                    onChange={handleValue}
                    min="1"
                />
                <Button variant='light' onClick={handlePrev}>+</Button>
            </InputGroup>
            <div>
                <div>
                    <p className="m-0 fw-bold">{totalPrice}đ</p>
                </div>
                {sale && (
                <div className="d-flex">
                    <span className="sale rounded fw-bold m-0 p-1 ">-{discount}%</span>
                    <p className="m-0 fw-bold ct-c mx-1">{totalOriginalPrice}đ</p>
                </div>
                )}
            </div>
        </div>
    );
}

export default QuantitySelector


