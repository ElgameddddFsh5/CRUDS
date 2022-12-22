// Cruds Variables
let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  category = document.getElementById("category");
(count = document.getElementById("count")),
  (SubmitBtn = document.getElementById("submit")),
  (searchinput = document.getElementById("searchinput")),
  (SearchTitle = document.getElementById("search-title")),
  (SearchCategory = document.getElementById("search-category")),
  (tbody = document.getElementById("tbody")),
  (DataContainer = document.querySelector(".Data")),
  (DeleteAllBtnn = document.createElement("button")),
  (total = document.getElementById("total"));

let Projects;
let Mood = "create";
let tmp;

if (localStorage.Data != null) {
  Projects = JSON.parse(localStorage.Data);
  DeleteAllBtn();
} else {
  Projects = [];
}

SubmitBtn.addEventListener("click", (e) => {
  if (
    title.value === "" ||
    price.value === "" ||
    category.value === "" ||
    count.value === ""
  ) {
    e.preventDefault();
  } else {
    e.preventDefault();
    let UserData = {};
    for (let i = 0; i < count.value; i++) {
      UserData.title = title.value;
      UserData.price = price.value;
      UserData.taxes = taxes.value;
      UserData.ads = ads.value;
      UserData.discount = discount.value;
      UserData.count = count.value;
      UserData.category = category.value;
      Projects.push(UserData);
      localStorage.setItem("Data", JSON.stringify(Projects));
      total.innerHTML = `Total: ${
        parseInt(price.value) +
        parseInt(taxes.value) +
        parseInt(ads.value) -
        parseInt(discount.value)
      }`;
    }
    title.value = "";
    price.value = "";
    category.value = "";
    count.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    if (Mood !== "create") {
      Projects[tmp] = UserData;
      Mood = "create";
      localStorage.setItem("Data", JSON.stringify(Projects));
    }
    ShowData();
    DeleteAllBtn();
  }
});

function ShowData() {
  let table = "";
  for (let i = 0; i < Projects.length; i++) {
    table += `
        <tr>
                  <td>${i + 1}</td>
                  <td>${Projects[i].title}</td>
                  <td>${Projects[i].price}</td>
                  <td>${Projects[i].taxes}</td>
                  <td>${Projects[i].ads}</td>
                  <td>${Projects[i].discount}</td>
                  <td>${Projects[i].count}</td>
                  <td>${Projects[i].category}</td>
                  
                   <td id="update" onclick="UpdateItem(${i})">Update</td>
                  <td id="delete" onclick="DeleteItem(${i})">Delete</td>
          </tr>
         
    `;
  }
  tbody.innerHTML = table;
}

ShowData();

function DeleteItem(i) {
  Projects.splice(i, 1);
  localStorage.Data = JSON.stringify(Projects);
  ShowData();
}

function UpdateItem(i) {
  title.value = Projects[i].title;
  price.value = Projects[i].price;
  taxes.value = Projects[i].taxes;
  ads.value = Projects[i].ads;
  discount.value = Projects[i].discount;
  count.value = Projects[i].count;
  category.value = Projects[i].category;
  SubmitBtn.value = "Update";
  Mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function DeleteAllBtn() {
  DeleteAllBtnn.innerHTML = `Delete All Data ${Projects.length}`;
  DeleteAllBtnn.setAttribute("id", "Delete-all");
  DataContainer.prepend(DeleteAllBtnn);
  DeleteAllBtnn.addEventListener("click", () => {
    localStorage.removeItem("Data");
    Projects.splice(0);
    SubmitBtn.value = "Create";
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    ShowData();
    DeleteAllBtnn.style = "display:none;";
    total.innerHTML = "TOTAL:";
  });
}
let SearchByy = "title";
function SearchBy(id) {
  if (id === "search-title") {
    searchinput.placeholder = "Search By Title";
  } else {
    SearchByy = "Category";
    searchinput.placeholder = "Search By Category";
  }
  searchinput.focus();
}

function SearchOnData(value) {
  let table = "";
  if (SearchByy === "title") {
    for (let i = 0; i < Projects.length; i++) {
      if (Projects[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
                  <td>${i + 1}</td>
                  <td>${Projects[i].title}</td>
                  <td>${Projects[i].price}</td>
                  <td>${Projects[i].taxes}</td>
                  <td>${Projects[i].ads}</td>
                  <td>${Projects[i].discount}</td>
                  <td>${Projects[i].count}</td>
                  <td>${Projects[i].category}</td>
                  
                   <td id="update" onclick="UpdateItem(${i})">Update</td>
                  <td id="delete" onclick="DeleteItem(${i})">Delete</td>
          </tr>
         
    `;
      }
    }
  } else {
    for (let i = 0; i < Projects.length; i++) {
      if (Projects[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
                  <td>${i + 1}</td>
                  <td>${Projects[i].title}</td>
                  <td>${Projects[i].price}</td>
                  <td>${Projects[i].taxes}</td>
                  <td>${Projects[i].ads}</td>
                  <td>${Projects[i].discount}</td>
                  <td>${Projects[i].count}</td>
                  <td>${Projects[i].category}</td>
                  
                   <td id="update" onclick="UpdateItem(${i})">Update</td>
                  <td id="delete" onclick="DeleteItem(${i})">Delete</td>
          </tr>
         
    `;
      }
    }
  }
  tbody.innerHTML = table;
}
