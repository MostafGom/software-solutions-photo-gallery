const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.nav-menu')

menu.addEventListener('click', () => {
  menu.classList.toggle('is-active')
  menuLinks.classList.toggle('active')
})


const modal = document.getElementById("email-modal")
const openBtn = document.querySelector('.main-btn')
const closeBtn = document.querySelector('.close-btn')

openBtn.addEventListener('click', () => {
  modal.style.display = 'block'
})

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'

  }
})



// Form validation

const form = document.getElementById("form")
const name = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password-confirm")

// check InValid input

const showError = (input, messege) => {
  const formValidation = input.parentElement
  formValidation.className = `form-validations error`
  const errorMessege = formValidation.querySelector('p')
  errorMessege.innerText = messege
}

// check Valid input

const showValid = (input, messege) => {
  const formValidation = input.parentElement
  formValidation.className = `form-validations valid`
  const errorMessege = formValidation.querySelector('p')
  errorMessege.innerText = messege
}

// Get field name
const getFieldName = (input) => {
  return input.name
}


// check length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} chracters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} chracters`)
  }
}


// check passwords Match
const passwordMatch = (p1, p2) => {
  if (p1.value !== p2.value) {
    showError(p2, 'Passwords do not match')
  }
}

const checkRequired = (inputArr) => {
  inputArr.forEach(element => {
    if (element.value.trim() === '') {
      showError(element, `${getFieldName(element)} is Required`)
    } else {
      showValid(element, `${getFieldName(element)} is valid`)
    }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkRequired([name, email, password, passwordConfirm])
  checkLength(name, 3, 30)
  checkLength(password, 8, 20)
  checkLength(passwordConfirm, 8, 20)
  passwordMatch(password, passwordConfirm)
})


// Gallery display

let galleryImages = document.querySelectorAll('.service-cell')
let getLatestOpenImg
let windowWidth = window.innerWidth

galleryImages.forEach((image, index) => {
  image.onclick = () => {
    getLatestOpenImg = index + 1
    let container = document.body
    let newImgWindow = document.createElement('div')
    container.appendChild(newImgWindow)
    newImgWindow.setAttribute('class', 'img-window')
    newImgWindow.setAttribute('onclick', 'closeImg()')

    let newImg = image.firstElementChild.cloneNode()
    newImgWindow.appendChild(newImg)
    newImg.classList.remove('services-cell_img')
    newImg.classList.add('popup-img')
    newImg.setAttribute('id', 'current-img')

    newImg.onload = () => {
      let nextBtn = document.createElement('a')
      nextBtn.innerHTML = "<i class='fas fa-chevron-right next'></i>"
      container.appendChild(nextBtn)
      nextBtn.setAttribute('class', 'img-btn-next')
      nextBtn.setAttribute('onclick', 'changeImg(1)')


      let prevBtn = document.createElement('a')
      prevBtn.innerHTML = "<i class='fas fa-chevron-left prev'></i>"
      container.appendChild(prevBtn)
      prevBtn.setAttribute('class', 'img-btn-prev')
      prevBtn.setAttribute('onclick', 'changeImg(0)')
    }
  }
})


const closeImg = () => {
  document.querySelector('.img-window').remove()
  document.querySelector('.img-btn-next').remove()
  document.querySelector('.img-btn-prev').remove()
}

const changeImg = (change) => {
  document.querySelector('#current-img').remove()
  let getImgWindow = document.querySelector('.img-window')
  let newImg = document.createElement('img')
  getImgWindow.appendChild(newImg)

  let calcNewImg;
  if (change) {
    calcNewImg = getLatestOpenImg + 1
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1
    }
  }
  if (!change) {
    calcNewImg = getLatestOpenImg - 1
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length
    }
  }

  newImg.setAttribute('src', `images/${calcNewImg}.jpg`)
  newImg.setAttribute('class', 'popup-img')
  newImg.setAttribute('id', 'current-img')
  getLatestOpenImg = calcNewImg
}