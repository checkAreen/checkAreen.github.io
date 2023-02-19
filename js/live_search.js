window.addEventListener('load', function(){
    let input = document.querySelector('.header__form');
    input.value = '';
    
    input.oninput = function(){
        let val = this.value.toLocaleLowerCase().trim();
        let onHoldTasks = document.querySelectorAll('.onhold__list-item');
        let completedTasks = document.querySelectorAll('.completed__list-item');

        if(val){
            onHoldTasks.forEach(i => {
                if(i.childNodes[0].childNodes[0].textContent.toLocaleLowerCase().search(val) == -1){
                    i.classList.add('hide');
                }
            });

            completedTasks.forEach(i => {
                console.log(i);
                if(i.childNodes[0].childNodes[0].textContent.toLocaleLowerCase().search(val) == -1){
                    i.classList.add('hide');
                }
            })
        } else {
            onHoldTasks.forEach(i => {
                i.classList.remove('hide');
            })
            completedTasks.forEach(i => {
                i.classList.remove('hide');
            })
        }
    }
});