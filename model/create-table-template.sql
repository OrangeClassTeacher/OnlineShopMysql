-- Active: 1677730781661@@127.0.0.1@3307@shop

use shop;
CREATE TABLE product(  
    producId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    categoryId int not null,
    price float not null,
    productName VARCHAR(255) not null,
    quantityInStock int not null,
    thumbImage VARCHAR(80),
    brandId INT not null,
    descriptions VARCHAR(2000) not null,
    salePercent FLOAT not null,
    saleFinishDate DATE,
    createtAt DATETIME
);

CREATE TABLE category(  
    categoryId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(50) not null,
    createtAt DATETIME
);


CREATE TABLE productImages(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    productId int not null,
    imageUrl VARCHAR(255) not null,
    createtAt DATETIME
);

CREATE TABLE users(  
    userId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255) not null,
    lastName VARCHAR(255) not null,
    email VARCHAR(50),
    phoneNumber VARCHAR(10) not null,
    sysPassword VARCHAR(50) not null,
    createtAt DATETIME
);


CREATE TABLE orders(  
    orderId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total float not null,
    descriptions VARCHAR(255) not null,
    createtAt DATETIME
);


CREATE TABLE orderDetails(  
    Id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    orderId INT not null,
    productId int not null,
    price float not null,
    quantity int not null,
    createtAt DATETIME
);


