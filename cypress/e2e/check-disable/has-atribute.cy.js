const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';


describe('header unclickable header links', function () {
    it('should be disabled', function () {
        cy.visit(aNot);
        
        
        const body = cy.get('body')
        // if (body.find('.check').length > 0) {
            console.log(11)
   body.get('.check').should('have.attr', 'contenteditable', 'false');
        // }
        const condition1 = $el.attr('href') === 'https://example.com/offer_link_1';
        const condition2 = $el.attr('href') === 'https://example.com/offer_link_2';
        const condition3 = $el.attr('href') === 'https://example.com/offer_link_3';

    // Тест пройдёт, если хотя бы одно из условий истинно
        expect(condition1 || condition2 || condition3).to.be.true;
        

    });
  });