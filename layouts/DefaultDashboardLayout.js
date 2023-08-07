import { useEffect, useState } from 'react';
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const DefaultDashboardLayout = (props) => {
	const [showMenu, setShowMenu] = useState(true);
	const router = useRouter();
	const { token } = useSelector((state) => state.auth)
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!token) {
			router.push('/login')
		}
	})

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
