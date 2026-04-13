---
name: object-module
description: Encapsulation container for grouping and organizing GeneXus objects with interface definition
---

Encapsulation container for grouping and organizing GeneXus objects with interface definition

---

# DEFINITION
A `Module` object is a GeneXus object designed to group objects from the Knowledge Base, encapsulate functionalities, define interfaces, and facilitate understanding, maintenance, and integration of objects among KBs

---

# SYNTAX
~~~
Module <name>
{
	#Properties
		Description = "<description>"
		Version = "<version>"
		ObjectVisibility = "<visibility>"
		<properties>
	#End

	#Documentation
		<documentation>
	#End
}
~~~

Where:
- `<name>`: Module name using alphanumeric or underscore, starting with letter
- `<description>`: Optional description of the module's purpose
- `<version>`: Optional version identifier
- `<visibility>`: Visibility for objects in the module; values:
	* `Public`: Accessible from any module, included in the module interface, can be distributed
	* `Knowledge Base`: Accessible from any module in the same KB, cannot be distributed
	* `Internal`: Only accessible by objects with a common root module, cannot be distributed
	* `Private`: Only accessible within the same module and its sub-modules, cannot be distributed
- `<properties>`: Optional object properties (see [properties](./properties-object-module.md))
- `<documentation>`: Optional module documentation (check [common-markdown](./common-markdown.md))

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `module`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Modules provide encapsulation and visibility control
- Modules can contain: sub-modules, folders, and objects
- Modules can be distributed and installed in other Knowledge Bases
- Modules allow same object name in different modules
- Modules must contain the `<name>.module.yaml` properties definition
- Modules can be converted into Folders by deleting the `<name>.module.yaml` file
- Folders cannot contain modules (only modules can contain modules)
- Define `Root.module.yaml` file for the `Root Module` if missing in the output folder specified by the user
- All objects belong to a module; defaults to `Root Module` if not specified
- All objects in modules use the fully qualified name syntax `[<module>.]*<name>`, excluding folders; e.g. `Sales.CreateOrder`

---

# EXAMPLES

## Example 1
Simple organization with Folders

KB Structure:
~~~
Root Module
├── Entities (Folder)
│	├── Customer (Transaction)
│	└── Product (Transaction)
├── CustomerApi (Folder)
│	├── CustomerList (Procedure)
│	└── CustomerDetail (Procedure)
└── ProductApi (Folder)
		├── ProductList (Procedure)
		└── ProductDetail (Procedure)
~~~

Saved as:
~~~
<output-directory>/
	Root.module.yaml
	Entities/
		Customer.transaction.main.gx
		Product.transaction.main.gx
	CustomerApi/
		CustomerList.procedure.gx
		CustomerDetail.procedure.gx
	ProductApi/
		ProductList.procedure.gx
		ProductDetail.procedure.gx
~~~

## Example 2
Module with visibility control and sub-modules
~~~
Module ECommerce
{
	#Properties
		Description = "E-commerce platform"
		Version = "3.0.0"
		ObjectVisibility = "Private"
	#End

	#Documentation
		# E-Commerce Platform
		Modular e-commerce solution with catalog, cart and checkout services
	#End
}
~~~

KB Structure:
~~~
Root Module
└── ECommerce (Module)
	├── Catalog (Module)
	│	├── ProductSearch (DataProvider, Public)
	│	├── ProductDetails (Procedure, Public)
	│	└── ProductInfo (SDT, Public)
	├── Cart (Module)
	│	├── AddToCart (Procedure, Public)
	│	├── GetCart (Procedure, Public)
	│	└── CartItem (SDT, Public)
	└── Shared (Folder)
			├── Logger (Procedure, Private)
			└── EmailService (Procedure, Private)
~~~

Saved as:
~~~
<output-directory>/
	Root.module.yaml
	ECommerce/
		ECommerce.module.gx
		Catalog/
			Catalog.module.gx
			ProductSearch.dp.gx
			ProductDetails.procedure.gx
			ProductInfo.sdt.gx
		Cart/
			Cart.module.gx
			AddToCart.procedure.gx
			GetCart.procedure.gx
			CartItem.sdt.gx
		Shared/
			Logger.procedure.gx
			EmailService.procedure.gx
~~~

## Example 3
Module for distribution with Public API
~~~
Module PaymentSDK
{
	#Properties
		Description = "Payment processing SDK"
		Version = "2.1.0"
		ObjectVisibility = "Private"
	#End

	#Documentation
		# Payment SDK

		Payment processing for third-party integration

		## Version History
		- 2.1.0: Added refund support
		- 2.0.0: Initial release
	#End
}
~~~

KB Structure:
~~~
Root Module
└── PaymentSDK (Module)
	├── API (Folder)
	│	├── ProcessPayment (Procedure, Public)
	│	├── GetPaymentStatus (Procedure, Public)
	│	└── RequestRefund (Procedure, Public)
	├── Models (Folder)
	│	├── PaymentInfo (SDT, Public)
	│	└── RefundInfo (SDT, Public)
	└── Internal (Folder)
			├── ValidateCard (Procedure, Private)
			└── EncryptData (Procedure, Private)
~~~

Saved as:
~~~
<output-directory>/
	Root.module.yaml
	PaymentSDK/
		PaymentSDK.module.gx
		API/
			ProcessPayment.procedure.gx
			GetPaymentStatus.procedure.gx
			RequestRefund.procedure.gx
		Models/
			PaymentInfo.sdt.gx
			RefundInfo.sdt.gx
		Internal/
			ValidateCard.procedure.gx
			EncryptData.procedure.gx
~~~
