function clickHandler(e) {
    let imgDom = document.querySelector('img');
    console.log(imgDom.getAttribute('src'))
    imgDom.setAttribute('src', imgDom.getAttribute('src').endsWith('1.png') ? './2.png' : './1.png')
}

const url = '/pwaTest.json';
const cache_key = 'v1';
let dom = document.querySelector('#testcachestorage');
function testCacheStorage() {
    if (typeof 'caches' !== 'undefined') {
        getCacheStorage(data => {
            if (data) {
                insertData(data);
            } else {
                fetch(url, {
                    'mode': 'no-cors'
                }).then((response) => {
                    caches.open(cache_key).then((cache) => {
                        var res = response.clone();
                        response.json().then((data) => {
                            insertData(data);
                        });
                        cache.put(url, res);
                        
                        
                    });
                });
            }
        });
    } else {
        insertData('不支持caches');
    }
}

function getCacheStorage(callback) {
    if (typeof 'caches' !== 'undefined') {
        caches.open(cache_key).then((cache) => {
            if (cache) {
                cache.match(url).then((response) => {
                    response && response.json().then((data) => {
                        console.log(data);
                        callback(data);
                    });
                    !response && callback(null);
                })
            } else {
                callback(null);
            }
        })
    }
}

function removeFirstCacheStorage() {
    caches.delete(cache_key).then(flag => {
        if (flag) {
            testCacheStorage();
        } else {
            alert(flag);
        }
    })
}

function init() {
    getCacheStorage((data) => {
        insertData(data)
    })
}

function insertData(data) {
    dom.innerHTML = data && JSON.stringify(data) || '';
}

init();

function setupsw() {
    const serviceWorker = window.navigator.serviceWorker;
    if (!serviceWorker || typeof fetch === 'undefined') {
        return;
    } else {
        serviceWorker.register(url).then(function () {
            console.log(arguments);
        })
    }
}

window.addEventListener('load', setupsw, false);