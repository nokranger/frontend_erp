<template>
  <div>
    dashboard
    <b-container fluid="xl">
      <b-container>
        <b-row>
          <b-col>
            <div>
              Member
              <b-col>
                {{emp.employee_id[1]}}
              </b-col>
            </div>
          </b-col>
          <b-col>
            bbb
          </b-col>
          <b-col>
            ccc
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;',
      emp: {
        employee_id: []
      }
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  methods: {
    openNav () {
      var el = document.getElementById('mySidenav')
      if (el.style.width === '250px') {
        el.style.width = '0px'
        this.symbols = '&#9776;'
      } else {
        el.style.width = '250px'
        this.symbols = '&times;'
      }
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    },
    getData (res) {
      console.log(res.length)
      for (let i = 0; i < res.length; i++) {
        this.emp.employee_id[i] = res[i].employee_id
      }
      console.log(this.emp.employee_id[1])
      // this.emp = res
    }
  },
  created () {
    console.log('test')
    axios.get('http://127.0.0.1:4000/emp/get-all-emp').then(response => {
      const vm = this
      const res = response.data.result
      vm.getData(res)
    }).catch(e => {
      this.error.push(e)
    })
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
