<template>
  <div>
    <div>
      <div>
        <b-container style="border-radius: 5px;border: thin solid #888;">
          <h1>Plan</h1>
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
            <b-col cols="12" md="4" sm="4" v-for="(showplan, index) in new_emps" :key="index" style="margin-bottom:5px;">
              <div class="card" style="background-color:#ebecf0;width:100%;">
                <div style="border-radius: 5px;border: thin solid #888;">
                  <img :src="apiURL + '/signup/' + showplan.img" alt="">
                  <div class="align-left" style="margin:5px;margin-top:15px;">
                    <h5>{{showplan.text + ' ' + showplan.lastname}}</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="align-left">
                    Content
                  </div>
                  <div style="height: 250px;width:100%;overflow-y: scroll;">
                    <div v-for="(datas, index) in showplan.con" :key="index">
                      <div style="border-radius: 5px;border: thin solid #888;cursor: pointer;"  v-b-modal="'modal-id' + datas.plan_id">
                        <div class="align-left">
                          <div v-if="datas.priority == 2" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                          </div>
                          <div v-else-if="datas.priority == 0" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                          </div>
                          <div v-else-if="datas.priority == 1" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                          </div>
                        </div>
                        <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                          {{datas.title}}
                        </div>
                        <div class="align-right">
                          <div style="display: inline-block;margin:5px;">
                            {{datas.comments.length}}
                          </div>
                          <div style="display: inline-block;margin:5px;">
                            Edit
                          </div>
                          <div style="display: inline-block;margin:5px;">
                            Reply
                          </div>
                          <b-modal :id="'modal-id' + datas.plan_id" :title="datas.title" size="lg" hide-footer hide-header>
                            <div v-if="showplan.value == login">
                              <div style="border-bottom: thin solid #888;display: inline-block;width:90%">
                                <h5 v-b-modal="'modal-title' + datas.plan_id">{{datas.title}}</h5>
                                <!-- {{datas}} -->
                                <b-modal :id="'modal-title' + datas.plan_id" hide-header hide-footer>
                                  <b-input v-model="datas.title" v-on:keyup.enter="editContents(datas.plan_id, datas.title, 'modal-title' + datas.plan_id)"></b-input>
                                </b-modal>
                              </div>
                              <div v-b-modal="'modal-delete-content' + datas.plan_id" style="display: inline-block;"><i class="fas fa-trash-alt"></i></div>
                                <b-modal :id="'modal-delete-content' + datas.plan_id" hide-header hide-footer>
                                  Do you want to delete content ??
                                  <b-button style="float:right" v-on:click="deleteContents (datas.plan_id, 'modal-delete-content' + datas.plan_id)">ok</b-button>
                                </b-modal>
                            </div>
                            <div v-if="showplan.value !== login">
                              <div style="border-bottom: thin solid #888;display: inline-block;width:90%">
                                <h5>{{datas.title}}</h5>
                              </div>
                            </div>
                            <b-container>
                              <div>
                                <div v-if="datas.priority == 2" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                                </div>
                                <div v-else-if="datas.priority == 0" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                                </div>
                                <div v-else-if="datas.priority == 1" style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                                </div>
                                <h5>
                                  Member
                                </h5>
                                <div style="margin:5px;">
                                  {{datas.member}}
                                </div>
                                <h5>
                                  Detail
                                </h5>
                                <div v-if="showplan.value == login">
                                  <div style="margin:5px;" v-b-modal="'modal-detail' + datas.plan_id">
                                    {{datas.detail}}
                                  </div>
                                  <b-modal :id="'modal-detail' + datas.plan_id" hide-header hide-footer>
                                    <b-input v-model="datas.detail" v-on:keyup.enter="editdetailContents(datas.plan_id, datas.detail, 'modal-detail' + datas.plan_id)"></b-input>
                                  </b-modal>
                                </div>
                                <div v-else-if="showplan.value !== login">
                                  <div style="margin:5px;">
                                    {{datas.detail}}
                                  </div>
                                </div>
                              </div>
                              <br>
                              <div>
                                <h5>
                                  Event
                                </h5>
                                <div>
                                  <div style="margin:5px;">
                                    <b-input placeholder="Comment" v-model="comment.ccomment" v-on:keyup.enter="createComment (datas.plan_id, 'modal-id' + datas.plan_id)"></b-input>
                                  </div>
                                  <!-- <div style="margin:5px;">
                                    <b-button v-on:click="createComment (datas.plan_id, 'modal-id' + datas.plan_id)">Save</b-button>
                                  </div> -->
                                </div>
                                <div v-for="(item, index) in datas.comments" :key="index">
                                  <div style="border-radius: 5px;border: thin solid white;">
                                    <img :src="apiURL + '/signup/' + showplan.img" alt="">
                                    <div class="align-left" style="margin:5px;margin-top:15px;">
                                      <h5>{{item.employee_name + ' ' + item.employee_lastname}}</h5>
                                      <div>{{item.reg_date | moment("dddd, MMMM Do YYYY")}}</div>
                                    </div>
                                  </div>
                                  <div style="border-radius: 5px;border: thin solid #888;margin:5px;">
                                    <div style="margin:5px;">
                                      {{item.comments}}
                                    </div>
                                  </div>
                                  <div v-if="item.employee_id == login">
                                    <div style="margin:5px;">
                                      <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;" v-b-modal="'modal-cm' + item.comments_id">Edit</div>
                                        <b-modal :id="'modal-cm' + item.comments_id" hide-header hide-footer>
                                          <!-- <p class="my-4">Hello from modal!</p> -->
                                          <b-input v-model="item.comments" v-on:keyup.enter="editComments(item.comments_id, item.comments, 'modal-cm' + item.comments_id)"></b-input>
                                        </b-modal>
                                      <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;" v-b-modal="'modal-dcm' + item.comments_id">Delete</div>
                                        <b-modal :id="'modal-dcm' + item.comments_id" hide-header hide-footer>
                                          Do you want to delete comment ??
                                          <b-button style="float:right" v-on:click="deleteComments (item.comments_id, 'modal-dcm' + item.comments_id)">ok</b-button>
                                        </b-modal>
                                    </div>
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
                  <div v-if="showplan.value == login">
                    <b-button style="width:90%;margin:5px;" v-b-modal="'modal-id' + showplan.value">Add content</b-button>
                  </div>
                  <div v-else-if="showplan.value !== login">
                    <b-button style="width:90%;margin:5px;" disabled>Add content</b-button>
                  </div>
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
                            <b-form-select style="margin:5px;" :ref="'priority' + showplan.value" v-model="selected" :options="options"></b-form-select>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                      <!-- <b-row>
                        <b-col>
                          <div class="align-center" style="margin:5px;">
                            Permission
                          </div>
                        </b-col>
                        <b-col>
                          <div class="align-left">
                            <b-form-select style="margin:5px;" :ref="'permission' + showplan.value" v-model="selected2" :options="options2"></b-form-select>
                          </div>
                        </b-col>
                        <b-col></b-col>
                      </b-row> -->
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
                        <b-button v-on:click=" createContent(showplan.value, 'priority' + showplan.value, 'modal-id' + showplan.value)">Add content</b-button>
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
import moment from 'moment'
export default {
  data () {
    return {
      login: JSON.parse(localStorage.getItem('username')),
      new_emps: [],
      apiURL: apiURL,
      content: {
        id: JSON.parse(localStorage.getItem('username')),
        title: '',
        detail: '',
        priority: '',
        reg: '',
        up: '',
        permission: '',
        member: ''
      },
      comment: {
        id: '',
        employee_id: JSON.parse(localStorage.getItem('username')),
        ccomments: '',
        reg: '',
        up: ''
      },
      editcontent: {
        id: '',
        content: '',
        up: ''
      },
      editdetailcontent: {
        id: '',
        detail: '',
        up: ''
      },
      deletecontent: {
        id: ''
      },
      editcomment: {
        id: '',
        comment: '',
        up: ''
      },
      deletecomment: {
        id: ''
      },
      new_comment: [],
      value: [],
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
  updated () {
  },
  mounted () {
  },
  methods: {
    createContent (id, priority, modal) {
      // console.log('ID: ', id)
      this.content.id = id
      this.content.priority = this.$refs[priority][0].localValue
      this.content.member = this.value.toString()
      this.content.reg = moment(new Date(Date.now())).format()
      this.content.up = moment(new Date(Date.now())).format()
      // console.log('content', this.content)
      // console.log('modal', modal)
      axios.post(this.apiURL + '/plan/createplan', this.content).then(response => {
        this.showComment()
        this.content = {
          id: JSON.parse(localStorage.getItem('username')),
          title: '',
          detail: '',
          priority: null,
          permission: null,
          member: ''
        }
        this.$bvModal.hide(modal)
      })
    },
    editContents (id, title, modal) {
      this.editcontent = {
        id: id,
        title: title,
        up: moment(new Date(Date.now())).format()
      }
      axios.patch(this.apiURL + '/plan/editcontents', this.editcontent).then(response => {
        // console.log(response)
        this.showComment()
        this.$bvModal.hide(modal)
      })
    },
    editdetailContents (id, detail, modal) {
      this.editdetailcontent = {
        id: id,
        detail: detail,
        up: moment(new Date(Date.now())).format()
      }
      axios.patch(this.apiURL + '/plan/editdetailcontents', this.editdetailcontent).then(response => {
        // console.log(response)
        this.showComment()
        this.$bvModal.hide(modal)
      })
    },
    deleteContents (id, modal) {
      this.deletecontent = {
        id: id
      }
      axios.post(this.apiURL + '/plan/deletecontents', this.deletecontent).then(response => {
        this.showComment()
        this.$bvModal.hide(modal)
      })
    },
    createComment (id, modal) {
      // // console.log('testenter')
      this.comment.id = id
      // console.log('date', moment(new Date(Date.now())).format())
      this.comment.reg = moment(new Date(Date.now())).format()
      this.comment.up = moment(new Date(Date.now())).format()
      axios.post(this.apiURL + '/plan/createcomment', this.comment).then(response => {
        // // console.log(response)
        this.showComment()
        this.comment = {
          id: '',
          employee_id: JSON.parse(localStorage.getItem('username')),
          ccomment: ''
        }
        // this.$bvModal.hide(modal)
      })
    },
    editComments (id, comments, modal) {
      // // console.log('comment', id)
      // // console.log('comment', comments)
      this.editcomment = {
        id: id,
        comment: comments,
        up: moment(new Date(Date.now())).format()
      }
      axios.patch(this.apiURL + '/plan/editcomments', this.editcomment).then(response => {
        this.showComment()
        this.$bvModal.hide(modal)
      })
      // // console.log('commentall', this.editcomment)
    },
    deleteComments (id, modal) {
      this.deletecomment = {
        id: id
      }
      axios.post(this.apiURL + '/plan/deletecomments', this.deletecomment).then(response => {
        this.showComment()
        this.$bvModal.hide(modal)
      })
      // this.$bvModal.hide(modal)
      // // console.log(id)
    },
    showContents () {
      axios.get(this.apiURL + '/plan/showcontent').then(response => {
        this.data = response.data.result
      })
    },
    showComment () {
      this.showContents()
      axios.get(this.apiURL + '/plan/showcomment').then(response => {
        // this.rescomment = response.data.result
        const newcomment = response.data.result
        // // console.log('newcom', newcomment)
        // eslint-disable-next-line camelcase
        const renew_emps = this.data
        // // console.log('reemp', renew_emps)
        // eslint-disable-next-line camelcase
        const result2 = renew_emps.map(({ plan_id, employee_id, title, detail, priority, permission, member, reg_date, up_date }) => {
          // eslint-disable-next-line camelcase
          const cFilter = newcomment.filter(({ plans_id }) => plans_id === plan_id)
          // eslint-disable-next-line camelcase
          const c = cFilter.map(({ plans_id, employee_name, employee_lastname, employee_id, comments, reg_date, up_date, comments_id }) => ({ plans_id, employee_name, employee_lastname, employee_id, comments, reg_date, up_date, comments_id }))
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
        this.new_comment = result2
        const emp = this.options4
        const con = this.new_comment
        const result = emp.map(({ value, text, lastname, img }) => {
          // eslint-disable-next-line camelcase
          const cFilter = con.filter(({ employee_id }) => employee_id === value)
          // eslint-disable-next-line camelcase
          const c = cFilter.map(({ plan_id, title, detail, priority, permission, member, comments }) => ({ plan_id, title, detail, priority, permission, member, comments }))

          return {
            value,
            text,
            lastname,
            img,
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
            text: data.employee_name,
            lastname: data.employee_lastname,
            img: data.employee_pic
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
