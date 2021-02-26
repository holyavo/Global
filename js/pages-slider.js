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