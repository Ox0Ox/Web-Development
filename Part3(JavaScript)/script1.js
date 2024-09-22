console.log(document.body.childNodes)
console.log(document.body.firstElementChild)
console.log(document.body.firstElementChild.childNodes)
console.log(document.body.childNodes[1].childNodes)
console.log(document.body.firstElementChild.children)
console.log(document.body.childNodes[1].children)

let cont = document.body.childNodes[3]
console.log(cont)
console.log(cont.firstChild)
console.log(cont.lastChild)
console.log(cont.firstElementChild)
console.log(cont.lastElementChild)
console.log(cont.firstElementChild.nextElementSibling.nextElementSibling)
console.log(cont.children[3].previousElementSibling)
console.log(cont.children[3].previousElementSibling.parentElement)

cont.lastElementChild.style.backgroundColor = 'aqua'
cont.lastElementChild.style.border = 'solid blue'
cont.lastElementChild.style.color = 'blue'


let boxes = document.getElementsByClassName('box')
console.log(boxes)
boxes[2].style.backgroundColor = 'red';

document.getElementById('GreenBox').style.backgroundColor = 'green'

document.querySelector('.box').style.backgroundColor = 'Orange'

document.querySelectorAll('.box1').forEach(e => {
    e.style.backgroundColor = 'purple'
})

document.querySelector('.hide').hidden = true

document.querySelector('.box1').innerHTML = 'Inner HTML was changed'

console.log(document.querySelectorAll('.box1'))

x = document.getElementsByTagName('div')

document.designMode = 'on'

let div = document.createElement('div')
div.innerHTML = 'Created Div'
div.setAttribute('class', 'box')
document.querySelector('.container').append(div)

let place = document.querySelector('.container')
place.insertAdjacentHTML('afterbegin', 'Inserting')

document.querySelector('.box').classList.toggle('box1')
document.querySelector('.box').classList.toggle('box1')

console.log(x)
console.log(x[4].matches('#GreenBox'))
console.log(x[3].matches('#GreenBox'))
console.log(x[4].closest('#GreenBox'))
console.log(x[3].closest('#GreenBox'))
console.log(x[3].closest('.box'))
console.log(x[3].closest('.container'))
console.log(document.querySelector('.container').contains(document.querySelector('.box')))
console.log(document.querySelector('.container').contains(document.querySelector('.box1')))

console.log(document.querySelector('.container').innerHTML)
console.log(document.querySelector('.container').outerHTML)
console.log(document.querySelector('.container').tagName)
console.log(document.querySelector('.container').nodeName)
console.log(document.querySelector('.box1').hasAttribute('style'))
console.log(document.querySelector('.box1').getAttribute('style'))
console.log(document.querySelector('.hide').dataset)
console.log(document.querySelector('.container').classList)
console.log(document.querySelector('.container').className)

function colorizer() {
    let color = document.querySelector('.contain').children
    Array.from(color).forEach(e => {
        c1 = Math.floor(Math.random() * 256)
        c2 = Math.floor(Math.random() * 256)
        c3 = Math.floor(Math.random() * 256)
        // console.log(e)
        e.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
    })
}

colorizer()

setInterval(() => {
    colorizer()
}, 10000);



function createcard(thumbnail, title, channel, views, months, duration) {
    i = 0
    card = document.querySelector('.card').children
    Array.from(card).forEach(e => {
        console.log(e)
        console.log(i)
        if (i == 0) {
            e.innerHTML = ''
            let im = document.createElement('img')
            im.src = thumbnail
            im.style.width = '10vw  '
            document.querySelector('.thumbnail').append(im)

        }
        else if (i == 1) {
            e.innerHTML = duration
        }
        else if (i == 2) {
            info = document.querySelector('.info').children
            i1 = 0
            Array.from(info).forEach(c => {
                console.log(c)
                console.log(i1)
                if (i1 == 0) {
                    c.innerHTML = title
                }
                else if (i1 == 1) {
                    info1 = document.querySelector('.info1').children
                    i2 = 0
                    Array.from(info1).forEach(d => {
                        console.log(d)
                        console.log(i2)
                        if (i2 == 0) {
                            d.innerHTML = channel
                        }
                        else if (i2 == 1) {
                            if (views > 1000 & views < 1000000) {
                                views = views / 1000
                                views = String(views)
                                views = views + 'K'
                            }
                            else if (views > 1000000) {
                                views = views / 1000000
                                views = String(views)
                                views = views + 'M'
                            }
                            d.innerHTML = views

                        }
                        else if (i2 == 2) {
                            d.innerHTML = String(months) + ' months'
                        }
                        i2 = i2 + 1
                    })
                }
                i1 = i1 + 1
            })
        }
        i = i + 1

    })
}

