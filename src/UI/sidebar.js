function createSideBar() {
    // create all elements with their classess
    const sideBarDiv = document.createElement('div');
    sideBarDiv.classList.add('app-sidebar');
    const navLinksUl = document.createElement('ul');
    navLinksUl.classList.add('nav-links');
    const linkList = ['Home', 'Projects'];
    linkList.forEach(linkName => {
        const link = document.createElement('li');
        link.textContent = linkName;
        navLinksUl.appendChild(link);
    })
    sideBarDiv.appendChild(navLinksUl);
    return sideBarDiv;
}

export default createSideBar;