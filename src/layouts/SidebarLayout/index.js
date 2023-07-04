import { Box, alpha, lighten, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIntendedPath, logout } from '../../redux/action/auth';

const SidebarLayout = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    if (!auth.token || error.errCode == 401) {
      dispatch(setIntendedPath(router.asPath));
      dispatch(logout());
      router.replace('/login');
    }
  }, [auth.token,error.errCode]);

  if (auth.token == null) {
    return (<></>)
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">{children}</Box>
        </Box>
      </Box>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node
};

export default SidebarLayout;
