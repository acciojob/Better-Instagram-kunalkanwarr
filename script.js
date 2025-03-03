describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('index.html'); // Make sure this is the correct path to your HTML file
  });

  it('All drag exists:', () => {
    for (let i = 1; i <= 6; i++) {
      cy.get(`#div${i}`).should('exist'); // Verify all divs exist
    }
  });

  function performDragAndDrop(dragElement, dropElement) {
    cy.get(dragElement).then(($el) => {
      const source = $el[0];
      cy.get(dropElement).then(($target) => {
        const target = $target[0];

        if (!source || !target) {
          throw new Error('Source or target element not found!');
        }

        const dataTransfer = new DataTransfer();
        function dispatchEvent(element, eventType, dataTransfer) {
          const event = new DragEvent(eventType, {
            bubbles: true,
            cancelable: true,
            dataTransfer,
          });
          element.dispatchEvent(event);
        }

        dispatchEvent(source, 'dragstart', dataTransfer);
        dispatchEvent(target, 'dragenter', dataTransfer);
        dispatchEvent(target, 'dragover', dataTransfer);
        dispatchEvent(target, 'drop', dataTransfer);
        dispatchEvent(source, 'dragend', dataTransfer);
      });
    });
  }

  it('Drag and drop 3rd image on 6th:', () => {
    performDragAndDrop('#div3', '#div6');
  });

  it('Drag and drop 1st image 5th:', () => {
    performDragAndDrop('#div1', '#div5');
  });

  it('Drag and drop 4th image on 2nd:', () => {
    performDragAndDrop('#div4', '#div2');
  });

  it('Drag and drop 2nd image on 3rd:', () => {
    performDragAndDrop('#div2', '#div3');
  });

  it('Drag and drop 5th image on 3rd:', () => {
    performDragAndDrop('#div5', '#div3');
  });

  it('Drag and drop 6th image on 1st:', () => {
    performDragAndDrop('#div6', '#div1');
  });
});
