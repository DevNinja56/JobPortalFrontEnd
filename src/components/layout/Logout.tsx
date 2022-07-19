import React, { useEffect } from 'react'
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';

type Props = {}

const Logout = (props: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookieKey = process.env.REACT_APP_AUTH_COOKIE || ' ';
        Cookie.set(cookieKey, " ");
        navigate('/login');
    })
    return (
        <h1 className='text-light text-center'>Logout</h1>
    )
}

export default Logout