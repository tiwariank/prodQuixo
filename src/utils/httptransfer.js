import axios from "axios";
import Constants from "./constants";

const constant = new Constants();

export default class HttpTransferService  {

    quizQuery(){
        let url = constant.BASE_URL + "/api/quiz"
        return this.getCall(url);
    }

    createQuiz(inputjson){
        let url = constant.BASE_URL + "/api/quiz";
        return this.postCall(inputjson,url);
    }

    deleteQuiz(quizId){ 
        let url = constant.BASE_URL + "/api/quiz/" + quizId;
        return this.deleteCall({},url)
    }

    createQuestion(inputjson){
        let url = constant.BASE_URL + "/api/questions";
        return this.postCall(inputjson,url);
    }

    createFullQuestion(inputjson){
        let url = constant.BASE_URL + "/api/quest";
        return this.postCall(inputjson,url);
    }

    createFullImageQuestion(inputjson){
        let url = constant.BASE_URL + "/api/imagequest";
        return this.postCallFile(inputjson,url);
    }

    createOption(inputjson){
        let url = constant.BASE_URL + "/api/options";
        return this.postCall(inputjson,url);
    }

    uploadImageToServerStorage(inputjson){
        let url = constant.BASE_URL + "/api/image";
        return this.postCallFile(inputjson,url);
    }


    createImgeOptionName(inputjson){
        let url = constant.BASE_URL + "/api/imageoption";
        return this.postCall(inputjson,url);
    }

    questionQuery(quizId){
        let url = constant.BASE_URL + "/api/question/" +quizId;
        return this.getCall(url);
    }

    questionQueryByQuestion(quizId,questionId){
        let url = constant.BASE_URL + "/api/question/" + quizId + "/" + questionId;
        return this.getCall(url) 
    }

    optionQuery(quizId){
        let url = constant.BASE_URL + "/api/options/" +quizId;
        return this.getCall(url);
    }
    

    rootapi(){
       return this.getCall("http://localhost:4000/checkConnection")
    }

    uploadImage(file){
        this.postCall(file,"http://localhost:4000/upload")
        // return this.postCall({text: "i am here trying to upload"},"http://localhost:4000/checkpost")
    }

    downloadFile(){
        return this.getCall("http://localhost:4000/downloadFile")
    }


    productQuery(inputjson){
        return this.getCall("http://localhost:4000/productdetails/")
    }

    addProduct(inputjson){
        return this.postCall(inputjson,"http://localhost:4000/productdetails/add")
    }




    postCall(inputjson, url) {
        // var accesstoken = localStorage.getItem("token");
        console.log("input json")
        console.log(inputjson)
        var self = this;
        return axios
            .request({
                url: url,
                method: "post",
                data: inputjson,
                headers: {
                    // "Content-Type": "application/json",
                    // "Content-Type": "*",
                    // Accept: "application/json",
                    // Accept: "*",
                    // 'x-auth-token': accesstoken,
                    // 'refresh-token': localStorage.getItem('refreshtoken'),
                    // "mode": "no-cors"
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                    return self.setRefreshToken()
                        .then(response => {
                            if (response) {
                                return self.postCall(inputjson, url)
                            }
                            else if (error.response.status === 422) {
                                // localStorage.removeItem('entity_id')
                                // localStorage.removeItem('user_info')
                                // localStorage.removeItem('client_id')
                                // window.location.href = '/login';
                                return false
                            }
                        })
                }
                else if (error.response.status === 422) {
                    // localStorage.removeItem('entity_id')
                    // localStorage.removeItem('user_info')
                    // localStorage.removeItem('client_id')
                    // window.location.href = '/login';
                    return false
                }
                // toastservice.error(error.response.data.message);
                return error.response.data;
            });
    }

    postCallFile(inputjson, url) {
        // var accesstoken = localStorage.getItem("token");
        console.log("input json")
        console.log(inputjson)
        var self = this;
        return axios
            .request({
                url: url,
                method: "post",
                data: inputjson,
                headers: {
                    "Content-Disposition" : "attachment; filename=FILENAME.jpg",
                    // "Content-Type": "application/octet-stream",
                    "Content-Type": "*",

                    // "Accept": '*',
                    // "access-control-allow-origin" : "*",
                    // "Access-Control-Allow-Origin" : "*",
                    // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    // "Content-Type": "application/json",
                    // "Content-Type": "application/octet-stream",
                    // "accept": "image/*,application/pdf",
                    "Accept": "*/*"

                    // Accept: "*",
                    // Accept: "*",
                    // 'x-auth-token': accesstoken,
                    // 'refresh-token': localStorage.getItem('refreshtoken'),
                    // "mode": "no-cors"
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                    return self.setRefreshToken()
                        .then(response => {
                            if (response) {
                                return self.postCall(inputjson, url)
                            }
                            else if (error.response.status === 422) {
                                // localStorage.removeItem('entity_id')
                                // localStorage.removeItem('user_info')
                                // localStorage.removeItem('client_id')
                                // window.location.href = '/login';
                                return false
                            }
                        })
                }
                else if (error.response.status === 422) {
                    // localStorage.removeItem('entity_id')
                    // localStorage.removeItem('user_info')
                    // localStorage.removeItem('client_id')
                    // window.location.href = '/login';
                    return false
                }
                // toastservice.error(error.response.data.message);
                return error.response.data;
            });
    }

    putCall(inputjson, url) {
        var accesstoken = localStorage.getItem("token");
        var self = this
        return axios
            .request({
                url: url,
                method: "put",
                data: inputjson,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // 'x-auth-token': accesstoken,
                    // 'refresh-token': localStorage.getItem('refreshtoken')
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                    return self.setRefreshToken()
                        .then(response => {
                            if (response) {
                                return self.putCall(inputjson, url)
                            }
                        })
                }
                // toastservice.error(error.response.data.message);
                return error.response.data;
            });
    }

    putCallForFile(inputjson, url) {

        // var accesstoken = localStorage.getItem("token");
        var self = this
        return axios
            .request({
                url: url,
                method: "put",
                data: inputjson,
                headers: {
                    "Content-Type": "application/octet-stream",
                    Accept: '*',
                    // 'x-auth-token': accesstoken,
                    // 'refresh-token': localStorage.getItem('refreshtoken')
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                    return self.setRefreshToken()
                        .then(response => {
                            if (response) {
                                // return self.putCall(inputjson, url)
                            }
                        })
                }
                // toastservice.error(error.response.data.message);
                return error.response.data;
            });
    }

    deleteCall(inputjson, url) {
        var self = this
        var accesstoken = localStorage.getItem("token");
        return axios
            .request({
                url: url,
                method: "delete",
                data: inputjson,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // 'x-auth-token': accesstoken,
                    // 'refresh-token': localStorage.getItem('refreshtoken')
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                    return self.setRefreshToken()
                        .then(response => {
                            if (response) {
                                return self.deleteCall(inputjson, url)
                            }
                        })
                }
                // toastservice.error(error.response.data.message);
                return error.response.data;
            });
    }

    getCall(url) {
        var self = this
        // var accesstoken = localStorage.getItem("token");
        return axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // 'x-auth-token': accesstoken,
                // 'refresh-token': localStorage.getItem('refreshtoken')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error)
                // if (error.response.status === 401 && error.response.data.message === self.refreshErrorMessage) {
                //     return self.setRefreshToken()
                //         .then(response => {
                //             if (response) {
                //                 return self.getCall(url)
                //             }
                //         })
                // }
                // return error.response.data;
            });
    }
}