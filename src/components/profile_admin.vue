<template>
  <div>
    Account Setting
    <div>
      <b-container>
        <b-table ref="table" :items="profiles" :fields="fields" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(id)="data">
            <p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" v-b-modal="'modal-id' + data.item.id">{{data.item.id}}</p>
            <b-modal :id="'modal-id' + data.item.id" :title="data.item.id  + '-' + data.item.name + '-' + data.item.last_name" size="xl" hide-footer>
              <b-container>
                <!-- {{data.item}} -->
                <div>
                  <b-row>
                    <b-col>
                      <div>Personal Infomation</div>
                      <div style="display: flex;flex-direction: row;" class="align-left">
                        <div class="input-m">ID <b-input type="text" v-model="data.item.id" readonly></b-input></div>
                        <div class="input-m">Name<b-input type="text" v-model="data.item.name"></b-input></div>
                        <div class="input-m">Lastname<b-input type="text" v-model="data.item.last_name"></b-input></div>
                        <div class="input-m">Job<b-input type="text" v-model="data.item.job_name" readonly=""></b-input></div>
                      </div>
                      <div>
                        <div>Address</div>
                        <div style="display: flex;flex-direction: row;">
                          <div class="input-m">Tel.<b-input type="text" v-model="data.item.tel"></b-input></div>
                          <div class="input-m">Email<b-input type="text" v-model="data.item.email"></b-input></div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                    <div style="display: flex;flex-direction: row;">
                      <div class="input-m">Start<b-input ref="start_date" type="date" :value="data.item.start_date" readonly></b-input></div>
                      <div class="input-m">Sick Leave<b-input type="text" v-model="data.item.leave_sick" readonly></b-input></div>
                      <div class="input-m">Personal Leave<b-input type="text" v-model="data.item.annual_leave" readonly></b-input></div>
                      <div class="input-m"><br><b-button variant="success">Update Profile</b-button></div>
                    </div>
                    </b-col>
                  </b-row>
                  <br>
                  <b-row>
                    <br>
                    <b-col>
                      <div>Change Role and Password </div>
                      <div style="display: flex;flex-direction: row;" class="align-left">
                        <div class="input-m">Old password<b-input type="password"></b-input></div>
                        <div class="input-m">New password<b-input type="password"></b-input></div>
                        <div class="input-m">Role<b-input type="text"></b-input></div>
                        <div class="input-m"><br><b-button variant="success">Change password or Role</b-button></div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
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
.input-m {
  margin: 5px;
}
</style>
