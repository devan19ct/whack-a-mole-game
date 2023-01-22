const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

const sound = new Audio("assets/smash.mp3")

let failTimer = null;


function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.png'

    failTimer = setTimeout(() => {
        score -= 5;
        scoreEl.textContent = score;
        if (score <= -5) {
            let instruction = "\nPress f5 to reset the game";
            alert("Game Over!"+instruction );
            
        } 

        else if(score>=100){
            let instruction = "\nNew levels and mods are coming soon.. \nPress f5 to play again";
            alert("Congratulations! You have reached a score of 100!" + instruction);
            clearTimeout(timer);
            clearTimeout(failTimer);
        }
        
        else {
            hole.removeChild(img);
            run();
        }
    }, 2000);

    img.addEventListener('click', () => {
        score += 10
        sound.play()
        scoreEl.textContent = score
        img.src = 'assets/mole-whacked.png'

        if (score === 100) {
            let instruction = "\nNew levels and mods are coming soon.. \nPress f5 to play again";
            alert("Congratulations! You have reached a score of 100!" + instruction);
            clearTimeout(timer);
            clearInterval(failTimer);
        }

        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)
}
run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

