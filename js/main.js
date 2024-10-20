const book = document.getElementById("book")
const modal = document.getElementById("modal")
const closeBtn = document.querySelector('.close');

book.addEventListener('click', ()=>{
    modal.style.display="block"
    document.body.style.overflow = 'hidden'; 
})

closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';  // Re-enable scroll
});

const barBtn = document.getElementById("barBtn")
const barMenu = document.getElementById("barMenu")
barBtn.addEventListener("click", ()=>{
    // barMenu.innerHTML=""
    // barMenu.innerHTML+=""
})