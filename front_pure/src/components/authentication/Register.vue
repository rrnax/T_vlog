<template>
  <div class="panel">
    <h1>Rejestracja</h1>
    <hr>
    <Registry
      v-model:email="user.email"
      v-model:password="user.password" />                           <!--Form for dynamic fill data-->
    <p>{{this.urlInfo.message}}</p>
    <button @click="signUp()">Zaraejestruj sie</button>
  </div>
</template>

<script>
import Registry from "@/components/forms/Registry.vue";
import {registering} from "@/components/authentication/handleUsers";

export default {
  name: "Register",
  components: {Registry},


  data() {
    return {
      urlInfo: {                             //Data from API about registering
        type: Object,
        default: {}
      },

      user: {
        id: null,
        email: "",
        password: "",
        role: null,                       //0 - user, 1 - admin
        jwt: ""
      }
    }
  },

  props: {
    currentSite: {
      type: Object,
    },
    restUrl: String,
  },

  methods: {

    async signUp() {                                                //sing up function with emitting new user and status of app
      this.urlInfo = await registering(this.restUrl, this.user);
      if (this.urlInfo.correct){
        this.$emit('newUserData', this.user);
        this.currentSite.layout = "main";
        this.currentSite.navi = "loggedIn";
      } else {
        this.user.email = "";
        this.user.password = "";
      }
    }
  }
}
</script>

<style scoped>
.panel{
  width: 40%;
  background-color: var(--back_color);
  margin: 4% auto;
  display: block;
  border: 2px solid var(--elemants_color);
}

h1 {
  text-align: center;
}

hr {
  border: 1px solid var(--elemants_color);
}

p {
  text-align: center;
  font-size: 140%;
}

button {
  font-family: 'Pacifico', cursive;
  background-color: var(--back_color);
  border: 2px solid var(--elemants_color);
  border-radius: 20px;
  margin: 30px auto;
  display: flex;
  font-size: 100%;
  padding: 5px 30px;
  text-decoration: none;
  color: var(--text_color);
}

button:hover {
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  border: 2px solid var(--opossite_text);
}
</style>