// MOC LINKS
const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';

describe('header unclickable header links', function () {
  it('should be disabled', function () {
    cy.visit(aNot);

    cy.get('header').then(($header) => {
      if ($header.find('a').length > 0) {
        const headerPointerEvents = $header.css('pointer-events');

        if (headerPointerEvents === 'none') {
          // Если у всего header pointer-events: none, тест проходит успешно
          cy.log('Header has pointer-events: none, all links are unclickable');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
          cy.wrap($header)
            .find('a')
            .each(($link) => {
              cy.wrap($link).should('have.css', 'pointer-events', 'none');
            });
          cy.log('Links has pointer-events: none, all links are unclickable');
        }
      } else {
        // Если в хедере нет ссылок, тест проходит успешно
        cy.log('Header has no links');
      }
    });
  });
});

