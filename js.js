// All variables
const colors = ['#ff0000', '#ffff00', '#ff8800',
    '#00ff00', '#ff00ff', '#00ffff',
    '#0000ff', '#000000',
    '#ce00ff', '#14930a', '#0af89d'];

let cards = document.querySelector(".cards-box");
let picker_Box = document.querySelector(".picker-box");
let pickerCard = document.querySelector(".picker");
let randomColors = [];
let guesses = 0;
// create html card class li's
cards.innerHTML += `<li class="card marked-card"></li>
                   <li class="card"></li>
                   <li class="card"></li>`;

// for of loop on the colors array for each color adds an li element with the current color for the background    

for (let color of colors) {
    picker_Box.innerHTML += `<li class="picker" style="background:${color}"></li>`;
}
// Generates 3 random colors from the colors array and push them into a new array,
// then changing card background color to our new array items with pushed random colors ,
// and displaying them with 1 sec delay from each other, after 4 sec changing the background color of the card to "" (white).
function generateColors() {
    setTimeout(() => {
        for (let i = 0; i < randomColors.length; i++) {
            let card = document.querySelectorAll(".card")[i];
            card.style.backgroundColor = "";
        }
    }, 4000);
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const randomElement = colors[Math.floor(Math.random() * colors.length)];
            randomColors.push(randomElement);
            let card = document.querySelectorAll(".card")[i];
            card.style.backgroundColor = randomColors[i];
        }, (i) * 1000);
    }
}
generateColors()

function init() {
    picker_Box.addEventListener("click", (event) => {
        let card = document.querySelectorAll(".card");
        // remove class 'marked-card' to remove red frame
        card[guesses].classList.remove("marked-card")
        // if player color doesnt match computer's color sends a game over prompt with a replay or send to external link
        if (rgbToHex(event.target.style.backgroundColor) != (randomColors[guesses])) {
            let loseWindow = window.confirm("Wrong answer... Try Again?");
            if (loseWindow == false) {
                window.location.href = "https://www.google.com/"; //sends to external page
            }
            if (loseWindow == true) {
                location.reload(); ////refresh the page to restart game
            }
        }
        // if player color match computer's color copy user's selected color to first card & creates class,
        //  'marked-card' at card[guesses] and adds 1 to guesses
        else {
            card[guesses].style.backgroundColor = event.target.style.backgroundColor;
            card[guesses].classList.add("marked-card");
            guesses++
        }

        // check if last card if so send you win prompt
        setTimeout(() => {
            if (guesses > 2) {
                var winWindow = window.confirm("You win 🏆🏆 Try again?");
                if (winWindow == false) {
                    window.location.href = "https://www.google.com/"; //send to external page
                }
                if (winWindow == true) {
                    location.reload(); //refresh the page to restart game
                }
            }
        }, 200);
    });
}
init();

// convert rgb into hex because array of colors is in hex and style.background is in hex 
function rgbToHex(rgb) {
    const rgbArray = rgb.split(/\D+/).filter(Boolean);

    const hexValue = rgbArray.reduce((hex, component) => {
        const hexComponent = parseInt(component, 10).toString(16).padStart(2, "0");
        return hex + hexComponent;
    }, "#");

    return hexValue;
}

