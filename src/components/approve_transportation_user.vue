<template>
  <div>
    <div style="font-size:30px;">
      Transportation
      <b-container>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
                From
              </div>
              <b-form-input type="date" v-model="trans_month.from"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
                To
              </div>
              <b-form-input type="date" v-model="trans_month.to"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div  style="margin-top:-6px;">
                <br>
              </div>
              <b-button v-on:click="selectMonth ()" variant="success">Select</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
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
          <template v-slot:cell(approve)="data" v-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Pending</div>
            <div v-else-if="data.item.approve === 1">Approved</div>
            <div v-else-if="data.item.approve === 2">Rejected</div>
          </template>
        </b-table>
      </b-container>
      <b-button style="margin:5px" v-on:click="pdfPreview ()">Preview PDF</b-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
// import moment from 'moment'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}
export default {
  data () {
    return {
      apiURL: apiURL,
      event: [],
      approve: [],
      employee_id: [],
      trans_month: {
        id: '',
        from: '',
        to: ''
      },
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
    this.employee_id = {
      id: JSON.parse(localStorage.getItem('username'))
    }
    axios.post(this.apiURL + '/trans/get-all-trans-user', this.employee_id).then(response => {
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
    }).catch(e => {
      this.error.push(e)
    })
  },
  methods: {
    selectMonth () {
      this.trans_month.id = JSON.parse(localStorage.getItem('username'))
      axios.post(this.apiURL + '/trans/get-month-trans-user', this.trans_month).then(response => {
        console.log('selectmonth', response)
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
      }).catch(e => {
        this.error.push(e)
      })
    },
    pdfPreview () {
      console.log('pdfpreview')
      axios.post(this.apiURL + '/trans/pdf', this.trans_month).then(response => {
        console.log('transpdf', response)
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
