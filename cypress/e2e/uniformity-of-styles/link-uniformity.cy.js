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
const removePointerEventsNone = () => {
    cy.get('*').each(($el) => {
        const pointerEventsValue = $el.css('pointer-events');

        // Логируем элемент с pointer-events: none
        if (pointerEventsValue === 'none') {
            console.log(`Удаление элемента с pointer-events: none: ${$el.prop('tagName')}`);

            // Удаляем элемент
            cy.wrap($el).invoke('remove');
        }
    });
};

describe('Проверка стилей ссылок на разных лендингах', () => {
    it('Все ссылки должны быть либо синими по умолчанию и красными при наведении, либо наоборот', () => {
        cy.visit(mocLinks[5]); // Замените на нужный URL

        cy.get('body').then(($body) => {
            if ($body.find('aside').length > 0) {
                // Если элемент существует, удаляем его
                cy.get('aside').invoke('remove');
            }


            if ($body.find('header').length > 0) {
                // Если элемент существует, удаляем его
                cy.get('header').invoke('remove');
            }
            const hrefSubstring = '{offer_link}&place=button';
            if ($body.find(`a[href*="${hrefSubstring}"]`).length > 0) {
                // Если элемент существует, удаляем его
                cy.get(`a[href*="${hrefSubstring}"]`).invoke('remove');
            }

            cy.contains('a', 'VISIT OFFICIAL SITE REGISTER SIGN UP', { matchCase: false }).invoke('remove');

            removePointerEventsNone()
        });

        // Ожидаемые цвета в формате HEX
        const blueHex = '#007fff';
        const redHex = '#e11229';

        // Переменные для фиксации первого найденного стиля
        let firstDefaultColor = null;
        let firstHoverColor = null;

        // Функция преобразования rgba в hex
        const rgbaToHex = (rgba) => {
            const rgbaValues = rgba.match(/\d+/g); // Извлекаем числовые значения rgba
            const r = parseInt(rgbaValues[0]).toString(16).padStart(2, '0');
            const g = parseInt(rgbaValues[1]).toString(16).padStart(2, '0');
            const b = parseInt(rgbaValues[2]).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        };

        
        

        // Проверка всех ссылок
        cy.get('a').each(($link) => {

            cy.wrap($link).then($el => {

                let defaultColor = $el.css('color');  // Цвет по умолчанию

                // Если цвет в формате rgba, преобразуем его в hex
                if (defaultColor.startsWith('rgb')) {
                    defaultColor = rgbaToHex(defaultColor);
                }

                // Фиксируем стили первой ссылки
                if (!firstDefaultColor) {
                    firstDefaultColor = defaultColor;
                }
                console.log('new')
                // Проверяем, что цвет по умолчанию корректен
                expect(
                    defaultColor === blueHex || defaultColor === redHex
                ).to.be.true;

                // Эмулируем наведение курсора
                cy.wrap($el).trigger('mouseover').then(() => {
                    let hoverColor = $el.css('color');  // Цвет при наведении

                    // Если цвет в формате rgba, преобразуем его в hex
                    if (hoverColor.startsWith('rgb')) {
                        hoverColor = rgbaToHex(hoverColor);
                    }

                    // Фиксируем цвет при наведении первой ссылки
                    if (!firstHoverColor) {
                        firstHoverColor = hoverColor;
                    }

                    // Проверяем, что цвет при наведении корректен
                    expect(
                        hoverColor === blueHex || hoverColor === redHex
                    ).to.be.true;

                    // Проверяем единообразие всех ссылок
                    expect(defaultColor).to.equal(firstDefaultColor);
                    expect(hoverColor).to.equal(firstHoverColor);

                    // Возвращаемся в исходное состояние
                    cy.wrap($el).trigger('mouseout');
                });

                
            });
        });
    });
});

