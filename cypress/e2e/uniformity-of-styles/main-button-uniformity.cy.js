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

// Функция для преобразования RGBА в HEX
const rgbaToHex = (rgba) => {
    // Извлекаем числовые значения RGBA из строки, проверяя наличие 'rgba()'
    const rgbaValues = rgba.match(/[\d.]+/g); // Извлекаем все числовые значения
    const r = Math.round(rgbaValues[0]).toString(16).padStart(2, '0');
    const g = Math.round(rgbaValues[1]).toString(16).padStart(2, '0');
    const b = Math.round(rgbaValues[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
};

describe('Тест на фон кнопки с предложением', () => {
    it('Должен проверить, что фон кнопки с заданной ссылкой синий или красный', () => {

        cy.visit(mocLinks[1]);
        // Замените этот адрес на фактический
        const offer_link = '{offer_link}'; // Например, 'https://example.com'

        cy.visit(mocLinks[1]);

        // Проверяем, что элемент с нужной ссылкой имеет синий или красный фон
        cy.get(`a[href="${offer_link}&place=button"]`).then($link => {
            // Получаем фоновый цвет в формате RGBA
            const backgroundColor = $link.css('background-color');
            const backgroundColorHex = rgbaToHex(backgroundColor); // Преобразуем в HEX

            // Определяем валидные HEX цвета
            const validHexColors = ['#007fff', '#e32402']; // HEX значения для синего и красного

            // Проверяем, что цвет фона входит в диапазон допустимых значений
            expect(validHexColors).to.include(backgroundColorHex);
        });
    });
});