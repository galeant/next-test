import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import TableComponent from 'src/components/TableComponent'

import { connect } from 'react-redux';
import { getBreedList } from '../src/redux/action/breed';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Pet = ({ breed, auth }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        router.push('/order')
        // dispatch(getBreedList());
    }, []);

    return(<></>)

    return (
        <>
            <Head>
                <title>Pet</title>
            </Head>
            <Container maxWidth={false} sx={{ p: 6 }}>
                <Grid container spacing={2} >
                    <Grid item md={6}>
                        <TableComponent
                            tableTitle="Breed"
                            tableHeader={breed.header}
                            tableData={breed.dataList}
                            pagination={breed.pagination}
                            action={{ paginationHandler: getBreedList }}
                        >
                            <h1>kadal</h1>
                        </TableComponent>
                    </Grid>
                    <Grid item md={6}>
                        <TableComponent tableTitle="Type" tableHeader={breed.header} tableData={[]}></TableComponent>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

Pet.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

const mapStateToProps = (state) => ({
    breed: state.breed,
    auth: state.auth
});


export default connect(mapStateToProps)(Pet);