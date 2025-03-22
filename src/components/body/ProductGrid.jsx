import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Items from './Items'

const ProductGrid = ({ products }) => {
    // Chia mảng sản phẩm thành các nhóm 4 sản phẩm
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;

    };

    const productChunks = chunkArray(products, 4); // Chia thành từng nhóm 4

    return (
        <div>
            {productChunks.map((chunk, rowIndex) => (
                <Row key={rowIndex} className="my-3">
                    {chunk.map((product, colIndex) => (
                        <Col key={colIndex} >
                            <Items
                                id={product.id}
                                src={product.src}
                                name={product.name}
                                price={product.price.toLocaleString('vi-VN')}
                                original_price={product.original_price}
                                discount={product.discount}

                            />
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default ProductGrid;
