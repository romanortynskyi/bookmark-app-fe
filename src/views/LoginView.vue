<script>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',

      emailError: null,
      passwordError: null,

      emailWasTouched: false,
      passwordWasTouched: false,

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

      const response = await fetch('http://localhost:3000/auth/login', {
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })

      const responseBody = await response.json()

      if (!response.ok) {
        this.$notify({
          text: responseBody.message,
          type: 'error',
        })
      } 

      else {
        localStorage.setItem('user', JSON.stringify(responseBody))
        this.$router.replace('/')
      }
      
    }
  },
  watch: {
    email(newEmail) {
      this.emailWasTouched = true

      if (newEmail.length === 0) {
        this.emailError = 'Email should not be empty'
        return
      }

      const regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const isValid = regexp.test(newEmail)
      
      if(!isValid) {
        this.emailError = 'Email should be a valid email'
        return
      }

      this.emailError = null
    },
    password(newPassword) {
      this.passwordWasTouched = true

      if (newPassword.length === 0) {
        this.passwordError = 'Password should not be empty'
        return
      }

      if (newPassword.length < 6) {
        this.passwordError = 'Password should be at least 6 characters long'
        return
      }

      this.passwordError = null
    },
  },
  computed: {
    isSubmitDisabled() {
        return Boolean(this.emailError)
        || Boolean(this.passwordError)
        || !this.emailWasTouched
        || !this.passwordWasTouched
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="grid align__item">
      <div class="register">
        <h2>{{ $t('login') }}</h2>
  
        <form class="form" @submit.prevent="onSubmit">
          <Input
            type="email"
            :placeholder="$t('email')"
            v-model="email"
            :error="emailError"
          />
          <Input
            type="password"
            :placeholder="$t('password')"
            v-model="password"
            :error="passwordError"
          />
          
          <Button
            :text="$t('login')"
            type="submit"
            :disabled="isSubmitDisabled"
          />
        </form>

        <p>
          {{ $t('dontHaveAnAccount') }}?
          <RouterLink to="/signup">{{ $t('signup') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--background-color);
  /* background-color: #354152; */
  /* color: #7e8ba3; */
  color: var(--text-color);
  font: 300 1rem/1.5 Helvetica Neue, sans-serif;
  
  min-height: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

input {
  border: 0;
  font: inherit;
  color: #222120;
}

input::placeholder {
  color: #666;
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
  color: #666;
}

.register {
  box-shadow: 0px 0px 8px -4px #000000;
  border-radius: 20px;
  text-align: center;
  padding: 4rem 2rem;
}

.register input {
  border: 1px solid #242c37;
  border-radius: 999px;
  background-color: transparent;
}

</style>
