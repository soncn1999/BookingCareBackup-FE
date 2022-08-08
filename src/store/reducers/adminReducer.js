import actionTypes from '../actions/actionTypes';

// const initContentOfConfirmModal = {
//     isOpen: false,
//     messageId: "",
//     handleFunc: null,
//     dataFunc: null
// }

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    doctors: [],
    doctorAll: [],
    allScheduleTime: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS: {
            state.users = action.data;
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_ALL_USER_FAILED: {
            state.users = [];
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: {
            state.doctors = action.data;
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED: {
            state.doctors = [];
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
            state.doctorAll = action.data;
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED: {
            state.doctorAll = [];
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: {
            state.allScheduleTime = action.data;
            return {
                ...state,
            }
        }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED: {
            state.allScheduleTime = [];
            return {
                ...state,
            }
        }
        default:
            return state;
    }
}

export default adminReducer;