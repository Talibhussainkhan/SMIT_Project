import { getFirestore, collection, query, where, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc, writeBatch  } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { signOut, getAuth } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
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
const auth = getAuth(app);

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  let card = document.querySelector('#card');
  card.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const item = doc.data();

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
fetchData();

// get user Already save carts items
let items = []
let uid = localStorage.getItem('user');
const getAlreadyCartItem = async ()=>{
  items = []
  const cartRef = collection(db, "cart");
const q = query(cartRef, where("uid", "==", uid));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    items.push(doc.data())
});
};
getAlreadyCartItem()

const addToCart = async (id) => {
  
  // check item available in cart or not
  // console.log(id)
    let existItem = items.find(item => item.pid === id);
    if(existItem){
      // console.log('Already in cart')
      alert('Item already in cart')
      return
    }
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
     await addDoc(collection(db, "cart"), {
      pid: docSnap.id,
      uid,
      price: data.price,
      description: data.productDescription,
      image: data.productImage,
      productName: data.productName,
      quantity : 1
    });
    alert('Item Added')
    fetchCart();
    getAlreadyCartItem()
  } else {
    console.log("No such document!");
  }
}

const fetchCart = async () => {
  let uid = localStorage.getItem('user');
  const cartRef = collection(db, "cart");
  const q = query(cartRef, where("uid", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    cartBody.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const item = doc.data()
      cartBody.innerHTML +=
        `
    <div class="cart-item">
  <img src=${item.image} alt="T Shirt For Men" class="cart-img">

  <div class="cart-details">
    <h4 class="cart-name">${item.productName}</h4>
    <p class="cart-description">${item.description}</p>
    <p class="cart-price">Price: <span>${item.price}</span></p>

    <div class="quantity-control">
      <button class="qty-btn" onclick="updateQuantity('${doc.id}', 'decrease')">-</button>
      <span class="qty-value">${item.quantity || 1}</span>
      <button class="qty-btn" onclick="updateQuantity('${doc.id}', 'increase')">+</button>
    </div>
  </div>

  <button onclick="deleteCartItem('${doc.id}')" class="delete-btn">🗑</button>
</div>
    `
    });
    cartBody.innerHTML += `<button class='btn btn-primary' onClick='checkOut()'> Checkout </button>`

    if (querySnapshot.empty) {
      cartBody.innerHTML = `<h3 class="text-center">Cart is Empty</h3>`;
      getAlreadyCartItem()
      console.log("No matching documents.");
    }
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}
fetchCart();

const deleteCartItem = async (id) => {
  let confirm = window.confirm('Are you delete this item?')
  if (!confirm) return null;
  await deleteDoc(doc(db, "cart", id));
  getAlreadyCartItem();
  fetchCart();
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      // Sign-out successful.`
      window.location.href = './login.html'
      localStorage.removeItem('user')
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out: ", error);
    });
  })
}

 const updateQuantity= async (docId, action) => {
  const itemRef = doc(db, "cart", docId); // Reference to the cart item
  const itemSnap = await getDoc(itemRef);
  let currentQty = itemSnap.data().quantity;
  
  if(action === 'increase'){
    currentQty += 1
  }else{
    currentQty -= 1;
  }

  if(currentQty === 0){
  const confirm = window.confirm('If the quantity is less than 1, it is automatically deleted');
  if(!confirm) return
  await deleteDoc(itemRef);
  fetchCart()
  return
  }
   await updateDoc(itemRef, {
      quantity: currentQty
    });
    // console.log(currentQty)
   fetchCart()
}

const checkOut = async ()=>{
  let uid = localStorage.getItem('user');
  const cartRef = collection(db, "cart");
  const q = query(cartRef, where("uid", "==", uid));

   const querySnapshot = await getDocs(q);
  
   if (querySnapshot.empty) {
    console.log("No documents found.");
    return;
  }
    
  await Promise.all(querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref)));
 
  Swal.fire({
    title: "Order Confirmed! 🎉",
    text: "Your order has been placed successfully.",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
    timer: 3000, // auto close after 3s
    timerProgressBar: true
  });

  fetchCart();
}


window.checkOut = checkOut;
window.updateQuantity = updateQuantity;
window.deleteCartItem = deleteCartItem;
window.addToCart = addToCart;