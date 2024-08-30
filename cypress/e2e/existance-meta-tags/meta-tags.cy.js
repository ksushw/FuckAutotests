const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';

describe('header unclickable header links', function () {
  it('should be disabled', function () {
    cy.visit(
      'http://5.45.74.202/landers/christine_lampard_wk_ka_bbc_gb/Christine-Lampard_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1'
    );
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
});
