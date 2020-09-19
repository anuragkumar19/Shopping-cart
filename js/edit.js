// Getting Elements
const editForm = document.getElementById('editForm');
const editName = document.getElementById('editName');
const editUrl = document.getElementById('editUrl');
const editPrice = document.getElementById('editPrice');
const editNum = document.getElementById('editNum');


// Qs parsing id
const {
    CollID,
    id
} = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

//console.log(CollID, id);

editForm.addEventListener('submit', updateItem);

//console.log(a);


function renderMain() {
    let colls = JSON.parse(localStorage.cart);
    let obj = colls.find(i => i.id == CollID);
    if (!obj) {
        alert('No item found');
        return false;
    }
    let index = colls.indexOf(obj);
    let obj2 = colls[index].items.find(i => i.id == id);
    if (!obj2) {
        alert('No item found');
        return false;
    }
    $('#nameof').text(obj2.name);
    editName.value = obj2.name;
    editUrl.value = obj2.url == '#' ? '': obj2.url;
    editPrice.value = obj2.price;
    editNum.value = obj2.count;
    // console.log(obj2);
    // let index2 = colls[index].items.indexOf(obj2);
    // colls[index].items[index2]

}

function updateItem(e) {
    e.preventDefault();
    // Getting all input value
    let itemName = editName.value.trim();
    let itemUrl = editUrl.value.trim();
    let itemPrice = editPrice.value.trim();
    let itemCount = editNum.value.trim();

    let colls = JSON.parse(localStorage.cart);
    let obj = colls.find(i => i.id == CollID);
    if (!obj) {
        alert('No item found');
        return false;
    }
    let index = colls.indexOf(obj);
    let obj2 = colls[index].items.find(i => i.id == id);
    if (!obj2) {
        alert('No item found');
        return false;
    }
    let index2 = colls[index].items.indexOf(obj2);
    // Validation
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

    colls[index].items[index2].name = itemName;
    colls[index].items[index2].url = itemUrl ? itemUrl: '#';
    colls[index].items[index2].price = itemPrice;
    colls[index].items[index2].count = itemCount;

    localStorage.cart = JSON.stringify(colls);
    M.toast({
        html: 'Updated'
    });
    render();
    setTimeout(()=> {
        M.toast({
            html: 'Redirecting...'
        });
    }, 200);

    setTimeout(()=> {
        window.open('collection.html?id='+CollID, '_self');
    }, 2000);

}