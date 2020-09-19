// Getting Elements
const newCollForm = document.getElementById('newCollForm');
const loader = document.querySelector('.CPre');
const nameInp = document.getElementById('nameInp');
const selectInp = document.getElementById('selectInp');
const allCollElm = document.getElementById('allColl');
const Username = document.getElementById('Username');
const profileImg = document.getElementById('profileImg');

$(document).ready(function() {
    // Initialize Sidenav
    $('.sidenav').sidenav();
    // Initialize Modal
    $('.modal').modal();
    // Initialize select
    $('select').formSelect();
    render().then(()=> {
        $('.CPre').fadeOut();
        M.updateTextFields();
    }).catch(()=> {
        $('.CPre').fadeOut();
        M.updateTextFields();
    });
});

if (!localStorage.cart) {
    localStorage.cart = JSON.stringify([]);
}

// Listening for form submit
newCollForm.addEventListener('submit', createColl);








function createColl(e) {
    e.preventDefault();
    let collectionName = nameInp.value;
    collectionName = collectionName.trim();
    if (!collectionName) {
        M.toast({
            html: 'Please fill out name of collection???'
        });
        return false;
    }
    let color = selectInp.options[selectInp.selectedIndex].value;
    const {
        timeStamp,
        id
    } = genID();

    let newColl = {
        id,
        name: collectionName,
        time: timeStamp,
        color: color,
        items: []
    };

    let cart = JSON.parse(localStorage.cart);
    cart.push(newColl);
    localStorage.cart = JSON.stringify(cart);
    newCollForm.reset();
    M.toast({
        html: `<p>Collection created ${newColl.name} ...</p>`
    });
    render();
    //console.log(localStorage.cart);
}



// functions
function genID() {
    const timeStamp = Date.now();
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let Id = '';
    for (let i = 0; i < 7; i++) {
        let rom = Math.floor(1 +(str.length -1)*Math.random());
        Id += str.charAt(rom);
    }
    Id += timeStamp.toString();
    return {
        timeStamp,
        id: Id
    };
}


function renderNav() {
    if (localStorage.profileImg) {
        profileImg.src = localStorage.profileImg;
    }
    Username.innerText = localStorage.name ? localStorage.name: 'Guest';
    const allCollections = JSON.parse(localStorage.cart);
    if (allCollections.length == 0) {
        allCollElm.innerHTML = '<li>No collection</li>';
        return false;
    }
    allCollElm.innerHTML = '';

    allCollections.forEach(coll => {
        let html = `<li><a href="collection.html?id=${coll.id}" class="waves-effect"><i class="material-icons ${coll.color}-text">folder</i>${coll.name}</a></li>`;
        $('#allColl').append(html);

    })
}

async function render() {
    renderNav();
    renderMain();
}