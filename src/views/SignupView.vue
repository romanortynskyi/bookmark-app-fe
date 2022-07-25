<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isFetching: false,
    }
  },
  mounted() {
    const { token } = JSON.parse(localStorage.getItem('user')) || {}

    if (token) {
      this.$router.replace('/')
    }
  },
  methods: {
    async onSubmit() {
      this.isFetching = true

      const response = await fetch('http://localhost:3000/auth/signup', {
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })

      const user = await response.json()

      localStorage.setItem('user', JSON.stringify(user))
      this.$router.replace('/')
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="grid align__item">
      <div class="register">
        <h2>Sign up</h2>
  
        <form class="form" @submit.prevent="onSubmit">
          <div class="form__field">
            <input type="text" placeholder="First name" v-model="firstName">
          </div>
          
          <div class="form__field">
            <input type="text" placeholder="Last name" v-model="lastName">
          </div>

          <div class="form__field">
            <input type="email" placeholder="Email" v-model="email">
          </div>
  
          <div class="form__field">
            <input type="password" placeholder="Password" v-model="password">
          </div>
  
          <div class="form__field">
            <button type="submit">Sign up</button>
          </div>
        </form>

        <p>
          Already have an account?
          <RouterLink to="/login">Login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #354152;
  color: #7e8ba3;
  font: 300 1rem/1.5 Helvetica Neue, sans-serif;
  
  min-height: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

.align {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.align__item--start {
  align-self: flex-start;
}

.align__item--end {
  align-self: flex-end;
}

.site__logo {
  margin-bottom: 2rem;
}

input {
  border: 0;
  font: inherit;
  color: #7e8ba3;
}

input::placeholder {
  color: #7e8ba3;
}

.form__field {
  margin-bottom: 1rem;
}

.form input {
  outline: 0;
  padding: 0.5rem 1rem;
}

.form input {
  width: 100%;
}

.grid {
  margin: 0 auto;
  max-width: 25rem;
  width: 100%;
}

h2 {
  font-size: 2.75rem;
  font-weight: 100;
  margin: 0 0 1rem;
  text-transform: uppercase;
}

svg {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

a {
  color: #7e8ba3;
}

.register {
  box-shadow: 0 0 250px #000;
  text-align: center;
  padding: 4rem 2rem;
}

.register input {
  border: 1px solid #242c37;
  border-radius: 999px;
  background-color: transparent;
}

.register button {
  background-image: linear-gradient(160deg, #8ceabb 0%, #378f7b 100%);
  color: #fff;
  margin-bottom: 6rem;
  outline: none;
  border: none;
  border-radius: 999px;
  padding: 15px;
  cursor: pointer;
}

</style>
