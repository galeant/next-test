// withAuth.js

import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const middleware = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const token = Cookies.get('token');

        if (!token) {
            router.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default middleware;
