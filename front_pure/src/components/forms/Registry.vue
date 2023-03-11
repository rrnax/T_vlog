<template>
  <form>                                                       <!--forms implement as auto fill data in variables by emitting updates-->
    <div>
      <label for="email">E-mail:</label>
      <input
          type="text"
          id="email"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
      />
    </div>
    <div>
      <label for="password">Hasło:</label>
      <input
          type="password"
          id="password"
          :value="password"
          @input="$emit('update:password', $event.target.value)"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "Registry",

  props: {
    email: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>


label {
  margin: 0 20%;
  font-size: 130%;
}

input {
  display: block;
  width: 60%;
  height: 20px;
  margin: 20px auto;
  border: var(--elemants_color) solid 2px;
  border-radius: 10px;
  padding: 5px;
}


</style>