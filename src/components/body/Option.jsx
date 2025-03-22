import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
function Option(props) {
    const [products, setProducts] = useState([]);

    const getData = () => {
        fetch(`http://localhost:5000/products?category_id=${props.value_id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setProducts(data)
            })

    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Container className="text-align-center py-2 ">
            <div className="name-option d-flex justify-content-between">
                <div className="tb">
                    <h3>{props.name}</h3>
                </div>
                <div className="btn" >
                    <Button variant="primary">Khám Phá</Button>
                </div>

            </div>
            <Row className="my-3 ">
                <ProductGrid products={products} />

            </Row>
        </Container>
    )
}

export default Option




