---
name: object-document
description: Document generation using templates
---

Defines document generation from templates with data binding

---

# DEFINITION
A `Document` object stores information within the Knowledge Base

---

# SYNTAX
~~~
Document <name>
{
	<documentation>

	#Properties
		<properties>
	#End
}
~~~

Where:
- `<name>`: Object name using alphanumeric or underscore, starting with letter
- `<documentation>`: Documentation content with Markdown syntax
- `<properties>`: Optional object properties in TOML syntax; see [properties](./properties-object-documentation.md)

---

# OUTPUT
Use [global-output](./global-output.md) with `<type>` value: `document`

---

# CONSTRAINTS
- Use [global-constraints](./global-constraints.md)
- Template file must exist
- Define data bindings with explicit placeholders
- Define dynamic content only with bound data source
- Define `Document` object only in `Root Module`; no folders or named modules

---

# EXAMPLES

## Example 1
Knowledge Base Inventory
~~~
Document Structure_Objects
{
	# GeneXus Knowledge Base: Object Inventory

	This document lists all **objects** defined in the Knowledge Base (KB), organized by type to support documentation, development, and maintenance workflows

	## Table of Contents

	- [Transactions](#transactions)
	- [Procedures](#procedures)
	- [Web Panels](#web-panels)
	- [Data Providers](#data-providers)
	- [Data Selectors](#data-selectors)
	- [Subtypes](#subtypes)
	- [WorkWith Interfaces](#workwith-interfaces)
	- [Dashboards and Reports](#dashboards-and-reports)
	- [Menus and Layouts](#menus-and-layouts)
	- [External Objects](#external-objects)
	- [Other Objects](#other-objects)

	## Transactions

	| Name                         | Description                                   |
	|:-----------------------------|:----------------------------------------------|
	| [[Transaction.Customer]]     | Manages customer information and preferences. |
	| [[Transaction.Country]]      | Defines countries available for travel.       |
	| _…_                        | _Add additional transactions as needed._      |

	## Procedures

	| Name                            | Description                                     |
	|:--------------------------------|:------------------------------------------------|
	| [[Procedure.GenerateItinerary]] | Creates personalized travel itineraries.        |
	| [[Procedure.SyncDestinations]]  | Updates destination lists from external source. |
	| _…_                           | _Add additional procedures as needed._          |

	## Web Panels

	| Name                      | Description                                 |
	|:--------------------------|:--------------------------------------------|
	| [[WebPanel.HomePage]]     | Entry point for users.                      |
	| [[WebPanel.BookingForm]]  | Interface for selecting and booking travel. |
	| _…_                     | _Add additional web panels as needed._      |

	## Data Providers

	| Name                               | Description                                |
	|:-----------------------------------|:-------------------------------------------|
	| [[DataProvider.PopulateCountries]] | Loads list of countries.                   |
	| _…_                              | _Add additional data providers as needed._ |

	## Data Selectors

	| Name                                        | Description                                       |
	|:--------------------------------------------|:--------------------------------------------------|
	| [[DataSelector.FilterCountriesByContinent]] | Filters country list based on continent selected. |
	| _…_                                       | _Add additional data selectors as needed._        |

	## Subtypes

	| Name                          | Base Object                | Description                          |
	|:------------------------------|:---------------------------|:-------------------------------------|
	| [[SubType.OriginCountry]]     | [[Transaction.Country]]    | Country of origin for travel.        |
	| [[SubType.DestinationCountry]]| [[Transaction.Country]]    | Travel destination.                  |
	| _…_                         | _…_                      | _Add additional subtypes as needed._ |

	## WorkWith Interfaces

	| Entity                      | Description                                 |
	|:----------------------------|:--------------------------------------------|
	| [[WorkWith.Customer]]       | CRUD interface for managing customer data.  |
	| [[WorkWith.Country]]        | Interface for managing travel destinations. |
	| _…_                       | _Add additional WorkWith as needed._        |

	## Dashboards and Reports

	| Name                            | Type       | Description                                    |
	|:--------------------------------|:-----------|:-----------------------------------------------|
	| [[Panel.SalesDashboard]]        | Dashboard  | Shows sales KPIs and booking trends.           |
	| [[Procedure.ExportSalesReport]] | Report     | Generates monthly sales report for management. |
	| _…_                           | _…_      | _Add additional dashboards or reports._        |

	## Menus and Layouts

	| Name                       | Type        | Description                                  |
	|:---------------------------|:------------|:---------------------------------------------|
	| [[Menu.MainNavigation]]    | Menu        | Defines primary navigation for the app.      |
	| [[MasterPage.MainLayout]]  | Master Page | Shared layout with header, footer, and menu. |
	| _…_                      | _…_       | _Add additional menus or shared layouts._    |

	## External Objects

	| Name                                 | Description                                    |
	|:-------------------------------------|:-----------------------------------------------|
	| [[ExternalObject.PaymentGatewayAPI]] | Integration with third-party payment services. |
	| _…_                                | _Add external integrations as needed._         |

	## Other Objects

	| Name                                  | Type          | Description                            |
	|:--------------------------------------|:--------------|:---------------------------------------|
	| [[UserControl.ImageSliderComponent]]  | User Control  | Displays rotating destination banners. |
	| _…_                                 | _…_         | _Add other custom or utility objects._ |

	#Properties
		Description = "Object table of contents"
	#End
}
~~~

## Example 2
Functional requirements
~~~
Document Spec_Requirements_Functional
{
	# Functional Requirements: Travel Agency Application

	## Overview

	This document describes the **functional requirements** of a multi-platform travel agency application developed in **GeneXus**. It focuses on the features necessary to deliver a seamless experience for both **end users** and **agency staff** throughout the reservation and itinerary management process

	## User-Focused Features

	### Authentication & Profile Management

	- Users must be able to register, log in, and manage their profiles
	- Each user account is based on the entity [[Transaction.Customer]]

	### Destination Exploration

	- Users can browse available destinations by country and continent
	- All countries are derived from [[Transaction.Country]]

	### Custom Package Creation

	- Users select their origin country from [[SubType.OriginCountry]]
	- They choose a destination using [[SubType.DestinationCountry]]
	- Smart filters are available using [[DataSelector.FilterCountriesByContinent]] to limit choices by region or interest

	### Reservation Workflow

	1. Log in to the application
	2. Choose origin and destination countries
	3. Filter countries by continent (optional)
	4. View available travel packages
	5. Submit reservation
	6. Receive confirmation and itinerary details

	## Agent-Focused Features

	### Customer Management

	- View and edit customer profiles using [[Transaction.Customer]]
	- Access travel history and preferences

	### Itinerary Design

	- Create and edit itineraries linking [[SubType.OriginCountry]] and [[SubType.DestinationCountry]]
	- Ensure logical validations (e.g. origin ≠ destination)

	### Dashboard & Reporting

	- Access dashboards showing:
	- Top destinations
	- Reservations by region
	- Customer engagement metrics

	### Country Catalog Management

	- Use [[DataProvider.PopulateCountries]] to dynamically populate lists of countries
	- Add or remove countries from the travel database as needed

	## Functional Summary

	| Feature                          | Description                                                         |
	|:---------------------------------|:--------------------------------------------------------------------|
	| User Registration & Login        | Authentication via GeneXus GAM                                      |
	| Profile Management               | Update personal info and preferences                                |
	| Destination Selection            | Intelligent dropdowns filtered by continent                         |
	| Travel Package Reservation       | End-to-end reservation and confirmation system                      |
	| Agent Dashboard                  | Reporting interface for agency staff                                |
	| Dynamic Filtering                | Region-based search via [[DataSelector.FilterCountriesByContinent]] |
	| Real-time Catalog Updates        | Powered by [[DataProvider.PopulateCountries]]                       |

	#Properties
		Description = "Functional requirements description"
	#End
}
~~~
