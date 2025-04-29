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
        cy.request(href).then((response) => {
          const cssContent = response.body;
          if (typeof cssContent === 'string' && containsEmptyUrl(cssContent)) {
            throw new Error(`В CSS-файле ${href} найдены пустые url("").`);
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
        cy.request(src).then((response) => {
          const jsContent = response.body;
          if (typeof jsContent === 'string' && containsEmptyUrl(jsContent)) {
            throw new Error(`В JS-файле ${src} найдены пустые url("").`);
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
