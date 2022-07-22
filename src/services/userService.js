import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login',
        {
            email, password
        }
    );
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id= ${id}`);
}

const createNewUser = (user) => {
    return axios.post('/api/create-new-user', {
        user
    });
}

const deleteUser = (id) => {
    return axios.delete(`/api/delete-user?id=${id}`);
}

export { handleLoginApi, getAllUsers, createNewUser, deleteUser };
