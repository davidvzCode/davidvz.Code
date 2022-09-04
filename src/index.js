//
//const toggle = document.querySelector('.toggle')
const btnSwitch = document.querySelector('#switch')
const body = document.querySelector('body')
const footer = document.querySelector('footer')
const navbar = document.querySelectorAll('.navbar')
const hero_about = document.querySelector('.hero-about')
const line = document.querySelector('.line')
const about_content = document.querySelector('.about-content')
const skills_content = document.querySelector('.skills-content')
const skills_item = document.querySelectorAll('.skills-item')
const contact = document.querySelector('.contact')
const skill_list = document.querySelector('#skill-list')
const projects = document.querySelector('.projects')
//
const menu = document.querySelector('.navbar-menu')
const nav_movil = document.querySelector('.navbar-movil')
const logo = document.querySelectorAll('.logo')
const btnsend = document.querySelector('#send')

loadMode()

const baseUrl = 'http://127.0.0.1:5500/public/index.html'

const API = 'https://server-portfolio-web.herokuapp.com/api/v1'
const content = null || document.getElementById('content')

btnSwitch.addEventListener('click', () => {
    menu.classList.toggle('dark')
    nav_movil.classList.toggle('dark')
    btnSwitch.classList.toggle('active')
    body.classList.toggle('dark')
    about_content.classList.toggle('dark')
    skills_content.classList.toggle('dark')
    projects.classList.toggle('dark')
    for (var i = 0; i < skills_item.length; i++) {
        skills_item[i].classList.toggle('dark')
    }
    contact.classList.toggle('dark')
    btnsend.classList.toggle('dark')
    footer.classList.toggle('dark')
    //navbar.classList.toggle('dark')
    for (var i = 0; i < navbar.length; i++) {
        navbar[i].classList.toggle('dark')
    }
    hero_about.classList.toggle('dark')
    line.classList.toggle('dark')
    storeMode(body.classList.contains('dark'))
})

function loadMode() {
    const mode = localStorage.getItem('dark')
    if (!mode) {
        storeMode(false)
    } else if (mode == 'true') {
        btnSwitch.classList.add('active')
        nav_movil.classList.add('dark')
        menu.classList.add('dark')
        body.classList.add('dark')
        about_content.classList.add('dark')
        skills_content.classList.add('dark')
        projects.classList.add('dark')
        for (var i = 0; i < skills_item.length; i++) {
            skills_item[i].classList.add('dark')
        }
        contact.classList.add('dark')
        btnsend.classList.add('dark')
        footer.classList.add('dark')
        //navbar.classList.add('dark')
        for (var i = 0; i < navbar.length; i++) {
            navbar[i].classList.add('dark')
        }
        hero_about.classList.add('dark')
        line.classList.toggle('dark')
        modeDark(true)
    }
}

function storeMode(value) {
    localStorage.setItem('dark', value)
    modeDark(value)
}

function modeDark(value) {
    if (value) {
        logo[0].setAttribute('src', '../src/assets/image/logo-dark.png')
        logo[1].setAttribute('src', '../src/assets/image/logo-dark.png')
    } else {
        logo[0].setAttribute('src', '../src/assets/image/logo-white.png')
        logo[1].setAttribute('src', '../src/assets/image/logo-white.png')
    }
}

menu.addEventListener('click', () => {
    nav_movil.classList.toggle('inactive')
})

// logo[0].addEventListener('click', () => {
//     window.location.href = baseUrl + '#hero'
// })
// logo[1].addEventListener('click', () => {
//     window.location.href = baseUrl + '#hero'
// })

btnsend.addEventListener('click', () => {
    getMail()
})

async function getProjects(urlApi) {
    const response = await fetch(urlApi + '/project')
    const data = await response.json()
    return data
}

async function getSkills(urlApi) {
    const response = await fetch(urlApi + '/skill')
    const data = await response.json()
    return data
}

function getMail() {
    const name = document.getElementById('name').value
    const lastname = document.getElementById('lastname').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    if (name.length < 3) {
        alert('type a valid name..')
        return
    }
    if (lastname.length < 3) {
        alert('type a valid lastname..')
        return
    }
    if (phone.length < 10) {
        alert('type a valid phone..')
        return
    }
    if (validateMail(email)) {
        if (message.length > 15) {
            const data = {
                name: name,
                lastname: lastname,
                phone: phone,
                email: email,
                message: message,
            }
            sendMail(API, data)
        } else {
            alert('message is too short.....')
        }
    }
}

function validateMail(valor) {
    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (emailRegex.test(valor)) {
        return true
    } else {
        alert('La dirección de email es incorrecta.')
    }
}

async function sendMail(urlApi, data) {
    await fetch(urlApi + '/contact/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            console.log('Success:', response)
            location.reload()
        })
}

;(async () => {
    try {
        const projects = await getProjects(API)
        const skills = await getSkills(API)
        let view = `
        ${projects
            .map(
                (project) => `
        <div class="card-content">
                <img class="card-img" src="${project.url_img}" alt="${
                    project.title
                }">
                <h3>${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <p class="card-skills">Tech stack : ${project.items.map(
                    (skill) => skill.name + ' '
                )}</p>
            <div class="card-links" >
                <div class="card-info">
                    <img src="../src/assets/icon/link.svg" alt="">
                    <a href="${project.link}" target="_blank">Live Preview</a>
                </div>
                <div class="card-info">
                    <img src="../src/assets/icon/github-card.svg" alt="">
                    <a href="${project.link}" target="_blank">View Code</a>
                </div>
            </div>
        </div>
        `
            )
            .slice(0, 10)
            .join('')}
        `
        content.innerHTML = view

        let viewSkill = `
        ${skills
            .map(
                (skill) => `
                <div class="skills-item">
                        <p class="skills-title">${skill.name}</p>
                        <div class="progress-container">
                            <div class="progress-bar">
                            </div>
                        </div>
                </div>
        `
            )
            .join('')}`
        skill_list.innerHTML = viewSkill
    } catch (err) {
        console.log(err)
    }
})()
