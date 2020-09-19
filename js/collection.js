// Getting Elements
const editModal = document.getElementById('CollEditModal');
const newItemForm = document.getElementById('newItemForm');
const newItemNameInp = document.getElementById('newItemName');
const newItemUrInp = document.getElementById('newItemUrl');
const newItemPriceInp = document.getElementById('newItemPrice');
const newItemCountInp = document.getElementById('newItemNum');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const CollNameElm = document.getElementById('CollName');
const editCollForm = document.getElementById('editCollForm');
const editNameInp = document.getElementById('editNameInp');
const EditOptions = document.querySelectorAll('#editSelectInp option');
const dataTable = document.getElementById('dataTable');
const editSelectInp = document.getElementById('editSelectInp');





// Listening for form submit
newItemForm.addEventListener('submit', createItem);
// deleteAll
deleteAllBtn.addEventListener('click', deleteAll);
// edit collection form
editCollForm.addEventListener('submit', editColl);

// Qs parsing id
const CollID = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}).id;



function renderMain() {
    let coll = JSON.parse(localStorage.cart);
    let obj = coll.find(c => c.id == CollID);
    if (!obj) {
        alert('No such collection...');
        return false;
    }

    let i = coll.indexOf(obj);
    let collection = coll[i];

    // Display collection name
    CollNameElm.innerText = collection.name;
    document.getElementById('Foldericon').classList.add(`${collection.color}-text`);
    editNameInp.value = collection.name;
    EditOptions.forEach(option => {
        if (option.value == collection.color) {
            option.setAttribute('selected', true);
        }
    });

    // Display items in table
    dataTable.innerHTML = '';
    let total = collection.items.reduce((totalA, a) => totalA + a.price * a.count,
        0);

    $('#totalElm').text(`Total : $${total}`);

    collection.items.forEach((item, index) => {
        let html =
        `
        <tr>
        <td>${index + 1}</td>
        <td class="Item-name">${item.name.substring(0, 35)}${item.name.length > 30 ? '...': ''}</td>
        <td>$${item.price}</td>
        <td>${item.count}</td>
        <td>$${item.price * item.count}</td>
        <td><a target="${item.url == '#' ? '_self': '_blank'}" href="${item.url}">Visit &nbsp;<i class="fas fa-chevron-right"></i></a></td>
        <td>
        <a href='edit.html?CollID=${CollID}&id=${item.id}' class="btn-flat"><i class="material-icons blue-text">mode_edit</i></a>
        <button data-id ='${item.id}' onclick = 'deleteOne("${item.id}")' class="btn-flat"><i class="material-icons red-text">delete</i></button>
        </td>
        </tr>

        `;
        $('#dataTable').append(html);
    });

}


function createItem(e) {
    e.preventDefault();
    // Getting all input value
    let itemName = newItemNameInp.value.trim();
    let itemUrl = newItemUrInp.value.trim();
    let itemPrice = newItemPriceInp.value.trim();
    let itemCount = newItemCountInp.value.trim();

    if (!itemCount) {
        itemCount = 1;
    }

    if (!itemName || !itemPrice) {
        M.toast({
            html: 'Item name and price are required field. '
        });
        return false;
    }

    itemPrice = parseFloat(itemPrice);
    itemCount = parseFloat(itemCount);

    const {
        timeStamp,
        id
    } = genID();


    let item = {
        id,
        name: itemName,
        url: itemUrl ? itemUrl: '#',
        price: itemPrice,
        count: itemCount,
        time: timeStamp,
    };

    let coll = JSON.parse(localStorage.cart);
    let obj = coll.find(c => c.id == CollID);
    if (!obj) {
        M.toast({
            html: 'No collection found!!!'
        });
        alert('No such collection...');
        return false;
    }
    let i = coll.indexOf(obj);
    coll[i].items.push(item);
    localStorage.cart = JSON.stringify(coll);
    //console.log(item);
    newItemForm.reset();
    M.toast({
        html: `Item ${item.name} added...`
    });
    render();
}

function deleteAll() {
    let coll = JSON.parse(localStorage.cart);
    let obj = coll.find(c => c.id == CollID);
    if (!obj) {
        alert('No such collection...');
        return false;
    }
    let i = coll.indexOf(obj);
    coll[i].items = [];
    localStorage.cart = JSON.stringify(coll);
    render();
}

function deleteOne(id) {
    //console.log(id);
    let coll = JSON.parse(localStorage.cart);
    let obj = coll.find(c => c.id == CollID);
    if (!obj) {
        M.toast({
            html: 'No collection found!!!'
        });
        alert('No such collection...');
        return false;
    }
    let i = coll.indexOf(obj);
    let items = coll[i].items;
    let obj2 = items.find(b => b.id == id);
    let i2 = items.indexOf(obj2);
    coll[i].items.splice(i2, 1);
    localStorage.cart = JSON.stringify(coll);
    render();

}

function editColl(e) {
    e.preventDefault();
    // Get input value
    let newName = editNameInp.value.trim();
    let color = editSelectInp.options[editSelectInp.selectedIndex].value;
    //console.log(newName, color);
    let coll = JSON.parse(localStorage.cart);
    let obj = coll.find(c => c.id == CollID);
    if (!obj) {
        M.toast({
            html: 'No collection found!!!'
        });
        alert('No such collection...');
        return false;
    }
    let i = coll.indexOf(obj);
    coll[i].name = newName;
    coll[i].color = color;
    localStorage.cart = JSON.stringify(coll);
    render();
}