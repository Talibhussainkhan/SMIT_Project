import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const login = document.querySelector('#login');
const signup = document.querySelector('.signUp');
const logoutBtn = document.querySelector('#logoutBtn');
const addProduct = document.querySelector('#addProduct');
let editProductBtn = document.querySelector('#editProduct');

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

const auth = getAuth(app);
const db = getFirestore(app);
let editedId;

function showMessage(msg) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = msg;
}

if (signup) {
  signup.addEventListener('click', async () => {

    let email = document.querySelector('#signup-email').value;
    let password = document.querySelector('#signup-password').value;
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
      window.location.href = './login.html';

    } catch (error) {
      showMessage(error.message, "error");

    }
  })
}

if (login) {
  login.addEventListener('click', async () => {
    let email = document.querySelector('#login-email').value;
    let password = document.querySelector('#login-password').value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('user', user.uid);
      if (user.displayName === 'admin') {
        location.href = '/dashboard.html'
      } else {
        location.href = '/user.html'
      }
    } catch (error) {
      showMessage(error.message)
    }
  })
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

const fetchData = async () => {
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
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@mdo" type="button" class="btn btn-primary" onclick="editItem('${doc.id}')">Edit</button>
    <button type="button" onclick='deleteItem("${doc.id}")' class="btn btn-danger">Delete</button>
   </div>
 </div>
     `
  });
}
if (location.pathname === '/dashboard.html') {
  fetchData()
}

if (addProduct) {
  addProduct.addEventListener('click', async () => {
    let productName = document.querySelector('#productName').value;
    let price = document.querySelector('#productPrice').value;
    let productImage = document.querySelector('#productImage').value;
    let productDescription = document.querySelector('#productDescription').value;
    if (productName === '' || price === '' || productImage === '' || productDescription === '') {
      alert('Details Missings')
      return
    }
    try {
      const docRef = await addDoc(collection(db, "items"), {
        productName,
        productImage,
        price,
        productDescription,
        createdAt: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
      Swal.fire({
        title: "Product added!",
        icon: "success"
      });
      productName = '';
      price = '';
      productImage = '';
      productDescription = '';
      document.querySelector('#close').click();
      fetchData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  })
}

const deleteItem = async (id) => {
  let confirm = window.confirm('Are you sure to delete this items?')
  if (!confirm) return null;
  await deleteDoc(doc(db, "items", id));
  fetchData()
}

const editItem = async (id) => {
  const docRef = doc(db, "items", id);
  const docSnap = await getDoc(docRef);
  editedId = id;
  if (docSnap.exists()) {
    let data = docSnap.data()
    document.querySelector('#editName').value = data.productName;
    document.querySelector('#editPrice').value = data.price;
    document.querySelector('#editImage').value = data.productImage;
    document.querySelector('#editDescription').value = data.productDescription;
  } else {
    console.log("No such document!");
  }
}
if (editProductBtn) {
  editProductBtn.addEventListener('click', async () => {
    let editName = document.querySelector('#editName').value
    let editPrice = document.querySelector('#editPrice').value
    let editImage = document.querySelector('#editImage').value
    let editDescription = document.querySelector('#editDescription').value

    const itemRef = doc(db, "items", editedId);
    await updateDoc(itemRef, {
      productName: editName,
      productImage: editImage,
      productDescription: editDescription,
      price: editPrice
    });
    fetchData();
    document.querySelector('#closeEditBtn').click()
  })
}


window.editItem = editItem;
window.deleteItem = deleteItem;
