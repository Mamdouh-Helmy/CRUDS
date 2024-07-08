let title = document.querySelector('.title');
let price = document.querySelector('.price');
let taxes = document.querySelector('.taxes');
let ads = document.querySelector('.ads');
let discount = document.querySelector('.discount');
let total = document.querySelector('.total');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let create = document.querySelector('.create');
let search = document.querySelector('.search');
let search_title = document.querySelector('.search-title');
let search_category = document.querySelector('.search-category');
let deleteAll = document.querySelector('.delete-all');
let table = document.querySelector('.table table tbody');

let dataPro = [];
let updateIndex = null;

function getTotal() {
    let priceValue = parseFloat(price.value) || 0;
    let taxesValue = parseFloat(taxes.value) || 0;
    let adsValue = parseFloat(ads.value) || 0;
    let discountValue = parseFloat(discount.value) || 0;

    if (price.value != "") {
        let allTotal = (priceValue + taxesValue + adsValue) - discountValue;
        total.innerHTML = allTotal;
        total.style.backgroundColor = "rgb(159, 115, 255)";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(192, 95, 95)";
    }
}

document.addEventListener('input', getTotal);


if (window.localStorage.getItem('products')) {
    dataPro = JSON.parse(window.localStorage.getItem('products'));
}

create.addEventListener('click', function () {
    if (title.value !== '' && price.value !== '') {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value
        };

        if (create.value === "Update") {
            dataPro[updateIndex] = newPro; 
            create.value = "Create"; 
            count.style.display = 'block';
            updateIndex = null; 
        } else {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        }

        window.localStorage.setItem('products', JSON.stringify(dataPro));
        clearProducts();
        getTotal() 
        showProducts();
        deleteAllProducts();
    }
});

function showProducts() {
    table.innerHTML = '';
    for (let i = 0; i < dataPro.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><input type="button" value="Update" class="update" id="${i}"></td>
                <td><input type="button" value="Delete" class="delete" id="${i}"></td>
            </tr>
        `;
    }
}

showProducts();

function deleteProduct() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            let id = e.target.id;
            dataPro.splice(id, 1);
            window.localStorage.setItem('products', JSON.stringify(dataPro));
            showProducts();
            deleteAllProducts();
        }
    });
}

deleteProduct();

function updataProduct() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('update')) {
            let id = e.target.id;
            updateIndex = id; 
            title.value = dataPro[id].title;
            price.value = dataPro[id].price;
            taxes.value = dataPro[id].taxes;
            discount.value = dataPro[id].discount;
            ads.value = dataPro[id].ads;
            getTotal(); 
            count.style.display = 'none';
            category.value = dataPro[id].category;
            create.value = "Update";
        }
    });
}

updataProduct();

function clearProducts() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = ''
    discount.value = '';
    count.value = '';
    category.value = '';
}

function deleteAllProducts() {
    if (dataPro.length > 0) {
        deleteAll.style.display = 'block';
    } else {
        deleteAll.style.display = 'none';
    }
}

deleteAllProducts();

deleteAll.addEventListener('click', function () {
    dataPro = [];
    window.localStorage.setItem('products', JSON.stringify(dataPro));
    showProducts();
    deleteAllProducts();
});

search_title.addEventListener('click', function () {
    search.placeholder = 'Search by title...'
    search.focus()
    search.addEventListener('keyup' , function () {
        let searchTable = ''
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(search.value)){
                                searchTable += `
                                            <tr>
                                                <td>${i + 1}</td>
                                                <td>${dataPro[i].title}</td>
                                                <td>${dataPro[i].price}</td>
                                                <td>${dataPro[i].taxes}</td>
                                                <td>${dataPro[i].ads}</td>
                                                <td>${dataPro[i].discount}</td>
                                                <td>${dataPro[i].total}</td>
                                                <td>${dataPro[i].category}</td>
                                                <td><input type="button" value="Update" class="update" id="${i}"></td>
                                                <td><input type="button" value="Delete" class="delete" id="${i}"></td>
                                            </tr>
                                        `;
                            }
        }
        table.innerHTML = searchTable
    })
})

search_category.addEventListener('click', function () {
    search.placeholder = 'Search by category...'
    search.focus()
    search.addEventListener('keyup' , function () {
        let searchTable = ''
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(search.value)){
                                searchTable += `
                                            <tr>
                                                <td>${i + 1}</td>
                                                <td>${dataPro[i].title}</td>
                                                <td>${dataPro[i].price}</td>
                                                <td>${dataPro[i].taxes}</td>
                                                <td>${dataPro[i].ads}</td>
                                                <td>${dataPro[i].discount}</td>
                                                <td>${dataPro[i].total}</td>
                                                <td>${dataPro[i].category}</td>
                                                <td><input type="button" value="Update" class="update" id="${i}"></td>
                                                <td><input type="button" value="Delete" class="delete" id="${i}"></td>
                                            </tr>
                                        `;
                            }
        }
        table.innerHTML = searchTable
    })
})