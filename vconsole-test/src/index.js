function clickHandler(e) {
    debugger;
    let imgDom = document.querySelector('img');
    console.log(imgDom.getAttribute('src'))
    imgDom.setAttribute('src', imgDom.getAttribute('src').endsWith('1.png') ? './2.png' : './1.png')
}