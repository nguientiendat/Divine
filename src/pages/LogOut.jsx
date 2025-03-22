import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/apiRequest';
import { createLogoutSuccess } from '../redux/authSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

    // Handle automatic logout
    useEffect(() => {
        // If user has no access token, redirect to login
        if (!accessToken) {
            navigate("/login");
            return;
        }

        // Perform logout
        const handleLogout = async () => {
            try {
                await logoutUser(dispatch, accessToken);
                // Clear local storage and state even if API fails
                localStorage.removeItem("user");
                dispatch(createLogoutSuccess());
                // Navigate to home page after logout
                navigate("/");
            } catch (error) {
                console.error("Logout failed:", error);
                // Still clear local state and redirect even if API fails
                localStorage.removeItem("user");
                dispatch(createLogoutSuccess());
                navigate("/");
            }
        };

        // Don't auto-logout, wait for user confirmation
    }, [accessToken, dispatch, navigate]);

    // Handle manual logout
    const handleLogoutClick = async () => {
        try {
            await logoutUser(dispatch, accessToken);
            // Clear local storage and state
            localStorage.removeItem("user");
            dispatch(createLogoutSuccess());
            // Navigate to home page after logout
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
            // Still clear local state and redirect even if API fails
            localStorage.removeItem("user");
            dispatch(createLogoutSuccess());
            navigate("/");
        }
    };

    const handleCancelClick = () => {
        // Navigate back to home page without logging out
        navigate("/");
    };

    return (
        <Container className="mt-5">
            <div className="bg-white p-5 rounded shadow">
                <h2 className="text-center mb-4">Đăng xuất</h2>
                <p className="text-center">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
                <div className="d-flex justify-content-center mt-4">
                    <Button 
                        variant="secondary" 
                        className="me-3"
                        onClick={handleCancelClick}
                    >
                        Hủy
                    </Button>
                    <Button 
                        variant="danger"
                        onClick={handleLogoutClick}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default LogOut; 