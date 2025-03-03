const imageBoxes = document.querySelectorAll('.image-box');
let draggedElement = null;

imageBoxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', drop);
    box.addEventListener('dragend', dragEnd); // Add dragend event listener
});

function dragStart(e) {
    draggedElement = this;
    this.classList.add('dragging'); // Add class for styling
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    if (this !== draggedElement) {
        // Swap background images
        const draggedBg = window.getComputedStyle(draggedElement).backgroundImage;
        const dropBg = window.getComputedStyle(this).backgroundImage;

        draggedElement.style.backgroundImage = dropBg;
        this.style.backgroundImage = draggedBg;
    }
}

function dragEnd() {
    this.classList.remove('dragging'); // Remove class after dragging
    draggedElement = null; // Reset draggedElement
}
