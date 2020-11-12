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
            <b-col>
              <div class="card" style="background-color:#ebecf0;">
                <div style="border-radius: 5px;border: thin solid #888;">
                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                  <div class="align-left" style="margin:5px;margin-top:15px;">
                    <h5>Anusorn Thavornpon</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="align-left">
                    Content
                  </div>
                  <div style="height: 150px;width:100%;overflow-y: scroll;">
                    <div style="border-radius: 5px;border: thin solid #888;cursor: pointer;"  v-b-modal.modal-1>
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
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
                        <b-modal id="modal-1" title="BootstrapVue" size="lg" hide-footer>
                          <b-container>
                            <div>
                              <h5>
                                Detail
                              </h5>
                              <div style="margin:5px;">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae magnam voluptas nemo necessitatibus quae nam expedita placeat neque iusto, tempora asperiores vel iste ipsa libero, quaerat officia eius illum animi!
                              </div>
                            </div>
                            <br>
                            <div>
                              <h5>
                                Event
                              </h5>
                              <div>
                                <div style="margin:5px;">
                                  <b-input placeholder="Comment"></b-input>
                                </div>
                                <div style="margin:5px;">
                                  <b-button>Save</b-button>
                                </div>
                              </div>
                              <div>
                                <div style="border-radius: 5px;border: thin solid white;">
                                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                                  <div class="align-left" style="margin:5px;margin-top:15px;">
                                    <h5>Anusorn Thavornpon</h5>
                                    <div>12 November 2020</div>
                                  </div>
                                </div>
                                <div style="border-radius: 5px;border: thin solid #888;margin:5px;">
                                  <div style="margin:5px;">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis voluptates molestiae error similique dignissimos nostrum quaerat commodi voluptate reiciendis doloremque veniam possimus aut, animi laborum repellendus deleniti. Cumque, non sapiente.
                                  </div>
                                </div>
                                <div style="margin:5px;">
                                  <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Edit</div>
                                  <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Delete</div>
                                </div>
                              </div>
                              <div>
                                <div style="border-radius: 5px;border: thin solid white;">
                                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                                  <div class="align-left" style="margin:5px;margin-top:15px;">
                                    <h5>ADMIN LPTT</h5>
                                    <div>11 November 2020</div>
                                  </div>
                                </div>
                                <div style="border-radius: 5px;border: thin solid #888;margin:5px;">
                                  <div style="margin:5px;">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis voluptates molestiae error similique dignissimos nostrum quaerat commodi voluptate reiciendis doloremque veniam possimus aut, animi laborum repellendus deleniti. Cumque, non sapiente.
                                  </div>
                                </div>
                                <div style="margin:5px;">
                                  <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Edit</div>
                                  <div style="border-bottom: thin solid #888;display: inline-block;margin:5px;cursor:pointer;">Delete</div>
                                </div>
                              </div>
                              <div>
                                <div style="border-radius: 5px;border: thin solid white;">
                                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                                  <div class="align-left" style="margin:5px;margin-top:15px;">
                                    <h5>Anusorn Thavornpon</h5>
                                    <div>10 November 2020</div>
                                  </div>
                                </div>
                                <div style="border-radius: 5px;border: thin solid #888;margin:5px;">
                                  <div style="margin:5px;">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis voluptates molestiae error similique dignissimos nostrum quaerat commodi voluptate reiciendis doloremque veniam possimus aut, animi laborum repellendus deleniti. Cumque, non sapiente.
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
                    <div style="border-radius: 5px;border: thin solid #888;">
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
                      </div>
                      <div class="align-right">
                        <div style="display: inline-block;margin:5px;">
                          {{5}}
                        </div>
                        <div style="display: inline-block;margin:5px;">
                          Edit
                        </div>
                        <div style="display: inline-block;margin:5px;">
                          Reply
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="card" style="background-color:#ebecf0;">
                <div style="border-radius: 5px;border: thin solid #888;">
                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                  <div class="align-left" style="margin:5px;margin-top:15px;">
                    <h5>Anusorn Thavornpon</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="align-left">
                    Content
                  </div>
                  <div style="height: 150px;width:100%;overflow-y: scroll;">
                    <div style="border-radius: 5px;border: thin solid #888;">
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
                      </div>
                      <div class="align-right" style="margin:5px;"><div style="display: inline-block;margin:5px;">{{5}}</div><div style="display: inline-block;margin:5px;">Edit</div> Reply</div>
                      <div class="align-right">
                      </div>
                    </div>
                    <br>
                    <div style="border-radius: 5px;border: thin solid #888;">
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
                      </div>
                      <div class="align-right" style="margin:5px;"><div style="display: inline-block;margin:5px;">{{5}}</div><div style="display: inline-block;margin:5px;">Edit</div> Reply</div>
                      <div class="align-right">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="card" style="background-color:#ebecf0;">
                <div style="border-radius: 5px;border: thin solid #888;">
                  <img src="https://i.imgur.com/KPtSoGK.jpg" alt="">
                  <div class="align-left" style="margin:5px;margin-top:15px;">
                    <h5>Anusorn Thavornpon</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="align-left">
                    Content
                  </div>
                  <div style="height: 150px;width:100%;overflow-y: scroll;">
                    <div style="border-radius: 5px;border: thin solid #888;">
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
                      </div>
                      <div class="align-right" style="margin:5px;"><div style="display: inline-block;margin:5px;">{{5}}</div><div style="display: inline-block;margin:5px;">Edit</div> Reply</div>
                      <div class="align-right">
                      </div>
                    </div>
                    <br>
                    <div style="border-radius: 5px;border: thin solid #888;">
                      <div class="align-left">
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FF3A3A">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#0091C7">
                        </div>
                        <div style="display: inline-block;border-radius: 5px;border: thin solid #888;width: 50px;height: 20px;margin:5px;margin-top:10px;background-color:#FDFF69">
                        </div>
                      </div>
                      <div class="align-left" style="margin:5px;text-indent: 30px;white-space: nowrap;width: 250px;overflow: hidden;text-overflow: ellipsis;">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ab nemo, qui doloremque sed assumenda ea illum voluptatum tempora saepe. Quisquam deleniti voluptates tenetur sint dicta explicabo quia dolore suscipit.
                      </div>
                      <div class="align-right" style="margin:5px;"><div style="display: inline-block;margin:5px;">{{5}}</div><div style="display: inline-block;margin:5px;">Edit</div> Reply</div>
                      <div class="align-right">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  beforeCreate () {
    // var localjwt = localStorage.getItem('jwt')
    // if (localjwt !== null) {
    // } else {
    //   location.replace('/')
    // }
  },
  created () {}
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
