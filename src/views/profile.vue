<template>
<div v-if="localjwt == 0">
  <app-account></app-account>
</div>
  <div v-else-if="localjwt == 1">
    <div>
      <h1>Profile</h1>
    </div>
    <!-- {{profile}} -->
    <div v-for="(profiles, index) in profile" :key="index">
      <b-container>
        <br>
        <b-row>
          <div class="img-profile ">
            <img style="width:250px;hieght:400px;border-radius:8px;" :src="require('../img/uploads/prettycash/LPTTPRETTYCASH-1596221571971.png')" alt="">
          </div>
          <b-col cols="12">
            <div style="display: flex;flex-direction: row;" class="align-left">
              <div style="margin:5px">ID<b-input type="text" v-model="profiles.employee_id" readonly></b-input></div>
              <div style="margin:5px">Name<b-input type="text" v-model="profiles.employee_name"></b-input></div>
              <div style="margin:5px">Lastname<b-input type="text" v-model="profiles.employee_lastname"></b-input></div>
              <div style="margin:5px">Job<b-input type="text" v-model="profiles.job_name" readonly></b-input></div>
            </div>
            <!-- <div style="display: flex;flex-direction: row;" class="align-left">
              <div style="margin:5px">Job<b-input type="text" v-model="profiles.job_name"></b-input></div>
            </div> -->
            <div class="align-left">
              <div class="align-center">Address</div>
              <div style="display: flex;flex-direction: row;">
                <div style="margin:5px">Tel. <b-input type="text" v-model="profiles.employee_tel"></b-input></div>
                <div style="margin:5px">Email<b-input type="text" v-model="profiles.employee_email"></b-input></div>
              </div>
            </div>
          </b-col>
          <!-- <b-col cols="3">
            <img style="width:250px;hieght:400px;border-radius:8px;" :src="require('../img/uploads/prettycash/LPTTPRETTYCASH-1596221571971.png')" alt="">
          </b-col> -->
        </b-row>
          <div style="display: flex;flex-direction: row;" class="align-left">
            <div style="margin:5px">Start<b-input ref="start_date" type="date" :value="profiles.start_date" readonly></b-input></div>
            <div style="margin:5px">Sick Leave<b-input type="text" v-model="profiles.leave_sick" readonly></b-input></div>
            <div style="margin:5px">Personal Leave<b-input type="text" v-model="profiles.leave_activity" readonly></b-input></div>
            <div style="margin:5px"><br><b-button variant="primary" v-on:click="updateProfile ()">Update</b-button></div>
              <!-- <p>Vacation Leave: <input type="text" v-model="profiles.leave_vacation"></p> -->
              <b-modal v-model="showpf" size="sm" hide-footer>
                <p class="my-4">Do you want to update your profile</p>
                  <b-row>
                    <b-col>
                      <b-button variant="danger" size="sm" v-on:click="changePassword()" @click="showpf=false">Yes</b-button>
                    </b-col>
                    <b-col>
                    </b-col>
                    <b-col>
                      <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="showpf=false"
                        >
                        Close
                      </b-button>
                    </b-col>
                </b-row>
            </b-modal>
          </div>
          <div>
            <br>
          </div>
            <b-row>
              <br>
              <b-col>
                <div style="display: flex;flex-direction: row;" class="align-left">Change Password </div>
                <p style="color:red">{{checkpassword}}</p>
                  <div style="display: flex;flex-direction: row;" class="align-left">
                  <div style="margin:5px" class="input-m">New password<b-input type="password" ref="upassword" v-model="updatepassword.upassword"></b-input></div>
                  <div style="margin:5px" class="input-m">Confirm password<b-input type="password" ref="cpassword" v-model="updatepassword.cpassword"></b-input></div>
                  <div style="margin:5px" class="input-m"><br><b-button variant="success" @click="showu=true">Change password</b-button></div>
                    <b-modal v-model="showu" size="sm" hide-footer>
                      <p class="my-4">Do you want to change password</p>
                        <b-row>
                          <b-col>
                            <b-button variant="danger" size="sm" v-on:click="changePassword()" @click="showu=false">Yes</b-button>
                          </b-col>
                          <b-col>
                          </b-col>
                          <b-col>
                            <b-button
                              variant="primary"
                              size="sm"
                              class="float-right"
                              @click="show=false"
                            >
                            Close
                          </b-button>
                        </b-col>
                    </b-row>
                  </b-modal>
                </div>
              </b-col>
          </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import account from '../components/profile_admin'
import md5 from 'md5'
export default {
  components: {
    'app-account': account
  },
  data () {
    return {
      showu: false,
      showpf: false,
      localjwt: '',
      data: [],
      profile: [],
      updateprofile: [],
      updatepassword: []
    }
  },
  beforeCreate () {},
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    if (this.localjwt === '0') {
      console.log('local', (this.localjwt))
    } else if (this.localjwt === '1') {
      this.data = {
        employee_id: JSON.parse(localStorage.getItem('username'))
      }
      console.log('username', this.data.employee_id)
      axios.post('http://localhost:4000/emp/settingprofile', this.data).then(response => {
        this.profile = response.data.result
      })
    }
  },
  beforeUpdate () {},
  updated () {},
  beforeMount () {},
  mounted () {},
  methods: {
    updateProfile () {
      this.updateprofile = {
        id: JSON.parse(localStorage.getItem('username')),
        name: this.profile[0].employee_name,
        lastname: this.profile[0].employee_lastname,
        tel: this.profile[0].employee_tel,
        email: this.profile[0].employee_email
      }
      console.log(this.updateprofile)
      axios.patch('http://127.0.0.1:4000/emp/updateusers', this.updateprofile).then(response => {
        console.log(response)
        this.profile = response.data.result
      })
    },
    changePassword () {
      console.log('password', this.$refs.cpassword[0].localValue)
      console.log('password', md5(this.$refs.cpassword[0].localValue))
      this.updatepassword = {
        id: JSON.parse(localStorage.getItem('username')),
        password: md5(this.$refs.cpassword[0].localValue)
      }
      axios.patch('http://127.0.0.1:4000/emp/changepassword', this.updatepassword).then(response => {
        console.log(response)
        this.profile = response.data.result
      })
    }
  },
  computed: {
    checkpassword () {
      if (this.updatepassword.upassword !== this.updatepassword.cpassword) {
        console.log('not same')
        return '** Passwords not match.'
      } else if (this.updatepassword.upassword === this.updatepassword.cpassword) {
        return ''
      }
      return ''
    }
  }
}
</script>
<style scoped>
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.align-center {
  text-align: center;
}
.img-profile {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
