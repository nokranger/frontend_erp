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
                  <b-container>
                    <b-row>
                      <b-col></b-col>
                      <b-col>
                        <img style="width:480px;hieght:720px;" :src="require('../img/uploads/prettycash/' + data.item.File)" alt="">
                      </b-col>
                      <b-col></b-col>
                    </b-row>
                  </b-container>
                </b-modal>
            </template>
            <template v-slot:cell(approve)="data" v-if="localjwt === '0'">
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item !== 2" size="sm" class="mr-2" variant="danger" v-on:click="Rejected (data.item.Id)">Reject</b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve === 2" size="sm" class="mr-2" variant="danger" disabled>Reject</b-button>
            </div>
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item.approve !== 2" size="sm" class="mr-2" variant="success" v-on:click="Papprove (data.item.Id)">
                Not Approve
              </b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve !== 2 && data.item.approve !== 0" size="sm"  class="mr-2" variant="primary" disabled>
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
      <b-button style="margin:5px" v-on:click="pdfPreview ()">Preview PDF</b-button>
      <!-- <b-button style="margin:5px" v-on:click="pdfPrint ()">Download PDF</b-button> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../views/connectionAPI'
import moment from 'moment'
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
      isBusy: false,
      employee_id: [],
      event: [],
      dataTotable: [],
      dataTotable2: [],
      approve: [],
      localjwt: '',
      reject: [],
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
      }, 'File', 'approve'],
      remaining: 20000,
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10
    }
  },
  metaInfo () {
    return {
      title: 'Approve Petty Cash',
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
    // console.log('appid', this.appId)
    console.log(this.ArabicNumberToText(1001.23))
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
    selectMonth () {
      this.isBusy = !this.isBusy
      axios.post(this.apiURL + '/cash/get-month-prettycash', this.prettycash_month)
        .then(response => {
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
              approve: data.status
            }
          })
          this.isBusy = false
        }).catch(e => {
          // if (e.response.status === 404) {
          //   console.log('Not found')
          // } else if (e.response.status === 500) {
          //   console.log('internal error')
          // }
        })
    },
    Papprove (index) {
      console.log('event', index)
      this.approve = {
        id: index,
        status: 1,
        from: this.prettycash_month.from,
        to: this.prettycash_month.to,
        approve_id: JSON.parse(localStorage.getItem('username'))
      }
      axios.patch(this.apiURL + '/cash/approve-prettycash', this.approve).then(response => {
        // this.remaining = 20000
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
            approve: data.status
          }
        })
        this.$refs.table.refresh()
      })

      // this.$refs.table.refresh()
    },
    updateApprove () {
      axios.post(this.apiURL + '/cash/get-month-prettycash', this.prettycash_month)
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
    Rejected (index) {
      this.reject = {
        id: index,
        status: 2,
        from: this.prettycash_month.from,
        to: this.prettycash_month.to,
        approve_id: JSON.parse(localStorage.getItem('username'))
      }
      axios.patch(this.apiURL + '/cash/reject-prettycash', this.reject).then(response => {
        // this.remaining = 20000
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
            approve: data.status
          }
        })
        this.$refs.table.refresh()
      })
    },
    pdfPrint () {
      var column = []
      column.push({ text: 'A', style: 'tableHeader' })
      column.push({ text: 'B', style: 'tableHeader' })

      var value = []
      value.push({ text: 'Asda', style: 'tableHeader' })
      value.push({ text: 'Bsa', style: 'tableHeader' })
      var docDefinition = {
        content: [{
          table: {
            headerRows: 1,
            body: [[
              'dasdsadasd', 'dasdsadsad'
            ], [
              'dsadsadas', 'dsadsadsa'
            ]]
          }
        }

        ]
      }
      pdfMake.createPdf(docDefinition).open()
    },
    pdfPreview () {
      axios.post(this.apiURL + '/cash/pdf', this.prettycash_month).then(response => {
        this.dataTotable2 = response.data.result
        console.log('response', response.data)
        this.dataTotable2 = response.data.result.map((data, i) => {
          return {
            No: data._No,
            Date: moment(data.date).format('MMM Do YY'),
            Detail: data.detail,
            Amount: data.amount,
            Amounts: data._amounts
          }
        })
        console.log('Amount', this.dataTotable2[this.dataTotable2.length - 1].Amounts)
        if (this.dataTotable2.length < 20) {
          for (var i = this.dataTotable2.length; i < 20; i++) {
            this.dataTotable[i] = {
              No: '\n',
              Date: '',
              Detail: '',
              Amount: '',
              Amounts: this.dataTotable2[this.dataTotable2.length - 1].Amounts
            }
            this.dataTotable[19] = {
              No: '\n',
              Date: '',
              Detail: '',
              Amount: this.dataTotable2[this.dataTotable2.length - 1].Amounts,
              Amounts: this.dataTotable2[this.dataTotable2.length - 1].Amounts
            }
          }
          for (var k in this.dataTotable) {
            this.dataTotable2.push(this.dataTotable[k])
          }
        } else {
          this.dataTotable[this.dataTotable2.length + 1] = {
            No: '\n',
            Date: '',
            Detail: '',
            Amount: this.dataTotable2[this.dataTotable2.length - 1].Amounts,
            Amounts: this.dataTotable2[this.dataTotable2.length - 1].Amounts
          }
          for (var u in this.dataTotable) {
            this.dataTotable2.push(this.dataTotable[u])
          }
        }
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
          // console.log(data)
          // console.log(columns)
          return {
            table: {
              widths: [20, 50, 370, 40],
              headerRows: 1,
              body: buildTableBody(data, columns)
            }
          }
        }
        var docDefinition = {
          content: [
            { text: 'Logiprotech (Thailand) Co., Ltd.', style: 'header', alignment: 'center', fontSize: 30 },
            { text: 'Internal Petty Cash Record\n', alignment: 'center', fontSize: 25 },
            table(this.dataTotable2, ['No', 'Date', 'Detail', 'Amount']),
            {
              table: {
                widths: [507],
                headerRows: 1,
                body: [[
                  { text: '(' + this.ArabicNumberToText(this.dataTotable2[this.dataTotable2.length - 1].Amounts) + ')', alignment: 'center' }
                ]]
              }
            },
            { text: '\nขอรับรองว่าค่าใช้จ่ายดังกล่าวใช้เพื่อกิจการของบริษัท ฯ\n', alignment: 'right', fontSize: 16 },
            { text: '.....................................\n', alignment: 'right', fontSize: 16 },
            { text: '(นายธนัตถ์ รัตนโกสุมภ์)\n', alignment: 'right', fontSize: 16 },
            { text: 'ผู้จัดการฝ่ายพัฒนา IT\n\n', alignment: 'right', fontSize: 16 },
            { text: 'หมายเหตุ: เคลียร์เงิน petty cash เบิกเงินคืน', alignment: 'left', fontSize: 16 }
          ],
          defaultStyle: {
            font: 'THSarabunNew'
          }
        }
        pdfMake.createPdf(docDefinition).open()
      })
    },
    // eslint-disable-next-line no-unused-vars
    ThaiNumberToText (Numbers) {
      Numbers = Numbers.replace(/๐/gi, '0')
      Numbers = Numbers.replace(/๑/gi, '1')
      Numbers = Numbers.replace(/๒/gi, '2')
      Numbers = Numbers.replace(/๓/gi, '3')
      Numbers = Numbers.replace(/๔/gi, '4')
      Numbers = Numbers.replace(/๕/gi, '5')
      Numbers = Numbers.replace(/๖/gi, '6')
      Numbers = Numbers.replace(/๗/gi, '7')
      Numbers = Numbers.replace(/๘/gi, '8')
      Numbers = Numbers.replace(/๙/gi, '9')
      // eslint-disable-next-line no-undef
      return ArabicNumberToText(Numbers)
    },
    ArabicNumberToText (Numbers) {
      // eslint-disable-next-line no-redeclare
      // eslint-disable-next-line no-undef
      Numbers = this.CheckNumber(Numbers)
      // eslint-disable-next-line no-array-constructor
      var NumberArray = new Array('ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ')
      // eslint-disable-next-line no-array-constructor
      var DigitArray = new Array('', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน')
      var BahtText = ''
      if (isNaN(Numbers)) {
        return 'ข้อมูลนำเข้าไม่ถูกต้อง'
      } else {
        if ((Numbers - 0) > 9999999.9999) {
          return 'ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้'
        } else {
          Numbers = Numbers.split('.')
          if (Numbers[1].length > 0) {
            Numbers[1] = Numbers[1].substring(0, 2)
          }
          var NumberLen = Numbers[0].length - 0
          for (var i = 0; i < NumberLen; i++) {
            var tmp = Numbers[0].substring(i, i + 1) - 0
            if (tmp !== 0) {
              if ((i === (NumberLen - 1)) && (tmp === 1)) {
                BahtText += 'เอ็ด'
              } else
              if ((i === (NumberLen - 2)) && (tmp === 2)) {
                BahtText += 'ยี่'
              } else
              if ((i === (NumberLen - 2)) && (tmp === 1)) {
                BahtText += ''
              } else {
                BahtText += NumberArray[tmp]
              }
              BahtText += DigitArray[NumberLen - i - 1]
            }
          }
          BahtText += 'บาท'
          if ((Numbers[1] === '0') || (Numbers[1] === '00')) {
            BahtText += 'ถ้วน'
          } else {
            var DecimalLen = Numbers[1].length - 0
            for (i = 0; i < DecimalLen; i++) {
              tmp = Numbers[1].substring(i, i + 1) - 0
              if (tmp !== 0) {
                if ((i === (DecimalLen - 1)) && (tmp === 1)) {
                  BahtText += 'เอ็ด'
                } else
                if ((i === (DecimalLen - 2)) && (tmp === 2)) {
                  BahtText += 'ยี่'
                } else
                if ((i === (DecimalLen - 2)) && (tmp === 1)) {
                  BahtText += ''
                } else {
                  BahtText += NumberArray[tmp]
                }
                BahtText += DigitArray[DecimalLen - i - 1]
              }
            }
            BahtText += 'สตางค์'
          }
          return BahtText
        }
      }
    },
    CheckNumber (Numbers) {
      var decimal = false
      Numbers = Numbers.toString()
      Numbers = Numbers.replace(/ |,|บาท|฿/gi, '')
      for (var i = 0; i < Numbers.length; i++) {
        if (Numbers[i] === '.') {
          decimal = true
        }
      }
      if (decimal === false) {
        Numbers = Numbers + '.00'
      }
      return Numbers
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
