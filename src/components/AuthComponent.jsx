// hoc.js
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthComponent = ({ children }) => {
    const router = useRouter();
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        if (!auth.token) {
            router.push('/login');
        }
    }, []);

    if (auth.token == null) {
        return (<></>)
    }
    return (
        <>
            {auth.tokent && children}
        </>
    )
};

export default AuthComponent;
