<template>
  <div class="panel">
    <h1>Dane użytkownika:</h1>
    <hr>
     <div class="input-block">
       <label for="email">E-mail: </label>
       <input
         type="text"
         id="email"
         :value="this.user.email"
         />
     </div>
     <div class="input-block">
       <label for="password">Nowe hasło:  </label>
       <input
         type="password"
         id="password"
         :value="this.user.password"
       />
     </div>
     <div class="input-block">
       <label for="cpassword">Potwierdź zmiany aktualnym hasłem:  </label>
       <input
           type="password"
           id="cpassword"
       />
       <button @click="changeAccountData()"> Zatwierdź zmiany </button>
     </div>
  </div>
</template>

<script>
import {updateAccount} from "@/components/authentication/handleUsers";

export default {
  name: "Account",

  props: {
    restUrl: String,

    user: {
      type: Object,
    }
  },

  methods: {
     async changeAccountData() {
      let newPassword = document.querySelector("#password").value;
      let cPassword = document.querySelector("#cpassword").value;
      let newEmail = document.querySelector("#email").value
      if(cPassword === this.user.password){
        let urlInfo = await updateAccount(this.restUrl, this.user, newPassword, newEmail);
        if (urlInfo.correct){
          alert(urlInfo.message);
          this.comment = urlInfo.message;
          this.user.email = newEmail;
          this.user.password = newPassword;
        } else {
          alert("Serwer nie mógł zaktualizować informacji");
        }
      } else {
        alert("Nieprawidłowe aktualne hasło!");
      }
    },
  }
}
</script>


<style scoped>

.panel {
  margin: 5% auto;
  width: 90%;
  border: 2px solid var(--elemants_color);
  background-color: var(--back_color);
}

h1 {
  margin: auto;
  padding: 10px 20px;
}

hr {
  width: 95%;
  border: 1px solid var(--elemants_color);
}



.input-block {
  width: 100%;
  margin: 40px 10px;
}

label {
  font-size: 20px;
  margin: 20px 20px;
}

input {
  width: 30%;
  height: 25px;
  border-radius: 10px;
}

button {
  font-family: 'Pacifico', cursive;
  background-color: var(--elemants_color);
  color: var(--opossite_text);
  border-radius: 20px;
  margin: 20px auto;
  display: flex;
  font-size: 100%;
  padding: 5px 30px;
  text-decoration: none;
}

button:hover {
  background-color: var(--back_color);
  color: var(--text_color);
  border: 2px solid var(--elemants_color);
}

.comment {
  font-size: 20px;
  text-align: center;
}
</style>