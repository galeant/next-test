import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import TableComponent from 'src/components/TableComponent'

import { connect } from 'react-redux';
// import { getBreedList } from '@src/redux/pet';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';



const Pet = ({ loading, header, list }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getBreedList());
    }, []);

    return (
        <>
            <Head>
                <title>Pet</title>
            </Head>
            <PageTitleWrapper>
                {/* <h1>qwdqwdqw</h1> */}
            </PageTitleWrapper>
            <Container maxWidth="lg" m={1}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <TableComponent tableHeader={header} tableData={list}></TableComponent>
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
    ...state.petReducer
});


export default connect(mapStateToProps)(Pet);