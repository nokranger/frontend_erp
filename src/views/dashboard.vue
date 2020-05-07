<template>
  <div v-bind:style="{background: lpttcolor,hieght: '100%', padding: '50px'}">
    <div style="font-size:30px;">
      แดชบอร์ด
    </div>
    <!-- <b-container fluid="xl">
      <b-container>
        <br>
        <b-row>
          <b-col>
            <div>
              รหัสพนักงาน
              <b-col>
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(employee_ids, index) in employee_id" :key="index">
                    {{employee_ids.id}}
                  </li>
                </ul>
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              กิจกรรม
              <b-col>
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(events, index) in event" :key="index">
                    {{events.id}}
                  </li>
                </ul>
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              สถานะ
              <b-col>
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(approves, index) in approve" :key="index">
                    {{approve.id}}
                    <p v-if="approves.id == '0'">
                      ยังไม่อนุมัติ
                    </p>
                    <p v-else-if="approves.id == '1'">
                      อนุมัติแล้ว
                    </p>
                  </li>
                </ul>
              </b-col>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container> -->
    <b-container fluid="xl">
      <b-container>
        <br>
        <b-row>
          <b-col>
            Activity
            <canvas id="my-chartline"></canvas>
          </b-col>
          <b-col>
            Most Station
            <canvas style="width:100%;height:auto;" id="my-chartpie"></canvas>
            <!-- <div>
              <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
              </b-card>
            </div> -->
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>

import axios from 'axios'
import Chart from 'chart.js'
export default {
  data () {
    return {
      lpttcolor: 'white',
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
      this.employee_id = resemp.data.result.map((data, i) => {
        return {
          id: data.employee_id
        }
      })
      // vm.getData(res)
      this.event = reslar.data.result.map((data, i) => {
        return {
          id: data.reason_for_leave
        }
      })
      this.approve = restrans.data.result.map((data, i) => {
        return {
          id: data.approve_id
        }
      })
    })).catch(e => {
      this.error.push(e)
    })
    // console.log(this.info.length)
    this.pie()
    this.line()
  },
  methods: {
    pie () {
      var ctx = document.getElementById('my-chartpie')
      Chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Benz', 'Toyota', 'LPTT'],
          datasets: [{
            label: 'Page A',
            data: [10, 15, 30],
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
