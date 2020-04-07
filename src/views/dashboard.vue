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
                <!-- {{emp.employee_id[1]}} -->
                <!-- <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(employee_ids, index) in employee_id" :key="index">
                    {{employee_ids}}
                  </li>
                </ul> -->
                {{employee_id}}
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              Activity
              <b-col>
                {{event}}
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              Approve
              <b-col>
                {{approve}}
              </b-col>
            </div>
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
      lpttcolor: '#29265b',
      isTrue: true,
      symbols: '&#9776;',
      employee_id: [],
      aa: ['a', 'b', 'c', 'd'],
      event: [],
      approve: []
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  created () {
    console.log('test')
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
      // console.log(res)
      // for (let i = 0; i < res.length; i++) {
      //   this.employee_id[i] = res[i].employee_id
      // }
      // console.log(typeof (res))
      // console.log(this.employee_id)
    }
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
