<template>
  <div>
    Account Setting
    <div>
      profile
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      profile: [],
      data: []
    }
  },
  beforeCreate () {},
  created () {
    this.data = {
      employee_id: JSON.parse(localStorage.getItem('username'))
    }
    axios.post('http://localhost:4000/emp/settingprofileadmin', this.data).then(response => {
      this.profile = response.data.result
    })
  }
}
</script>
<style scoped>
</style>
