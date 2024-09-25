describe('Проверка атрибута inert на странице', () => {
  it('Проверка наличия атрибута inert в блоках header / footer / aside', () => {
    // Проверка для header
    cy.get('header').then(($header) => {
      // Проверяем, есть ли ссылки внутри header
      if ($header.find('a').length > 0) {
        // Если атрибута inert на самом header нет, проверяем вложенные элементы
        if ($header.attr('inert')) {
          cy.get('header').should('have.attr', 'inert');
        } else {
          // Ищем вложенные элементы с inert
          cy.get('header [inert]').should('exist').and('have.attr', 'inert');
        }
      } else {
        cy.log('В header отсутствуют ссылки, проверка inert не требуется');
      }
    });

    // Проверка для footer
    cy.get('footer').then(($footer) => {
      // Проверяем, есть ли ссылки внутри footer
      if ($footer.find('a').length > 0) {
        // Если атрибута inert на самом footer нет, проверяем вложенные элементы
        if ($footer.attr('inert')) {
          cy.get('footer').should('have.attr', 'inert');
        } else {
          // Ищем вложенные элементы с inert
          cy.get('footer [inert]').should('exist').and('have.attr', 'inert');
        }
      } else {
        cy.log('В footer отсутствуют ссылки, проверка inert не требуется');
      }
    });

    // Проверка для aside
    cy.get('aside').then(($aside) => {
      // Проверяем, есть ли ссылки внутри aside
      if ($aside.find('a').length > 0) {
        // Если атрибута inert на самом aside нет, проверяем вложенные элементы
        if ($aside.attr('inert')) {
          cy.get('aside').should('have.attr', 'inert');
        } else {
          // Ищем вложенные элементы с inert
          cy.get('aside [inert]').should('exist').and('have.attr', 'inert');
        }
      } else {
        cy.log('В aside отсутствуют ссылки, проверка inert не требуется');
      }
    });
  });

  it('Проверяет, что ссылки внутри блоков с inert не кликабельны', () => {
    // Пример проверки на элементе, если inert включён
    cy.get('header[inert], header [inert]')
      .find('a')
      .each(($link) => {
        cy.wrap($link).click({force: true}); // Пробуем кликнуть по ссылке с inert
        cy.location('href').should('not.eq', $link.prop('href')); // Проверяем, что перехода не произошло
      });

    cy.get('footer[inert], footer [inert]')
      .find('a')
      .each(($link) => {
        cy.wrap($link).click({force: true});
        cy.location('href').should('not.eq', $link.prop('href'));
      });

    cy.get('aside[inert], aside [inert]')
      .find('a')
      .each(($link) => {
        cy.wrap($link).click({force: true});
        cy.location('href').should('not.eq', $link.prop('href'));
      });
  });
});
