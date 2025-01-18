
// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function FirstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay:-1,
        stagger: .2,    // stagger means product designer comes immediate on screen but available wrok from home appears least after designer
        
    })
    .from("#herofooter", {
        y: -10,
        opacity:0,
        duration: 1.5,
        delay: -1,
        ease:Expo.easeInOut
    })
}

function circleSkew() {

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout);
        
        // var xdiff = dets.clientX - xprev;
        // var ydiff = dets.clientY - yprev;
        xscale = gsap.utils.clamp(.8,1.2,  dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        // console.log(xdiff, ydiff)
        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        })
        
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleSkew()
circleMouseFollower();
FirstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    elem.addEventListener("mousemove", function (dets) {
        // console.log(dets.clientX, dets.clientY);
        //    console.log(elem.getBoundingClientRect()) it show the value where your mouse is from top , right or left of elem div
    //    console.log(details.clientY - elem.getBoundingClientRect().top);
        //   console.log(dets.clientY - elem.getBoundingClientRect().top);
       var diff = dets.clientY - elem.getBoundingClientRect().top;
       
        gsap.to(elem.querySelector("img"), {
            opacity:1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
        });
    });
});