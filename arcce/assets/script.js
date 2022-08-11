const openModal = (item) => {
    item.style.display = 'flex';
};

const closeModal = (item) => {
    item.style.display = 'none';
};

const openGallery = (item) => {
    item.style.display = 'grid';
    let firstThumbnail = item
        .querySelectorAll('div')[1]
        .querySelectorAll('img')[0];

    firstThumbnail.classList.add('active');
};

const closeGallery = (item) => {
    item.style.display = 'none';
};

const service = (buttonClicked) => {
    let currentService = document.getElementById(
        'modal-service-' + buttonClicked.slice(-1)
    );

    if (buttonClicked.includes('open')) {
        openModal(currentService);
    }

    if (buttonClicked.includes('close')) {
        closeModal(currentService);
    }
};

const project = (buttonClicked) => {
    let projectCount = buttonClicked.slice(-1);

    let currentProject = document.getElementById(
        'project-gallery-' + projectCount
    );

    if (buttonClicked.includes('project-gallery-btn')) {
        openGallery(currentProject);
        document
            .getElementById('project-' + projectCount + '-thumbnail-1')
            .setAttribute('checked', 'checked');
    }
    if (buttonClicked.includes('project-gallery-close'))
        closeGallery(currentProject);
};

const toggleMenu = () => {
    let menu = document.getElementById('main-menu');
    let menuStyle = window.getComputedStyle(menu)['display'];
    let burger = document.getElementById('burger');

    if (menuStyle == 'grid') {
        menu.style.display = 'none';
        burger.style.color = '#002359';
    } else {
        menu.style.display = 'grid';
        burger.style.color = '#ff5e15';
    }
};

window.onclick = (clickedItem) => {
    let clickedItemID = clickedItem.srcElement.id;
    let menu = document.getElementById('main-menu');

    // document.getElementById('project-4-image-1').classList.add('is-active');

    if (clickedItemID.includes('service')) service(clickedItemID);
    if (clickedItemID.includes('project-gallery')) project(clickedItemID);
    if (clickedItemID.includes('burger')) toggleMenu();
};
