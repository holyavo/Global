let checkboxes = document.querySelectorAll('.form__checkbox-container label')
let input = document.querySelectorAll('.form__fields-container input')



checkboxes.forEach(function(el){

    el.addEventListener('click', function(){
        this.classList.toggle('active-checkbox')
    })
})

input.forEach(function(el){
    
    el.addEventListener('keyup', function(){
        if(el.value != ''){
            el.parentNode.children[1].style.cssText = 'animation-play-state: paused;'
        }
    })
})