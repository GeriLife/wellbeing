<template name="front">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ quickAddTitle }}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <button
                  @click="Modal.show('activityFormModal')"
                  id="add-activity"
                  class="btn btn-success btn-lg"
                  role="button"
                >
                  <i class="fa fa-heartbeat"></i>
                  <br>
                  {{ activityButton }}
                </button>
                <button
                  id="add-feeling"
                  @click="Modal.show('newFeeling')"
                  class="btn btn-success btn-lg"
                  role="button"
                >
                  <i class="fa fa-stethoscope"></i>
                  <br>
                  {{ feelingButton }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ linkTitle }}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <a href="/residents" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-users"></i>
                  <br>
                  {{ residentsButton }}
                </a>
                <a href="/homes" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-home"></i>
                  <br>
                  {{ homesButton }}
                </a>
                <a href="/activities" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-heartbeat"></i>
                  <br>
                  {{ activitiesButton }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    val: String,
    Modal: Object,
    localizedText: Object
  },
  data() {
    return {
      ...this.localizedText
    };
  }
};
</script>
