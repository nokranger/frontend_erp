<template>
  <div>
    <h1>Plan</h1>
    <div>
      <div>
        <b-container>
          <b-row>
            <b-col></b-col>
            <b-col></b-col>
            <b-col>
              <div class="align-left">
                <div>
                  <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                  </div>
                  <div style="display: inline-block;margin">High</div>
                </div>
                <div>
                  <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                  </div>
                  <div style="display: inline-block;margin">Normal</div>
                </div>
                <div>
                  <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                  </div>
                  <div style="display: inline-block;margin">Low</div>
                </div>
              </div>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col v-for="(showplan, index) in new_emps" :key="index">
              <div class="card" style="background-color:#ebecf0;">
                <div style="border-radius: 5px;border: thin solid #888;">
                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                  <div class="align-left" style="margin:5px;margin-top:15px;">
                    <h5>{{showplan.text}}</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="align-left">
                    Content
                  </div>
                  <div style="height: 150px;width:100%;overflow-y: scroll;">
                    <div v-for="(datas, index) in showplan.con" :key="index">
                      <div style="border-radius: 5px;border: thin solid #888;cursor: pointer;"  v-b-modal="'modal-id' + datas.plan_id">
                        <div class="align-left">
                          <div v-if="datas.priority == 0" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                          </div>
                          <div v-else-if="datas.priority == 1" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                          </div>
                          <div v-else-if="datas.priority == 2" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                          </div>
                        </div>
                        <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                          {{datas.title}}
                        </div>
                        <div class="align-right">
                          <div style="display: inline-block;margin:5px;">
                            {{3}}
                          </div>
                          <div style="display: inline-block;margin:5px;">
                            Edit
                          </div>
                          <div style="display: inline-block;margin:5px;">
                            Reply
                          </div>
                          <b-modal :id="'modal-id' + datas.plan_id" :title="datas.title" size="lg" hide-footer>
                            <b-container>
                              <div>
                                <div v-if="datas.priority == 0" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                                </div>
                                <div v-else-if="datas.priority == 1" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                                </div>
                                <div v-else-if="datas.priority == 2" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                                </div>
                                <h5>
                                  Member
                                </h5>
                                <div style="margin:5px;">
                                  {{datas.member + showplan.text}}
                                </div>
                                <h5>
                                  Detail
                                </h5>
                                <div style="margin:5px;">
                                  {{datas.detail}}
                                </div>
                              </div>
                              <br>
                              <div>
                                <h5>
                                  Event
                                </h5>
                                <div>
                                  <div style="margin:5px;">
                                    <b-input placeholder="Comment" v-model="comment.ccomment"></b-input>
                                  </div>
                                  <div style="margin:5px;">
                                    <b-button v-on:click="createComment (datas.plan_id)">Save</b-button>
                                  </div>
                                </div>
                                <div v-for="(item, index) in datas.comments" :key="index">
                                  <div style="border-radius: 5px;border: thin solid white;">
                                    <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                                    <div class="align-left" style="margin:5px;margin-top:15px;">
                                      <h5>{{item.employee_name + ' ' + item.employee_lastname}}</h5>
                                      <div>{{item.reg_date}}</div>
                                    </div>
                                  </div>
                                  <div style="border-radius: 5px;border: thin solid #888;margin:5px;">
                                    <div style="margin:5px;">
                                      {{item.comments}}
                                    </div>
                                  </div>
                                  <div style="margin:5px;">
                                    <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Edit</div>
                                    <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Delete</div>
                                  </div>
                                </div>
                              </div>
                            </b-container>
                          </b-modal>
                        </div>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>
                <div>
                  <b-button style="width:90%;margin:5px;" v-b-modal="'modal-id' + showplan.value">Add content</b-button>
                  <b-modal :id="'modal-id' + showplan.value" size="lg" title="Extra Large Modal" hide-header hide-footer>
                    <h5>
                      Content
                    </h5>
                    <b-container>
                      <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Title
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <b-input style="margin:5px;" placeholder="Title" v-model="content.title"></b-input>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Detail
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <b-textarea style="margin:5px;" placeholder="Detail" v-model="content.detail"></b-textarea>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Priority
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <b-form-select style="margin:5px;" ref="priority" v-model="selected" :options="options"></b-form-select>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Permission
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <b-form-select style="margin:5px;" ref="permission" v-model="selected2" :options="options2"></b-form-select>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Member
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <!-- <b-form-select style="margin:5px;" v-model="selected3" :options="options3"></b-form-select> -->
                            <b-form-tags style="margin:5px;" input-id="tags-basic" v-model="value" :input-attrs="{ list: 'tags-list' }"></b-form-tags>
                              <b-form-datalist id="tags-list" :options="options4">
                              </b-form-datalist>
                            <p>{{value}}</p>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <br>
                      <div class="align-center">
                        <b-button v-on:click="createContent">Add content</b-button>
                      </div>
                    </b-container>
                  </b-modal>
                </div>
                <br>
              </div>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
