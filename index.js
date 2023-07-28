var productsContainer=[]
var ProductNameInput=document.getElementById("ProductNameInput")
var ProductPriceInput=document.getElementById("ProductPriceInput")
var ProductCategoryInput=document.getElementById("ProductCategoryInput")
var ProductDescInput=document.getElementById("ProductDescInput")
var addbtn=document.getElementById("addbtn")
var updatebtn=document.getElementById("updatebtn")
var mainIndex = 0;




if(localStorage.getItem('products') !=null){
    productsContainer=JSON.parse(localStorage.getItem('products'))
    displayProducts(productsContainer)
}

function addProduct() {
    if (
      validateProductName() &&
      validateProductPrice() &&
      validateProductCategory()
    ) {
      var product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        desc: ProductDescInput.value,
      };
  
      productsContainer.push(product);
      update();
      clearForm();
    } else {
      alert("Please fill all the required fields correctly.");
    }
  }
  
  function validateProductName() {
    // A more flexible validation for the product name (allowing any characters)
    return ProductNameInput.value.trim() !== "";
  }
  
  function validateProductPrice() {
    // You can add validation for product price if needed (e.g., check for numeric input)
    return ProductPriceInput.value.trim() !== "";
  }
  
  function validateProductCategory() {
    // You can add validation for product category if needed
    return ProductCategoryInput.value.trim() !== "";
  }
  
 function clearForm(){
   ProductNameInput.value= ""
   ProductPriceInput.value= ""
   ProductCategoryInput.value= ""
   ProductDescInput.value= ""

 }
 function displayProducts(productsArr){
    var trs=""
    for(var i=0; i<productsArr.length;i++){
        trs+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${productsArr[i].name}</td>
                        <td>${productsArr[i].price}</td>
                        <td>${productsArr[i].category}</td>
                        <td>${productsArr[i].desc}</td>
                        <td>
                            <button onclick="setFormForUpdate(${i});" class=" btn btn-outline-warning"><i class="fa-solid fa-eye"></i>  Update</button>
                        </td>
                        <td>
                            <button onclick="deleteProduct(${i});" class=" btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
                        </td>
                    </tr>`
       }
       document.getElementById('tBody').innerHTML=trs;
 }
 function deleteProduct(productsIndex)
 {
    productsContainer.splice(productsIndex,1)
    localStorage.setItem('products', JSON.stringify(productsContainer))

    displayProducts(productsContainer)
 }

  function searchProducts(term){
 var matchedProducts=[];
 for(var i=0;i<productsContainer.length;i++)
 {
    if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())=== true)
    {
        matchedProducts.push(productsContainer[i]);
    }

 }
 displayProducts(matchedProducts);
  }

  function setFormForUpdate(ProductIndex)
  {
    mainIndex=ProductIndex;
addbtn.classList.replace('d-block' , 'd-none')
updatebtn.classList.replace('d-none' , 'd-block')
ProductNameInput.value=productsContainer[ProductIndex].name;
ProductPriceInput.value=productsContainer[ProductIndex].price;
ProductCategoryInput.value=productsContainer[ProductIndex].category;
ProductDescInput.value=productsContainer[ProductIndex].desc;
  }


  function setFormAdd(){
    addbtn.classList.replace('d-none','d-block');
    updatebtn.classList.replace('d-block', 'd-none');
}

  function updateProduct() {
    if (
      validateProductName() &&
      validateProductPrice() &&
      validateProductCategory()
    ) {
      var product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        desc: ProductDescInput.value
      }
      productsContainer.splice(mainIndex,1,product)
      
      
      update();
      clearForm();
      setFormAdd();
    } 
    else {
      alert("Please fill all the required fields correctly.");
    }
  }

  function update(){
    displayProducts(productsContainer);
    localStorage.setItem("products",JSON.stringify(productsContainer));
}
  