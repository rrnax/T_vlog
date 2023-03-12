<template xmlns="http://www.w3.org/1999/html">
  <div class="post">
    <div class="post-header">
      <p v-if="!editonable" class="tittle">{{this.currentSite.article.title}}</p>
      <input v-if="editonable" v-model="this.currentSite.article.title" class="tittle edit-title">
      <div class="info">
        <p>{{this.currentSite.article.user_id}}</p>
        <p> | </p>
        <p>{{this.currentSite.article.updated_at }}</p>
      </div>
    </div>
    <div class="post-body">
      <p v-if="!editonable" class="content">{{this.currentSite.article.body}}</p>
      <textarea v-if="editonable" v-model="this.currentSite.article.body" class="content edit-content"/>
    </div>
    <div v-if="this.user.email === this.currentSite.article.user_id" class="to-right">
      <button v-if="!editonable" class="precise" @click="editPost">Edytuj ten Post</button>
      <button v-if="editonable" class="precise" @click="back">Odrzuć</button>
      <button v-if="editonable" class="precise" @click="savePost">Zapisz</button>
      <button v-if="!editonable" class="del" @click="sendDelate">Usuń ten post</button>
    </div>
    <div class="sumUp">
      <p>{{this.comments.length}} komentarze</p>
    </div>
    <Comment v-for="comment in this.comments"
         :rest-url="this.restUrl"
         :user="this.user"
         :comment="comment"/>
    <div class="new-comment">
      <textarea class="new-body" placeholder="Napisz komentarz..." />
      <button class="confirm-body" @click="addComment">Dodaj</button>
    </div>
  </div>

</template>

<script>
import {delatePost, updatePost} from "@/components/articles/handlePosts";
import {getCommentsToPost, createComment} from "@/components/articles/comments/handleComments";
import Comment from "@/components/articles/comments/Comment.vue";

export default {
  name: "PostDeatails",

  components: {
    Comment
  },

  data(){
    return {
      editonable: false,

      tempPost: {
        title: "",
        body: ""
      },

      comments: [],
    }
  },

  props: {
    restUrl: String,

    currentSite: {
      type: Object
    },

    user: {
      type: Object
    }
  },

  methods: {
    editPost(){
      this.tempPost.title = this.currentSite.article.title;
      this.tempPost.body = this.currentSite.article.body;
      this.editonable = true;
    },

    back(){
      this.currentSite.article.title = this.tempPost.title;
      this.currentSite.article.body = this.tempPost.body;
      this.editonable = false;
    },

    async savePost(){
      let info = {};
      info = await updatePost(this.restUrl, this.currentSite.article);
      // console.log(post);
       if(!info.correct){
         this.currentSite.article.title = this.tempPost.title;
         this.currentSite.article.body = this.tempPost.body;
         this.editonable = false;
       }
      this.editonable = false;
    },

    async addComment(){
      let info = {}, comment = {}, temp = {};
      comment.user_id = this.user.id;
      comment.post_id = this.currentSite.article.id;
      comment.body = document.querySelector(".new-body").value;
      info = await createComment(this.restUrl, comment);
      console.log(info);
      if(info.correct){
        temp = await getCommentsToPost(this.restUrl, comment);
        this.comments = temp.list;
        document.querySelector(".new-body").value = '';
      }
    },

    async sendDelate(){
      let info = {};
      info = await delatePost(this.restUrl, this.currentSite.article);
      if(info.correct){
        this.currentSite.layout = 'main';
        console.log(info.message);
      } else {
        console.log(info.message);
      }
    }
  },

  async created() {
    let info ={}, comment = {};
    comment.post_id = this.currentSite.article.id;
    info = await getCommentsToPost(this.restUrl, comment);
    this.comments = info.list;
    // console.log(this.comments);
  }
}
</script>

<style scoped>

.new-comment {
  width: 90%;
  display: flex;
  margin: 70px auto;
  justify-content: center;
}

.new-body {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid var(--elemants_color);
}

.confirm-body {
  width: 90px;
  font-size: 15px;
  padding: 10px;
  border-radius: 0 20px 20px 0;
  font-family: "Cantarell Extra Bold";
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  border: var(--elemants_color) 4px solid;
  cursor: pointer;
}

.confirm-body:hover {
  border: var(--elemants_color) 2px solid;
  background-color: var(--opossite_text);
  color: var(--text_color);
}

.sumUp {
  width: 90%;
  margin: 0 auto;
  font-size: 20px;
}

.to-right{
  display: flex;
  justify-content: end;
}

.precise {
  width: 130px;
  font-size: 15px;
  margin: 20px 20px 20px 20px;
  padding: 10px;
  border-radius: 20px;
  font-family: "Cantarell Extra Bold";
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  border: var(--elemants_color) 2px solid;
  cursor: pointer;
}

.precise:hover {
  border: var(--elemants_color) 2px solid;
  background-color: var(--opossite_text);
  color: var(--text_color);
}

.del {
  font-family: "Cantarell Extra Bold";
  width: 120px;
  font-size: 15px;
  padding: 10px;
  background-color: darkred;
  color: var(--opossite_text);
  margin: 20px 20px 20px 20px;
  border-radius: 20px;
  border: darkred 2px solid;
}

.del:hover {
  border: darkred 2px solid;
  background-color: var(--opossite_text);
  color: darkred;
  cursor: pointer;
}

.alert {
  display: flex;
  justify-content: center;
  margin: 200px auto;
}

.post {
  width: 90%;
  margin: 50px auto;
  padding: 0;
  border: solid 2px var(--elemants_color);
}

.post-header {
  background-color: var(--back_color);
  display: flex;
  justify-content: space-between;
  margin: 0;
  border-bottom: solid 2px var(--elemants_color);
}

.post-body {
  display: flex;
  justify-content: center;
}

.tittle {
  font-size: 30px;
  margin: 20px;
  border-radius: 20px;
}

.edit-title {
  padding: 5px 20px;
  width: 60%;
}

.info {
  font-size: 20px;
  width: 30%;
  display: flex;
  justify-content: end;
  color: dimgrey;
  margin: auto 20px auto 0;
}

.info p {
  margin-right: 10px;
}

.content{
  margin: 20px auto;
  font-size: 25px;
  width: 95%;
  border-radius: 20px;
}

.edit-content {
  height: 300px;
  padding: 20px;
}

</style>