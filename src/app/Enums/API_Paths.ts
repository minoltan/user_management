export enum ApiPaths{
    testAPI = '/api/testAPI',//TODO: REMOVE AFTER TEST COMPONENT REMOVED

    //Authentication
    loginAPI = "/api/authentication/login",
    forgetPasswordAPI = "/api/authentication/forgetPassword",
    requestNewPasswordAPI = "/api/authentication/passwordReset",
    passwordUpdateApi = "/api/authentication/updatePassword",

    //User Profile
    profileCreateApi = "/api/administrator/superAdmin/addAdmin",
    profileEditApi = "/sample",//TODO: MODIFY
    profileLoadAPI = "/sample2",//TODO: MODIFY

    //User Management
    getAllUsersAPI = "https://reqres.in/api/users",
    getUserAPI = "https://reqres.in/api/users/",


    //Encrypt & Decrypt
    encryptAPI = "/api/authentication/encrypt",
    decryptAPI = "/api/authentication/decrypt",


    postCardOrderAPI = "/api/payhere/post"
}
