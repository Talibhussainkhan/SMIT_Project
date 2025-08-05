import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
import { getDatabase, ref, set, push, child, get } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js'

const login = document.querySelector('#login');
const signup = document.querySelector('.signUp');
const logoutBtn = document.querySelector('#logoutBtn');
const addProduct = document.querySelector('#addProduct');


const firebaseConfig = {
  apiKey: "AIzaSyBxFL-icHaxRUf2A_H6SVnrMuLrlpyRK-k",
  authDomain: "smit-dashboard-2f551.firebaseapp.com",
  databaseURL : 'https://smit-dashboard-2f551-default-rtdb.firebaseio.com',
  projectId: "smit-dashboard-2f551",
  storageBucket: "smit-dashboard-2f551.firebasestorage.app",
  messagingSenderId: "511570403341",
  appId: "1:511570403341:web:0bffbcd56661ffe0377544",
  measurementId: "G-DKLGY50LN5"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app);
const database = getDatabase(app);

function showMessage(msg) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
}

if(signup){
    signup.addEventListener('click',()=>{
        let email = document.querySelector('#signup-email').value;
        let password = document.querySelector('#signup-password').value;
    
    createUserWithEmailAndPassword(auth , email, password)
    .then(() => {
      window.location.href='./dashboard.html';
      email = '';
      password = '';
    })
    .catch(error => {
      showMessage(error.message, "error");
    });
})}

if(login){
login.addEventListener('click',()=>{
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  signInWithEmailAndPassword(auth,email,password)
  .then(()=>{
  window.location.href='./dashboard.html';
  email = '';
  password = '';
  })
  .catch((error)=>{
  showMessage(error.message)
  })
})
}

if(logoutBtn){
  logoutBtn.addEventListener('click', ()=>{
    window.location.href='./login.html'
  })
}

const fetchData = ()=>{
  const dbRef = ref(database);

get(child(dbRef, 'products'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const jsonData = Object.entries(data).map(([id, product])=>({
        id,
        ...product
      }))
      displayInCard(jsonData)
    } else {
      console.log('No data found');
    }
  })
  .catch((error) => {
    console.error('Error getting data:', error);
  });
}
fetchData()

if(addProduct){
  addProduct.addEventListener('click', ()=>{
    let productName = document.querySelector('#productName').value;
    let price = document.querySelector('#productPrice').value;
    let productImage = document.querySelector('#productImage').value;
    let productDescription = document.querySelector('#productDescription').value;
    if(productName === '' || price === '' || productImage === '' || productDescription === ''){
      alert('Details Missings')
      return
    }
    // Reference to the "products" path
    const productsRef = ref(database, 'products');
    // Create a unique ID under /products/
    const newProductRef = push(productsRef);
    // Save the data under that ID
    set(newProductRef, {
      productName,
      price,
      productImage,
      productDescription
    })
  .then(() => {
        Swal.fire({
  title: "Product added!",
  icon: "success"
       });
       productName = '';
       price = '';
       productImage ='';
       productDescription = '';
       document.querySelector('#close').click();
       fetchData();
      }).catch((error) => {
        console.error("Error adding product:", error);
      });
  })
}

const displayInCard = (data) => {
  let card = document.querySelector('#card');
  card.innerHTML = '';
  console.log(data)
  data.map((item)=>{
    card.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src=${item.productImage} class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Price : $${item.price}</p>
    <p class="card-text">Product : ${item.productName}</p>
    <p class="card-text">Descrition : ${item.productDescription}</p>
   <button type="button" class="btn btn-primary">Edit</button>
   <button type="button" class="btn btn-danger">Delete</button>
  </div>
</div>
    `
  })
}