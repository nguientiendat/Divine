import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/header/Header'
function Layout() {
    return (
        <>
            <div className="" ><Header /></div>
            <Outlet />
        </>
    )
}

export default Layout