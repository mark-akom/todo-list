// Create the header section of the webpage
function createTopBar() {
    const headerDiv = document.createElement('div');
    const heading = document.createElement('h1');

    heading.textContent = 'Simplr';
    heading.classList.add('app-heading');

    headerDiv.classList.add('app-header');

    headerDiv.appendChild(heading);
    return headerDiv;
}

export default createTopBar;