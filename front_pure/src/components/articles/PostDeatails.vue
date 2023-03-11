<template>
  <div class="post">
    <div class="post-header">
      <h1 class="tittle">{{this.currentSite.article.title}}</h1>
      <h2 class="info">{{this.currentSite.article.user_id}} {{this.currentSite.article.created_at }}</h2>
    </div>
    <h2 class="content">{{this.currentSite.article.body}}</h2>
    <div v-if="this.user.email === this.currentSite.article.user_id" class="to-right">
      <button class="precise" @click="editPost">Edytuj ten Post</button>
      <button class="del" @click="sendDelate">Usuń ten post</button>
    </div>
  </div>
</template>

<script>
import {delatePost} from "@/components/articles/handlePosts";

export default {
  name: "PostDeatails",

  data(){
    return {
      editonable: false,
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
      this.editonable = true;
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
  }
}
</script>

<style scoped>

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

.tittle {
  margin-left: 20px;
}

.info {
  color: dimgrey;
  margin: auto 20px auto 0;
  word-spacing: 20px;
}

.content{
  margin: 20px;
}

</style>