const pdt_collection = [
    {"S.No": 1, "Product Name": "Television", "Brand Name": "LG", "Price": 40000},
    {"S.No": 2, "Product Name": "Television", "Brand Name": "Samsung", "Price": 45000},
    {"S.No": 3, "Product Name": "Television", "Brand Name": "Sony", "Price": 30000},
    {"S.No": 4, "Product Name": "Refrigerator", "Brand Name": "LG", "Price": 25000},
    {"S.No": 5, "Product Name": "Refrigerator", "Brand Name": "Croma", "Price": 30000},
    {"S.No": 6, "Product Name": "Refrigerator", "Brand Name": "Samsung", "Price": 30000},
    {"S.No": 7, "Product Name": "Refrigerator", "Brand Name": "Whirlpool", "Price": 20000},
    {"S.No": 8, "Product Name": "Air Conditioner", "Brand Name": "Daikin", "Price": 50000},
    {"S.No": 9, "Product Name": "Air Conditioner", "Brand Name": "Blue Star", "Price": 55000},
    {"S.No": 10, "Product Name": "Air Conditioner", "Brand Name": "Voltas", "Price": 40000},
    {"S.No": 11, "Product Name": "Air Conditioner", "Brand Name": "Samsung", "Price": 45000}
];

//Creating and populating table head elements - not necessary
/* const pdt_table_head = document.createElement("thead");
const thead_row = document.createElement("tr");

const pdt_keys = Object.keys(pdt_collection[0]);
for(const key of pdt_keys) {
    let thead_ele = document.createElement("th");
    thead_ele.innerText = key;
    thead_row.appendChild(thead_ele);
    thead_row.classList.add("table-primary");
}

pdt_table_head.appendChild(thead_row); */

//Creating and populating table body elements
const pdt_table_body = document.querySelector("tbody");
document.addEventListener("DOMContentLoaded", () => {
    populateTable(pdt_collection);
});

const populateTable = (pdt_data) => {
    
    /*When there is no data to be populated */
    if(pdt_data.length == 0) {
        pdt_table_body.innerHTML = `<tr class="table-warning"><td colspan="4">No matches found</td></tr>`;
        return;
    }

    /*Populating data in the table */
    pdt_table_body.innerHTML = "";
    pdt_data.map((pdt_obj) => {
        pdt_table_body.innerHTML += `<tr class="table-secondary"><td>${pdt_obj["S.No"]}</td><td>${pdt_obj["Product Name"]}</td><td>${pdt_obj["Brand Name"]}</td><td>${pdt_obj["Price"]}</td></tr>`;
        /* Alternate way
            const tr = document.createElement("tr");
            let td = `<td>${product.S_No}</td>`;
            td += `<td>${product.Product}</td>`;
            td += `<td>${product.Price}</td>`;
            tr.innerHTML = td;
            tbody.appendChild(tr);
        */
    });

    const total_price = calcPriceTotal();
    
    /*Printing total price of the displayed data*/
    pdt_table_body.innerHTML += `<tr><td colspan="3" style="text-align: right;" class="table-info">Total</td><td class="table-info">${total_price}</td></tr>`;
}

const calcPriceTotal = () => {
    /*Getting the price from the DOM*/
    const pdt_table_rows = pdt_table_body.getElementsByTagName("tr"); //returns HTMLCollection
    const pdt_arr = [...pdt_table_rows]; //Converting HTMLCollection to Array

    const total_price = pdt_arr.reduce((acc, curr) => {
        acc += Number(curr.children[3].innerText);
        return acc;
    }, 0);
   
    /* With pdt_data passed as an argument
    const total_price = pdt_data.reduce((acc, curr) => {
        acc += curr.Price;
        return acc;
    }, 0);
    */

    return total_price;
}

//Searching by Product/Brand name or Price
document.getElementById("search-bar").addEventListener("input", (e) => {
    let search_value = e.target.value.toLowerCase();
    const pdt_filtered = pdt_collection.filter((pdt) => {
        return pdt["Product Name"].toLowerCase().includes(search_value) || pdt["Brand Name"].toLowerCase().includes(search_value) ||pdt.Price.toString().includes(search_value);
    });
    populateTable(pdt_filtered);
});