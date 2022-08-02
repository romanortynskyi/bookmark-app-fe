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
      firstName: '',
      lastName: '',
      email: '',
      password: '',

      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,

      firstNameWasTouched: false,
      lastNameWasTouched: false,
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
    firstName(newFirstName) {
      this.firstNameWasTouched = true

      if (newFirstName.length === 0) {
        this.firstNameError = 'First name should not be empty'
        return
      }

      this.firstNameError = null
    },
    lastName(newLastName) {
      this.lastNameWasTouched = true

      if (newLastName.length === 0) {
        this.lastNameError = 'Last name should not be empty'
        return
      }

      this.lastNameError = null
    },
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
      return Boolean(this.firstNameError)
        || Boolean(this.lastNameError)
        || Boolean(this.emailError)
        || Boolean(this.passwordError)
        || !this.firstNameWasTouched
        || !this.lastNameWasTouched
        || !this.emailWasTouched
        || !this.passwordWasTouched
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="grid">
      <div class="register">
        <h2 class="title">{{ $t('signup') }}</h2>
  
        <form @submit.prevent="onSubmit">
          <Input
            type="text"
            :placeholder="$t('firstName')"
            v-model="firstName"
            :error="firstNameError"
          />
          <Input
            type="text"
            :placeholder="$t('lastName')"
            v-model="lastName"
            :error="lastNameError"
          />
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
            :text="$t('signup')"
            type="submit"
            :disabled="isSubmitDisabled"
          />
        </form>

        <p>
          {{ $t('alreadyHaveAnAccount') }}?
          <RouterLink to="/login">{{ $t('login') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--background-color);
  color: var(--text-color);
  font: 300 1rem/1.5 Helvetica Neue, sans-serif;
  
  min-height: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

.grid {
  margin: 0 auto;
  max-width: 25rem;
  width: 100%;
}

a {
  color: var(--green);
}

.register {
  box-shadow: 0px 0px 8px -4px var(--text-color);
  border-radius: 20px;
  text-align: center;
  padding: 4rem 2rem;
}

</style>
