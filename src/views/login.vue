<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <br>
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;font-size:50px;color: #333;">LOGIN</strong>
            <br>
            <br>
            <p v-if="error == 'WRONG USERNAME AND PASSWORD'" style="color:red">{{error}}</p>
            <p v-if="error == 'IT CORRECTLY'" style="color:green">{{error}}</p>
          </div>
          <br>
          <b-card style="background-color: rgba(255, 255, 255, 0.4);-webkit-backdrop-filter: blur(10px);">
          <b-form v-if="show" onsubmit="return false">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username</label>
                <b-form-input
                  id="input-1"
                  v-model="form.employee_id"
                  type="text"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group id="input-group-2">
              <label class="forminput">Password</label>
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <div>
            <b-button class="success btn-block" variant="success" type="submit" v-on:click="postLogin ()">LOGIN</b-button><br>
            </div>
            <div>
            </div>
          </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data () {
    return {
      form: {
        employee_id: '',
        password: ''
      },
      show: true,
      error: '',
      login: [],
      jwt: [],
      set: [],
      data: []
    }
  },
  beforeCreate () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
      location.replace('/dashboard')
    } else {
      console.log('re login')
    }
  },
  created () {},
  beforeUpdate () {},
  updated () {},
  beforeMount () {},
  mounted () {
    this.checkPermission()
  },
  methods: {
    postLogin () {
      this.form.employee_id = this.form.employee_id.toUpperCase()
      this.form.password = md5(this.form.password)
      // console.log(this.data)
      axios.post('http://localhost:4000/emp/login', this.form)
        .then(response => {
          console.log(VueJwtDecode.decode(response.data))
          const jwt = VueJwtDecode.decode(response.data)
          if (jwt.loginSuccessfull === true) {
            console.log('ss')
            this.error = 'IT CORRECTLY'
            this.error = this.error.toUpperCase()
            localStorage.setItem('username', JSON.stringify(jwt.sub))
            localStorage.setItem('role', JSON.stringify(jwt.role))
            localStorage.setItem('iat', JSON.stringify(jwt.iat))
            localStorage.setItem('jwt', JSON.stringify(response.data))
            console.log(jwt.iat)
            location.replace('/dashboard')
          } else if (jwt.loginSuccessfull === false) {
            console.log('xx')
            this.error = 'WRONG USERNAME AND PASSWORD'
            this.error = this.error.toUpperCase()
            location.replace('/')
          }
        }).catch(e => {
          // this.error.push(e)
        })
    }
  },
  metaInfo () {
    return {
      title: 'Login',
      titleTemplate: '%s - LPTT'
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
