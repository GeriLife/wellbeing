Template.pagination.onCreated(function() {
  const { currentPage, rowsPerPage } = this.data;
  this.currentPage = new ReactiveVar(currentPage);
  this.rowsPerPage = new ReactiveVar(rowsPerPage);
});

Template.pagination.helpers({
  currentPage() {
    const currentPage = Template.instance().currentPage.get();
    return currentPage;
  },

  rowsPerPage() {
    const rowsPerPage = Template.instance().rowsPerPage.get();
    return rowsPerPage;
  }
});
