import {
    getAllCode, createNewUser, getAllUsers,
    deleteUser, updateUser, getTopDoctorHomeService,
    getAllDoctor, saveDetailDoctor
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            });

            let res = await getAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('Fetch error: ', error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('Fetch error: ', error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('Fetch error: ', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const saveNewUser = (data) => {
    console.log('Data Redux: ', data);
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            if (res && res.errCode === 0) {
                toast.success("🐹 Create new user succeeded!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.warn("😒 Create user failed!");
                dispatch(saveUserFailed());
            }
        } catch (error) {
            toast.error("😢 Create user failed!");
            dispatch(saveUserFailed());
            console.log('Fetch error: ', error);
        }
    }
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                toast.success("🤪 All users loaded 🐶!");
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log('Fetch error: ', error);
        }
    }
}

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: users
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const DeleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId);
            if (res && res.errCode === 0) {
                toast.success("🐹 Delete user succeeded!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.warn("😒 Delete failed!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("😢 Delete failed!");
            dispatch(deleteUserFailed());
            console.log('Fetch error: ', error);
        }
    }
};

export const deleteUserSuccess = (users) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: users
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUser(data);
            if (res && res.errCode === 0) {
                toast.success("🐹 Update user succeeded!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.warn("😒 Update failed!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("😢 Update failed!");
            dispatch(editUserFailed());
            console.log('Fetch error: ', error);
        }
    }
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(limit);
            console.log(res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                fetchTopDoctorFailed();
            }
        } catch (error) {
            dispatch(fetchTopDoctorFailed());
        }
    }
}

export const fetchTopDoctorSuccess = (doctors) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: doctors
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                fetchAllDoctorFailed();
            }
        } catch (error) {
            dispatch(fetchAllDoctorFailed());
        }
    }
}

export const fetchAllDoctorSuccess = (doctorAll) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: doctorAll
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
})

export const saveADetailDoctor = (data) => {
    console.log('doctor detail: ', data);
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success("🐹 Create detail doctor succeeded!");
                dispatch(saveDetailDoctorSuccess(res.data));
            } else {
                toast.warn("😒 Create failed!");
                saveDetailDoctorFailed();
            }
        } catch (error) {
            toast.error("😢 Create failed!");
            dispatch(saveDetailDoctorFailed());
        }
    }
}

export const saveDetailDoctorSuccess = (doctorAll) => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
    data: doctorAll
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('TIME');
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success("🐹 Loading data succeeded!");
                dispatch(fetchAllCodeScheduleTimeSuccess(res.data));
            } else {
                toast.warn("😒 Loading failed!");
                fetchAllCodeScheduleTimeFailed();
            }
        } catch (error) {
            toast.error("😢 Loading failed!");
            dispatch(fetchAllCodeScheduleTimeFailed());
        }
    }
}

export const fetchAllCodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data: data
});

export const fetchAllCodeScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCode('PRICE');
            let resPayment = await getAllCode('PAYMENT');
            let resProvince = await getAllCode('PROVINCE');

            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0) {
                toast.success("🐹 Loading required doctor info succeeded!");
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                toast.warn("😒 Loading required doctor info failed!");
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (error) {
            toast.error("😢 Loading required doctor info failed!");
            dispatch(fetchRequiredDoctorInfoFailed());
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: data
});

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
