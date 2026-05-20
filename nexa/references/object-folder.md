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
Use [global-output](./global-output.md) with:
- Target: `@<name>/`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Folders are simple organizational containers
- Folders cannot have modules as children (only other folders or objects)
- Folders can be children of modules or other folders
- Folders do not provide encapsulation or visibility control
- Folders are part of the hierarchical tree where the Root Module is the root
- Folders must use `@<name>` directory name on disk
- Folders can be converted into Modules by removing `@` prefix in target directory name and adding associated `.toml`/`.md` if required

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
src/
	README.md
	module.toml
	@Customers/
		CustomerList.gx
		CustomerDetail.gx
	@Products/
		ProductList.gx
		ProductDetail.gx
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
src/
	README.md
	module.toml
	@Sales/
		@Reports/
			SalesReport.gx
			MonthlyReport.gx
		@Transactions/
			CreateOrder.gx
			UpdateOrder.gx
~~~

## Example 3
Folder under a Module

KB Structure:
~~~
Root Module
└── Inventory (Module) // with documentation and properties
	└── Panels (Folder)
		├── ProductList (WebPanel)
		└── ProductDetail (WebPanel)
~~~

Saved as:
~~~
src/
	README.md
	module.toml
	Inventory/
		README.md
		module.toml
		@Panels/
			ProductList.gx
			ProductDetail.gx
~~~

## Example 4
Multiple organizational levels:

KB Structure:
~~~
Root Module
└── BusinessLogic (Module) // with properties only
	├── Model (Folder)
	│	└── Customer (Transaction)
	├── Services (Folder)
	│	└── CustomerService (API)
	└── Utilities (Module) // with documentation only
		└── StringHelper (Procedure)
~~~

Saved as:
~~~
src/
	README.md
	module.toml
	BusinessLogic/
		module.toml
		@Model/
			Customer.gx
		@Services/
			CustomerService.gx
		Utilities/
			README.md
			StringHelper.gx
~~~
