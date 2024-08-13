import { app, db } from "../Firebase/firebase.mjs";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
let todoInput = document.getElementById('todoInput');
let addBtn = document.getElementById('addBtn');
let ul = document.getElementById('ul');
async function renderData() {
    ul.innerHTML = ''; 
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((doc) => {
        let gettingData = `${doc.data().todoText}`;
        ul.innerHTML += `
            <li data-id='${doc.id}'>${gettingData} <button class="del">Delete</button><button class="edit">Edit</button></li>
        `;
        todoInput.value = ''
    });
    attachDeleteListeners();
    attachEditListeners();
}

addBtn.addEventListener('click', async () => {
    try {
        const docRef = await addDoc(collection(db, "todo"), {
            todoText: todoInput.value
        });
        console.log("Document written with ID: ", docRef.id);
        
        renderData();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

function attachDeleteListeners() {
    let delBtns = document.querySelectorAll('.del');
    delBtns.forEach((del) => {
        del.addEventListener('click', async (event) => {
            const li = event.target.closest('li');
            const docId = li.getAttribute('data-id');
            try {
                await deleteDoc(doc(db, "todo", docId));
                li.remove();  // Remove the item from the UI
            } catch (error) {
                console.log(error);
            }
        });
    });
}
function attachEditListeners() {
    let editBtns = document.querySelectorAll('.edit');
    editBtns.forEach((edit) => {
        edit.addEventListener('click', async (event) => {
            const li = event.target.closest('li');
            const docId = li.getAttribute('data-id');
            const result = await Swal.fire({
                title: 'Edit your to-do',
                input: 'text',
                inputLabel: 'Your to-do',
                inputValue: li.firstChild.textContent.trim(),
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            });
            const newValue = result.value;
            if (newValue) {
                try {
                    const docRef = doc(db, "todo", docId);
                    await updateDoc(docRef, {
                        todoText: newValue
                    });
                    li.firstChild.textContent = newValue; 
                } catch (error) {
                    console.log(error);
                }
            }
        });
    });
}

renderData();
