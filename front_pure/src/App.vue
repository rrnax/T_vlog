<template>
  <Navigation
      :current-site="currentSite"
      :rest-url="restURL"
      :user="user"/>                          <!--current site as props because we need to dynamic swap between sub sites-->
  <MainSite
      v-if="currentSite.layout === 'main'"
      :rest-url="restURL"
      :user="user"
      :current-site="currentSite"/>
  <Log
      v-if="currentSite.layout === 'login'"
      :rest-url="restURL"
      :user="user"
      :current-site="currentSite"/>           <!-- template to log in to application by API/axios -->
  <Register
      v-if="currentSite.layout === 'register'"
      :rest-url="restURL"
      :current-site="currentSite"
      @newUserData="user = $event"/>          <!-- this template returns new user so it's important -->
  <Account
      v-if="currentSite.layout === 'account'"
      :rest-url="restURL"
      :user="user" />
  <AddPost
      v-if="currentSite.layout === 'newPost'"
      :rest-url="restURL"
      :user="user"
      :current-site="currentSite"/>
  <EditPost
      v-if="currentSite.layout === 'editPost'"
      :rest-url="restURL"/>
  <PostDeatails
      v-if="currentSite.layout === 'postDeatails'"
      :current-site="currentSite"
      :rest-url="restURL"
      :user="user"/>


</template>

<script>
import MainSite from "@/components/articles/MainSite.vue";
import Navigation from "@/components/Navigation.vue";
import Log from './components/authentication/Log.vue'
import Register from "@/components/authentication/Register.vue";
import Account from "@/components/authentication/Account.vue";
import account from "@/components/authentication/Account.vue";
import AddPost from "@/components/articles/AddPost.vue";
import EditPost from "@/components/articles/EditPost.vue";
import PostDeatails from "@/components/articles/PostDeatails.vue";


export default {
  name: 'App',
  computed: {
    account() {
      return account
    }
  },
  components: {
    PostDeatails,
    EditPost,
    AddPost,
    Account,
    Register,
    MainSite,
    Navigation,
    Log
  },

  data() {
    return {
      currentSite: {                                //here we store subsite and nav type
        layout: "main",
        navi: "loggedOut",
        article: null
      },
      restURL: "http://localhost:3001/",
      user: {                                       //here we store user data
        id: null,
        email: "",
        password: "",
        role: null,                             //0 - user, 1 - admin
        jwt: ""
      }
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

:root{
  --back_color: #26a3e0;
  --text_color: black;
  --elemants_color: black;
  --opossite_text: white;
}

#app {
  margin: auto;
  padding: 0;
  font-family: 'Pacifico', cursive;
}
</style>
