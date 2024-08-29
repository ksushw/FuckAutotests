const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';


describe('header unclickable header links', function () {
    it('should be disabled', function () {
      cy.visit(aNot);

      cy.get('a').then(($links) => {
        // Проверяем каждую ссылку
        const exactLink = $links.filter((i, link) => link.getAttribute('href') === '{offer_link}&place=button');
        
        // Убедитесь, что такая ссылка существует
        expect(exactLink.length).to.equal(1);
      });

    });
  });