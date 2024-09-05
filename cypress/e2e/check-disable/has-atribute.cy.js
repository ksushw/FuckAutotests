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
  

  describe('Проверка наличия хотя бы одного contenteditable="false"', () => {
    it('Должен подтвердить наличие contenteditable="false" хотя бы в одном варианте', () => {
      cy.visit(mocLinks[4]);
      let isContentEditableFound = false;
  
      // Функция для проверки наличия и значения атрибута contenteditable
      const checkContentEditable = (selector) => {
        cy.get('body').find(selector).each(($el) => {
          const attr = $el.attr('contenteditable');
          if (attr === 'false') {
            isContentEditableFound = true;
          }
        });
      };
  
      // Проверяем первый вариант
      checkContentEditable('.check__wrapper');
  
      // Проверяем второй вариант
      checkContentEditable('.check');
  
      // Проверяем третий вариант (если нужно)
      checkContentEditable('.un-steps__check');
  
      // Убеждаемся, что хотя бы один элемент с атрибутом найден
      cy.then(() => {
        expect(isContentEditableFound).to.be.true;
      });
    });
  });

  describe('Проверка наличия хотя бы одного contenteditable="false"', () => {
    it('Должен подтвердить наличие contenteditable="false" хотя бы в одном варианте', () => {
      cy.visit(mocLinks[0]);

      cy.viewport('iphone-6');

      let isContentEditableFound = false;
  
      // Функция для проверки наличия и значения атрибута contenteditable
      const checkContentEditable = (selector) => {
        cy.get('body').find(selector).each(($el) => {
          const attr = $el.attr('contenteditable');
          if (attr === 'false') {
            isContentEditableFound = true;
          }
        });
      };

      checkContentEditable('[class$="check-mobile"]');

      cy.then(() => {
        expect(isContentEditableFound).to.be.true;
      });
    });
  });