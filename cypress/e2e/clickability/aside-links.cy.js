// MOC LINKS  
const mocLinks = [
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'https://gi-traff.com/landers/john_lee_taxes_gemini_da_aa_hk01_hk/John-Lee-taxes-gemini_hk01/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'https://gi-traff.com/landers/charles_lafortune_dk_ka_lapresse_ca/Charles-Lafortune_LaPresse/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'https://gi-traff.com/landers/bovi_ugboma_dk_ka_legit_ng/Bovi-Ugboma_legit/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'https://gi-traff.com/landers/nattawut_skidjai_sk_ka_sanook_th/Nattawut-Skidjai_sanook_v1/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'https://5.45.74.202/landers/dev_olof_lundh_protest_za_aa_aftonbladet_se/Olof_Lundh_aftonbladet/index.php?pwd=s712jzchsiq7hhvGxlndoz1',
  'http://5.45.74.202/landers/emma_willis_za_aa_yahoo_gb/Emma_Willis_yahoo/index.php?pwd=s712jzchsiq7hhvGxyumoz1',
  'https://gi-traff.com/landers/matilda_tao_protest_sa_aa_udn_tw/Matilda-Tao_udn_v1/index.php?pwd=s712jzchsiq7hhvGxlndoz1'

]
  

describe('aside unclickable links', function () {
  it('should be disabled', function () {
    cy.visit(mocLinks[1]);

    cy.get('body').then(($body) => {
      if ($body.find('aside').length > 0) {
        cy.wrap($body).find('aside').each(($aside) => {
          if ($aside.find('a').length > 0 || Cypress.$($aside).is(':visible')) {
            const asidePointerEvents = $aside.css('pointer-events');
            if (asidePointerEvents === 'none') {
              // Если у всего aside pointer-events: none, тест проходит успешно
              cy.log('Aside has pointer-events: none, all links are unclickable');
            } else {
              // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
              cy.wrap($aside).find('a').each(($link) => {
                cy.wrap($link).should('have.css', 'pointer-events', 'none');
              });
              cy.log('Aside links have pointer-events: none, all links are unclickable');
            }
          } else {
            // Если в aside нет ссылок, тест проходит успешно
            cy.log('Aside has no links');
          }
        });
      } else {
        cy.log('No aside elements found on the page');
      }
    });
  });
});



