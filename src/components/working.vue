<template>
  <div>
    Working
    <div>
      <div>
        <b-row>
          <b-col></b-col>
          <b-col>
            <div>
              <b-card-group deck>
                <b-card title="Title" header-tag="header" footer-tag="footer">
                  <template #header>
                    <h6 class="mb-0">
                      <div>
                        <b-list-group style="max-width: 300px;">
                          <b-list-group-item class="d-flex align-items-center">
                            <b-avatar variant="success" src="https://placekitten.com/300/300" class="mr-3"></b-avatar>
                            <span class="mr-auto">ACME group</span>
                            <b-badge>7</b-badge>
                          </b-list-group-item>
                        </b-list-group>
                      </div>
                    </h6>
                  </template>
                  <b-card-text>Header and footers using slots.</b-card-text>
                  <b-button href="#" variant="primary">Go somewhere</b-button>
                  <template #footer>
                    <em>Footer Slot</em>
                  </template>
                </b-card>
              </b-card-group>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>
</style>
