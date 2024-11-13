const firebaseConfig = {
  apiKey: "AIzaSyA4SyJ6270ZDSFy3DIAnF7P0WV-E_YiCjM",
  authDomain: "prestige-lounge.firebaseapp.com",
  projectId: "prestige-lounge",
  storageBucket: "prestige-lounge.appspot.com",
  messagingSenderId: "948407810686",
  appId: "1:948407810686:web:32aa95b711e0f9eadd362f",
  measurementId: "G-7MCFB4VN9Q"
}
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// ===========================Firebase Init=====================
const menu = []

async function getBarCollection() {
  try {
    const querySnapshot = await db.collection("bar").get();
    querySnapshot.forEach((doc) => {
      menu.push(doc.data());
    });
  } catch (error) {
    alert("Error fetching documents: ", error);
  }
}
// ======================== Show tables aviability ==============
async function fetchTableAvailability() {
  try {
    const docRef = db.collection("tables-availability").doc("available");
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      return data.available;
    } else {
      return null;
    }
  } catch (error) {
    alert("Error fetching document: ", error);
  }
}

fetchTableAvailability().then(value => {
  if(value){
    document.getElementById("reserveSpan").style.display='block'
  }else{
    document.getElementById("notAvailable").style.display='block'
  }
});
// ========================Open Booking Modal======================
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

// ======================Open Bar Menu===============================
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

// ============================Admin Auth Form =====================
const correctPassword = 'admin123';
const settingIcon = document.getElementById("setting")
setting.addEventListener('click', ()=>{
  document.getElementById("admin-auth-modal").style.display='block'
})

document.getElementById('admin-auth-submit').addEventListener('click', () => {
  const inputPassword = document.getElementById('admin-auth-password').value;
  const adminPanel = document.getElementById('admin-container');
  const modal = document.getElementById('admin-auth-modal');
  const errorMessage = document.getElementById('admin-auth-error');
  const mainContent = document.getElementById('main-content');

  if (inputPassword === correctPassword) {
    modal.style.display = 'none';
    mainContent.style.display = 'none';
    adminPanel.style.display = 'block';
  } else {
    errorMessage.style.display = 'block';
  }
});

// =====================Add product======================
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const descriptionInput = document.getElementById("product-description");
const submitBtn = document.getElementById("addBtn");

function cleanInputs(){
  nameInput.value=''
  priceInput.value=''
  descriptionInput.value=''
}

async function addObjectToCollection(obj) {
  try {
    await db.collection("bar").add(obj);
    alert("Document successfully added!");
    cleanInputs()
  } catch (error) {
    alert("Error adding document: ", error);
  }
}

submitBtn.addEventListener("click", (e)=>{
  const menuItem = {
    title: nameInput.value,
    price:priceInput.value,
    description:descriptionInput.value
  }

  if (Object.values(menuItem).some(item => !item)) {
    alert("Fill all the fields")
    return;
  }
  addObjectToCollection(menuItem)
})
// ======================= Close Admin=====================
document.getElementById("closeAdmin").addEventListener('click', ()=>{
  document.getElementById('admin-container').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
})

// ==================== Tables Availability===================
const availabilityInput = document.getElementById("tables-availability")
const saveBtn = document.getElementById("save")

async function updateTableAvailability(newValue) {
  try {
    const docRef = db.collection("tables-availability").doc("available");
    await docRef.update({
      available: newValue
    });
    alert("Field successfully updated!");
  } catch (error) {
    alert("Error updating document: ", error);
  }
}

saveBtn.addEventListener("click", ()=>{
  updateTableAvailability(availabilityInput.checked)
})