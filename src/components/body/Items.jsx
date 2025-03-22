import React from 'react'
import { Link } from 'react-router'
function Items(props) {
    return (
        <div className="item ">
            <div className="a">
                <Link className="link-img" to={`${props.id}/product-detail`}><img src={props.src} className="img-fluid rounded ct-img" /></Link>
            </div>
            <div className="detail">
                {/* {console.log(props.id)} */}
                <Link className="tb tw ct-link line" to={`${props.id}/product-detail`}>{props.name}</Link>
                {/* <h5>{props.price}</h5> */}
                <div className="d-flex align-items-center ">
                    <p className="ct-p fw-bold m-0 ">{props.price}đ</p>
                    <p className="ct-p fw-bold ct-c m-0 mx-2">{props.original_price}đ</p>
                    <span className="sale rounded fw-bold px-1 " >-{props.discount}%</span>

                </div>
            </div>
        </div>
    )
}

export default Items