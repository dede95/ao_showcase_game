const containerCursorAbout = document.querySelector('.about-interaction');
const cursorAbout = document.querySelector('#custom-cursor-about');

const containerCursorWhy = document.querySelector('.why-interaction')
const cursorWhy = document.querySelector('#custom-cursor-why');

function moveElement(event, container_, cursor_) {
    // Grab the container area
    const containerRect = container_.getBoundingClientRect();

    // create coordinates for inside the containers
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    // Check if mous is inside container and set element poisition to follow the mouse
    if (mouseX >= 0 && mouseX <= containerRect.width && mouseY >= 0 && mouseY <= containerRect.height) {
        cursor_.style.transform = 'translate(' + (mouseX - cursor_.offsetWidth / 2) + 'px, ' + (mouseY - cursor_.offsetHeight / 2) + 'px)';
    }
};

// Create wrapper functions to parse in containers 

function wrapperFunctionAbout(e) { 
    moveElement(e, containerCursorAbout, cursorAbout); //parsing container into function
}

function wrapperFunctionWhy(e) { 
    moveElement(e, containerCursorWhy, cursorWhy); //parsing container into function
}


// Execute functions 
containerCursorAbout.addEventListener('mousemove', wrapperFunctionAbout);

containerCursorWhy.addEventListener('mousemove', wrapperFunctionWhy);
