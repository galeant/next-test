import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, TextField, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
import Footer from 'src/components/Footer';
import TableComponent from 'src/components/TableComponent'
import { DatePicker } from '@mui/x-date-pickers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useSelector } from 'react-redux';
import { getOrderList } from '../src/redux/action/order';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import orderTableConfig from '../src/tableConfig/orderTable'
import { useRouter } from 'next/router';
import { orderStatus } from '../src/enums'
import dayjs from 'dayjs';
import { fi } from 'date-fns/locale';

const Search = ({ search, setSearch, searchDate,  searchStatus,  searchFieldHandler, searchDateFieldHandler, searchStatusFieldHandler }) => {
    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={2}>
                <InputLabel sx={{ pb: 1 }}>Search</InputLabel>
                <TextField
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={(e) => searchFieldHandler((e.target.value))}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <InputLabel sx={{ pb: 1 }}>Date</InputLabel>
                <DatePicker
                    inputFormat="YYYY-MM-DD"
                    value={searchDate}
                    onChange={() => false}
                    onAccept={searchDateFieldHandler}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><CalendarMonthIcon/></InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <RefreshIcon 
                                        sx={{cursor:'pointer',':hover':{cursor:'pointer'}}}
                                        aria-label="toggle password visibility"    
                                        onClick={() => searchDateFieldHandler(null)}
                                        edge="end"
                                    />
                                </InputAdornment>,
                              }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <InputLabel sx={{ pb: 1 }}>Status</InputLabel>
                <Select
                    fullWidth
                    value={searchStatus}
                    onChange={searchStatusFieldHandler}
                >
                    <MenuItem value=''><em>--Reset--</em></MenuItem>
                    {
                        orderStatus().map((v) => {
                            return <MenuItem key={v.key} value={v.key}>{v.string}</MenuItem>
                        })
                    }

                </Select>
            </Grid>
        </Grid>
    )
}

const OrderPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order)
    const { query, isReady } = router;
    const [search, setSearch] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');

    useEffect(() => {
        if (isReady) {
            dispatch(getOrderList(query))
            
            const {search,date,status} = query;
            setSearch(search??'')
            setSearchDate(date?dayjs(date):null)
            setSearchStatus(status??'')
        }
    }, [query])

    const searchFieldHandler = (value) => {
        searchHandler(value, 'search')
    }

    const searchDateFieldHandler = (date) => {
        let value = null;
        if(date != null){
            value = dayjs(date).format('YYYY-MM-DD')
        }
        setSearchDate(date)
        searchHandler(value, 'date')
        
    }

    const searchStatusFieldHandler = (e) => {
        const value = e.target.value;
        setSearchStatus(value)
        searchHandler(value, 'status')
    }


    const searchHandler = (value, attr) => {
        router.query[attr] = value
        const { path, query } = router;
        if(attr !== 'page'){
            query.page = 1;     
        }
        router.push({ path, query });
    }

    return (
        <>
            <Head>
                <title>Order</title>
            </Head>
            <Container maxWidth={false} sx={{ pt: 6 }}>
                <Grid item>
                    <TableComponent
                        tableTitle="Orders"
                        tableConfig={orderTableConfig}
                        tableData={order.dataList}
                        pagination={order.pagination}
                        paginationHandler={searchHandler}
                        withAction={false}
                    >
                        <Search
                            search={search}
                            setSearch={setSearch}
                            searchDate={searchDate}
                            setSearchDate={setSearchDate}
                            searchStatus={searchStatus}
                            setSearchStatus={setSearchStatus}
                            searchFieldHandler={searchFieldHandler}
                            searchDateFieldHandler={searchDateFieldHandler}
                            searchStatusFieldHandler={searchStatusFieldHandler}
                        />
                    </TableComponent>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

OrderPage.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default OrderPage;