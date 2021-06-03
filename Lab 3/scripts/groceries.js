// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Broccoli",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		onSale: false,
		salePrice:0,
		price: 3.99,
		img:"images/broccoli.jpg",
	},
	{
		name: "Bread",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		onSale: false,
		salePrice:0,
		price: 3.49,
		img:"images/bread.jpg",
	},
	{
		name: "Salmon",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		onSale: false,
		salePrice:0,
		price: 10.45,
		img:"images/salmon.jpg",
	},
    {
        name: "Yogurt",
        lactoseIntolerant: false,
        nutAllergy: true,
		organic: true,
		onSale: true,
		salePrice: 4.23,
		price: 5.68,
		img:"images/yogurt.jpg",
    },
    {
        name: "Almost Granola",
        lactoseIntolerant: true,
        nutAllergy: false,
		organic: false,
		onSale: false,
		salePrice:0,
		price: 3.35,
		img:"images/granola.jpg",
    },
    {
        name: "Dozen Eggs",
        lactoseIntolerant: false,
        nutAllergy: true,
		organic: true,
		onSale: true,
		salePrice:3.45,
		price: 4.23,
		img:"images/egg.jpg",
    },
    {
        name: "Pear",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		onSale: false,
		salePrice:0,
		price: 1.65,
		img:"images/pear.jpg",
    },
    {
        name: "Oranges",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		onSale: false,
		salePrice:0,
		price: 2.56,
		img:"images/orange.jpg",
    },
    {
        name: "Chicken",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		onSale: false,
		salePrice:0,
		price: 14.99,
		img:"images/chicken.jpg",
    },
    {
        name: "Peanut Butter",
        lactoseIntolerant: true,
        nutAllergy: false,
		organic: false,
		onSale: true,
		salePrice:4.67,
		price: 6.76,img:"images/peanutbutter.jpg",
    },

    
];
	

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, lactose, nut, organic,sale) {
	let product_info = [];
	

	prods.sort(function(a, b){
		return a.price - b.price;
	})

	for (let i=0; i<prods.length; i+=1) {
		if (lactose && !prods[i].lactoseIntolerant) continue;
		if (nut && !prods[i].nutAllergy) continue;
		if (organic && !prods[i].organic) continue;
		if (sale && !prods[i].onSale) continue;
		//product_info.push("$" + prods[i].price + " \t|\t" + prods[i].name);
		//row -> col
		product_info.push([prods[i].name,prods[i].price,prods[i].salePrice]);
	
	}


	return product_info;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	var subTotalPrice = document.getElementById("subtotalText");
	var sTotalProducts = document.getElementById("checkoutAmt");
	var totalProducts = 0;
	totalPrice = 0;
	console.log(chosenProducts[1]);
	for (let i=0; i<products.length; i+=1) {
		for (let j=0; j<chosenProducts.length; j+=1){
			if (chosenProducts[j].includes(products[i].name)){
					if(products[i].onSale){
						totalPrice += products[i].salePrice;
					}else{
						totalPrice += products[i].price;
					}
					
					totalProducts++;
			}
		}
	}
	subTotalPrice.innerHTML = "$" + Math.round((totalPrice + Number.EPSILON) * 100) / 100;
	sTotalProducts.innerHTML = totalProducts +"  ";
	//return Math.round((totalPrice + Number.EPSILON) * 100) / 100;
}

  