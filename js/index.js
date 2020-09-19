const collectionsElm = document.getElementById('collections');
const UsernameChBtn = document.getElementById('UsernameCh');
const UsernameChInp = document.getElementById('userInp');
const proImgInp = document.getElementById('proImgInp');
const proImg = document.getElementById('proImg');
// Username update
UsernameChBtn.addEventListener('click', e => {
    localStorage.name = UsernameChInp.value.trim();
    const file = proImgInp.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = ()=> {
            localStorage.profileImg = reader.result;
            render();
        };
        reader.readAsDataURL(file);
    }
    render();
});

// preview
proImgInp.addEventListener('change', e=> {
    const file = proImgInp.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = ()=> {
            proImg.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});


// Delete
collectionsElm.addEventListener('click', e => {
    if (e.target.classList.contains('deleteBtn')) {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        let collections = JSON.parse(localStorage.cart);
        let obj = collections.find(elm => elm.id == id);
        const i = collections.indexOf(obj);
        collections.splice(i, 1);
        localStorage.cart = JSON.stringify(collections);
        render();
    }
});

function renderMain() {
    UsernameChInp.value = localStorage.name;
    if (localStorage.profileImg) {
        proImg.src = localStorage.profileImg;
    }
    let collections = JSON.parse(localStorage.cart);
    if (collections.length == 0) {
        collectionsElm.innerHTML = '<h4>No collection</h4>';
        return false;
    }
    collectionsElm.innerHTML = '';


    collections.forEach(coll => {
        let html =
        `
        <a href='collection.html?id=${coll.id}' class="collection-item avatar">
        <i class="material-icons circle ${coll.color}">folder</i>
        <span class="title">${coll.name}</span>
        <p class="grey-text">
        $${coll.items.reduce((total, a) => total+a.price * a.count, 0)}<br>
        ${moment(coll.time).fromNow()}

        </p>
        <span data-id = '${coll.id}' class="btn secondary-content deleteBtn"><i class="deleteBtn material-icons" data-id = '${coll.id}'>delete</i></span>
        </a>
        `;
        $('#collections').append(html);
    });

}