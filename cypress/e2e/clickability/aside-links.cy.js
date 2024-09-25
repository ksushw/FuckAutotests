// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке aside некликабельные', function () {
  it('Все ссылки в блоке aside должны быть некликабельными', function () {
    cy.visit(targetUrl);

    cy.get('body').then(($body) => {
      if ($body.find('aside').length > 0) {
        cy.wrap($body)
          .find('aside')
          .each(($aside) => {
            if ($aside.find('a').length > 0 || Cypress.$($aside).is(':visible')) {
              const asidePointerEvents = $aside.css('pointer-events');
              if (asidePointerEvents === 'none') {
                // Если у всего aside pointer-events: none, тест проходит успешно
                cy.log(
                  'У всех ссылок в блоке aside - pointer-events: none, все ссылки некликабельные'
                );
              } else {
                // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
                cy.wrap($aside)
                  .find('a')
                  .each(($link) => {
                    cy.wrap($link).should('have.css', 'pointer-events', 'none');
                  });
                cy.log(
                  'У всех ссылок в блоке aside - pointer-events: none, все ссылки некликабельные'
                );
              }
            } else {
              // Если в aside нет ссылок, тест проходит успешно
              cy.log('Блок aside не имеет ссылок');
            }
          });
      } else {
        cy.log('Элементы в блоке aside на странице не найдены');
      }
    });
  });
});
