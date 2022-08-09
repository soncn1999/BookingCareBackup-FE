import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login',
        {
            email, password
        }
    );
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUser = (user) => {
    return axios.post('/api/create-new-user', {
        user
    });
}

const deleteUser = (id) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id
        }
    });
}

const updateUser = (user) => {
    return axios.put('/api/edit-user', {
        user
    });
}

const getAllCode = (dataType) => {
    return axios.get(`/api/allcode?type=${dataType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-shedule', data);
}

export {
    handleLoginApi, getAllUsers, createNewUser, deleteUser, updateUser,
    getAllCode, getTopDoctorHomeService, getAllDoctor, saveDetailDoctor,
    getDetailInfoDoctor, saveBulkScheduleDoctor
};
