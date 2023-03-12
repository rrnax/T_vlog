import axios from "axios";

export async function getCommentsToPost(restUrl, comment){
    let commentInfo = {};
    await axios.post(`${restUrl}content/comments/list`, {
        comment
    })
        .then(response => {
            commentInfo.list = response['data'];
            commentInfo.message = response['message'];
        })
        .catch(error => {
            commentInfo.message = error['message'];
            console.log(error);
        })
    return commentInfo;
}

export async function createComment(restUrl, comment){
    let commentInfo = {};
    await axios.post(`${restUrl}content/comments`, comment)
        .then(response => {
            commentInfo.message = response.data['message'];
            commentInfo.correct = true;
            console.log(response);
        })
        .catch(error => {
            commentInfo.correct = false;
            console.log(error);
        });
    return commentInfo;
}

export async function updateComment(restUrl, comment){
    let commentInfo = {};
    await axios.put(`${restUrl}content/comments`,{
        "comment": {
            "id": comment.id,
            "body": comment.body
        }
    })
        .then(response => {
            commentInfo.message = response.data['message'];
            commentInfo.correct = true;
            console.log(response);
        })
        .catch(error => {
            commentInfo.correct = false;
            console.log(error);
        })
    return commentInfo;
}

export async function delateComment(restUrl, comment){
    let commentInfo = {};
    await axios.delete(`${restUrl}content/comments`, {
        data: {
            comment: comment
        }
    })
        .then(response => {
            commentInfo.message = response.data['message'];
            commentInfo.correct = true;
        })
        .catch(error => {
            commentInfo.correct = false;
            console.log(error);
        })
    return commentInfo;
}