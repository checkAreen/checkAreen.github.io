// !VARS
const body = document.querySelector('body');
const tasksAmount = document.querySelector('.header__title-span');
const onHoldBlock = document.querySelector('.onhold__inner');
const onHoldTitle = document.createElement('h2');
const onHoldList = document.createElement('ul');
const completedBlock = document.querySelector('.completed__inner');
const completeTitle = document.createElement('h2');
const completedList = document.createElement('ul');
const addNewBtn = document.getElementById('addNewTask');
let activeTasks = [];
let completedTasks = [];
let activeAmount = 0;

tasksAmount.textContent = `${activeAmount} tasks`;

// !MODIFYING ELEMENTS
onHoldList.classList.add('onhold__list');
onHoldTitle.classList.add('onhold__title');
onHoldTitle.textContent = 'On Hold';
onHoldBlock.appendChild(onHoldTitle);
onHoldBlock.appendChild(onHoldList);
completedBlock.classList.add('elastic');
completeTitle.classList.add('completed__title');
completeTitle.textContent = 'Completed';
completedBlock.appendChild(completeTitle);


// !EVENTS
onHoldBlock.addEventListener('click', showHiddenText);
onHoldBlock.addEventListener('click', showHiddenMenu);
onHoldBlock.addEventListener('click', startPauseTask);
onHoldBlock.addEventListener('click', completeTask);
onHoldBlock.addEventListener('click', deleteActiveTask);
completedBlock.addEventListener('click', showHiddenText);
completedBlock.addEventListener('click', deleteCompletedTask);
addNewBtn.addEventListener('click', openModalWindow);
body.addEventListener('click', closeModalWindow);
body.addEventListener('submit', submitNewTask);

// !FUNCTIONS
(activeTasks.length === 0) ? noActiveTasks() : renderOnHoldTasks(activeTasks);
renderCompletedTasks(completedTasks);

function howMuchActiveTasks(){
    if(localStorage.length === 1) {
        noActiveTasks();
    } else {
        const noOnHoldTasksMessage = document.querySelector('.no-onhold-tasks');
        if(onHoldBlock.contains(noOnHoldTasksMessage)){
            onHoldBlock.removeChild(noOnHoldTasksMessage);
        }
    }

    tasksAmount.textContent = `${localStorage.length - 1} tasks`
}

function noActiveTasks(){
    const noOnHoldTasksMessage = document.createElement('p');
    noOnHoldTasksMessage.classList.add('no-onhold-tasks');
    noOnHoldTasksMessage.textContent = 'There are no  active tasks today yet ...';
    noOnHoldTasksMessage.style.margin = '100px auto';
    noOnHoldTasksMessage.style.fontFamily = 'Montserrat, sans-serif';
    noOnHoldTasksMessage.style.fontWeight = 700;
    noOnHoldTasksMessage.style.fontSize = '30px';
    return onHoldBlock.appendChild(noOnHoldTasksMessage);
}

for(let i = 1; i <= localStorage.length; i++){
    const arrTask = [];
    let tempItem = JSON.parse(localStorage.getItem(`${i}`));
    if(tempItem){
        arrTask.push(tempItem);

        renderOnHoldTasks(arrTask);

        howMuchActiveTasks();
    }
}

if(!onHoldList.hasChildNodes()){
    let countStorage = localStorage.setItem('count', 1);
}

function renderOnHoldTasks(activeTasks){
    
    activeTasks.forEach(i => {
            const {name, status, eta, text} = i;
            const onHoldItem = document.createElement('li');
            onHoldItem.classList.add('onhold__list-item');
            // visible part
            const visiblePart = document.createElement('div');
            visiblePart.classList.add('list__item-visible');
            const itemTitle = document.createElement('h2');
            itemTitle.classList.add('list__item-title');
            itemTitle.textContent = name;
            const itemStatus = document.createElement('div');
            itemStatus.classList.add('list__item-status', `status-${status.toLowerCase()}`);
            itemStatus.textContent = status;
            const itemEta = document.createElement('div');
            itemEta.classList.add('list__item-eta', `eta-${eta.toLowerCase()}`);
            itemEta.textContent = eta;
            const showMenuBtn = document.createElement('button');
            showMenuBtn.classList.add('list__item-buttons');
            showMenuBtn.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
            const hiddenMenu = buildingHiddenMenu();
            visiblePart.appendChild(itemTitle);
            visiblePart.appendChild(itemStatus);
            visiblePart.appendChild(itemEta);
            visiblePart.appendChild(showMenuBtn);
            visiblePart.appendChild(hiddenMenu);
            onHoldItem.appendChild(visiblePart);
            // hidden part
            const hiddenText= document.createElement('div');
            hiddenText.classList.add('list__item-hiddentext');
            hiddenText.textContent = text;
            onHoldItem.appendChild(hiddenText);

            onHoldList.insertAdjacentElement('afterbegin', onHoldItem);
    });
}

