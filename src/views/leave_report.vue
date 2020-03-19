<template>
  <div>
    <div>
      <b-container fluid="xl">
        <b-container>
          <div>
            Name - lastname :
            <input type="text" />
          </div>
          <div>
            <input type="radio" />Full day
          </div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  Start
                  <input type="date" />
                </div>
              </b-col>
              <b-col>
                <div>
                  End
                  <input type="date" />
                </div>
              </b-col>
              <b-col>
                <div>
                  จำนวนวันลา
                  <input type="text" />
                </div>
              </b-col>
              <b-col>
                <div>จำนวนวันลาจริง <input type="text"></div>
              </b-col>
            </b-row>
          </b-container>
          <div>
            <input type="radio" /> Half day
          </div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  Day <input type="day">
                </div>
              </b-col>
              <b-col>
                <div>from <input type="text"></div>
              </b-col>
              <b-col>
                <div>to <input type="text"></div>
              </b-col>
              <b-col>
                <div>break <input type="text"></div>
              </b-col>
              <b-col>
                <div>
                  value time
                  <input type="text"><input type="text">
                </div>
              </b-col>
            </b-row>
          </b-container>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  type <input type="text">
                </div>
              </b-col>
              <b-col>
                <div>
                  reason <input type="text">
                </div>
              </b-col>
              <b-col>
                <div>
                  <input type="checkbox">หักเงิน <input type="checkbox">หักเปอร์ดซ็น / วัน
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div>
                  บันทึก <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
              </b-col>
              <b-col>
                <div>
                  <input type="file">
                </div>
              </b-col>
              <b-col>
                <div>
                  <button>Upload</button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-container>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="">
</style>
