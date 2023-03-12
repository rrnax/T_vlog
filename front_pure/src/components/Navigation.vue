<template>
  <nav>
    <div class="nav_title">
      <h1 @click="changeSubSite('main')">T_vlog</h1>
    </div>
    <div class="nav_menu" v-if="currentSite.navi === 'loggedOut'">                    <!-- Navi type whene user is not logged -->
      <button @click="changeSubSite('login')">Zaloguj się</button>
      <button @click="changeSubSite('register')">Zarejestruj sie</button>
    </div>
    <div class="nav_menu" v-if="currentSite.navi === 'loggedIn'">                     <!-- Navi type whene user is logged -->
      <button @click="changeSubSite('account')">Konto</button>
      <button @click="logOut()">Wyloguj się</button>
      <p class="nick">{{user.email}}</p>
    </div>
  </nav>
</template>

<script>
import {logingOut} from "@/components/authentication/handleUsers";

export default {
  name: "Navigation",

  data(){
    return{
      urlInfo: {                              //here weh have data from API about logging out
        type: Object,
      }
    }
  },

  props: {
    currentSite:{
      type: Object,
    },

    restUrl: String,

    user: {
      type: Object,
    }
  },

  methods: {
    changeSubSite(subSite) {                        //states to change sub sites
      this.currentSite.layout = subSite;
    },

    async logOut() {                                              //logging out process
      this.urlInfo = await logingOut(this.restUrl, this.user);
      if(this.urlInfo.correct) {
        // for(let properties in this.user) delete this.user[properties];
        this.user.email = "";
        this.user.role = -1;
        this.currentSite.layout = "login";
        this.currentSite.navi = "loggedOut";
      } else {

      }
    }
  }
}
</script>

<style scoped>


nav {
  background-color: var(--back_color);
  display: flex;
  margin: 0;
  top: 0;
  position: sticky;
  z-index: 2;
  overflow: hidden;
  justify-content: space-between;
  border-bottom: 2px solid var(--elemants_color);
}

.nav_title{
  display: flex;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
}

h1 {
  margin: 5% 20%;

}

.nav_menu {
  display: flex;
}

button {
  font-family: 'Pacifico', cursive;
  background-color: var(--back_color);
  border: none;
  display: flex;
  padding: 20px;
  font-size: 140%;
  text-decoration: none;
  color: var(--text_color);
  cursor: pointer;
}

button:hover {
  background-color: var(--elemants_color);
  color: var(--opossite_text);
}

p {
  font-size: 140%;
  margin: auto 20px;
}

</style>