function renderCompletedTasks(completedTasks){
    completedTasks.forEach(i => {
        const{name, status, eta, text} = i;
        const completedItem = document.createElement('li');
        completedItem.classList.add('completed__list-item');
        // visible part
        const visiblePart = document.createElement('div');
        visiblePart.classList.add('list__item-visible');
        const itemTitle = document.createElement('h2');
        itemTitle.classList.add('list__item-title', 'title-completed');
        itemTitle.textContent = name;
        visiblePart.appendChild(itemTitle);
        const itemStatus = document.createElement('div');
        itemStatus.classList.add('list__item-status', 'status-completed');
        itemStatus.textContent = status;
        const itemEta = document.createElement('div');
        itemEta.classList.add('list__item-eta', `eta-${eta.toLowerCase()}`);
        itemEta.textContent = eta;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('menu__hidden-delete');
        deleteBtn.textContent = 'Delete';
        visiblePart.appendChild(itemTitle);
        visiblePart.appendChild(itemStatus);
        visiblePart.appendChild(itemEta);
        visiblePart.appendChild(deleteBtn);
        completedItem.appendChild(visiblePart);
        // hidden part of task
        const hiddenText = document.createElement('div');
        hiddenText.classList.add('list__item-hiddentext');
        hiddenText.textContent = text;
        completedItem.appendChild(hiddenText);

        completedList.appendChild(completedItem);

        completedBlock.appendChild(completedList);
    })
}

function buildingHiddenMenu(){
    const hiddenMenu = document.createElement('ul');
    hiddenMenu.classList.add('list__hidden-menu');
    hiddenMenu.setAttribute('id', 'hiddenmenu');
    const firstButton = document.createElement('li');
    firstButton.classList.add('hidden__menu-item');
    const startStopBtn = document.createElement('button');
    startStopBtn.setAttribute('id', 'startStopButton');
    startStopBtn.textContent = 'Start/Pause';
    firstButton.appendChild(startStopBtn);
    const secondButton = document.createElement('li');
    secondButton.classList.add('hidden__menu-item');
    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('id', 'completeButton');
    completeBtn.textContent = 'Complete';
    secondButton.appendChild(completeBtn);
    const thirdButton = document.createElement('li');
    thirdButton.classList.add('hidden__menu-item');
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.setAttribute('id', 'deleteButton');
    deleteTaskBtn.textContent = 'Delete';
    thirdButton.appendChild(deleteTaskBtn);
    hiddenMenu.appendChild(firstButton);
    hiddenMenu.appendChild(secondButton);
    hiddenMenu.appendChild(thirdButton);
    return hiddenMenu;
}
function showHiddenText({target}){
    if(target.classList.contains('list__item-title')){
        const hiddenText = target.parentNode.nextElementSibling;
        hiddenText.classList.toggle('show-hiddentext');
    }
}

function showHiddenMenu({target}){
    // press the button
    if(target.classList.contains('list__item-buttons')){
        const iconButton = target.children[0];
        iconButton.classList.toggle('item__buttons-active');
        const hiddenMenu = target.nextElementSibling;
        hiddenMenu.classList.toggle('show__hidden-menu');
        const mainItem = target.parentNode.parentNode;
        mainItem.classList.toggle('onhold__item-high');
    }
    // press the icon inside the button
    if(target.classList.contains('fa-ellipsis-vertical')){
        target.classList.toggle('item__buttons-active');
        const hiddenMenu = target.parentNode.nextElementSibling;
        hiddenMenu.classList.toggle('show__hidden-menu');
        const mainItem = target.parentNode.parentNode.parentNode;
        mainItem.classList.toggle('onhold__item-high');
    }
}
function hideMenu(){
    const openedMenu = document.querySelector('.show__hidden-menu');
    const mainItem = openedMenu.parentNode.parentNode;
    mainItem.classList.toggle('onhold__item-high');
    const iconButton = openedMenu.previousElementSibling.childNodes[0];
    iconButton.classList.toggle('item__buttons-active');
    openedMenu.classList.toggle('show__hidden-menu');
}

