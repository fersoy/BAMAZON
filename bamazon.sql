-- Create a database called 'Bamazon'.
CREATE DATABASE IF NOT EXISTS Bamazon;
USE Bamazon;

-- Then create a Table inside of that database called `products`.
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Bounty Paper Towels', 'Grocery', 19.99, 700),
        ('Ariana Pomegranate', 'Grocery', 2.20, 2000),
		('Tropicana Orange Juice', 'Grocery', 4.41, 567),
		('Horizon Organic Milk', 'Grocery', 3.83, 234),
		('Codenames', 'Toys & Games', 14.79, 36),
		('Under Armour Soccer Ball', 'Sports', 15.98, 286),
		('Airo Fenerbahce Jersey', 'Clothing', 45.54, 1766),
		('Ibuprophen', 'Pharmacy', 4.95, 435),
		('AmazonBasics Mouse', 'Electronics', 9.99, 117),
		('Ben & Jerry Ice Cream', 'Grocery', 4.23, 560);