export default {
  data () {
    return {
      new_emps: [],
      apiURL: apiURL,
      content: {
        id: JSON.parse(localStorage.getItem('username')),
        title: '',
        detail: '',
        priority: '',
        permission: '',
        member: ''
      },
      comment: {
        id: '',
        employee_id: JSON.parse(localStorage.getItem('username')),
        ccomments: ''
      },
      rescomment: [],
      value: [],
      emp: [],
      showcontent: [],
      data: [],
      selected: null,
      options: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: '0', text: 'Low' },
        { value: '1', text: 'Normal' },
        { value: '2', text: 'High' }
      ],
      selected2: null,
      options2: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: '0', text: 'Only me' },
        { value: '1', text: 'All people' },
        { value: '2', text: 'Some People' }
      ],
      options4: []
    }
  },
  beforeCreate () {
  },
  async created () {
    await this.getEmp()
    await this.showContents()
    await this.showComment()
  },
  mounted () {
  },
  methods: {
    createContent () {
      this.content.priority = this.$refs.priority.localValue
      this.content.permission = this.$refs.permission.localValue
      this.content.member = this.value.toString()
      axios.post(this.apiURL + '/plan/createplan', this.content).then(response => {
      })
    },
    createComment (id) {
      this.comment.id = id
      axios.post(this.apiURL + '/plan/createcomment', this.comment).then(response => {
        this.rescomment = response.data.result
        this.comment = {
          id: '',
          employee_id: JSON.parse(localStorage.getItem('username')),
          ccomment: ''
        }
      })
    },
    showContents () {
      axios.get(this.apiURL + '/plan/showcontent').then(response => {
        this.data = response.data.result
        // eslint-disable-next-line camelcase
        const emp = this.options4
        const con = this.data
        const result = emp.map(({ value, text }) => {
          // eslint-disable-next-line camelcase
          const cFilter = con.filter(({ employee_id }) => employee_id === value)
          // eslint-disable-next-line camelcase
          const c = cFilter.map(({ plan_id, title, detail, priority, permission, member }) => ({ plan_id, title, detail, priority, permission, member }))

          return {
            value,
            text,
            con: c
          }
        })
        this.new_emps = result
      })
    },
    showComment () {
      // this.showContents()
      axios.get(this.apiURL + '/plan/showcomment').then(response => {
        // this.rescomment = response.data.result
        const newcomment = response.data.result
        console.log('newcom', newcomment)
        // eslint-disable-next-line camelcase
        const renew_emps = this.data
        console.log('reemp', renew_emps)
        // eslint-disable-next-line camelcase
        const result2 = renew_emps.map(({ plan_id, employee_id, title, detail, priority, permission, member, reg_date, up_date }) => {
          // eslint-disable-next-line camelcase
          const cFilter = newcomment.filter(({ plans_id }) => plans_id === plan_id)
          // eslint-disable-next-line camelcase
          const c = cFilter.map(({ plans_id, employee_name, employee_lastname, employee_id, comments, reg_date, up_date }) => ({ plans_id, employee_name, employee_lastname, employee_id, comments, reg_date, up_date }))
          return {
            plan_id,
            employee_id,
            title,
            detail,
            priority,
            permission,
            member,
            reg_date,
            up_date,
            comments: c
          }
        })
        this.rescomment = result2
        const emp = this.options4
        const con = this.rescomment
        const result = emp.map(({ value, text }) => {
          // eslint-disable-next-line camelcase
          const cFilter = con.filter(({ employee_id }) => employee_id === value)
          // eslint-disable-next-line camelcase
          const c = cFilter.map(({ plan_id, title, detail, priority, permission, member, comments }) => ({ plan_id, title, detail, priority, permission, member, comments }))

          return {
            value,
            text,
            con: c
          }
        })
        this.new_emps = result
      })
    },
    getEmp () {
      axios.get(this.apiURL + '/plan/get-emp-plan').then(response => {
        this.options4 = response.data.result.map((data, i) => {
          return {
            value: data.employee_id,
            text: data.employee_name
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.align-center {
  text-align: center;
}
img {
  margin: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: block;
  float: left;
}
</style>