function startPauseTask({target}){
    if(target.getAttribute('id') === 'startStopButton'){
        const mainItem = target.parentNode.parentNode.parentNode.parentNode;
        const currentStatus = mainItem.childNodes[0].childNodes[1];
        if(currentStatus.classList.contains('status-pending')){
            currentStatus.classList.remove('status-pending');
            currentStatus.classList.add('status-in-progress');
            currentStatus.textContent = 'In-Progress';
            hideMenu()
        } else {
            currentStatus.classList.remove('status-in-progress');
            currentStatus.classList.add('status-pending');
            currentStatus.textContent = 'Pending';
            hideMenu()
        }
    }
}

function completeTask({target}){
    if(target.getAttribute('id') === 'completeButton'){
        const taskTitle = target.parentNode.parentNode
        .previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.textContent;
        const isConfirm = confirm(
            `Did you complete "${taskTitle}" task?`
        );
        if(isConfirm){
            const mainItem = target.parentNode.parentNode.parentNode.parentNode;
            const itemTitle = target.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.textContent;
            const itemEta = target.parentNode.parentNode.previousElementSibling.previousElementSibling.textContent;
            const itemText = target.parentNode.parentNode.parentNode.parentNode.childNodes[1].textContent;
            const arrTask = []
            const itemObj = {
                name: itemTitle,
                status: 'Completed',
                eta: itemEta,
                text: itemText
            };
            arrTask.push(itemObj);
            renderCompletedTasks(arrTask);
            onHoldList.removeChild(mainItem)

            for(let i = 1; i <= localStorage.length; i++){
                let tempItem = JSON.parse(localStorage.getItem(`${i}`));
                if(tempItem){
                    if(tempItem.name === taskTitle){
                        localStorage.removeItem(`${i}`);
                        
                        let newCount = +(localStorage.getItem('count'));
                        newCount--;
                        localStorage.setItem('count', newCount);
                    }
                }

                howMuchActiveTasks();
            }
        }
    }
}

function deleteActiveTask({target}){        
    if(target.getAttribute('id') === 'deleteButton'){
        const taskTitle = target.parentNode.parentNode
        .previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.textContent;
        const mainItem = target.parentNode.parentNode.parentNode.parentNode;
        const isConfirm = confirm(
            `Are you sure you want to delete "${taskTitle}" task?`
        )
        if(isConfirm){
            onHoldList.removeChild(mainItem);

            for(let i = 0; i <= localStorage.length; i++){
                let tempItem = JSON.parse(localStorage.getItem(`${i}`));
                if(tempItem){
                    if(tempItem.name === taskTitle){
                        localStorage.removeItem(`${i}`);
                        
                        let newCount = +(localStorage.getItem('count'));
                        newCount--;
                        localStorage.setItem('count', newCount);
    
                        howMuchActiveTasks();
                    }
                }
            }

            activeAmount--;
        } else {
            hideMenu();
        }
    }
}
function deleteCompletedTask({target}){
    if(target.classList.contains('menu__hidden-delete')){
        const parentItem = target.parentNode.parentNode;
        const taskTitle = target.previousElementSibling.previousElementSibling.previousElementSibling;
        const isConfirm = confirm(
            `Are you sure you want to delete "${taskTitle}" task?`
        )
        if(isConfirm){
            completedList.removeChild(parentItem);
        } else {
            return;
        }
    }
}

