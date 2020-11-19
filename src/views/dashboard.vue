<template>
  <div>
    <div style="font-size:30px;">
      Dashboard
    </div>
    <b-container>
        <br>
        <div style="border-radius: 5px;border: thin solid #888;">
          <b-row>
            <b-col style="margin:5px;">
              <div class="card">
                <br>
                <div class="card-body">
                  <h5>Recently Leave</h5>
                  <div v-for="(leaves, index) in leave" :key="index">
                      <a href="/approveleave"><p v-if="leaves.status == 0">{{leaves.reason_for_leave}} - {{leaves.employee_name}} - ยังไม่อนุมัติ</p></a>
                      <a href="/approveleave"><p v-if="leaves.status == 1">{{leaves.reason_for_leave}} - {{leaves.employee_name}} - อนุมัติแล้ว</p></a>
                  </div>
                  <div class="align-right">
                  </div>
                </div>
              </div>
            </b-col>
            <b-col style="margin:5px;">
              <div class="card">
                <br>
                <div class="card-body">
                  <h5>Recently Transportation</h5>
                  <div v-for="(transs, index) in trans" :key="index">
                    <a href="/approvetrans"><p v-if="transs.trans_status == 0">{{transs.trans_from}} to {{transs.trans_to}} - {{transs.employee_name}} - ยังไม่อนุมัติ</p></a>
                    <a href="/approvetrans"><p v-if="transs.trans_status == 1">{{transs.trans_from}} to {{transs.trans_to}} - {{transs.employee_name}} - อนุมัติแล้ว</p></a>
                  </div>
                  <div class="align-right">
                  </div>
                </div>
              </div>
            </b-col>
            <b-col style="margin:5px;">
              <div class="card">
                <br>
                <div class="card-body">
                  <h5>Recently Employee</h5>
                  <div v-for="(employees, index) in employee" :key="index">
                    <a href="/profile"><p>{{employees.employee_name}} - {{employees.job_name}}</p></a>
                  </div>
                  <div class="align-right">
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <br>
        <br>
        <div class="align-center" style="border-radius: 5px;border: thin solid #888;">
          <h1>Activity</h1>
          <b-row class="justify-content-md-center">
            <b-col cols="12" md="5" style="margin:10px;background-color:whitesmoke;border-radius: 5px;border: thin solid #888;">
              Activity
              <canvas style="width:100%;height:100%;" id="my-chartline"></canvas>
            </b-col>
            <b-col cols="12" md="5" style="margin:10px;background-color:whitesmoke;border-radius: 5px;border: thin solid #888;">
              Most Station
              <canvas style="width:100%;height:90%;" id="my-chartpie"></canvas>
            </b-col>
          </b-row>
        </div>
        <br>
        <br>
    </b-container>
    <app-plan></app-plan>
  </div>
</template>
<script>
// import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
import Chart from 'chart.js'
import apiURL from '../assets/js/connectionAPI'
import plan from '../components/plan'
export default {
  components: {
    'app-plan': plan
  },
  data () {
    return {
      apiURL: apiURL,
      lpttcolor: 'white',
      isTrue: true,
      symbols: '&#9776;',
      aa: ['a', 'b', 'c', 'd'],
      employee: [],
      trans: [],
      leave: [],
      benz: [],
      toyota: [],
      lptt: []
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  beforeCreate () {
    // var localjwt = localStorage.getItem('jwt')
    // if (localjwt !== null) {
    //   axios.all([axios.get('http://192.168.1.33:4000/emp/get-last-emp'), axios.get('http://192.168.1.33:4000/leavear/get-last-record'), axios.get('http://192.168.1.33:4000/trans/get-last-trans')]).then(axios.spread((resulte, resultl, resultt) => {
    //     this.employee = resulte.data.result
    //     this.leave = resultl.data.result
    //     this.trans = resultt.data.result
    //   })).catch(e => {
    //     this.error.push(e)
    //   })
    // } else {
    //   location.replace('/')
    // }
  },
  created () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
      axios.all([axios.get(this.apiURL + '/emp/get-last-emp'), axios.get(this.apiURL + '/leavear/get-last-record'), axios.get(this.apiURL + '/trans/get-last-trans')]).then(axios.spread((resulte, resultl, resultt) => {
        this.employee = resulte.data.result
        this.leave = resultl.data.result
        this.trans = resultt.data.result
      })).catch(e => {
        this.error.push(e)
      })
    } else {
      location.replace('/')
    }
    this.checkExpire()
  },
  updated () {
  },
  mounted () {
    axios.get(this.apiURL + '/trans/getstation').then(response => {
      console.log(response)
      this.benz = response.data.result[0]._trans_to_benz
      this.lptt = response.data.result[0]._trans_to_lptt
      this.toyota = response.data.result[0]._trans_to_toyota
      this.tbs = response.data.result[0]._trans_to_tbs
      this.pie(this.benz, this.lptt, this.toyota, this.tbs)
    })
    setInterval(this.checkExpire, 150000)
    this.line()
  },
  methods: {
    checkPermission () {
      if (JSON.parse(localStorage.getItem('jwt')) !== 'null') {
        console.log('login agian')
      } else {
        console.log('login agian 2')
      }
    },
    checkExpire () {
      console.log('check expire')
      if (Date.now() >= parseInt(localStorage.getItem('iat'), 10) + 600000) {
        console.log('10min')
        console.log('logout')
        localStorage.removeItem('iat')
        localStorage.removeItem('username')
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        location.replace('/')
      } else {
        console.log('not expire')
      }
    },
    pie (benz, lptt, toyota, tbs) {
      console.log('pie', benz)
      var ctx = document.getElementById('my-chartpie')
      Chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Benz', 'LPTT', 'TBS'],
          datasets: [{
            label: 'Page A',
            data: [benz, lptt, tbs],
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9']
          }]
        },
        options: {
          responsive: true
        }
      })
    },
    line () {
      var ctx = document.getElementById('my-chartline')
      Chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
          datasets: [{
            label: 'ลากิจ',
            data: [2, 6, 10, 1],
            borderColor: '#6E7EF5',
            backgroundColor: '#6E7EF5',
            fill: false
          },
          {
            label: 'ลาป่วย',
            data: [5, 3, 10, 7],
            borderColor: '#B277DE',
            backgroundColor: '#B277DE',
            fill: false
          }]
        },
        options: {
          responsive: true
        }
      })
    }
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
