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
- `<properties>`: Optional module properties; see [properties](./properties-object-module.md)
- `<documentation>`: Optional module documentation; see [markdown](./common-markdown.md)

---

# OUTPUT
Use [global-output](./global-output.md) with:
- Target: `<name>/`
- Documentation: `README.md`
- Properties: `module.toml`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Modules provide encapsulation and visibility control
- Modules can contain: sub-modules, folders, objects, and module-level category directories (`#` prefixed)
- Modules can be distributed and installed in other Knowledge Bases
- Modules allow same object name in different modules
- Define `module.toml` only when properties exist
- Define `README.md` only when documentation; otherwise recommend creation
- Modules must are regular directories on disk; never prepend special character prefix
- Modules can be converted into Folders by adding `@` prefix in target directory name and removing associated `.toml`/`.md` if exist
- Folders cannot contain modules; only modules can contain modules
- Define `src/` as the `Root Module` module target directory
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
src/
	module.toml
	README.md
	@Entities/
		Customer.gx
		Product.gx
	@CustomerApi/
		CustomerList.gx
		CustomerDetail.gx
	@ProductApi/
		ProductList.gx
		ProductDetail.gx
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
	├── Catalog (Module) // with documentation only
	│	├── ProductSearch (DataProvider, Public)
	│	├── ProductDetails (Procedure, Public)
	│	└── ProductInfo (SDT, Public)
	├── Cart (Module) // with properties only
	│	├── AddToCart (Procedure, Public)
	│	├── GetCart (Procedure, Public)
	│	└── CartItem (SDT, Public)
	└── Shared (Folder)
		├── Logger (Procedure, Private)
		└── EmailService (Procedure, Private)
~~~

Saved as:
~~~
src/
	module.toml
	README.md
	ECommerce/
		module.toml
		README.md
		Catalog/
			README.md
			ProductSearch.gx
			ProductDetails.gx
			ProductInfo.gx
		Cart/
			module.toml
			AddToCart.gx
			GetCart.gx
			CartItem.gx
		@Shared/
			Logger.gx
			EmailService.gx
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
src/
	module.toml
	README.md
	PaymentSDK/
		module.toml
		README.md
		@API/
			ProcessPayment.gx
			GetPaymentStatus.gx
			RequestRefund.gx
		@Models/
			PaymentInfo.gx
			RefundInfo.gx
		@Internal/
			ValidateCard.gx
			EncryptData.gx
~~~
