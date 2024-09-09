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


const rgbaToHex = (rgba) => {
    const rgbaValues = rgba.match(/\d+/g); // Извлекаем числовые значения rgba
    const r = parseInt(rgbaValues[0]).toString(16).padStart(2, '0');
    const g = parseInt(rgbaValues[1]).toString(16).padStart(2, '0');
    const b = parseInt(rgbaValues[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
};

describe('Тест на элементы с только левым бордером', () => {
    it('Должен проверить, что элементы имеют только левый бордер и других нет', () => {
        // Заходим на нужную страницу
        cy.visit(mocLinks[1]);
        
        const blueHex = '#007fff';
        const redHex = '#e32402';

        // Ищем элементы, у которых только левый бордер
        cy.get('*').filter((index, element) => {
            // Проверяем на отсутствие класса, содержащего 'comment'
            const hasCommentClass = Array.from(element.classList).some(className => className.includes('comment'));

            const borderLeft = Cypress.$(element).css('border-left-width');
            const borderTop = Cypress.$(element).css('border-top-width');
            const borderRight = Cypress.$(element).css('border-right-width');
            const borderBottom = Cypress.$(element).css('border-bottom-width');

            return !hasCommentClass &&
                   borderLeft !== '0px' &&
                   borderTop === '0px' &&
                   borderRight === '0px' &&
                   borderBottom === '0px' &&
                   Cypress.dom.isVisible(element) &&
                   element.innerText.trim() !== '';
        }).each(($el) => {
            // Проверяем цвет левого бордера на соответствие заданным цветам
            const borderLeftColor = Cypress.$($el).css('border-left-color');
            cy.wrap($el).should((el) => {
                expect(borderLeftColor).to.satisfy(color => {
                    return rgbaToHex(color) === blueHex || rgbaToHex(color) === redHex; 
                }, 'Цвет левого бордера должен быть #007FFF или #e11229');
            });
        });
    });
});