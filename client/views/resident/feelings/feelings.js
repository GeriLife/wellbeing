Template.residentFeelings.onRendered(function () {
  // Subscribe to resident feelings for current residentID
  this.subscribe('residentFeelings', this.data.residentId);
});
