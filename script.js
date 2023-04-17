function search() {
  let searchBox = document.getElementById("search-box");
  let product = searchBox.value;
  let url = `http://localhost:3000/price?q=${product}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
      let prices = document.getElementById("prices");
      prices.innerHTML = "";
      console.log(data['amazon'])
      for(let i = 0; i < data['amazon'].length; i++){
        let listItem = document.createElement("li");
        listItem.innerHTML = `<div class="product">${data['amazon'][i].name}</div><div class="price">${data['amazon'][i].price}</div>`;
        prices.appendChild(listItem);
      }
      for(let i = 0; i < data['flipkart'].length; i++){
        let listItem = document.createElement("li");
        // listItem.innerText = `${data['flipkart'][i].name}: ${data['flipkart'][i].price}`;
        listItem.innerHTML = `<div class="product">${data['flipkart'][i].name}</div><div class="price">${data['flipkart'][i].price}</div>`;
        prices.appendChild(listItem);
      }
  });
}
