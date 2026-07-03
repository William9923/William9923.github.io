+++
title = 'Data Warehouse Modelling Concept'
date = '2021-08-14'
slug = 'data-warehouse-modelling-concept'
original_url = 'https://medium.com/analytics-vidhya/part-i-i-data-warehouse-modelling-concept-962f286d1566'
+++

*Originally published on [Medium](https://medium.com/analytics-vidhya/part-i-i-data-warehouse-modelling-concept-962f286d1566).*

## Table of Contents

*   Prerequisites
*   Architecture
*   Database
*   Data Warehouse
*   ETL Pipeline

## Prerequisites

First of all, all data used for this project were **given** by our mentor (**primary data**). Dataset consists of 7 `csv` files.

![Image 1](https://miro.medium.com/v2/resize:fit:700/1*aI4o87zvWuoQEoe-WsDiPA.jpeg)

*Dataset details*

For the project environment, please use :

*   [PostgresSQL v10.0](https://www.postgresql.org/docs/10/tutorial-install.html)
*   [Python 3.8+ (pip)](https://blog.devgenius.io/python-for-beginners-how-to-install-python-3-8-3-for-windows-pc-a84f5d237c19)

## Architecture

What is the **pipeline structure** of this project?

![Image 2](https://miro.medium.com/v2/resize:fit:700/1*7nHaQWPNGIDxGzPpTVg7WA.jpeg)

*Pipeline Simplify*

Above picture show the outline on what we are going to do to design & model **Data Warehouse** that we are going to use for **Part II**&**Part III**.

## Database

Let’s talk about **database**. The data structure that were used in database is called relational model. It represents data as tables and relations among those tables.

Every row in the table called a **record**, every column is called a **field**.

![Image 3](https://miro.medium.com/v2/resize:fit:700/1*O2sOnkVjQTOqNaCe-PF9MA.png)

*Illustration of database properties*

The data type of a column defines what value the column can hold: **integer, character, date and time, binary, and so on**. Each column in a database table is required to have a **name**and a**data type**. As basics, I will try to review the datatypes used in our project.

![Image 4](https://miro.medium.com/v2/resize:fit:700/1*KMnizRKHAg7Ru9hAE-E3iw.jpeg)

*Datatypes used in project (SQL)*

After loading the `.csv` dataset into database, we need to **identify the relationship** between data. The relationship between can be seen below

![Image 5](https://miro.medium.com/v2/resize:fit:700/1*SUOv5LCTXZLO0nKAeQgN-w.jpeg)

*Relationship between entity*

After we map the relationship, we can make create & load the data into database. Here are the **schema** that we will use as our **database schema**.

![Image 6](https://miro.medium.com/v2/resize:fit:700/1*22SV0YV9_nPTckIZyRfHIQ.png)

*Transactional Database Schema*

## Data Warehouse

> The **data warehouse** is a specific infrastructure element that provides down-the-line users, including data analysts and data scientists, access to data that has been shaped to conform to business rules and is stored in an easy-to-query format

The data must conform to specific business rules that validate quality. Then it is stored in a denormalized structure — _that means storing together pieces of information that will likely be queried together_. This serves to increase performance by decreasing the complexity of queries required to get data out of the warehouse (i.e., by reducing the number of data joins).

In order to answer the business question that we have (will be explained in **Part II**), we need to create a data warehouse schema that can provide information that we will use for **Part II**&**Part III**. We will use **star schema** for our warehouse. The granularity for our warehouse are **1 product for each order**, which means that for each row in _Fact Order Item_ has the details for 1 product from an order.

Before we start, I would like to give an overview about concepts that we will using to model the data warehouse :

**Star schema** is a mature modeling approach for data warehouse which requires modelers to classify their model tables as either dimension or fact.

**Dimension tables** describe business entities — the things you model. Entities can include products, people, places, and concepts including time itself. The most consistent table you’ll find in a star schema is a date dimension table. A dimension table contains a key column (or columns) that acts as a unique identifier, and descriptive columns.

**Fact tables** store observations or events, and can be sales orders, stock balances, exchange rates, temperatures, etc. A fact table contains dimension key columns that relate to dimension tables, and numeric measure columns. The dimension key columns determine the dimensionality of a fact table, while the dimension key values determine the granularity of a fact table.

![Image 7](https://miro.medium.com/v2/resize:fit:700/1*gUhA6fbkoEtFoiIVXHzSlg.png)

*Star Schema Illustration*

A **slowly changing dimension** (SCD) is one that appropriately manages change of dimension members over time. It applies when business entity values change over time, and in an ad hoc manner. A good example of a _slowly_ changing dimension is a customer dimension, specifically its contact detail columns like email address and phone number. In contrast, some dimensions are considered to be _rapidly_ changing when a dimension attribute changes often, like a stock’s market price. The common design approach in these instances is to store rapidly changing attribute values in a fact table measure.

Star schema design theory refers to two common SCD types: Type 1 and Type 2. A dimension-type table could be Type 1 or Type 2, or support both types simultaneously for different columns. But here, we only use Type 2 SCD (or not SCD at all like for time dimension).

### Type 2 SCD

A **Type 2****SCD** supports versioning of dimension members. If the source system doesn’t store versions, then it’s usually the data warehouse load process that detects changes, and appropriately manages the change in a dimension table. In this case, the dimension table must use a surrogate key to provide a unique reference to a _version_ of the dimension member. It also includes columns that define the date range validity of the version (for example, **StartDate** and **EndDate**) and possibly a flag column (for example, **IsCurrent**) to easily filter by current dimension members.

So, to create the data warehouse with star schema, we need **dimension**and **fact table**

![Image 8](https://miro.medium.com/v2/resize:fit:700/1*v_FfXw40bhybcv2E83GemQ.jpeg)

*Dimension Table Details*

In **star schema** design, a **measure** is a fact table column that stores values to be summarized. Here, our fact table store 5 different types of measure from **each product from an order** :

*   Price
*   Shipping cost
*   Payment value
*   User lifetime spending
*   User lifetime order

To connect data between fact table and dimension table, we need a surrogate key. A **surrogate key** is a unique identifier that you add to a table to support star schema modeling. By definition, it’s not defined or stored in the source data. Commonly, surrogate keys are added to relational data warehouse dimension tables to provide a unique identifier for each dimension table row.

![Image 9](https://miro.medium.com/v2/resize:fit:547/1*q--ruDe3SvTLVuWjztYI1w.jpeg)

Surrogate Key for each Dimension Table

After we prepared all of the dimension and fact table, here are the end result (schema) for our data warehouse modelling.

![Image 10](https://miro.medium.com/v2/resize:fit:700/1*e3mqXFqBZfGCkHWLAAUIrQ.png)

Data Warehouse Schema (Simplified)

## ETL Pipeline

To load data from our **OLTP**(Database) into **OLAP**(Data Warehouse) we need a pipeline for ETL. To do that, we need to create an ETL process for each dimension and fact table.

The image above lays out the processing structure for our etl pipeline. Also, we use **PostgresSQL** for data storage, our transformation logic to move data from **A (OLTP) to B(OLAP)** is carried out using **SQL and Python** (no 3rd party tools).

For the data source, I mainly use 2 types of data sources :

*   Database (OLTP)
*   External Data (Flat Files), such as [Cities Map](https://simplemaps.com/data/id-cities) and [Datetime in excel](https://blog.crossjoin.co.uk/2015/06/26/automatically-generating-date-dimension-tables-in-excel-2016-power-pivot/)

That’s the end of the concept that we use when implementing data engineering part. For the implementation itself, please kindly check the Part I-II : Data Warehouse Modelling Implementation. Stay safe and stay grinding 🔥!!
