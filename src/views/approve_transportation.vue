<template>
  <div>
    <div style="font-size:30px;">
      Transportation
      <br>
      <br>
    </div>
    <!-- {{event}} -->
    <div>
      <b-container>
        <!-- <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Transportation Report ID</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Expense</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(events, index) in event" :key="index" :class="index % 2 === 0 ? 'table-primary' : 'table-active'">
              <th >{{index}}</th>
              <th>{{events.id}}</th>
              <th>{{events.transId}}</th>
              <th>{{events.from}}</th>
              <th>{{events.to}}</th>
              <th>{{events.prices}}</th>
              <th v-if="events.approve == '0'">Not approved</th>
              <th v-else-if="events.approve == '1'">Approved</th>
              <th v-else>-</th>
            </tr>
          </tbody>
        </table> -->
        <b-row>
          <b-col class="my-1">
          <!-- <div style="margin-top:-9.5px;">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </div> -->
          <!-- <b-input></b-input> -->
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
        <b-col class="my-1">
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination> -->
        </b-col>
        <b-col class="my-1">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            size="sm"
            placeholder="Type to Search"
          ></b-form-input>
        </b-col>
        </b-row>
        <b-table ref="table" :items="event" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(approve)="data" v-if="localjwt === '0'">
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item !== 2" size="sm" class="mr-2" variant="danger" v-on:click="Rejected (data.item.actId)">Reject</b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve === 2" size="sm" class="mr-2" variant="danger" disabled>Reject</b-button>
            </div>
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item.approve !== 2" size="sm" class="mr-2" variant="success" v-on:click="Papprove (data.item.actId)">
                Not Approve
              </b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve === 2 && data.item.approve !== 0" size="sm"  class="mr-2" variant="primary" disabled>
                Approved
              </b-button>
            </div>
          </template>
          <template v-slot:cell(approve)="data" v-else-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Pending</div>
            <div v-else-if="data.item.approve === 1">Approved</div>
            <div v-else-if="data.item.approve === 2">Rejected</div>
          </template>
        </b-table>
      </b-container>
      <!-- <b-container>
        <b-row>
          <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.id}}
              </li>
            </ul>
          </b-col>
          <b-col>
            รหัสใบเบิก
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.transId}}
              </li>
            </ul>
          </b-col>
          <b-col>
            เริ่ม
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.from}}
              </li>
            </ul>
          </b-col>
          <b-col>
            ถึง
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.to}}
              </li>
            </ul>
          </b-col>
          <b-col>
            ค่าใช้จ่าย
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.prices}}
              </li>
            </ul>
          </b-col>
          <b-col>
            สถานะ
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                <p v-if="events.approve == '0'">
                  ยังไม่อนุมัติ
                </p>
                <p v-if="events.approve == '1'">
                  อนุมัติแล้ว
                </p>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      event: [],
      approve: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10
    }
  },
  beforeCreate () {},
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('local', (this.localjwt))
    }
  },
  updated () {},
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/trans/get-all-trans')]).then(axios.spread((restrans) => {
      this.event = restrans.data.result.map((data, i) => {
        return {
          trans_id: data.trans_id,
          id: data.employee_id,
          from: data.trans_from,
          to: data.trans_to,
          prices: data.trans_values,
          approve: data.trans_status
        }
      })
      // console.log(this.event.approve)
    })).catch(e => {
      this.error.push(e)
    })
  },
  methods: {
    Papprove (index) {
      // console.log('test')
      this.approve = {
        trans_id: this.event[index].trans_id,
        trans_status: 1,
        approve_id: JSON.parse(localStorage.getItem('username'))
      }
      // console.log(this.approve.tr)
      // axios.all([axios.patch('http://127.0.0.1:4000/cash/approve-prettycash', this.approve), axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)]).then(axios.spread((responseApp, response) => {
      //   this.event = response.data.result.map((data, i) => {
      //     // this.remaining = this.remaining - data.amount
      //     return {
      //       Id: data.id,
      //       Date: moment(data.date).format('MMM Do YY'),
      //       Request: data.employee_id,
      //       Details: data.detail,
      //       Amount: data.amount,
      //       Remaining: this.remaining,
      //       Approve: data.status
      //     }
      //   })
      //   this.$refs.table.refresh()
      // }))
      axios({
        url: 'http://127.0.0.1:4000/trans/approve-transportation',
        method: 'patch',
        data: this.approve
      }).then(response => {
        console.log(response)
        this.event = response.data.result.map((data, i) => {
          return {
            transId: data.trans_id,
            id: data.employee_id,
            from: data.trans_from,
            to: data.trans_to,
            prices: data.trans_values,
            approve: data.trans_status
          }
        })
        this.$refs.table.refresh()
      })

      // this.$refs.table.refresh()
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.align-left {
  text-align:left
}
.align-center {
  text-align: center;
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
