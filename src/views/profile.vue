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
              <!-- <p>Vacation Leave: <input type="text" v-model="profiles.leave_vacation"></p> -->
          </div>
          <div>
            <br>
            <b-button variant="primary" v-on:click="updateProfile ()">Update</b-button>
          </div>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import account from '../components/profile_admin'
export default {
  components: {
    'app-account': account
  },
  data () {
    return {
      localjwt: '',
      data: [],
      profile: [],
      updateprofile: []
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
      // console.log(this.profile[0].leave_sick)
      this.updateprofile = {
        id: this.profile[0].employee_id,
        name: this.profile[0].employee_name,
        lastname: this.profile[0].employee_lastname,
        tel: this.profile[0].employee_tel,
        email: this.profile[0].employee_email
      }
      console.log(this.updateprofile)
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
