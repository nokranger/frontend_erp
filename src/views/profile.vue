<template>
  <div>
    profile
    {{profile}}
    <div v-for="(profiles, index) in profile" :key="index">
      <p>ID: {{profiles.employee_id}}</p>
      <p>Name: {{profiles.employee_name}}</p>
      <p>Lastname: {{profiles.employee_lastname}}</p>
      <p>Job: {{profiles.job_name}}</p>
      <p>Email: {{profiles.employee_email}}</p>
      <p>Tel. {{profiles.employee_tel}}</p>
      <div style="width:50%">
        <p>Start: <b-input ref="start_date" type="date" :value="profiles.start_date" /></p>
      </div>
      <p>Sick Leave: {{profiles.leave_sick}}</p>
      <p>Personal Leave: {{profiles.leave_activity}}</p>
      <p>Vacation Leave: {{profiles.leave_vacation}}</p>
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
<style>
</style>
