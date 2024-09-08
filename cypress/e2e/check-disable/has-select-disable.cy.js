const aNot =
  'http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
const a =
  'http://5.45.74.202/landers/sophie_thibault_wl_la_lejournaldequebec_ca/Sophie%20Thibault_Le-Journal-de-Quebec/index.php?pwd=s712jzchsiq7hhvGxlndoz1';
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
  
  describe('Проверка наличия стилей CSS', () => {
    it('Должен подтвердить наличие хотя бы одного элемента с указанными стилями', () => {
      cy.visit(mocLinks[0]);
      let styleFound = false;

      const checkStyles = (selector) => {
        cy.get('body').find(selector).then(($elements) => {
            if ($elements.length > 0) {
                console.log($elements)
                $elements.each((index, element) => {
                    const $el = Cypress.$(element);
                    if (
                      $el.css('pointer-events') === 'none'
                    ) {
                        if(cy.wrap($el).should('have.css', 'pointer-events', 'none')
                            // .and('have.css', 'user-select', 'none')
                            // .and('have.css', '-webkit-user-select', 'none')
                            // .and('have.css', '-ms-user-select', 'none')
                            // .and('have.css', '-moz-user-select', 'none')
                        ) {
                                styleFound = true;
                            }
                    }
                  });
                
            }
          
        });
      };
  
      checkStyles('.check__wrapper');

      checkStyles('.check');
  
      checkStyles('.un-steps__check');

      cy.then(() => {
        expect(styleFound).to.be.true;
      });
    });
  });

  describe('Проверка наличия стилей CSS', () => {
    it('Должен подтвердить наличие хотя бы одного элемента с указанными стилями', () => {
        cy.visit(mocLinks[0]);
        cy.viewport('iphone-6');
      let styleFound = false;
      // Функция для проверки наличия и значения стиля
      const checkStyles = (selector) => {
        cy.get('body').find(selector).then(($elements) => {
            if ($elements.length > 0) {
                console.log($elements)
                $elements.each((index, element) => {
                    const $el = Cypress.$(element);
                    if (
                      $el.css('pointer-events') === 'none'
                    ) {
                        if(cy.wrap($el).should('have.css', 'pointer-events', 'none')
                            .and('have.css', 'user-select', 'none')
                            .and('have.css', '-webkit-user-select', 'none')
                            .and('have.css', '-ms-user-select', 'none')
                            .and('have.css', '-moz-user-select', 'none')
                        ) {
                                styleFound = true;
                            }
                    }
                  });
                
            }
          
        });
      };
  
      checkStyles('[class$="check-mobile"]');

      cy.then(() => {
        expect(styleFound).to.be.true;
      });
    });
  });