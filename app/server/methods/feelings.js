/*
Methods related to resident Feelings
*/

import d3 from 'd3';
import { isCurrentUserAdmin } from '../utils/user';

Meteor.methods({
  getFeelingsCountsByResidentId(residentId) {
    // Get all feelings observations for resident
    const residentFeelings = Feelings.find({ residentId }).fetch();

    // Get counts of feelings grouped by type
    // each resident feeling observation has a 'feeling' field
    // group observations by value of 'feeling'
    const grouped = d3.groups(residentFeelings, function (
      residentFeeling
    ) {
      return residentFeeling.feeling;
    });
    // count number of observations for each feeling type
    return grouped.map(function (feelingsArray) {
      return {
        key: feelingsArray[0],
        value: feelingsArray[1].length,
      };
    });
  },
  getFeelingsPercentagesByResidentIdApi({ residentId }) {
    return Meteor.call(
      'getFeelingsPercentagesByResidentId',
      residentId
    );
  },
    getFeelingsPercentagesByResidentId (residentId) {
    // Get all feelings observations for resident
    const residentFeelings = Feelings.find({ residentId }).fetch();

    // Get counts of feelings grouped by type
    // each resident feeling observation has a 'feeling' field
    // group observations by value of 'feeling'
    const grouped = d3.groups(residentFeelings, function (
      residentFeeling
    ) {
      return residentFeeling.feeling;
    });
    // count percentage of observations for each feeling type
    return grouped.map(function (aggregateFeelings) {
      return {
        key: aggregateFeelings[0],
        value: aggregateFeelings[1].length / residentFeelings.length};
    });
  },

  addFeeling(feelingData){
    if (!isCurrentUserAdmin(this.userId)) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
    return Feelings.insert(feelingData);
  }
});
