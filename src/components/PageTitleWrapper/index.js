import PropTypes from 'prop-types';
import { Box, Container, styled } from '@mui/material';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)};
`
);

const PageTitleWrapper = ({ children }) => {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      {children && <Container maxWidth="lg">{children}</Container>}
    </PageTitle>
  );
};

// PageTitleWrapper.propTypes = {
//   children: PropTypes.node.isRequired
// };

export default PageTitleWrapper;
