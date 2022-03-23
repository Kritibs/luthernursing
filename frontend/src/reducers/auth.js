import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
        USER_LOADING,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
	AUTHENTICATED_FAIL,
	AUTHENTICATED_SUCCESS,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	PASSWORD_RESET_CONFIRM_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_SUCCESS,
	LOGOUT,
}from '../actions/types';

const initialState={
	access:localStorage.getItem('access'),
	refresh:localStorage.getItem('refresh'),
	isAuthenticated:null,
	isLoading: true,
	user:null,
	errormsg:'',
	is_admin:'',
};

export default function(state=initialState, action){
	const {type, payload} = action;

	switch(type) {
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated:true
			}

		case SIGNUP_SUCCESS:
			return {
				...state,
				isAuthenticated:false
			}
		case USER_LOADING:
			return {
				...state,
				isLoading: true
		      };
		case LOGIN_SUCCESS:
			localStorage.setItem('access', payload.access);
			return{
				...state,
				isAuthenticated: true, 
				isLoading: false,
				access: payload.access,
				refresh: payload.refresh
			}
		case USER_LOADED_SUCCESS:
			if (payload.id===1){
			return{
				...state,
				user:payload,
				isLoading: false,
				is_admin: true
			}
			}
				else{
			return{
				...state,
				user:payload,
				isLoading: false,
				is_admin:false,
			}

				}
		case USER_LOADED_FAIL:
			return{
				...state,
				user:null,
				isLoading: false,
			}
		case LOGIN_FAIL:
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			return{
				...state,
				access:null,
				refresh:null,
				isAuthenticated:false,
				isLoading: false,
				user:null,
				errormsg:"Invalid Credentials. Please try again!",
			}
		case SIGNUP_FAIL:
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			return{
				...state,
				access:null,
				refresh:null,
				isAuthenticated:false,
				isLoading: false,
				user:null,
				errormsg:"Something Went Wrong. Make sure password is strong and please Try Again!",
			}
		case LOGOUT:
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			return{
				...state,
				access:null,
				refresh:null,
				isAuthenticated:false,
				isLoading: false,
				user:null
			}

		case AUTHENTICATED_FAIL:
			return {
				...state,
				isAuthenticated:false,
				isLoading: false,
			}

		case PASSWORD_RESET_CONFIRM_FAIL:
			return{
				...state,
				isLoading: false,
				errormsg:"Something Went Wrong. Make sure password is strong and please Try Again!",
			}

		case PASSWORD_RESET_CONFIRM_SUCCESS:
		case PASSWORD_RESET_FAIL:
		case PASSWORD_RESET_SUCCESS:
		case ACTIVATION_FAIL:
		case ACTIVATION_SUCCESS:
			return{
				...state,
				isLoading: false,
			}
		default:
			return state
	}
};
