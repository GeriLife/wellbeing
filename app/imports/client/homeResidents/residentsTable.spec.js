import { withRenderedTemplate } from '../../test-helpers.spec.js';
import chai from 'chai';
import { $ } from 'meteor/jquery';
import '../../../client/views/home/residents/residents.html';
import '../../../client/views/home/residents/resident/resident.html';
import { homesData, residentsData } from '../mockData.spec';
if (Meteor.isClient) {
  describe('Residents Table', function() {
    let homeDetails = [];
    let homeCurrentAndActiveResidents = [];

    beforeEach(function(done) {
      homeDetails = homesData[0];
      homeCurrentAndActiveResidents = residentsData;
      done();
    });

    it('Should render a table', function(done) {
      withRenderedTemplate(
        'homeResidents',
        {
          home: homeDetails,
          residents: homeCurrentAndActiveResidents,
        },
        function(el) {
          chai.assert.equal($(el).find('.table').length, 1);
          done();
        }
      );
    });

    it('Should have 4 residents and hence four rows', function(done) {
      withRenderedTemplate(
        'homeResidents',
        {
          home: homeDetails,
          residents: homeCurrentAndActiveResidents,
        },
        function(el) {
          chai.assert.equal($(el).find('tbody>tr').length, 4);
          done();
        }
      );
    });

    it('Should have appropriate active labels for each user', function(done) {
      withRenderedTemplate(
        'homeResident',
        {
          home: homeDetails,
          resident: homeCurrentAndActiveResidents[0],
          recentActiveDaysCount: 99,
          activityLabelText: 'active',
          activityLabelClass: 'green',
          recentActiveDays: [{ residentWasActive: true }],
        },
        function(el) {
          chai.assert.equal($(el).find('tr').length, 1);
          chai.assert.equal($(el).find('td').length, 4);

          chai.assert.equal($('td:nth-child(1)').text(), 'Shailee M');
          chai.assert.equal(
            $('td:nth-child(2)')
              .text()
              .trim(),
            '99'
          );
          chai.assert.equal(
            $('td:nth-child(3)')
              .text()
              .trim(),
            'active'
          );
          chai.assert.equal(
            $('td:nth-child(3)').attr('class'),
            'green'
          );

          chai.assert.equal(
            $('td:nth-child(4) i').attr('class'),
            'fa fa-check'
          );

          done();
        }
      );
    });
  });
}
