<template name="front">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">{{ localize("front-quickAddPanel-title") }}</h3>
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
                  {{ localize("front-quickAddPanel-activityButton") }}
                </button>
                <button
                  id="add-feeling"
                  @click="Modal.show('newFeeling')"
                  class="btn btn-success btn-lg"
                  role="button"
                >
                  <i class="fa fa-stethoscope"></i>
                  <br>
                  {{ localize("front-quickAddPanel-feelingButton") }}
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
            <h3 class="panel-title">{{ localize("front-quickNavigationPanel-title") }}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <a href="/residents" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-users"></i>
                  <br>
                  {{ localize("front-quickNavigationPanel-residentsButton") }}
                </a>
                <a href="/homes" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-home"></i>
                  <br>
                  {{ localize("front-quickNavigationPanel-homesButton") }}
                </a>
                <a href="/activities" class="btn btn-primary btn-lg" role="button">
                  <i class="fa fa-heartbeat"></i>
                  <br>
                  {{ localize("front-quickNavigationPanel-activitiesButton") }}
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
    localize: Function
  }
};
</script>
