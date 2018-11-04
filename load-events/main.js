const images = ['1_h.jpg', '2_h.jpg', '3_h.jpg']

document.addEventListener('scroll', debounce(scrollHandler, 100));

allLoaded(console.log.bind(console, 'loaded'));

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
let prevy = window.pageYOffset
const pageHeight = window.innerHeight;

function scrollHandler() {
    console.log('handling')
    const y = window.pageYOffset;
    const diff = y - prevy;

    if (document.body.clientHeight - y < pageHeight) {
        // scrolling downward
        allLoaded(console.log.bind(console, 'loaded'))
    }

    prevy = y;
}

function allLoaded(cb) {

    let counter = 0;

    const toBeAdded = images.map(src => {
        const img = new Image()
        img.src = `${src}?p=${Math.random()}`;
        img.onload = img.onerror = checkLoad;
        return img;
    });

    function checkLoad() {
        counter++
        if (counter === images.length) {
            main.append(...toBeAdded);
            cb()
        }       
    }
}