Template.pagination.onCreated(function() {
  this.currentPage = new ReactiveVar(1);
  this.rowsPerPage = new ReactiveVar(10);
  this.listedPages = new ReactiveVar([1, 2, 3]);
  /* Call event to update parent */
  this.data.onChange(10, 1);
  const instance = this;
  this.autorun(function() {
    const reset = Session.get('reset-pagination');

    if (reset === true) {
      onReset(instance);
      Session.set('reset-pagination', false);
    }
  });
});

Template.pagination.helpers({
  currentPage() {
    const currentPage = Template.instance().currentPage.get();
    return currentPage;
  },

  rowsPerPage() {
    const rowsPerPage = Template.instance().rowsPerPage.get();
    return rowsPerPage;
  },
  hasNextPage() {
    const currentPage = Template.instance().currentPage.get();
    const rowsPerPage = Template.instance().rowsPerPage.get();
    const totalRows = Template.instance().data.totalRows;

    return hasNextPage(totalRows, currentPage, rowsPerPage);
  },
  hasPrevPage() {
    const currentPage = Template.instance().currentPage.get();
    return currentPage !== 1;
  },
  listedPages() {
    const listedPages = Template.instance().listedPages.get();
    return listedPages;
  },
  isCurrentPage(pageNo) {
    return Template.instance().currentPage.get() == pageNo
      ? 'bg-gray'
      : '';
  },
  isVisiblePageDisabled(pageNo) {
    const rowsPerPage = Template.instance().rowsPerPage.get();
    const totalRows = Template.instance().data.totalRows;

    return !hasNextPage(totalRows, pageNo - 1, rowsPerPage);
  },
});

Template.pagination.events({
  'click .rows-per-page'(event, template) {
    const rowsPerPage = parseInt(event.target.value);
    let currentPage = Template.instance().currentPage.get();
    let listedPages = Template.instance().listedPages.get();

    /* As rows per page change we need to readjust the current page to display same rows*/
    const totalRows = Template.instance().data.totalRows;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    /* If currentPage is greater than the new possible pages */
    if (currentPage > totalPages) currentPage = 1;

    Template.instance().rowsPerPage.set(rowsPerPage);
    Template.instance().currentPage.set(currentPage);

    listedPages = setVisiblePageNos(
      listedPages,
      currentPage,
      rowsPerPage,
      totalRows
    );
    Template.instance().listedPages.set(listedPages);

    /* Call event to update parent */
    template.data.onChange(rowsPerPage, currentPage);
  },
  'click .page-number-link'(event, template) {
    const currentPage = parseInt(event.target.text);
    const rowsPerPage = Template.instance().rowsPerPage.get();
    let listedPages = Template.instance().listedPages.get();
    const totalRows = Template.instance().data.totalRows;

    /* If end of pages is reached */
    if (!hasNextPage(totalRows, currentPage - 1, rowsPerPage)) return;

    Template.instance().currentPage.set(currentPage);
    listedPages = setVisiblePageNos(
      listedPages,
      currentPage,
      rowsPerPage,
      totalRows
    );
    Template.instance().listedPages.set(listedPages);

    /* Call event to update parent */
    template.data.onChange(rowsPerPage, currentPage);
  },
  'click .prev'(event, template) {
    const currentPage = Template.instance().currentPage.get();
    /* If this is the first page */
    if (currentPage === 1) return;

    const rowsPerPage = Template.instance().rowsPerPage.get();
    const prev = currentPage - 1;

    let listedPages = Template.instance().listedPages.get();
    const totalRows = Template.instance().data.totalRows;
    Template.instance().currentPage.set(prev);
    listedPages = setVisiblePageNos(
      listedPages,
      prev,
      rowsPerPage,
      totalRows
    );
    Template.instance().listedPages.set(listedPages);

    /* Call event to update parent */
    template.data.onChange(rowsPerPage, prev);
  },
  'click .next'(event, template) {
    const currentPage = Template.instance().currentPage.get();
    const rowsPerPage = Template.instance().rowsPerPage.get();
    let listedPages = Template.instance().listedPages.get();
    const totalRows = Template.instance().data.totalRows;

    /* If end of pages is reached */
    if (!hasNextPage(totalRows, currentPage, rowsPerPage)) return;

    const next = currentPage + 1;
    Template.instance().currentPage.set(next);

    listedPages = setVisiblePageNos(
      listedPages,
      next,
      rowsPerPage,
      totalRows
    );
    Template.instance().listedPages.set(listedPages);

    /* Call event to update parent */
    template.data.onChange(rowsPerPage, next);
  },
});

function hasNextPage(totalRows, currentPage, rowsPerPage) {
  /* The total number of pages is rounded off to its ceiling value.
     For example, totalRows is 98, and rowsPerPage 25 so we need
     4(~3.92) pages to display all records.
    */
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return currentPage + 1 <= totalPages;
}

/* 
Manages the 3 page numbers shown on the pagination UI
*/
function setVisiblePageNos(
  listedPages,
  currentPage,
  rowsPerPage,
  totalRows
) {
  /* On the event of next the currentPage value may exceed the
     last visible page number in that case show next 3 numbers
  */
  if (currentPage > listedPages[listedPages.length - 1]) {
    listedPages = [currentPage];

    // next of current exists?
    hasNextPage(totalRows, currentPage, rowsPerPage) &&
      listedPages.push(currentPage + 1);

    // second next of current exists?
    hasNextPage(totalRows, currentPage + 1, rowsPerPage) &&
      listedPages.push(currentPage + 2);
  } else if (currentPage < listedPages[0]) {
    /* When clicking previous multiple times,the currentPage
       value may get lower than the smallest visible pageNo
    */

    // first pageNo is 2 less than the current
    listedPages = [];
    currentPage - 2 >= 1 && listedPages.push(currentPage - 2);

    // first pageNo is 1 less than the current
    currentPage - 1 >= 1 && listedPages.push(currentPage - 1);

    currentPage >= 1 && listedPages.push(currentPage);
  }
  return listedPages;
}

function onReset(templateInstance) {
  templateInstance.currentPage.set(1);
  templateInstance.rowsPerPage.set(10);
  templateInstance.data.onChange(10, 1);

  let listedPages = templateInstance.listedPages.get();
  const totalRows = templateInstance.data.totalRows;

  listedPages = setVisiblePageNos(listedPages, 1, 10, totalRows);
  templateInstance.listedPages.set(listedPages);
}
