  (function() {
    describe('Tab Tests', function() {

      before(function() {
        this.$root = document.createElement('div');
        this.$root.setAttribute('id', 'app');
        document.body.appendChild(this.$root);
        this.data = [
            {
                body: 'Bad copy',
                title: 'Some Heading'
            }
        ]
        this.app = new App(this.$root, this.data)
      });

      after(function() {
        document.body.removeChild(this.$root);
      });

      describe('App Boots', function() {
        it('App to have mounted', function() {
          expect(this.$root).to.not.be.null;
        });

        it('should have created a tab container', function() {
          const $tabs = this.$root.querySelector('.tabs');
          expect($tabs).to.not.be.null;
        });

        it('should have created a view', function() {
            const $view = this.$root.querySelector('.view');
            expect($view).to.not.be.null;
        });
      });

      describe('Click a tab', function() {
        it('Tab click alters text correctly', function() {
          const tab = this.$root.querySelector('.tab');
          tab.click();
          expect(this.$root.querySelector('.view').textContent)
            .to.equal(this.data[0].body)
        });
      });


      describe('maybe a bit more context here', function() {
        it('should run here few assertions and again', function() {
          expect( true ).to.be.true;
        });
      });
    });
  })();