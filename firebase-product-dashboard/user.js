import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc , getDoc   } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'



const firebaseConfig = {
  apiKey: "AIzaSyBxFL-icHaxRUf2A_H6SVnrMuLrlpyRK-k",
  authDomain: "smit-dashboard-2f551.firebaseapp.com",
  projectId: "smit-dashboard-2f551",
  storageBucket: "smit-dashboard-2f551.firebasestorage.app",
  messagingSenderId: "511570403341",
  appId: "1:511570403341:web:0bffbcd56661ffe0377544",
  measurementId: "G-DKLGY50LN5"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

const fetchData = async ()=>{
  const querySnapshot = await getDocs(collection(db, "items"));
  let card = document.querySelector('#card');
  card.innerHTML = '';
  querySnapshot.forEach((doc) => {
  const item = doc.data()
  card.innerHTML += `
     <div class="card" style="width: 18rem;">
    <img src=${item.productImage} class="card-img-top" alt="...">
     <div class="card-body">
     <p class="card-text">Price : $${item.price}</p>
     <p class="card-text">Product : ${item.productName}</p>
     <p class="card-text">Descrition : ${item.productDescription}</p>
    <button class='btn btn-info' onclick='addToCart("${doc.id}")'>Add to Cart</button>
   </div>
 </div>
     `
});
}
fetchData()

const addToCart = async (id)=>{
const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    let data = docSnap.data()
    const docRef = await addDoc(collection(db, "cart"), {
        data
      });
      alert('Item Added')
      fetchCart()
  }else {
  console.log("No such document!");
}
}

const fetchCart = async ()=>{
 const querySnapshot = await getDocs(collection(db, "cart"));
 let cartBody = document.querySelector('#cartBody');
 cartBody.innerHTML = '';
  querySnapshot.forEach((doc) => {
  const item = doc.data()
  cartBody.innerHTML += 
  `
  <div class="cart-item">
    <img src=${item.data.productImage}
      alt="T Shirt For men" class="cart-img">
     <div class="cart-details">
            <h4 class="cart-name">${item.data.productName}</h4>
            <p class="cart-description">${item.data.productDescription}</p>
            <p class="cart-price">Price: <span>${item.data.price}</span></p>
            </div>
            <button onclick="deleteCartItem('${doc.id}')" class="delete-btn">🗑</button>
    </div>
  `
  
});
}
fetchCart();

const deleteCartItem = async (id)=>{
    let confirm = window.confirm('Are you delete this item?')
    if(!confirm) return null;
    await deleteDoc(doc(db, "cart", id));
    fetchCart()
}

if(logoutBtn){
  logoutBtn.addEventListener('click', ()=>{
    window.location.href='./login.html'
  })
}

window.deleteCartItem = deleteCartItem;
window.addToCart = addToCart;