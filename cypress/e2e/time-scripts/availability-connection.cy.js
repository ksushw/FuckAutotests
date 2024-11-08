const targetUrl = Cypress.env('targetUrl');

describe('Проверка подключения time-scripts', () => {
  it('В HTML-разметке должен присутствовать тег <script> с подключением time-scripts', () => {
    cy.visit(targetUrl);

    cy.document().then((doc) => {
      const scriptExists = doc.querySelector('script[src="./time-scripts/main.js"]') !== null;
      expect(
        scriptExists,
        'Отсутствует подключение скрипта time-scripts. Путь должен быть указан как "<script type="module" src="./time-scripts/main.js"></script>".'
      ).to.be.true;
    });
  });

  it('В HTML-разметке должны быть атрибуты data-time-function', () => {
    cy.visit(targetUrl);

    cy.get('[data-time-function]').should(($elements) => {
      expect(
        $elements.length,
        'В HTML-разметке отсутствует достаточное количество атрибутов data-time-function.'
      ).to.be.at.least(2);
    });
  });
});
