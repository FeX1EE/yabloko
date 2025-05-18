gsap.registerPlugin(ScrollSmoother,ScrollTrigger)
const sensetivity=0.09
document.addEventListener("mousemove",(e) => {
    let dx = (e.clientX - window.innerWidth/2)*sensetivity
    let dy = (e.clientY - window.innerHeight/2)*sensetivity
    gsap.to(".layers_container",{
        duration: 1.5,
        x: dx,
        y: dy,
        rotationX: dy/10,
        rotationY: dx/10,
        ease: "power2.out"
    })
    gsap.to(".head-text",{
        duration: 1.5,
        x: -dx/2,
        y: -dy/2,
        ease: "power2.out"
    })
})
ScrollSmoother.create({
    wrapper: "wrapper",
    content: "wrapper_content",
    smooth: 1.5,
    effects: true
})
gsap.utils.toArray("section").forEach(section => {
    gsap.fromTo(
        section,
        {opacity: 0, y: 25},
        {opacity: 1, y: 0, scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }}
    )
})
function initPlayer(){
    const btn = document.querySelector(".playButton")
    const audio = document.getElementsByClassName(".audioPlayer")
    document.addEventListener("click",() => {
        if (audio.paused){
            audio.play()
            // btn.innerHTML=""
        }
        else{
            audio.pause()
            // btn.innerHTML=""
        }
    })
    const time = document.querySelector(".musTime")
    let Mmins = Math.floor(audio.duration/60)
    let Msecs = Math.floor(audio.duration%60).toString().padStart(2,'0')
    audio.addEventListener("timeupdate",() => {
        let mins = Math.floor(audio.currentTime/60)
        let secs = Math.floor(audio.currentTime%60).toString().padStart(2,'0')
        time.innerHTML = `${mins}:${secs} / ${Mmins}:${Msecs}`
    })
}
document.addEventListener("DOMContentLoaded", initPlayer)