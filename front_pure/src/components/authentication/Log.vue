<template>
  <div class="panel">
    <h1>Dane logowania</h1>
    <hr>
    <Login
        v-model:email="user.email"
        v-model:password="user.password"
    />                                              <!--Form for dynamic fill data-->
    <p>{{urlInfo.message}}</p>
    <button @click="signIn()">Zaloguj</button>
  </div>
</template>

<script>
import Login from "@/components/forms/Login.vue";
import {loging} from "@/components/authentication/handleUsers";
export default {
  name: 'LogAndRegistry',
  components: {Login},

  data() {
    return {
      urlInfo: {                          //Data from API about logging
        type: Object,
        default: {}
      }
    }
  },

  props: {
    currentSite: {
      type: Object,
    },
    restUrl: String,
    user: {
      type: Object,
    }
  },

  methods: {
      async signIn(){                                                 //singing in function with swap state in app
        this.urlInfo = await loging(this.restUrl, this.user);
        if(this.urlInfo.correct){
          this.currentSite.layout = "main";
          this.currentSite.navi = "loggedIn";
        } else {
          this.user.email = "";
          this.user.password = "";
        }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
