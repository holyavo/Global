import {findingActiveLink} from './navigation.js'

let leftBtn = document.querySelector('.slider-btn--left')
let rightBtn = document.querySelector('.slider-btn--right')
let workCards = document.querySelectorAll('.works__wrapper .work')
let worksWrapper = document.querySelector('.works__wrapper')


leftBtn.addEventListener('click', function(e){

    let activeWork = findingActiveLink(workCards, 'active-work')
    let previousWork = activeWork.previousElementSibling || workCards[workCards.length - 1] 

    fadeInOutAnimation(activeWork, previousWork, false)

})

rightBtn.addEventListener('click', function(){
    
    let activeWork = findingActiveLink(workCards, 'active-work')
    let nextWork = activeWork.nextElementSibling || workCards[0] 

    fadeInOutAnimation(activeWork, nextWork, true)
})




function fadeInOutAnimation(activeWork, work, directon){

    worksWrapper.classList.add('works--fadeIn')

    setTimeout(() =>{
        activeWork.classList.remove('active-work')
        work.classList.add('active-work')

        swapDiv(activeWork.parentNode, directon)

        setTimeout(() =>{
            worksWrapper.classList.remove('works--fadeIn')
            
        }, 900)

    }, 800)
}

function swapDiv(parent, rightBtn) {
    if(rightBtn){
        parent.insertBefore(parent.children[1], parent.children[0])
        parent.insertBefore(parent.children[2], parent.children[1])
    }else{
        parent.insertBefore(parent.children[1], parent.children[2])
        parent.insertBefore(parent.children[2], parent.children[0])
    }
  }