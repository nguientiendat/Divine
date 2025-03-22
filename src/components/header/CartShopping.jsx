import { Button } from "react-bootstrap"
import { faCartShopping, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';

const CartShopping = () => {
    const isLoggedIn = useSelector((state => state.auth.login.isLoggedIn))
    const navigate = useNavigate()
    const handleCart = () => {
        if (!isLoggedIn) {
            alert('Bạn cần đăng nhập để xem giỏ hàng!');
            navigate('/login'); // Điều hướng đến trang đăng nhập
        } else {
            navigate('/cart'); // Điều hướng đến trang giỏ hàng
        }
    };
    return (
        < div className="cart-shopping" >
            <Button type="submit" className="ctm-btn-3 no-hover" onClick={handleCart}><FontAwesomeIcon icon={faCartShopping} />Giỏ Hàng</Button>

        </div>
    )
}
export default CartShopping