const firebaseConfig = {

}
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const menu = []

async function getBarCollection() {
  try {
    const querySnapshot = await db.collection("bar").get();
    querySnapshot.forEach((doc) => {
      menu.push(doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

const book = document.getElementById("book")
const modal = document.getElementById("modal")
const closeBtn = document.querySelector('.close');

book.addEventListener('click', ()=>{
  modal.style.display="block"
  document.body.style.overflow = 'hidden'; 
})

closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

const barBtn = document.getElementById("barBtn")
const menuList = document.getElementById("menuList")
barBtn.addEventListener("click", async()=>{
  menuList.innerHTML=""
  
  if(!menu.length){
    await getBarCollection();
  }
  menu.forEach(item=>{
    const menuItem = `
    <div class="bar-item" key="${item.title}">
      <p class="item-title">${item.title} | $${item.price}</p>
      <p class="item-description">${item.description}</p>
    </div>`
    menuList.innerHTML+=menuItem;
  })
})

