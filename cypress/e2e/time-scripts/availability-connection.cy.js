const targetUrl = Cypress.env('targetUrl');

describe('Проверка подключения time-scripts', () => {
  it('В HTML-разметке должен присутствовать тег <script> с подключением time-scripts', () => {
    cy.visit(targetUrl);

    cy.get('script[src="./time-scripts/main.js"]').should(
      'exist',
      'Отсутствует подключение скрипта time-scripts. Путь должен быть указан как "<script type="module" src="./time-scripts/main.js"></script>".'
    );
  });

  it('В HTML-разметке должны быть атрибуты data-time-function', () => {
    cy.visit(targetUrl);

    cy.get('[data-time-function]').should(
      'have.length.at.least',
      2,
      'В HTML-разметке отсутсвует атрибут data-time-function'
    );
  });
});
