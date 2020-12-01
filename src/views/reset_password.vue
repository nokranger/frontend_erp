<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <br>
    <br>
    <b-container style="border-radius: 5px;border: thin solid #888;">
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <br>
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;font-size:50px;color: #333;">Reset password</strong>
            <br>
            <br>
            <!-- <p v-if="error == false" style="color:red">WRONG USERNAME AND PASSWORD</p>
            <p v-else-if="error == 500" style="color:red">Internal Server Error</p>
            <p v-else-if="error == true" style="color:green">IT CORRECTLY</p> -->
          </div>
          <br>
          <b-card style="background-color: rgba(255, 255, 255, 0.4);-webkit-backdrop-filter: blur(10px);">
          <b-form v-if="show" onsubmit="return false">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username</label>
                <b-form-input
                  id="input-1"
                  v-model="form.id"
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
            <b-form-group id="input-group-3">
              <p style="color:red">{{checkpassword}}</p>
              <label class="forminput">Confirm password</label>
              <b-form-input
                id="input-3"
                v-model="form.cpassword"
                type="password"
                required
                placeholder="Enter confirm password"
              ></b-form-input>
            </b-form-group>
            <div>
              <b-button class="success btn-block" variant="success" type="submit" v-on:click="resetpassword ()">Reset</b-button><br>
              <div>
                <b-modal id="modal-resetpassword" size="sm" hide-footer>
                  <b-row>
                    <b-col>
                      <div>
                        <div class="d-block text-center">Reset password done!</div>
                      </div>
                    </b-col>
                  </b-row>
                </b-modal>
              </div>
            </div>
            <div><a href="/">Back to login</a></div>
            <div>
            </div>
          </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
      </b-row>
      <br>
      <br>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
import md5 from 'md5'
export default {
  data () {
    return {
      apiURL: apiURL,
      form: {
        id: '',
        password: '',
        cpassword: ''
      },
      show: true,
      error: null,
      resetp: false
    }
  },
  mounted () {
  },
  methods: {
    resetpassword () {
      this.form.password = md5(this.form.password)
      axios.patch(this.apiURL + '/emp/changepassword', this.form).then(response => {
        // console.log(response)
        this.form = {
          id: '',
          password: '',
          cpassword: ''
        }
        this.$root.$emit('bv::show::modal', 'modal-resetpassword', '#btnShow')
      })
    }
  },
  computed: {
    checkpassword () {
      if (this.form.cpassword !== this.form.password) {
        // console.log('not same')
        return '** Passwords not match.'
      } else if (this.form.cpassword === this.form.password) {
        return ''
      }
      return ''
    }
  },
  metaInfo () {
    return {
      title: 'Reset password',
      titleTemplate: '%s - LPTT'
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
