/** Auto-generated type declaration. Do not edit manually. */

import type { GxControl } from "./GxControl";

export interface GxGridColumn {
  readonly title: string;
  readonly visible: boolean;
  readonly gxColumnClass: string;
  readonly gxControl: GxControl;
  readonly gxAttId: string;
  readonly gxAttName: string;
  readonly htmlName: string;
  readonly index: number;

  // UserControl
  readonly Icon: string;
  readonly NamePosition: "title" | "text";
  readonly HeaderClass: string;
  Hidden: number;
  readonly Hideable: number;
  readonly Sortable: number;
  readonly Filterable: number;
  readonly Resizeable: number;
  Size: "min" | "max" | "minmax" | "auto" | "length" | "css";
  SizeLength: string;
  SizeMinLength: string;
  SizeMaxLength: string;
  SizeVariableName: string;
  readonly FilterMode: "single" | "range";
  readonly FilterEnum: GridChameleonColumnFilterEnum[];
  readonly FilterDateTimeAsDate: number;
  readonly FilterCaption: string;
  readonly FilterLabelEqual: string;
  readonly FilterLabelLess: string;
  readonly FilterLabelGreater: string;
  SortDirection: "asc" | "desc";

  order: number;
  filterEqual: string;
  filterLess: string;
  filterGreater: string;
  isFiltering: boolean;

  render: boolean;
}
