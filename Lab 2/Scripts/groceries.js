// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Brocoli",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		price: 1.99
	},
	{
		name: "Bread",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		price: 2.35
	},
	{
		name: "Salmon",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		price: 10.45
	},
    {
        name: "Yogurt",
        lactoseIntolerant: false,
        nutAllergy: true,
		organic: true,
		price: 3.35
    },
    {
        name: "Almost Granola",
        lactoseIntolerant: true,
        nutAllergy: false,
		organic: false,
		price: 3.35
    },
    {
        name: "12 Eggs",
        lactoseIntolerant: false,
        nutAllergy: true,
		organic: true,
		price: 4.23
    },
    {
        name: "Pear",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		price: 1.65
    },
    {
        name: "Oranges",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: true,
		price: 2.56
    },
    {
        name: "Chicken",
        lactoseIntolerant: true,
        nutAllergy: true,
		organic: false,
		price: 8.56
    },
    {
        name: "Peanut Butter",
        lactoseIntolerant: true,
        nutAllergy: false,
		organic: false,
		price: 2.76
    }
];
	

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, lactose, nut, organic) {
	let product_info = [];
	

	prods.sort(function(a, b){
		return a.price - b.price;
	})

	for (let i=0; i<prods.length; i+=1) {
		if (lactose && !prods[i].lactoseIntolerant) continue;
		if (nut && !prods[i].nutAllergy) continue;
		if (organic && !prods[i].organic) continue;
		product_info.push("$" + prods[i].price + " \t|\t" + prods[i].name);
	
	}


	return product_info;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	console.log(chosenProducts[1]);
	for (let i=0; i<products.length; i+=1) {
		for (let j=0; j<chosenProducts.length; j+=1){
			if (chosenProducts[j].includes(products[i].name)){
					totalPrice += products[i].price;
			}
		}
	}
	return Math.round((totalPrice + Number.EPSILON) * 100) / 100;
}

  