<template>
  <div>
    <div style="font-size:30px;">
      Dashboard
    </div>
    <b-container fluid="xl">
      <b-container>
        <br>
        <b-row>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <h5>Recently Leave</h5>
                <div v-for="(leaves, index) in leave" :key="index">
                    <a href="/approveleave"><p v-if="leaves.status == 0">{{leaves.reason_for_leave}} - {{leaves.employee_name}} - ยังไม่อนุมัติ</p></a>
                    <a href="/approveleave"><p v-if="leaves.status == 1">{{leaves.reason_for_leave}} - {{leaves.employee_name}} - อนุมัติแล้ว</p></a>
                </div>
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <h5>Recently Transportation</h5>
                <div v-for="(transs, index) in trans" :key="index">
                  <a href="/approvetrans"><p v-if="transs.trans_status == 0">{{transs.trans_from}} to {{transs.trans_to}} - {{transs.employee_name}} - ยังไม่อนุมัติ</p></a>
                  <a href="/approvetrans"><p v-if="transs.trans_status == 1">{{transs.trans_from}} to {{transs.trans_to}} - {{transs.employee_name}} - ยังไม่อนุมัติ</p></a>
                </div>
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <h5>Recently Employee</h5>
                <div v-for="(employees, index) in employee" :key="index">
                  <a href="/profile"><p>{{employees.employee_name}} - {{employees.job_name}}</p></a>
                </div>
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <br>
        <br>
        <b-row>
          <b-col>
            Activity
            <canvas style="width:100%;height:auto;" id="my-chartline"></canvas>
          </b-col>
          <b-col>
            Most Station
            <canvas style="width:100%;height:auto;" id="my-chartpie"></canvas>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
// import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
import Chart from 'chart.js'
export default {
  data () {
    return {
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
    // this.checkPermission()
    // console.log(VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt'))))
    var localjwt = localStorage.getItem('jwt')
    // console.log(localjwt)
    if (localjwt !== null) {
      axios.all([axios.get('http://127.0.0.1:4000/emp/get-last-emp'), axios.get('http://127.0.0.1:4000/leavear/get-last-record'), axios.get('http://127.0.0.1:4000/trans/get-last-trans')]).then(axios.spread((resulte, resultl, resultt) => {
        // const vm = this
        this.employee = resulte.data.result
        // vm.getData(res)
        this.leave = resultl.data.result
        // .map((data, i) => {
        //   return {
        //     reason: data.reason_for_leave,
        //     name: data.employee_name,
        //     status: data.status.reduce((one, two) => {
        //       return one.status === 0 ? 'ยังไม่อนุมัติ' : 'อนุมัติแล้ว'
        //     })
        //   }
        // })
        this.trans = resultt.data.result
      })).catch(e => {
        this.error.push(e)
      })
    } else {
      location.replace('/')
    }
    // axios.get('http://127.0.0.1:4000/trans/getstation').then(response => {
    //   console.log(response)
    //   this.test = response.data.result[0]._trans_to_benz
    //   console.log('res', this.test)
    // })
  },
  created () {
    // console.log('test')
    this.checkExpire()
  },
  updated () {
  },
  mounted () {
    // var test = 'test'
    axios.get('http://127.0.0.1:4000/trans/getstation').then(response => {
      console.log(response)
      this.benz = response.data.result[0]._trans_to_benz
      this.lptt = response.data.result[0]._trans_to_lptt
      this.toyota = response.data.result[0]._trans_to_toyota
      this.pie(this.benz, this.lptt, this.toyota)
      console.log('res', this.test)
    })
    // console.log(localStorage.getItem('iat'))
    // console.log(parseInt(localStorage.getItem('iat'), 10) + 600000)
    setInterval(this.checkExpire, 150000)
    // axios.all([axios.get('http://127.0.0.1:4000/emp/get-last-emp'), axios.get('http://127.0.0.1:4000/leavear/get-last-record'), axios.get('http://127.0.0.1:4000/trans/get-last-trans')]).then(axios.spread((result_e, result_l, result_t) => {
    //   // const vm = this
    //   this.employee_id = result_e.data.result.map((data, i) => {
    //     return {
    //       id: data.employee_id
    //     }
    //   })
    //   // vm.getData(res)
    //   this.event = result_l.data.result.map((data, i) => {
    //     return {
    //       id: data.reason_for_leave
    //     }
    //   })
    //   this.approve = result_t.data.result.map((data, i) => {
    //     return {
    //       id: data.approve_id
    //     }
    //   })
    // })).catch(e => {
    //   this.error.push(e)
    // })
    // console.log(this.info.length)
    // this.pie(tests)
    this.line()
  },
  methods: {
    checkPermission () {
      // console.log(VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt'))))
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
    pie (benz, lptt, toyota) {
      console.log('pie', benz)
      var ctx = document.getElementById('my-chartpie')
      Chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Benz', 'Toyota', 'LPTT'],
          datasets: [{
            label: 'Page A',
            data: [benz, lptt, toyota],
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
          },
          {
            label: 'ลาพักร้อน',
            data: [20, 25, 7, 12],
            borderColor: '#3e95cd',
            backgroundColor: '#3e95cd',
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
