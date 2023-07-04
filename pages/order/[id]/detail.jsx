import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';
import { Divider, Paper, Grid, Container, TextField, InputAdornment, InputLabel, Select, MenuItem, Table, Link, TableHead, TableRow, TableCell, TableBody, TableContainer, Backdrop, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from 'src/redux/action/order';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { langPreference } from "src/enums";

const OrderDetailPage = () => {
    const router = useRouter();
    const { query, isReady } = router;
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)

    useEffect(() => {
        if (isReady) {
            dispatch(getOrderDetail(query.id))
        }
    }, [isReady])

    if (order.isLoading) {
        return (<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>)
    }


    return (
        <>
            <Head>
                <title>Order Detail</title>
            </Head>
            <Container maxWidth={false} sx={{ pt: 6 }}>

                <Paper elevation={0} sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Paper elevation={3} sx={{ p: 1 }}>
                                <h3>Customer</h3>
                                <Divider />

                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Name</b></Grid>
                                    <Grid item>{order.detail.contact_name}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Email</b></Grid>
                                    <Grid item>{order.detail.contact_email}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Phone</b></Grid>
                                    <Grid item>{order.detail.contact_phone}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Pref Lang</b></Grid>
                                    <Grid item>
                                        <img src={langPreference(order.detail.lang_preference).src}></img>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Province</b></Grid>
                                    <Grid item>{order.detail.province}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>City</b></Grid>
                                    <Grid item>{order.detail.city}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>District</b></Grid>
                                    <Grid item>{order.detail.district}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Sub District</b></Grid>
                                    <Grid item>{order.detail.sub_district}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Postal</b></Grid>
                                    <Grid item>{order.detail.postal_code}</Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Address</b></Grid>
                                    <Grid item>{order.detail.address}</Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item md={6}>
                            <Paper elevation={3} sx={{ p: 1 }}>
                                <h3>Order</h3>
                                <Divider />
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Promo Code</b></Grid>
                                    <Grid item><Link href={`/promo/${order.detail.promo && order.detail.promo.id}/detail`} target="_blank" >#{order.detail.promo_code}</Link ></Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item md={3}><b>Order Item</b></Grid>
                                    <Grid item md={9}>
                                        <TableContainer style={{ width: '100%' }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="right">Item</TableCell>
                                                        <TableCell align="right">Qty</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {
                                                        (order.detail.details !== undefined) && order.detail.details.map((value, key) => {
                                                            return (
                                                                <TableRow key={key}>
                                                                    <TableCell align="right"><b>{value.product_name}</b></TableCell>
                                                                    <TableCell align="right">{value.qty}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid >
                </Paper >
            </Container >
            <Footer />
        </>
    )
}

OrderDetailPage.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default OrderDetailPage;