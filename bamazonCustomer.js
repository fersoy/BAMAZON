// required dependencies
let inquirer = require('inquirer');
let mysql = require('mysql');
require('dotenv').config();


//  MySQL connection parameters
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: process.env.SECRET_KEY,
    database: 'Bamazon'
});

// positiveInput will let user to know that they shoul enter a number bigger than 1.
function positiveInput(value) {
    let integer = Number.isInteger(parseFloat(value));
    let sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Enter a number bigger than 1.';
    }
}
// User will choose the item ID and it's amount they want to buy
function promptUserPurchase() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Enter the Item ID you want to purchase.',
            validate: positiveInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter the quantity you want to purchase.',
            validate: positiveInput,
            filter: Number
        }
    ]).then(function (input) {

        let item = input.item_id;
        let quantity = input.quantity;

        // Check if item ID has enough quanity
        let items = 'SELECT * FROM products WHERE ?';

        connection.query(items, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user selects an invalid item ID, data array will give an error!
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                let productData = data[0];

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations! The product you have requested is in stock! We will place it soon and send you an email for regarding information! ');

                    // letruct the updating query string
                    let updateitems = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    // console.log('updateitems = ' + updateitems);

                    //check for switch statements if I need or is there specific function for?????

                    // Update the inventory
                    connection.query(updateitems, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Insufficient quantity!');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {

    items = 'SELECT * FROM products';

    // Make the db query
    connection.query(items, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        let tableWiev = '';
        for (let i = 0; i < data.length; i++) {
            tableWiev = '';
            tableWiev += 'Item ID: ' + data[i].item_id + '  ||  ';
            tableWiev += 'Product Name: ' + data[i].product_name + '  ||  ';
            tableWiev += 'Department: ' + data[i].department_name + '  ||  ';
            tableWiev += 'Price: $' + data[i].price + '  ||  ';
            tableWiev += 'Stock Quantity: ' + data[i].stock_quantity + '\n';

            console.log(tableWiev);
        }

        console.log("******************************************************************\n");

        //Will rompt the user for item/quantity 
        promptUserPurchase();
    })
}

function runBamazon() {

    // Display the available inventory
    displayInventory();
}

// Run the application logic
runBamazon();