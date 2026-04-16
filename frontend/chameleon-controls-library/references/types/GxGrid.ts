/** Auto-generated type declaration. Do not edit manually. */

import type { GxGridCellProperties } from "./GxGridCellProperties";
import type { GxGridColumn } from "./GxGridColumn";
import type { GxGridRow } from "./GxGridRow";
import type { GxObject } from "./GxObject";

export interface GxGrid {
  readonly gxId: number;
  readonly ControlName: string;
  readonly columns: GxGridColumn[];
  readonly rows: GxGridRow[];
  readonly usePaging: boolean;
  firstRecordOnPage: string;
  eof: number;
  readonly pageSize: number;
  readonly properties: GxGridCellProperties[][];
  readonly ParentObject: GxObject;
  readonly header: string;
  readonly Class: string;
  readonly gxAllowSelection: boolean;
  readonly gxAllowHovering: boolean;
  readonly pagingBarClass: string;
  readonly pagingButtonFirstClass: string;
  readonly pagingButtonLastClass: string;
  readonly pagingButtonNextClass: string;
  readonly pagingButtonPreviousClass: string;

  getRowByGxId(gxId: string): GxGridRow;
  setSort(columnIndex: number, asc?: boolean): void;
  selectRow(index: number): void;
  execC2VFunctions(): void;
  executeEvent(columnIndex: number, rowIndex: number): void;
  changeGridPage(direction: string, force?: boolean): any;
  isFirstPage(): boolean;
  isLastPage(): boolean;
  getColumnByHtmlName(htmlName: string): GxGridColumn;

  // UserControl
  readonly SortMode: "client" | "server";

  readonly ColumnsetClass: string;
  readonly ColumnClass: string;
  readonly ColumnFilterClass: string;
  readonly RowClass: string;
  readonly RowEvenClass: string;
  readonly RowOddClass: string;
  readonly RowSelectedClass: string;
  readonly RowHighlightedClass: string;
  readonly CellClass: string;

  readonly FilterButtonApplyText: string;
  readonly FilterButtonResetText: string;

  readonly PaginatorShow: boolean;
  readonly PaginatorNavigationButtonTextPosition: "title" | "text";
  readonly PaginatorPagesShow: boolean;
  readonly PaginatorPagesMaxSize: number;
  readonly PaginatorInfoShow: boolean;
  readonly PaginatorInfoClass: string;
  readonly PaginatorInfoTextMask: string;
  readonly PaginatorInfoEmptyTextMask: string;

  readonly ActionbarHeaderClass: string;
  readonly ActionbarFooterClass: string;

  readonly ActionRefreshPosition: "none" | "header" | "footer";
  readonly ActionRefreshTextPosition: "title" | "text";
  readonly ActionRefreshClass: string;

  readonly ActionSettingsPosition: "none" | "header" | "footer";
  readonly ActionSettingsTextPosition: "title" | "text";
  readonly ActionSettingsClass: string;

  readonly SettingsCloseTextPosition: "title" | "text";

  OnPaginationFirst(): void;
  OnPaginationPrevious(): void;
  OnPaginationNext(): void;
  OnPaginationLast(): void;
}
