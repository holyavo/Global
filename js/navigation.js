import {changePage, pages} from './pages-slider.js'

let navigationButton = document.getElementsByClassName('navigation-button')[0]
let wrapper = document.getElementsByClassName('wrapper')[0]
let navigation = document.getElementsByClassName('navigation')[0]
let navigationLinks = document.querySelectorAll('.navigation li')
let cover = document.querySelector('.c')
let hireBtn = document.querySelectorAll('.btn')


let sidebarLinks = document.querySelectorAll('.navigation-bar li')
let counter = 0

window.addEventListener('wheel', function(e){
    
    if(!cover.classList.contains('cover')){

        ++counter
        if(counter == 1 ){
            changingActiveLinksByScrolling(e)
            setTimeout(() => {
                counter = 0
            }, 1000)
        }
    }else{
        ;
    }
})

navigationButton.addEventListener('click', function(){
    wrapper.classList.add('active-wrapper')
    navigation.classList.add('navigation--show')
    cover.classList.add('cover')
})

cover.addEventListener('click', function(){
    wrapper.classList.remove('active-wrapper')
    cover.classList.remove('cover')
    navigation.classList.remove('navigation--show')
})

sidebarLinks.forEach((el) =>{
    if(!el.hasAttribute('class')){
        el.lastChild.textContent = el.getAttribute('data-value-number')
    }else{
        el.firstChild.textContent = el.getAttribute('data-value-number')
    }
})




menu()
sideBar()

// Menu navigation
function menu(){
    navigationLinks.forEach((el) => {
        el.addEventListener('click', function(){
            let activeLink = findingActiveLink(navigationLinks, 'active-navlink')
    
            wrapper.classList.remove('active-wrapper')
            navigation.classList.remove('navigation--show')
            cover.classList.remove('cover')
    
            activeLink.classList.remove('active-navlink')
            this.classList.add('active-navlink')
    
            //Linking with sidebar
            let prevLink = null
            let currentLink = null
    
            sidebarLinks.forEach((el) =>{
                if(el.classList.contains('active-link')){
                    prevLink = el
                }else{
                   ;
                }
                if(el.getAttribute('data-value-name') == this.firstChild.textContent){
                    currentLink = el
                }
            })
    
            let dataValueNumber = currentLink.getAttribute('data-value-number')
            let dataValueName = currentLink.getAttribute('data-value-name')
    
            prevLink.classList.remove('active-link')
            prevLink.lastChild.textContent = prevLink.getAttribute('data-value-number')
            prevLink.firstChild.textContent = ''
    
            currentLink.classList.add('active-link')
            currentLink.firstChild.textContent = dataValueNumber
            currentLink.lastChild.textContent = dataValueName

            
            changePage(dataValueName)
            hidingHeaderBtn(currentLink)

        })
    })
}

//Sidebar 
function sideBar(){
    sidebarLinks.forEach((el) => {
        el.addEventListener('click', function(){
            let dataValueNumber = this.getAttribute('data-value-number')
            let dataValueName = this.getAttribute('data-value-name')
            let activeLink = findingActiveLink(sidebarLinks, 'active-link')

            //Processing founded link
            activeLink.classList.remove('active-link')
            activeLink.lastChild.textContent = activeLink.getAttribute('data-value-number')
            activeLink.firstChild.textContent = ''
            //Processing current link
            this.classList.add('active-link')
            this.firstChild.textContent = dataValueNumber
            this.lastChild.textContent = dataValueName
    
    
            //Linking with navigation
            let prevLink = null
            let currentLink = null
            //Finding active link
            navigationLinks.forEach((el) => {
                if(el.classList.contains('active-navlink')){
                    prevLink = el
                }else{
                   ;
                }
                if(dataValueName == el.firstChild.textContent){
                    currentLink = el
                }
            })
    
            prevLink.classList.remove('active-navlink')
            currentLink.classList.add('active-navlink')


            changePage(dataValueName)
            hidingHeaderBtn(this)
        })
    })
} 

export function findingActiveLink(links, className){
    let previouseLink = null

    links.forEach((el) => {
        if(el.classList.contains(className)){
            previouseLink = el
        }else{
           ;
        }
    })

    return previouseLink
}


