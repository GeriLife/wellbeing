import { withRenderedTemplate } from '../../test-helpers.js';
import chai from 'chai';
import { $ } from 'meteor/jquery';
import '../../../client/views/report/report.html';
import '../../../client/views/shared/reportSettings/form.html';
import '../../../client/views/report/report.js';

if (Meteor.isClient) {
  describe('reports', function() {
    describe('Basic tests', function() {
      it('should load reports page with defaults', function(done) {
        withRenderedTemplate(
          'report',
          {
            isGroupMode: false,
            onEditingChange: () => 0,
          },
          function(el) {
            chai.assert.equal(
              $(el)
                .find('.active #timePeriod')
                .val(),
              'week'
            );
            chai.assert.equal(
              $(el)
                .find('.active #activityMetric')
                .val(),
              'activity_minutes'
            );
            done();
          }
        );
      });
    });

    describe('Data should be rendered correctly', function() {
      it('Should update settings according to selection ', function(done) {
        withRenderedTemplate(
          'report',
          {
            isGroupMode: false,
            onEditingChange: () => 0,
          },
          function(el) {
            $(el)
              .find('input[value="activity_count"]')
              .click();

            chai.assert.equal(
              $(el).find('input[value="activity_count"]')[0].checked,
              true
            );
            $(el)
              .find('input[value="group"]')
              .click();

            chai.assert.equal(
              $(el).find('input[value="group"]')[0].checked,
              true
            );

            done();
          }
        );
      });
    });
  });
}
