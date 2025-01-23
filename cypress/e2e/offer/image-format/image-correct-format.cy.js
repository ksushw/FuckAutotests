const targetUrl = Cypress.env('targetUrl');

describe('Проверка форматов изображений', function () {
  it('На странице не должно быть изображений в форматах .jpg, .png, .jpeg, конвертируй в .webp', function () {
    cy.visit(targetUrl);

    // Проверяем <img>, если они есть
    cy.get('img', {timeout: 0}).then(($imgs) => {
      if ($imgs.length > 0) {
        cy.wrap($imgs).each(($img) => {
          const src = $img.attr('src');

          if (src) {
            expect(src).not.to.match(
              /\.(jpg|jpeg|png)(\?.*)?$/,
              `Недопустимый формат изображения: ${src}`
            );
          }
        });
      }
    });

    // Проверяем <source>, если они есть
    cy.get('source', {timeout: 0}).then(($sources) => {
      if ($sources.length > 0) {
        cy.wrap($sources).each(($source) => {
          const srcset = $source.attr('srcset');

          if (srcset) {
            const sources = srcset.split(',').map((src) => src.trim().split(' ')[0]);
            sources.forEach((src) => {
              expect(src).not.to.match(
                /\.(jpg|jpeg|png)(\?.*)?$/,
                `Недопустимый формат ресурса: ${src}`
              );
            });
          }
        });
      }
    });
  });
});
