<template name="newActivity">
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title">
            <i class="fa fa-heart"></i>&nbsp;
            Create new Activity Type
          </h4>
        </div>
        {{# autoForm id="newActivityTypeForm" type="insert" collection="ActivitieTypes"  }}

        <div class="modal-body">
          {{> afQuickField name="name"}}
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        </div>
        {{/ autoForm }}
      </div>
    </div>
  </div>
</template>
