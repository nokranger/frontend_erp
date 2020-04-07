<template>
  <div>
    approve_leave
      <div>
        <b-row>
          <b-col>
          </b-col>
          <b-col>
            {{event}}
          </b-col>
          <b-col>
          </b-col>
        </b-row>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      employee_id: [],
      event: [],
      approve: []
    }
  },
  beforeCreate () {

  },
  created () {

  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/emp/get-last-emp'), axios.get('http://127.0.0.1:4000/leavear/get-all-la_report'), axios.get('http://127.0.0.1:4000/trans/get-last-trans')]).then(axios.spread((resemp, reslar, restrans) => {
      // const vm = this
      this.employee_id = resemp.data.result
      // vm.getData(res)
      this.event = reslar.data.result
      this.approve = restrans.data.result
    })).catch(e => {
      this.error.push(e)
    })
    // console.log(this.info.length)
  },
  methods: {
  }
}
</script>
<style lang="">
</style>
