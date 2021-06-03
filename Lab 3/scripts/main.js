// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("main");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	var x = document.getElementById(tabName);
	if(x.style.display == "none"){
		x.style.display = "block";
	}else{
		x.style.display = "none";
	}

	evt.currentTarget.className += " active";

}

// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices() {
    var s2 = document.getElementById('displayProduct');
	var lactose = document.getElementById("lactoseSelect").checked;
	var nut = document.getElementById("nutSelect").checked;
	var organic = document.getElementById("organicSelect").checked;
	//var onSale = document.getElementById("onSaleSelect").checked;
	var onSaleChoice = document.getElementById("sOnSaleSelect").value;
	var onSale;
	if(onSaleChoice == "Yes"){
		onSale = true;
	}else{
		onSale = false;
	}

	

	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";


	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, lactose, nut, organic,onSale);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	for (i = 0; i < optionArray.length; i++) {
		var productName = optionArray[i][0];
		var productPrice = optionArray[i][1];
		var productSalePrice = optionArray[i][2];
		//create grid item
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.label = productName;
		checkbox.value = productPrice;
		checkbox.value2 = productSalePrice;
		s2.appendChild(checkbox);


		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode("$"+productPrice.toFixed(2)+"\t\t\t\t"+productName));
		s2.appendChild(label);
		//check if on sale
		if (productSalePrice > 0){
			//s2.appendChild(document.createElement("br"));
			var sSpan = document.createElement("span")
			sSpan.setAttribute('class','saleText');
			sSpan.innerHTML = " Sale: $" + productSalePrice.toFixed(2);
			s2.appendChild(sSpan);
			
			//s2.appendChild(document.createElement(p));

		}
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){

	var ele = document.getElementsByName("product");
	var chosenProducts = [];

	var c = document.getElementById('displayCart');
	c.innerHTML = "";

	// build list of selected item
	var para = document.createElement("small");
	//para.innerHTML = "You selected : ";
	//para.innerHTML = "";
	//para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].label));
			var sSpan = document.createElement('span');
			sSpan.innerHTML = "$" + ele[i].value;
			//sSpan.class = "price";
			if(ele[i].value2 > 0){
				sSpan.setAttribute('class','priceCross');
				para.appendChild(sSpan);
				para.appendChild(document.createElement("br"));
				var saleSpan = document.createElement('span');
				saleSpan.innerHTML = "$" + ele[i].value2;
				saleSpan.setAttribute('class','price');
				para.appendChild(saleSpan);

			}else{
				sSpan.setAttribute('class','price');
				para.appendChild(sSpan);
			}
			
			
			//para.appendChild(document.createElement("span"));
			//para.appendChild(document.createTextNode("test 2"));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].label);
		}
	}

	// add paragraph and total price
	c.appendChild(para);
	this.inner = getTotalPrice(chosenProducts);
	//c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));

}

function getGrocerySelect(s){
	var sTotalPrice
	//choose pickup time
	var c = document.getElementById("groceryPickup");
	//delivery fee price
	var p = document.getElementById("pickupFee");
	//subtotal
	var subTotalPrice = document.getElementById("subtotalText");
	var sFee = ((subTotalPrice.innerHTML).substring(1)*0.15+5);
	//total price
	
	var totalPriceText = document.getElementById("totalPrice") ;

	if(s == "delivery"){
		sTotalPrice = +(subTotalPrice.innerHTML).substring(1) + +sFee;
		c.innerHTML = "Please choose a delivery time:";
		p.innerHTML = "$" + (Math.round(sFee * 100)/100).toFixed(2);
		
	}else{
		sTotalPrice = +(subTotalPrice.innerHTML).substring(1);
		c.innerHTML = "Please choose a pickup time:";
		p.innerHTML = "$0.00";
		
	}

	totalPriceText.innerHTML = "$" + (Math.round(sTotalPrice * 100)/100).toFixed(2);
	
	
	

}