import { useEffect, useState } from 'react';
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';
import { setIntendedPath } from 'redux/action/auth';

const DefaultDashboardLayout = (props) => {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(true);
	const router = useRouter();
	const { token,user,intendedPath} = useSelector((state) => state.auth)
	const ToggleMenu = () => {
		return setShowMenu(!showMenu); 	
	};
	const cookies = new Cookies();

	useEffect(() => {
		if (!token || cookies.get('token') == null) {
			dispatch(setIntendedPath(router.route))
			router.push('/login')
		}
	},[router])

	if (token) {
		return (
			<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
				<div className="navbar-vertical navbar">
					<NavbarVertical
						showMenu={showMenu}
						onClick={(value) => setShowMenu(value)}
					/>
				</div>
				<div id="page-content">
					<div className="header">
						<NavbarTop
							data={{
								showMenu: showMenu,
								SidebarToggleMenu: ToggleMenu
							}}
						/>
					</div>
					{props.children}
				</div>
			</div>
		);
	}

};
export default DefaultDashboardLayout;
