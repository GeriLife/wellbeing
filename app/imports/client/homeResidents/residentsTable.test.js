import { withRenderedTemplate } from '../../test-helpers.js';
import chai from 'chai';
import { $ } from 'meteor/jquery';
import '../../../client/views/home/residents/residents.html';
import '../../../client/views/home/residents/resident/resident.html';
import { promisifyMethod } from '../../utils.tests';

function prepareTemplateData(cb) {
  Promise.all([
    promisifyMethod(
      'getHomeCurrentAndActiveResidents',
      false,
      'ZQ42bd6vZQ42MGerG'
    ),
    promisifyMethod('getHomeDetails', false, 'ZQ42bd6vZQ42MGerG'),
  ])
    .then(resp => {
      console.log(error,JSON.stringify(resp));

      cb(null, resp);
    })
    .catch(err => {
      cb(err);
    });
}

export default function() {
  describe.only('Residents Table', function() {
    let homeDetails = [];
    let homeCurrentAndActiveResidents = [];

    beforeEach(function(done) {
      prepareTemplateData(function(err, resp) {
        if (err) done();
        else {
          homeDetails = resp[1];
          homeCurrentAndActiveResidents = resp[0];
          done();
        }
      });
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
  });
}
