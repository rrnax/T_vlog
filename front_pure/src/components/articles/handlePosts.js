import axios from "axios";

export async function pickPosts(restUrl){
    let posts = {};
    await axios.get(`${restUrl}content/posts`)
        .then(response => {
            posts = response['data'];
            console.log(response['data']);
        })
        .catch(error => {
            console.log(error);
        })
    return posts;
}

export async function newPost(restUrl, post){
    let postInfo = {};
    await axios.post(`${restUrl}content/posts`, post)
        .then(response =>{
            postInfo.message = response.data;
            postInfo.correct = true;
        })
        .catch(error => {
            postInfo.correct = false;
            console.log(error);
        })
    return postInfo;
}

export async function delatePost(restUrl, post){
    let postInfo = {};
    await axios.delete(`${restUrl}content/posts`, {
        data: {
            post: post
        }
    })
        .then(response => {
            postInfo.message = response.data;
            postInfo.correct = true;
        })
        .catch(error => {
            postInfo.correct = false;
            console.log(error);
        })
    return postInfo;
}