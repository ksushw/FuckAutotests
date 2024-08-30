const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';

describe('meta tags', function () {
    beforeEach(() => {
        // Посещаем страницу перед каждым тестом
        cy.visit(a);
    });
  it('should contain fomat-detection tags', function () {
    
    const expectedAttributes = [
      'telephone=no',
      'date=no',
      'address=no',
      'email=no',
    ];

    cy.get('meta[name="format-detection"]').then((metaTags) => {
      if (metaTags.length === 1) {
        cy.wrap(metaTags)
          .should('have.attr', 'content')
          .then((content) => {
            expectedAttributes.forEach((attr) => {
              expect(content).to.include(attr);
            });
          });
      } else if (metaTags.length > 1) {
        cy.get('meta[name="format-detection"]')
          .should('have.length', 4)
          .then((metaTags) => {
            const actualContents = metaTags
              .map((index, meta) => Cypress.$(meta).attr('content'))
              .get();

            expectedAttributes.forEach((attr) => {
              expect(actualContents).to.include(attr);
            });
          });
      }
    });
  });
    
    
  it('Должен содержать мета-тег charset="UTF-8" либо в content, либо как отдельный атрибут', () => {
    // Проверяем наличие мета-тега с charset в content
      cy.get('head').then($head => {
          if ($head.find('meta[charset="UTF-8"]').length > 0) {
              cy.get('meta[charset="UTF-8"]').should('exist');

          } else {
              cy.get('meta[http-equiv="Content-Type"]').should('have.attr', 'content', 'text/html; charset=UTF-8');
          }
      });
  });


  it('should contain viewport tag with content "width=device-width, initial-scale=1.0"', function () {
    cy.get('meta[name="viewport"]').should('exist');
    cy.get('meta[name="viewport"]').should('have.attr', 'content').and((content) => {
        expect(content).to.match(/width=device-width, initial-scale=1(\.0)?/);
      });
  });
});
