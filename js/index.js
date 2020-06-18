
//Active Nav Mobile-Menu 
$(document).ready(function () {
    "use strict";
        var showMenu = $(".show-menu-btn");
        var hideMenu = $(".hide-menu-btn i");

        showMenu.click(function () {    //Show Menu On Click
            $(".mobile-menu").addClass('active');
            toggleTween(tl);    //We add the function To play on click
        });

        hideMenu.click(function () {       //Hide Menu On Click
            $(".mobile-menu").removeClass('active');
            toggleTween(tl);    //We add the function To reverse on click
        });

        $('.mobile-menu .links li a').click(function () {       //Hide Menu On Link Click
            $(".mobile-menu").removeClass('active');
            toggleTween(tl);        //We add the function To reverse on click
        });
        //Close Active Menu On Click On Body
        $(document).click(function () {
            if ($(".mobile-menu").hasClass("active")) {
                hideMenu.click();
            } 
        })
        $(".mobile-menu li,.hide-menu-btn i,.show-menu-btn").click(function (e) {
            "use strict";
            e.stopPropagation();
        });

});

// More Button 
$('.more').on('click', function ( ) {
    $("body, html").animate({
        scrollTop: $($(this).data("scroll")).offset().top + 2
    });
})


// Horizontal Scroll
function progress() {

    var windowScrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var windowHeight = $(window).height();
    var progress = (windowScrollTop / (docHeight - windowHeight)) * 100;
    /* 
    var $bgColor = progress > 99 ? '#4db792' : '#EF4E31';
    var $textColor = progress > 99 ? '#fff' : '#333'; 
    */

    $('.progress .bar').width(progress + '%');
}

progress();

// Custom mouse cursor.
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }

class CursorFx {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
        this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
        this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
        this.scale = 1;
        this.opacity = 1;
        this.mousePos = {x:0, y:0};
        this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
        this.lastScale = 1;
        this.lastOpacity = 1;
        
        this.initEvents();
        requestAnimationFrame(() => this.render());
    }
    initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
    }
    render() {
        this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
        this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
        this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
        this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
        this.lastScale = lerp(this.lastScale, this.scale, 0.15);
        this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
        this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
        this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
        this.DOM.circle.style.opacity = this.lastOpacity
        requestAnimationFrame(() => this.render());
    }
    enter() {
        cursor.scale = 2.7;
    }
    leave() {
        cursor.scale = 1;
    }
    click() {
        this.lastScale = 1;
        this.lastOpacity = 0;
    }
}
const cursor = new CursorFx(document.querySelector('.cursor'));

// Custom cursor chnages state when hovering on elements with 'data-hover'.
[...document.querySelectorAll('[data-hover]')].forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter() );
    link.addEventListener('mouseleave', () => cursor.leave() );
    link.addEventListener('click', () => cursor.click() );
});

// Header Sticky 
$(window).scroll( function ( ) {
    if ( $(window).scrollTop( )  > $('header').innerHeight( ) ) {
        $('header').addClass('sticky');
    } else {
        $('header').removeClass('sticky');
    }
    // Horizontal Scroll
    progress( );

    // Sync the Divs
    $("section").each(function () {
        let windowHeight = $(window).scrollTop(),
            sectionOffset = $(this).offset().top,
            sectionId = $(this).attr("id");
        if ( windowHeight > sectionOffset &&  windowHeight < sectionOffset + $(this).innerHeight() - 1 ) {
            $("nav .links li a , .mobile-menu .links li a").removeClass("active");
            $('nav .links li a[href="#' + sectionId + '"] , .mobile-menu .links li a[href="#' + sectionId + '"] ').addClass("active");
        }
    }); 
} )


//TWEEN MAX ANimation For MObile Nav
const tl = new TimelineLite({ paused: true, reversed: true });

tl
    .from(".hide-menu-btn i", 0.5,{
        rotation: 90,
        opacity: 0
    })
    .staggerFrom('.mobile-menu .links li', 1, {
        opacity:0,
        y:40,
        ease: Power3.easeInOut
    }, 0.2, "-=0.7");

function toggleTween(tween) {
    tween.reversed( ) ?  tween.play( )  :  tween.reverse( );
}   


// Projects Slider
var mySwiper = new Swiper ('.showcases', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView:1,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 768px
        768: {
            slidesPerView:2,
            spaceBetween: 20
        },
        992: {
            slidesPerView:3,
            spaceBetween: 40
        },
    },
    fadeEffect: {
        crossFade: true,
    },
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : false,
    },
    effect: 'coverflow', 
    grabCursor: true,
});

// WOW JS
new WOW().init();