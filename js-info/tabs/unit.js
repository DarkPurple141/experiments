  (function() {
    describe('Tab Tests', function() {

      before(function() {
        this.$root = document.createElement('div');
        this.$root.setAttribute('id', 'app');
        document.body.appendChild(this.$root);
      });

      after(function() {
        document.body.removeChild(this.$root);
      });

      describe('App Boots', function() {
        it('App to have mounted', function() {
          expect(this.$root).to.not.be.null;
        });

        it('should run here few assertions and again', function() {
            expect( true ).to.be.true;
          });
      });

      describe('maybe a bit more context here', function() {
        it('should run here few assertions and again', function() {
          expect( true ).to.be.true;
        });
      });


      describe('maybe a bit more context here', function() {
        it('should run here few assertions and again', function() {
          expect( true ).to.be.true;
        });
      });
    });
  })();