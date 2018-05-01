import Homes from './';

Homes.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
});
