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
    const musicData=[["Mus\\Gaijin_Entertainment_-_Arise_Great_Country_48152311.mp3","Gay jin","Arise Great Country"],["Mus\\Gaijin_Entertainment_-_Red-Starred_Avengers_(musmore.org).mp3","Gay jin","Red-Starred Avengers"]]
    const btn = document.querySelector(".playButton")
    const audio = document.querySelector(".audioPlayer")
    const plrIc = document.querySelectorAll(".plrIc")
    const musProg = document.querySelector(".musProg")
    const prog = document.querySelector(".Prog")
    const name = document.querySelector(".musName")
    const prod = document.querySelector(".musPrd")
    const time = document.querySelector(".musTime")
    let rand = Math.floor(Math.random()*2)
    console.log()
    audio.src=musicData[rand][0]
    prod.innerHTML=musicData[rand][1]
    name.innerHTML=musicData[rand][2]
    btn.addEventListener("click",() => {
        if (audio.paused){
            audio.play()
            plrIc[0].classList.replace("triangle","rect")
            plrIc[1].classList.add("rect")
        }
        else{
            audio.pause()
            plrIc[0].classList.replace("rect","triangle")
            plrIc[1].classList.remove("rect")
        }
    })
    let Mmins
    let Msecs
    audio.addEventListener("loadeddata",() => {
        Mmins = Math.floor(audio.duration/60)
        Msecs = Math.floor(audio.duration%60).toString().padStart(2,'0')
    })
    audio.addEventListener("timeupdate",() => {
        prog.style.width=`${audio.currentTime/audio.duration*99+1}%`
        let mins = Math.floor(audio.currentTime/60)
        let secs = Math.floor(audio.currentTime%60).toString().padStart(2,'0')
        time.innerHTML = `${mins}:${secs} / ${Mmins}:${Msecs}`
    })
    let progHold=false
    musProg.addEventListener("mousedown", (e) => {
        audio.pause()
        plrIc[0].classList.replace("rect","triangle")
        plrIc[1].classList.remove("rect")
        progHold=true
    })
    document.addEventListener("mouseup", (e) => {
        progHold=false
    })
    document.addEventListener("mousemove", (e) => {
        if (progHold){
            const rect = musProg.getBoundingClientRect()
            const pos = (e.clientX-rect.left)/rect.width
            audio.currentTime=pos*audio.duration
        }
    })
}
document.addEventListener("DOMContentLoaded", initPlayer)