createcard('Saturn1.jpg', 'Hello There', 'CoderBois', 123432, 12, '13:00')

let button = document.getElementById('btn')

button.addEventListener('click', () => {
    document.getElementById('eventbox').innerHTML = 'Button was clicked :D'
    alert('Button Clicked')
})

button.addEventListener('contextmenu', () => {
    alert('No right clicking')
})

document.addEventListener('keydown', (e) => {
    console.log(e.key)
})


document.querySelector('.child').addEventListener('click', (e) => {
    e.stopPropagation()
    alert('Child has been clicked')
})
document.querySelector('.childer').addEventListener('click', (e) => {
    alert('Childer has been clicked')
})
document.querySelector('.parent').addEventListener('click', (e) => {
    alert('Parent has been clicked')
})





let hecking1 = `Hello There, You are about to be hacked :D`;
let hecking2 = `Initializing hacking`;
let hecking3 = `Reading Files`;
let hecking4 = `Password Files Detected`;
let hecking5 = `Sending Files To Server`;
let hecking6 = `Cleaning up`;
let hecking7 = `ALL DONE !!! :D`;

async function hacking(xer) {
    let ra = Math.floor(Math.random() * 6 + 2);
    console.log(`Step: ${xer}, Time: ${ra}`);
    document.querySelector('.heckerbox').innerHTML = document.querySelector('.heckerbox').innerHTML + xer;
    let htm = document.querySelector('.heckerbox').innerHTML;
    console.log(htm);
    if (xer == hecking1 || xer == hecking7) {
        document.querySelector('.heckerbox').innerHTML = `<div>${htm}</div>`;
    }
    else {
        function printer() {
            setTimeout(() => {
                document.querySelector('.heckerbox').innerHTML = htm + '.';
            }, 250);
            setTimeout(() => {
                document.querySelector('.heckerbox').innerHTML = htm + '..';
            }, 500);
            setTimeout(() => {
                document.querySelector('.heckerbox').innerHTML = htm + '...';
            }, 750);
        }
        printer();
        let inter = setInterval(() => {
            printer();
        }, 1000);

        return new Promise((resolve) => {
            setTimeout(() => {
                clearInterval(inter);
                setTimeout(() => {
                    document.querySelector('.heckerbox').innerHTML = `<div>${htm + ' -- Done'}</div>`;
                    console.log(htm);
                    resolve();
                }, 1000);
            }, ra * 1000);
        });
    }
}

async function processHackingSteps() {
    const steps = [
        hecking1, hecking2, hecking3, hecking4, hecking5, hecking6, hecking7
    ];

    for (let i = 0; i < steps.length; i++) {
        console.log(`Starting step ${i + 1}`);
        await hacking(steps[i]);
        console.log(`Completed step ${i + 1}`);
    }

    console.log("All steps completed!");
}

processHackingSteps();


let button1 = document.getElementById('local');
button1.addEventListener('click', () => {
    let name = prompt('Enter Name to store');
    if (name === null || name.trim() === '') {
        // Clear localStorage if input is null or empty
        localStorage.removeItem('name');
        document.querySelector('.name').innerHTML = 'Set Name please';
    } else {
        // Set localStorage and update the span if input is valid
        localStorage.setItem('name', name);
        document.querySelector('.name').innerHTML = name;
    }
});

// Initial check to set the name or prompt to set a name
if (localStorage.getItem('name')) {
    let a = localStorage.getItem('name');
    document.querySelector('.name').innerHTML = a;
} else {
    document.querySelector('.name').innerHTML = 'Set Name please';
}