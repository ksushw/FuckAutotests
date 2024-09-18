const targetUrl = Cypress.env('targetUrl');

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

describe.skip('Проверка стилей ссылок на разных лендингах', () => {
  it('Все ссылки должны быть либо синими по умолчанию и красными при наведении, либо наоборот', () => {
    cy.visit(targetUrl); // Замените на нужный URL

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

      cy.contains('a', 'VISIT OFFICIAL SITE REGISTER SIGN UP', {matchCase: false}).invoke('remove');

      removePointerEventsNone();
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
      cy.wrap($link).then(($el) => {
        let defaultColor = $el.css('color'); // Цвет по умолчанию

        // Если цвет в формате rgba, преобразуем его в hex
        if (defaultColor.startsWith('rgb')) {
          defaultColor = rgbaToHex(defaultColor);
        }

        // Фиксируем стили первой ссылки
        if (!firstDefaultColor) {
          firstDefaultColor = defaultColor;
        }
        console.log('new');
        // Проверяем, что цвет по умолчанию корректен
        expect(defaultColor === blueHex || defaultColor === redHex).to.be.true;

        // Эмулируем наведение курсора
        cy.wrap($el)
          .trigger('mouseover')
          .then(() => {
            let hoverColor = $el.css('color'); // Цвет при наведении

            // Если цвет в формате rgba, преобразуем его в hex
            if (hoverColor.startsWith('rgb')) {
              hoverColor = rgbaToHex(hoverColor);
            }

            // Фиксируем цвет при наведении первой ссылки
            if (!firstHoverColor) {
              firstHoverColor = hoverColor;
            }

            // Проверяем, что цвет при наведении корректен
            expect(hoverColor === blueHex || hoverColor === redHex).to.be.true;

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
