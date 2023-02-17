
import { createStore } from 'redux'

const initialState = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    townCity: '',
    postcode: '',
    email: '',
    password: ''
}
export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
export const UPDATE_ADDRESS_LINE_1 = 'UPDATE_ADDRESS_LINE_1';
export const UPDATE_ADDRESS_LINE_2 = 'UPDATE_ADDRESS_LINE_2';
export const UPDATE_TOWN_CITY = 'UPDATE_TOWN_CITY';
export const UPDATE_POSTCODE = 'UPDATE_POSTCODE';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const updateFirstName = (firstName) => ({
    type: UPDATE_FIRST_NAME,
    payload: firstName,
});

export const updateLastName = (lastName) => ({
    type: UPDATE_LAST_NAME,
    payload: lastName,
});

export const updateAddressLine1 = (addressLine1) => ({
    type: UPDATE_ADDRESS_LINE_1,
    payload: addressLine1,
});
export const updateAddressLine2 = (addressLine2) => ({
    type: UPDATE_ADDRESS_LINE_2,
    payload: addressLine2,
});
export const updateTownCity = (townCity) => ({
    type: UPDATE_TOWN_CITY,
    payload: townCity,
});
export const updatePostcode = (postcode) => ({
    type: UPDATE_POSTCODE,
    payload: postcode,
});

export const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    payload: email,
});

export const updatePassword = (password) => ({
    type: UPDATE_PASSWORD,
    payload: password,
});

