const targetUrl = Cypress.env('targetUrl');

function containsEmptyUrl(content) {
  const emptyUrlPatterns = ['url("")', "url('')", 'url()'];
  return emptyUrlPatterns.some((pattern) => content.includes(pattern));
}

describe('Проверка отсутствия пустых url("") в файлах', function () {
  it('HTML-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.document().then((doc) => {
      const htmlContent = doc.documentElement.outerHTML;

      if (containsEmptyUrl(htmlContent)) {
        throw new Error('В HTML найдены пустые url("").');
      }
    });
  });

  it('CSS-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('link[rel="stylesheet"]').each(($link) => {
      const href = $link.attr('href');
      if (href) {
        cy.request({
          url: href,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status === 200) {
            const cssContent = response.body;
            if (typeof cssContent === 'string' && containsEmptyUrl(cssContent)) {
              throw new Error(`В CSS-файле ${href} найдены пустые url("").`);
            }
          } else {
            cy.log(`Не удалось получить доступ к CSS-файлу ${href}, статус: ${response.status}`);
          }
        });
      }
    });
  });

  it('JS-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('script[src]').each(($script) => {
      const src = $script.attr('src');
      if (src) {
        cy.request({
          url: src,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status === 200) {
            const jsContent = response.body;
            if (typeof jsContent === 'string' && containsEmptyUrl(jsContent)) {
              throw new Error(`В JS-файле ${src} найдены пустые url("").`);
            }
          } else {
            cy.log(`Не удалось получить доступ к JS-файлу ${src}, статус: ${response.status}`);
          }
        });
      }
    });
  });

  it('Встроенные стили не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('style').each(($style) => {
      const styleContent = $style.text();
      if (containsEmptyUrl(styleContent)) {
        throw new Error('Во встроенных стилях найдены пустые url("").');
      }
    });
  });

  it('Инлайн-стили не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('[style]').each(($el) => {
      const styleAttr = $el.attr('style');
      if (styleAttr && containsEmptyUrl(styleAttr)) {
        throw new Error('В инлайн-стилях найдены пустые url("").');
      }
    });
  });
});
