const chai = require('chai');
const assert = chai.assert;

const {Client} = require('../dist/wilma.min.js');

module.exports = () => {

    describe('Wilma', function() {

        it('should ping', function(done) {

            const client = new Client();
            client.setApi(`${process.env.URL_API}/api`);
            client.ping()
                    .then(function(response) {

                        assert.exists(response.data.name);
                        assert.exists(response.data.version);

                        done();

                    })
                    .catch(done);

        });
        
    });

};
