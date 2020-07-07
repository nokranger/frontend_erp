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
            <p v-if="error == 'USERNAME NOT FOUND'" style="color:red">{{error}}</p>
            <p v-if="error == 'IT CORRECTLY'" style="color:green">{{error}}</p>
          </div>
          <br>
          <b-card>
          <b-form v-if="show">
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
            <!-- <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                <b-form-checkbox value="me">remember me</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group> -->
            <div>
            <b-button class="blue-gradient btn-block" v-on:click="postLogin ()">LOGIN</b-button><br>
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
export default {
  data () {
    return {
      form: {
        employee_id: '',
        password: ''
      },
      show: true,
      error: '',
      aa: 55,
      login: [],
      jwt: [],
      set: [],
      data: []
    }
  },
  mounted () {
    console.log()
    if (JSON.parse(sessionStorage.getItem('login')) === 'admin' || JSON.parse(sessionStorage.getItem('login')) === 'user') {
      location.replace('/sale')
    }
  },
  methods: {
    postLogin () {
      // this.data = {
      //   session_id: '',
      //   data: {
      //     username: this.form.username,
      //     password: this.form.password
      //   }
      // }
      this.form.password = md5(this.form.password)
      // console.log(this.data)
      axios.post('http://localhost:4000/emp/login', this.form)
        .then(response => {
          console.log(response.data.result)
          if (response.data.result === 'success') {
            console.log('ss')
            this.error = 'IT CORRECTLY'
            this.error = this.error.toUpperCase()
          }
          //  else if (response.data.error_code === 0) {
          //   console.log('ssssss')
          //   this.error = 'it correctly'
          //   this.error = this.error.toUpperCase()
          //   // localStorage.setItem('login', JSON.stringify('admin'))
          //   // localStorage.setItem('jwt', JSON.stringify('admin'))
          //   sessionStorage.setItem('login', JSON.stringify(response.data.data.session_id))
          //   sessionStorage.setItem('level', JSON.stringify(response.data.data.level))
          //   // localStorage.setItem('set', JSON.stringify('set'))
          //   // location.replace('/' + JSON.parse(localStorage.getItem('login')) + '/sale')
          //   location.replace('/sale')
          //   console.log('cc')
          // } else if (response.data.error_code === 0) {
          //   // let is_admin = 0
          //   this.error = 'it correctly'
          //   this.error = this.error.toUpperCase()
          //   // localStorage.setItem('login', JSON.stringify('user'))
          //   // localStorage.setItem('jwt', JSON.stringify('user'))
          //   sessionStorage.setItem('login', JSON.stringify(response.data.data.session_id))
          //   sessionStorage.setItem('level', JSON.stringify(response.data.data.level))
          //   // location.replace('/' + JSON.parse(localStorage.getItem('login')) + '/sale')
          //   location.replace('/sale')
          // }
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
  },
  created () {
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
