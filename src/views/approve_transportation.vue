<template>
  <div>
    approve_trans
    {{event}}
    <div>
      <b-container>
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
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.transId}}
              </li>
            </ul>
          </b-col>
                    <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.from}}
              </li>
            </ul>
          </b-col>
                    <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.to}}
              </li>
            </ul>
          </b-col>
                    <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.prices}}
              </li>
            </ul>
          </b-col>
                    <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.approve}}
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      event: []
    }
  },
  beforeCreate () {},
  created () {},
  updated () {},
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/trans/get-all-trans')]).then(axios.spread((restrans) => {
      this.event = restrans.data.result.map((data, i) => {
        return {
          id: data.employee_id,
          transId: data.trans_id,
          from: data.trans_from,
          to: data.trans_to,
          prices: data.trans_values,
          approve: data.status
        }
      })
    })).catch(e => {
      this.error.push(e)
    })
  },
  methods: {
  }
}
</script>
<style lang="">
</style>
