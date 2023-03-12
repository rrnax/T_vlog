<template>
  <button v-if="this.user.role === 2"
          class="adding"
          @click="this.currentSite.layout = 'newPost'">Dodaj post +</button>
  <div class="alert" v-if="empty">
    <h1>Nie ma aktualnie żadnych postów</h1>
  </div>
  <div class="post" v-for="post in this.posts">
    <div class="post-header">
      <h1 class="tittle">{{post.title}}</h1>
      <div class="info">
        <p>{{post.user_id}}</p>
        <p> | </p>
        <p>{{post.updated_at}}</p>
      </div>
    </div>
    <h2 class="content">{{post.body}}</h2>
    <div class="to-right">
      <button class="precise" @click="showArticle(post)">Szczegóły</button>
    </div>
  </div>
</template>

<script>
import {pickPosts} from "@/components/articles/handlePosts";
import moment from 'moment'
import {findUser} from "@/components/authentication/handleUsers";

export default {
  name: "MainSite",

  data(){
    return {
      posts: [],
      empty: true
    }
  },

  props: {
    restUrl: String,

    user: {
      type: Object,
    },

    currentSite: {
      type: Object,
    }
  },

  methods: {
    showArticle(post){
      this.currentSite.layout = 'postDeatails';
      this.currentSite.article = post;
    },
  },

  async created() {                                     //Download from API post and user names, parsing data
    this.posts = await pickPosts(this.restUrl);
    if (this.posts.length) {
      this.empty = false;
      for (const post of this.posts) {
        let tempInfo = await findUser(this.restUrl, post.user_id);
        post.user_id = tempInfo.user.email;
        post.updated_at = moment(String(post.updated_at)).format('MM.DD.YYYY HH:mm');
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
  margin: 10px;
  font-size: 17px;
  width: 120px;
  height: 30px;
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

.adding {
  font-family: "Cantarell Extra Bold";
  width: 150px;
  font-size: 20px;
  padding: 10px;
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  margin: 20px 20px 0 20px;
  border-radius: 20px;
  border: var(--elemants_color) 2px solid;
  cursor: pointer;
}

.adding:hover {
  border: var(--elemants_color) 2px solid;
  background-color: var(--opossite_text);
  color: var(--text_color);
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
  display: flex;
  color: dimgrey;
  font-size: 20px;
}

.info p {
  margin-right: 10px;
}

.content{
  margin: 20px;
}

</style>