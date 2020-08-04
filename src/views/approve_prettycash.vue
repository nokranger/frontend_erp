<template>
  <div>
    <div style="font-size:30px;">
      Pretty cash
      <b-container>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
                From
              </div>
              <b-form-input type="date" v-model="prettycash_month.from"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
                To
              </div>
              <b-form-input type="date" v-model="prettycash_month.to"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div  style="margin-top:-6px;">
                <br>
              </div>
              <b-button v-on:click="selectMonth ()" variant="success">Query</b-button>
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
        <b-table ref="table" :items="event" :fields="fields" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" :busy="isBusy" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
            <template v-slot:cell(File)="data">
              <p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" v-b-modal="'modal-pic-cash' + data.item.Id">{{data.item.File}}</p>
                <b-modal :id="'modal-pic-cash' + data.item.Id" :title="data.item.File" size="xl" hide-footer>
                  <!-- <img :src="data.item.File" alt=""> -->
                  <b-container>
                    <b-row>
                      <b-col></b-col>
                      <b-col>
                        <img style="width:480px;hieght:720px;" :src="require('../img/uploads/prettycash/' + data.item.File)" alt="">
                      </b-col>
                      <b-col></b-col>
                    </b-row>
                  </b-container>
                  <!-- <img src="../../lptt_erp/public/uploads/prettycash/LPTTPRETTYCASH-1596138818902.png" alt=""> -->
                </b-modal>
            </template>
            <template v-slot:cell(Approve)="data" v-if="localjwt === '0'">
                <b-button v-if="event[data.index].Approve === 0" size="sm" v-on:click="Papprove (data.index)" class="mr-2" variant="success" type="submit">
                  Not Approve
                </b-button>
                <b-button v-if="event[data.index].Approve === 1" size="sm" v-on:click="Papprove (data.index)" class="mr-2" variant="primary" disabled="">
                  Approved
                </b-button>
            </template>
        </b-table>
      </b-container>
      <b-button style="margin:5px" v-on:click="pdfPreview ()">Preview PDF</b-button>
      <b-button style="margin:5px" v-on:click="pdfPrint ()">Download PDF</b-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
