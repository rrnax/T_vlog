<template>
  <div class="post-form">
    <h1>Utwórz nowy post</h1>
    <div class="head">
      <hr>
      <input id="title" placeholder="Tytuł">
    </div>
    <div class="content">
      <textarea class="body" placeholder="Tekst"></textarea>
    </div>
    <button @click="makePost" class="adding">+ Dodaj</button>
  </div>
</template>

<script>
import {newPost} from "@/components/articles/handlePosts";

export default {
  name: "AddPost",

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
    async makePost(){
      let post = {}, info = {};
      let body = document.querySelector(".body").value;
      let title = document.querySelector("#title").value;
      post.user_id = this.user.id;
      post.title = title;
      post.body = body;
      info = await newPost(this.restUrl, post);
      this.currentSite.layout = 'main';
    }
  }
}
</script>

<style scoped>

.adding {
  display: flex;
  width: 100px;
  font-size: 20px;
  padding: 10px;
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  margin: 20px auto;
  border-radius: 20px;
  border: var(--elemants_color) 2px solid;
}

.adding:hover {
  border: var(--elemants_color) 2px solid;
  background-color: var(--opossite_text);
  color: var(--text_color);
}

.post-form {
  background-color: var(--back_color);
  text-align: center;
  border: var(--elemants_color) 2px solid;
  margin: 40px 200px;
}

.head {
  display: grid;
  text-align: start;
  margin: 10px;

}

#title {
  width: 90%;
  height: 30px;
  font-size: 20px;
  margin: auto;
  border-radius: 10px;
}

.content {
  display: grid;
  text-align: start;
  margin: 10px;
}

.body {
  font-size: 20px;
  width: 90%;
  margin: 20px auto;
  height: 400px;
  border-radius: 10px;
}

</style>