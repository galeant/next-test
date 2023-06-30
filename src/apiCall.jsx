import axios from 'axios';

axios.defaults.baseURL = 'http://api-pristine-revamp.local';

const getData = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        return error;
    }
}

const postData = async (url, data) => {
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error;
    }
}

const postDataForm = async (url, data) => {
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        return error;
    }
}

const deleteData = async (url) => {
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (error) {
        return error;
    }
}

export { getData, postData, postDataForm, deleteData }
