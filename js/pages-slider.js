import {findingActiveLink} from './navigation.js'


export let pages = document.querySelectorAll('.content li > section')

let activePage = findingActiveLink(pages, 'active-page')
let bg = document.querySelector('.bg')

export function changePage(pageName, page){

    let activePage = findingActiveLink(pages, 'active-page')


    activePage.classList.add('page--fi')
    bg.classList.add('page--fi')

    setTimeout(() =>{
        activePage.classList.remove('active-page')
        activePage.classList.remove('page--fi')
        bg.classList.remove('page--fi')
        
        if(page != undefined){
            //Animation by scrolling
            page.classList.add('active-page')

            //Adding background to contact page
            addingBackground(page, bg)

        }else{
            //Animation by clicking links
            let nextPage = null
      
            for(let el of pages){
                if(pageName == el.getAttribute('id') ){
                    nextPage = el
                }
            }
            //Adding background to contact page
            addingBackground(nextPage, bg)
             
            nextPage.classList.add('active-page')
        }
    }, 350)

}

function addingBackground(page, bg){
    
    if(page.getAttribute('id') == 'Contact'){
        bg.classList.add('bg-active')
    }else{
        bg.classList.remove('bg-active')
    }
}

swipingPages()

//Swiping pages on phones
function swipingPages(){
    let wrap = document.querySelector('.wrapper')
    let y = null
    let x = null

    wrap.addEventListener('touchstart', e => {
        y = e.touches[0].pageY
        x = e.touches[0].pageX
    });
    wrap.addEventListener('touchmove', e => {

        if (!y) return;

        let activePage = findingActiveLink(pages, 'active-page')

        if(e.touches[0].pageY > y){
            console.log(e.touches[0].pageY > y && ((e.touches[0].pageX + x) < -1000))
            let previousPage = activePage.parentNode.previousElementSibling?.children[0] || pages[pages.length-1]
            changePage(null, previousPage)
        }else{

            let nextPage = activePage.parentNode.nextElementSibling?.children[0] || pages[0]
            changePage(null, nextPage)

        }

        y = null;
    });
}



