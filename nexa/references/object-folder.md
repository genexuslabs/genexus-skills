---
name: object-folder
description: Container for organizing GeneXus objects in a hierarchical structure
---

Container for organizing GeneXus objects in a hierarchical structure

---

# DEFINITION
A `Folder` object is a simple container used to organize GeneXus objects in a hierarchical tree structure within the Knowledge Base

---

# SYNTAX
N/A

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `folder`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Folders are simple organizational containers
- Folders cannot have modules as children (only other folders or objects)
- Folders can be children of modules or other folders
- Folders do not provide encapsulation or visibility control
- Folders are part of the hierarchical tree where the Root Module is the root
- Folders can be converted into Modules by adding the `<name>.module.yaml` file

---

# HIERARCHY RULES
- Root Module (always exists)
	* Can contain: Modules, Folders, Objects- Module
	* Can contain: Modules, Folders, Objects- Folder
	* Can contain: Folders, Objects (NOT Modules)
---

# EXAMPLES

## Example 1
Simple folder structure

KB Structure:
~~~
Root Module
	├── Customers (Folder)
	│	├── CustomerList (Procedure)
	│	└── CustomerDetail (Procedure)
	└── Products (Folder)
		├── ProductList (Procedure)
		└── ProductDetail (Procedure)
~~~

Saved as:
~~~
<output-directory>/
	Customers/
		CustomerList.procedure.gx
		CustomerDetail.procedure.gx
	Products/
		ProductList.procedure.gx
		ProductDetail.procedure.gx
~~~

## Example 2
Nested folder structure

KB Structure:
~~~
Root Module
└── Sales (Folder)
	├── Reports (Folder)
	│	├── SalesReport (Procedure)
	│	└── MonthlyReport (Procedure)
	└── Transactions (Folder)
		├── CreateOrder (Transaction)
		└── UpdateOrder (Transaction)
~~~

Saved as:
~~~
<output-directory>/
	Sales/
		Reports/
			SalesReport.procedure.gx
			MonthlyReport.procedure.gx
		Transactions/
			CreateOrder.transaction.main.gx
			UpdateOrder.transaction.main.gx
~~~

## Example 3
Folder under a Module

KB Structure:
~~~
Root Module
└── Inventory (Module)
	└── Panels (Folder)
		├── ProductList (WebPanel)
		└── ProductDetail (WebPanel)
~~~

Saved as:
~~~
<output-directory>/
	Inventory/
		Inventory.module.gx
		Panels/
			ProductList.webpanel.gx
			ProductDetail.webpanel.gx
~~~

## Example 4
Multiple organizational levels:

KB Structure:
~~~
Root Module
└── BusinessLogic (Folder)
	├── Model (Folder)
	│	└── Customer (Transaction)
	├── Services (Folder)
	│	└── CustomerService (API)
	└── Utilities (Folder)
		└── StringHelper (Procedure)
~~~

Saved as:
~~~
<output-directory>/
	BusinessLogic
		Model/
			Customer.transaction.main.gx
		Services/
			CustomerService.api.gx
		Utilities/
			StringHelper.procedure.gx
~~~
