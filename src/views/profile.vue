<template>
  <div>
    Profile
    <!-- {{profile}} -->
    <div v-for="(profiles, index) in profile" :key="index">
      <b-container>
        <br>
        <b-row>
          <b-col cols="9">
            <div style="display: flex;flex-direction: row;">
              <div style="margin:5px">ID: <input type="text" v-model="profiles.employee_id" readonly></div>
              <div style="margin:5px">Name: <input type="text" v-model="profiles.employee_name"></div>
              <div style="margin:5px">Lastname: <input type="text" v-model="profiles.employee_lastname"></div>
            </div>
            <div style="display: flex;flex-direction: row;">
              <div style="margin:5px">Job: <input type="text" v-model="profiles.job_name"></div>
            </div>
            <div class="align-left">
              <div class="align-center">Address</div>
              <div style="display: flex;flex-direction: row;">
                <div style="margin:5px">Tel. <input type="text" v-model="profiles.employee_tel"></div>
                <div style="margin:5px">Email: <input type="text" v-model="profiles.employee_email"></div>
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <img style="width:170px;hieght:200px;border-radius:8px;" :src="require('../img/uploads/prettycash/LPTTPRETTYCASH-1596221571971.png')" alt="">
          </b-col>
        </b-row>
                    <div style="display: flex;flex-direction: row;">
              <div style="margin:5px">Start: <input ref="start_date" type="date" :value="profiles.start_date" /></div>
                            <div style="margin:5px">Sick Leave: <input type="text" v-model="profiles.leave_sick"></div>
              <div style="margin:5px">Personal Leave: <input type="text" v-model="profiles.leave_activity"></div>
              <!-- <p>Vacation Leave: <input type="text" v-model="profiles.leave_vacation"></p> -->
            </div>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      profile: []
    }
  },
  beforeCreate () {},
  created () {
    this.data = {
      employee_id: JSON.parse(localStorage.getItem('username'))
    }
    console.log('username', this.data.employee_id)
    axios.post('http://localhost:4000/emp/settingprofile', this.data).then(response => {
      this.profile = response.data.result
    })
  },
  beforeUpdate () {},
  updated () {},
  beforeMount () {},
  mounted () {},
  methods: {
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
</style>
