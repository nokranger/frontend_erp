<template>
<div v-if="localjwt == 1">
  <app-transuser></app-transuser>
</div>
  <div v-else-if="localjwt == 0">
    <div style="font-size:30px;">
      Transportation
      <br>
      <br>
    </div>
    <div>
      <b-container>
        <b-row>
          <b-col class="my-1">
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
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item !== 2" size="sm" class="mr-2" variant="danger" v-on:click="Reject (data.item.trans_id)">Reject</b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve === 2" size="sm" class="mr-2" variant="danger" disabled>Reject</b-button>
            </div>
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item.approve !== 2" size="sm" class="mr-2" variant="success" v-on:click="Papprove (data.item.trans_id)">
                Approved
              </b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve !== 2 && data.item.approve !== 0" size="sm"  class="mr-2" variant="primary" disabled>
                Approved
              </b-button>
              <!-- <b-button style="margin:1px" v-else-if="data.item.approve === 2 || data.item.approve !== 1 && data.item.approve !== 0" size="sm"  class="mr-2" variant="danger" disabled>
                Rejected
              </b-button> -->
            </div>
          </template>
          <template v-slot:cell(approve)="data" v-else-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Pending</div>
            <div v-else-if="data.item.approve === 1">Approved</div>
            <div v-else-if="data.item.approve === 2">Rejected</div>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
import transuser from '../components/approve_transportation_user'
export default {
  components: {
    'app-transuser': transuser
  },
  data () {
    return {
      apiURL: apiURL,
      event: [],
      approve: [],
      rejects: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10
    }
  },
  metaInfo () {
    return {
      title: 'Approve Transportation',
      titleTemplate: '%s - LPTT'
    }
  },
  beforeCreate () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('localtrans', (this.localjwt))
    }
  },
  updated () {},
  mounted () {
    axios.all([axios.get(this.apiURL + '/trans/get-all-trans')]).then(axios.spread((restrans) => {
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
    setInterval(this.checkExpire, 150000)
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
    // status 0 notapprove, 1 approve, 2 reject
    Papprove (index) {
      // console.log('test')
      this.approve = {
        trans_id: index,
        trans_status: 1,
        approve_id: JSON.parse(localStorage.getItem('username'))
      }
      axios({
        url: this.apiURL + '/trans/approve-transportation',
        method: 'patch',
        data: this.approve
      }).then(response => {
        console.log(response)
        this.event = response.data.result.map((data, i) => {
          return {
            trans_id: data.trans_id,
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
    },
    Reject (index) {
      this.rejects = {
        trans_id: index,
        trans_status: 2,
        approve_id: JSON.parse(localStorage.getItem('username'))
      }
      axios({
        url: this.apiURL + '/trans/reject-transportation',
        method: 'patch',
        data: this.rejects
      }).then(response => {
        this.event = response.data.result.map((data, i) => {
          return {
            trans_id: data.trans_id,
            id: data.employee_id,
            from: data.trans_from,
            to: data.trans_to,
            prices: data.trans_values,
            approve: data.trans_status
          }
        })
        this.$refs.table.refresh()
      })
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