function openModalWindow(){
    body.style.background = 'rgba(0, 0, 0, .5)';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
    const input = document.querySelector('.header__form');
    input.style.background = 'rgba(130, 129, 129, 0.5)';
    const hiddenMenuButtons = document.querySelectorAll('.list__item-buttons');
    for(let i = 0; i < hiddenMenuButtons.length; i++){
        hiddenMenuButtons[i].style.background = 'rgba(115, 113, 113, 0.5)';
        hiddenMenuButtons[i].children[0].style.color = 'rgba(115, 113, 113, 0.5)';
    }
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalTitle = document.createElement('h1');
    modalTitle.textContent = 'Add New Task:';
    modalTitle.classList.add('modal__title');
    modal.appendChild(modalTitle);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modal.appendChild(closeBtn);

    const modalForm = document.createElement('form');
    modalForm.classList.add('modal__form');
    modalForm.setAttribute('name', 'addTask');

    const modalFormInputTitle = document.createElement('input');
    modalFormInputTitle.classList.add('modal__input', 'input-title');
    modalFormInputTitle.setAttribute("name", "title");
    modalFormInputTitle.setAttribute("placeholder", "Type the title ...");
    modalForm.appendChild(modalFormInputTitle);

    const modalFormInputText = document.createElement('input');
    modalFormInputText.classList.add('modal__input', 'input-text');
    modalFormInputText.setAttribute("name", "text");
    modalFormInputText.setAttribute("placeholder", "Type the text ...");
    modalForm.appendChild(modalFormInputText);
    modal.appendChild(modalForm);

    const chooseEta = document.createElement('fieldset');
    chooseEta.classList.add('modal__eta');

    const etaTitle = document.createElement('legend');
    etaTitle.classList.add('modal__eta-title');
    etaTitle.textContent = 'Select ETA';
    chooseEta.appendChild(etaTitle);

    const etaMinor = document.createElement('div');
    const etaMinorInput = document.createElement('input');
    etaMinorInput.classList.add('choose__radio', 'radio-minor');
    etaMinorInput.setAttribute('type', 'radio');
    etaMinorInput.setAttribute('id', 'minor');
    etaMinorInput.setAttribute('name', 'eta');
    etaMinorInput.setAttribute('value', 'Minor');
    const etaMinorLabel = document.createElement('label');
    etaMinorLabel.setAttribute('for', 'minor');
    etaMinorLabel.textContent = 'Minor';
    etaMinor.appendChild(etaMinorInput);
    etaMinor.appendChild(etaMinorLabel);
    chooseEta.appendChild(etaMinor);

    const etaNormal = document.createElement('div');
    const etaNormalInput = document.createElement('input');
    etaNormalInput.classList.add('choose__radio', 'radio-normal');
    etaNormalInput.setAttribute('type', 'radio');
    etaNormalInput.setAttribute('id', 'normal');
    etaNormalInput.setAttribute('name', 'eta');
    etaNormalInput.setAttribute('value', 'Normal');
    const etaNormalLabel = document.createElement('label');
    etaNormalLabel.setAttribute('for', 'normal');
    etaNormalLabel.textContent = 'Normal';
    etaNormal.appendChild(etaNormalInput);
    etaNormal.appendChild(etaNormalLabel);
    chooseEta.appendChild(etaNormal);

    const etaAsap = document.createElement('div');
    const etaAsapInput = document.createElement('input');
    etaAsapInput.classList.add('choose__radio', 'radio-asap');
    etaAsapInput.setAttribute('type', 'radio');
    etaAsapInput.setAttribute('id', 'asap');
    etaAsapInput.setAttribute('name', 'eta');
    etaAsapInput.setAttribute('value', 'ASAP');
    const etaAsapLabel = document.createElement('label');
    etaAsapLabel.setAttribute('for', 'asap');
    etaAsapLabel.textContent = 'ASAP';
    etaAsap.appendChild(etaAsapInput);
    etaAsap.appendChild(etaAsapLabel);
    chooseEta.appendChild(etaAsap);

    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.classList.add('modal__submit');
    modalForm.appendChild(chooseEta);
    modalForm.appendChild(submitBtn);
    body.appendChild(modal);
}

function closeModalWindow({target}){
    if(target.classList.contains('fa-xmark')){
        body.removeChild(target.parentNode.parentNode);
        body.style.background = 'transparent';
        body.style.height = 'auto';
        body.style.overflow = 'auto';
        const input = document.querySelector('.header__form');
        input.style.background = 'transparent';
        const hiddenMenuButtons = document.querySelectorAll('.list__item-buttons');
        for(let i = 0; i < hiddenMenuButtons.length; i++){
            hiddenMenuButtons[i].style.background = 'rgba(242, 242, 242, 1)';
            hiddenMenuButtons[i].children[0].style.color = 'rgba(220, 217, 217, 1)';
        }
    }
}

function submitNewTask(e){
    e.preventDefault();
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'].value;
    const inputText = form.elements['text'].value;
    const radioEta = form.elements['eta'].value;
    const task = {
        name: inputTitle,
        status: 'Pending',
        eta: radioEta,
        text: inputText
    };
    // save to local storage
    let newCount = +(localStorage.getItem('count'));
    localStorage.setItem(`${newCount}`, JSON.stringify(task));
    newCount++;
    localStorage.setItem('count', newCount);

    const arrTask = [];
    arrTask.push(task);
    activeTasks.push(task)
    renderOnHoldTasks(arrTask);
    activeAmount++;
    tasksAmount.textContent = `${activeAmount} tasks`;
    const modal = form.parentNode;
    // closing the modal window
    body.removeChild(modal);
    body.style.background = 'transparent';
    body.style.height = 'auto';
    body.style.overflow = 'auto';
    const input = document.querySelector('.header__form');
    input.style.background = 'transparent';
    const hiddenMenuButtons = document.querySelectorAll('.list__item-buttons');
    for(let i = 0; i < hiddenMenuButtons.length; i++){
        hiddenMenuButtons[i].style.background = 'rgba(242, 242, 242, 1)';
        hiddenMenuButtons[i].children[0].style.color = 'rgba(220, 217, 217, 1)';
    }
    howMuchActiveTasks();
}