// import aa from '../img/uploads/prettycash'
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
      isBusy: false,
      employee_id: [],
      event: [],
      dataTotable: [],
      dataTotable2: [],
      approve: [],
      localjwt: '',
      prettycash_month: {
        from: '',
        to: ''
      },
      fields: [{
        key: 'Id',
        sortable: true
      }, {
        key: 'Date',
        sortable: true
      }, 'Request', 'Details', {
        key: 'Amount',
        sortable: true
      }, 'Remaining', 'File', 'Approve'],
      remaining: 20000,
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      items2: [
        { _name: 'Dickerson', target: 1100, date: '2020-07-17' },
        { _name: 'Larsen', target: 1200, date: '2020-07-17' },
        { _name: 'Geneva', target: 1200, date: '2020-07-17' },
        { _name: 'Jami', target: 1500, date: '2020-07-17' }
      ]
    }
  },
  beforeCreate () {

  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('local', (this.localjwt))
    }
    this.isBusy = !this.isBusy
  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
    // axios.all([axios.get('http://127.0.0.1:4000/cash/get-month-prettycash')]).then(axios.spread((response) => {
    //   // const vm = this
    //   // vm.getData(res)
    //   // this.event = reslar.data.result.map((data, i) => {
    //   //   return {
    //   //     id: data.employee_id,
    //   //     actId: data.leave_activity_report_id,
    //   //     reason: data.reason_for_leave,
    //   //     approve: data.status
    //   //   }
    //   // })
    //   console.log(response)
    // })).catch(e => {
    //   this.error.push(e)
    // })
    // console.log(this.info.length)
    // axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
    //   .then(response => {
    //     console.log(response)
    //   })
  },
  methods: {
    selectMonth () {
      // console.log(this.prettycash_month)
      this.isBusy = !this.isBusy
      axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
        .then(response => {
          // console.log('selectedddd')
          // console.log(response.data.result)
          this.event = response.data.result.map((data, i) => {
            this.remaining = this.remaining - data.amount
            return {
              Id: data.id,
              Date: moment(data.date).format('MMM Do YY'),
              Request: data.employee_id,
              Details: data.detail,
              Amount: data.amount,
              Remaining: this.remaining,
              File: data.picture.replace(/\\/g, '/'),
              Approve: data.status
            }
          })
          var aa = []
          for (const i in response.data.result) {
            aa += {
              test: JSON.parse(response.data.result[i].id)
            }
          }
          console.log('aaaaaaaaaaaaaa', aa)
          this.dataTotable2 = response.data.result
          this.dataTotable = {
            date: '',
            employee_id: '',
            detail: 'Total Net Expense',
            amount: 243234,
            approve_id: '',
            id: '',
            picture: '',
            status: '',
            service_charge: ''
          }
          var ss = []
          ss = {
            date: '',
            employee_id: '',
            detail: 'Cash left',
            amount: 243234,
            approve_id: '',
            id: '',
            picture: '',
            status: '',
            service_charge: ''
          }
          this.dataTotable2.push(this.dataTotable)
          this.dataTotable2.push(ss)
          console.log(this.event)
          console.log(this.dataTotable2)
          console.log(this.event[2].File)
          let path = this.event[2].File
          path = path.replace(/\\/g, '/')
          // path = '../../lptt_erp/' + path
          console.log(path)
          // this.event = {
          //   Date: this.event.date,
          //   Request: this.event.employee_id,
          //   Details: this.event.detail,
          //   Amount: this.event.amount,
          //   Remaining: 20000 - this.event.amount,
          //   Approve: 'Not approved'
          // }
          // console.log(this.event)
        }).catch(e => {
          // if (e.response.status === 404) {
          //   console.log('Not found')
          // } else if (e.response.status === 500) {
          //   console.log('internal error')
          // }
        })
    },
    Papprove (index) {
      // console.log('test')
      this.approve = {
        id: this.event[index].Id,
        status: 1,
        from: this.prettycash_month.from,
        to: this.prettycash_month.to
      }
      // console.log(this.prettycash_month)
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
      axios.patch('http://127.0.0.1:4000/cash/approve-prettycash', this.approve).then(response => {
        this.remaining = 20000
        this.event = response.data.result.map((data, i) => {
          this.remaining = this.remaining - data.amount
          return {
            Id: data.id,
            Date: moment(data.date).format('MMM Do YY'),
            Request: data.employee_id,
            Details: data.detail,
            Amount: data.amount,
            Remaining: this.remaining,
            Approve: data.status
          }
        })
        this.$refs.table.refresh()
      })

      // this.$refs.table.refresh()
    },
    updateApprove () {
      axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
      console.log('done select 2')
        .then(response => {
          // console.log(response.data.result)
          this.event = response.data.result.map((data, i) => {
            // this.remaining = this.remaining - data.amount
            return {
              Id: data.id,
              Date: moment(data.date).format('MMM Do YY'),
              Request: data.employee_id,
              Details: data.detail,
              Amount: data.amount,
              Remaining: this.remaining,
              Approve: data.status
            }
          })
          this.$refs.table.refresh()
        })
    },
    pdfPrint () {
      // var docDefinition = {
      //   content: [
      //     {
      //       text: 'สวัสดี', fontSize: 50
      //     }
      //   ],
      //   defaultStyle: {
      //     font: 'THSarabunNew'
      //   }
      // }
      // const today = new Date()
      // const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      // console.log(date)
      // pdfMake.createPdf(docDefinition).download('Prettycash' + '_' + date + '.pdf')
    },
    pdfPreview () {
      // console.log(this.test = this.event.map((data, i) => {
      //   return {
      //     date: data.Date
      //   }
      // }))
      // this.test = this.event.map((data, i) => {
      //   return {
      //     date: data.Date
      //   }
      // })
      // for (const i in this.event) {
      //   // this.test += this.event.Date[i]
      //   for (const j in this.event[i].Date) {
      //     this.test += this.event[i].Date[j]
      //   }
      // }
      // console.log(this.test)
      // console.log(Object.keys(JSON.stringify(this.event)))
    //   var docDefinition = {
    //     content: [
    //       {
    //         text: 'สวัสดีชาวโลก', fontSize: 50
    //       },
    //       {
    //         style: 'tableExample',
    //         table: {
    //           body: [
    //             ['Date', 'Request', 'Detail'],
    //             [this.test = this.event.map((data, i) => {
    //               return {
    //                 date: data.Date
    //               }
    //             }), 2, 3]
    //           ]
    //         }
    //       }
    //     ],
    //     defaultStyle: {
    //       font: 'THSarabunNew'
    //     }
    //   }
    //   pdfMake.createPdf(JSON.stringify(docDefinition)).open()
      // var externalDataRetrievedFromServer = [
      //   { name: 'Bartek', age: 34 },
      //   { name: 'John', age: 27 },
      //   { name: 'Elizabeth', age: 30 }
      // ]
      // console.log(externalDataRetrievedFromServer)
      // console.log(this.event)
      function buildTableBody (data, columns) {
        var body = []

        body.push(columns)
        data.forEach(function (row) {
          var dataRow = []
          columns.forEach(function (column) {
            dataRow.push(row[column].toString())
          })
          body.push(dataRow)
        })
        return body
      }

      function table (data, columns) {
        console.log(data)
        console.log(columns)
        return {
          table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
          }
        }
      }
      var docDefinition = {
        content: [
          { text: 'Logiprotech (Thailand) Co., Ltd.', style: 'header', alignment: 'center', fontSize: 30 },
          { text: 'Internal Petty Cash Record\n', alignment: 'center', fontSize: 25 },
          table(this.dataTotable2, ['date', 'employee_id', 'detail', 'amount', 'status'])
        ],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }
      pdfMake.createPdf(docDefinition).open()
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
.align-right {
  text-align: right;
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