function changingActiveLinksByScrolling(event){

    let activeLink_sideBar = findingActiveLink(sidebarLinks, 'active-link')
    let activeLink_menu = findingActiveLink(navigationLinks, 'active-navlink')
    let activePage = findingActiveLink(pages, 'active-page')

    if(event.deltaY > 0){

        let nextLink_sideBar = activeLink_sideBar.nextElementSibling || sidebarLinks[0]
        let nextLink_menu = activeLink_menu.nextElementSibling || navigationLinks[0]
        let nextPage = activePage.parentNode.nextElementSibling?.children[0] || pages[0]

        scrollingLinks(activeLink_sideBar, activeLink_menu, nextLink_sideBar, nextLink_menu, activePage, nextPage)
        hidingHeaderBtn(nextLink_sideBar)
        
    }else{

        let previousLink_sideBar = activeLink_sideBar.previousElementSibling || sidebarLinks[sidebarLinks.length-1]
        let previousLink_menu = activeLink_menu.previousElementSibling || navigationLinks[navigationLinks.length-1]
        let previousPage = activePage.parentNode.previousElementSibling?.children[0] || pages[pages.length-1]

        scrollingLinks(activeLink_sideBar,activeLink_menu, previousLink_sideBar, previousLink_menu, activePage, previousPage)
        hidingHeaderBtn(previousLink_sideBar)
    }
}

function scrollingLinks(activeLink_sideBar,activeLink_menu, link_sideBar, link_menu, activePage, page){

    let dataValueNumber = link_sideBar.getAttribute('data-value-number')
    let dataValueName = link_sideBar.getAttribute('data-value-name')

    //Processing founded sideBar links
    activeLink_sideBar.classList.remove('active-link')
    activeLink_sideBar.lastChild.textContent = activeLink_sideBar.getAttribute('data-value-number')
    activeLink_sideBar.firstChild.textContent = ''
    
    link_sideBar.classList.add('active-link')
    link_sideBar.firstChild.textContent = dataValueNumber
    link_sideBar.lastChild.textContent = dataValueName


    //Processing menu links
    activeLink_menu.classList.remove('active-navlink')
    link_menu.classList.add('active-navlink')

    //Processing pages
    changePage(null, page)

}

//Jumping to hire page
hireBtn.forEach((el) =>{
    el.addEventListener('click', function(){
        let activePage = findingActiveLink(pages, 'active-page')
        let activeLink_sb = findingActiveLink(sidebarLinks, 'active-link')
        let activeLink_menu = findingActiveLink(navigationLinks, 'active-navlink')
        let hireLink = sidebarLinks[sidebarLinks.length-1]
        let dataValueNumber = hireLink.getAttribute('data-value-number')
        let dataValueName = hireLink.getAttribute('data-value-name')
    
        /*Menu links*/
        activeLink_menu.classList.remove('active-navlink')
        navigationLinks[navigationLinks.length-1].classList.add('active-navlink')
    
        /*Sidebar links*/
        //Processing founded link
        activeLink_sb.classList.remove('active-link')
        activeLink_sb.lastChild.textContent = activeLink_sb.getAttribute('data-value-number')
        activeLink_sb.firstChild.textContent = ''
        //Processing hireLink link
        hireLink.classList.add('active-link')
        hireLink.firstChild.textContent = dataValueNumber
        hireLink.lastChild.textContent = dataValueName
    

        hidingHeaderBtn(hireLink)
        changePage(activePage, pages[pages.length - 1])
    })
})

function hidingHeaderBtn(link){
    let headerBtn = document.querySelector('.header__btn')
    let dataValueNumber = link.getAttribute('data-value-number') 

    console.log(dataValueNumber)
    
    if( dataValueNumber == '01' || dataValueNumber == '05'){
        headerBtn.classList.remove('btn--fo')
        headerBtn.classList.add('btn--fi')
        setTimeout(()=>{
           // headerBtn.classList.remove('btn--fi')
            headerBtn.style.display = 'none'
        }, 500)
    }else{
        headerBtn.classList.add('btn--fo')
        setTimeout(()=>{
            headerBtn.style.display = 'block'
        }, 350)
    }
}