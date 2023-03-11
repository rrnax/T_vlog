import axios from "axios";

export async function registering(restUrl, user){                       //register API function
    let urlInfo = {};
    await axios.post(`${restUrl}users`, {
        "user": {
            "email": user.email,
            "password": user.password
        }
    })
        .then(response => {
            user.jwt = response.headers['authorization'];
            user.email = response.data['data'].email;
            user.role = response.data['data'].role;
            user.id = response.data['data'].id;
            urlInfo.message = response.data['message'];
            urlInfo.correct = true;
            console.log(response);
        })
        .catch(error => {
            urlInfo.message = error.response['data'].message;
            urlInfo.correct = false;
            console.log(error);
        })
    return urlInfo;
}

export async function loging(restUrl, user) {                       //log in API function
    let urlInfo = {};
    await axios.post(`${restUrl}users/sign_in`,{
        "user": {
            "email": user.email,
            "password": user.password
        }
    })
        .then(response => {
            user.jwt = response.headers['authorization'];
            user.email = response.data['data'].email;
            user.role = response.data['data'].role;
            user.id = response.data['data'].id;
            urlInfo.message = response.data['message'];
            urlInfo.correct = true;
            console.log(response);
        })
        .catch(error => {
            urlInfo.message = error.response['data'];
            urlInfo.correct = false;
            console.log(error);
        });
    return urlInfo;
}

export function isLoggedOn(restUrl, user) {                     //checking current user is logged
    axios.get(`${restUrl}current_user`, {
        headers: {
            'Authorization': user.jwt
        }
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

export async function logingOut (restUrl, user) {                   //logging out API function
    let urlInfo = {};
    await axios.delete(`${restUrl}users/sign_out`, {
        headers: {
            'Authorization': user.jwt
        }
    })
        .then(response => {
            // urlInfo.message = ;
            urlInfo.correct = true;
            console.log(response);
        })
        .catch(error => {
            // urlInfo.message = ;
            urlInfo.correct = true;
            console.log(error);
        })
    return urlInfo;
}

export async function updateAccount(restUrl, user, newPassword, newEmail){
    let urlInfo = {};
    await axios.put(`${restUrl}users/user`, {
        "user": {
            "id": user.id,
            "email": newEmail,
            "password": newPassword
        }
    }, {
        headers: {
            'Authorization':user.jwt
        }
    }).then(response => {
        urlInfo.message = response.data['message'];
        urlInfo.correct = true;
        console.log(response);
    }).catch(error => {
        urlInfo.message = error.data['message'];
        urlInfo.correct = false;
        console.log(error);
    })
    return urlInfo;
}

export async function findUser(restUrl, id){
    let urlInfo = {};
    await axios.get(`${restUrl}users/user/${id}`)
        .then(response => {
            urlInfo.message = "Udało się pobrać użytkownika";
            urlInfo.user = response['data'];
        })
        .catch(error => {
            urlInfo.message = "Nie udało się pobrać użytkownika";
        });
    return urlInfo;
}