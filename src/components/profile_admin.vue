<template>
  <div>
    Account Setting
    <div>
      profile
      <b-container>
        <b-table ref="table" :items="profiles" :fields="fields" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(id)="data">
            <p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" v-b-modal="'modal-id' + data.item.id">{{data.item.id}}</p>
            <b-modal :id="'modal-id' + data.item.id" :title="data.item.id">
              <b-container>
                {{data.item}}
              </b-container>
            </b-modal>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      profile: [],
      profiles: [],
      fields: [{
        key: 'id',
        sortable: true
      }, {
        key: 'name',
        sortable: true
      }, {
        key: 'last_name'
      }, {
        key: 'role'
      }],
      data: []
    }
  },
  beforeCreate () {},
  created () {
    this.data = {
      employee_id: JSON.parse(localStorage.getItem('username'))
    }
    axios.post('http://localhost:4000/emp/settingprofileadmin', this.data).then(response => {
      this.profile = response.data.result
      this.profiles = response.data.result.map((data, i) => {
        return {
          id: data.employee_id,
          name: data.employee_name,
          last_name: data.employee_lastname,
          role: data.permission,
          email: data.employee_email,
          tel: data.employee_tel,
          start_date: data.start_date,
          leave_sick: data.leave_sick,
          annual_leave: data.leave_vacation,
          pic: data.employee_pic,
          job_name: data.job_name
        }
      })
    })
  }
}
</script>
<style scoped>
</style>
