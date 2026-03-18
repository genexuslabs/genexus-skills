# Chameleon Types Index

**270+ TypeScript type definitions** for component properties, events, and methods. This file maps each type to the component(s) that use it, so you can quickly find the right type when wiring up Chameleon components

## How to use types

Types are **imported from the Chameleon library** in your project, not from this skill. This skill only serves as a reference to see the exact shape of each type

```ts
import type { AccordionModel, AccordionItemModel } from "@genexus/chameleon-controls-library";
```

## How to navigate

1. **Find your component** in the table of contents below
2. **See which types** that component uses (model, events, callbacks, etc.)
3. **View the type definition** by clicking the link to see its exact shape (properties, unions, etc.)

Each type file in `references/types/` is a `.ts` file named after the type. For example, `AccordionModel.ts` defines the `AccordionModel` type

---

## Table of contents

- [ch-accordion-render](#ch-accordion-render)
- [ch-action-group-render](#ch-action-group-render)
- [ch-action-list-render](#ch-action-list-render)
- [ch-action-menu-render](#ch-action-menu-render)
- [ch-chat](#ch-chat)
- [ch-code-editor / ch-code-diff-editor](#ch-code-editor--ch-code-diff-editor)
- [ch-color-picker](#ch-color-picker)
- [ch-combo-box-render](#ch-combo-box-render)
- [ch-edit](#ch-edit)
- [ch-flexible-layout-render](#ch-flexible-layout-render)
- [ch-image](#ch-image)
- [ch-layout-splitter](#ch-layout-splitter)
- [ch-live-kit-room](#ch-live-kit-room)
- [ch-markdown-viewer](#ch-markdown-viewer)
- [ch-navigation-list-render](#ch-navigation-list-render)
- [ch-paginator-render](#ch-paginator-render)
- [ch-popover](#ch-popover)
- [ch-qr](#ch-qr)
- [ch-radio-group-render](#ch-radio-group-render)
- [ch-segmented-control-render](#ch-segmented-control-render)
- [ch-smart-grid / ch-virtual-scroller](#ch-smart-grid--ch-virtual-scroller)
- [ch-tab-render](#ch-tab-render)
- [ch-tabular-grid](#ch-tabular-grid)
- [ch-theme](#ch-theme)
- [ch-tree-view-render](#ch-tree-view-render)
- [Shared / cross-component](#shared--cross-component)

---

## ch-accordion-render

| Type | Role | Definition |
|------|------|------------|
| AccordionModel | Model array for the accordion | [View](types/AccordionModel.ts) |
| AccordionItemModel | Single accordion item (caption, expanded, nested items) | [View](types/AccordionItemModel.ts) |
| AccordionItemModelExpandedSize | Expanded size value for an item | [View](types/AccordionItemModelExpandedSize.ts) |
| AccordionItemModelExpandedSizeUnit | Size unit (px, %, fr) | [View](types/AccordionItemModelExpandedSizeUnit.ts) |
| AccordionItemExpandedChangeEvent | Event detail when item expands/collapses | [View](types/AccordionItemExpandedChangeEvent.ts) |

## ch-action-group-render

| Type | Role | Definition |
|------|------|------------|
| ActionGroupModel | Model array for the action group | [View](types/ActionGroupModel.ts) |
| ActionGroupItemModel | Union type for group items | [View](types/ActionGroupItemModel.ts) |
| ActionGroupActionableModel | Actionable item (button, link) | [View](types/ActionGroupActionableModel.ts) |
| ActionGroupSeparatorModel | Visual separator between actions | [View](types/ActionGroupSeparatorModel.ts) |
| ActionGroupSlotModel | Custom slot item | [View](types/ActionGroupSlotModel.ts) |
| ItemsOverflowBehavior | Controls responsive collapse behavior | [View](types/ItemsOverflowBehavior.ts) |

## ch-action-list-render

| Type | Role | Definition |
|------|------|------------|
| ActionListModel | Model array for the list | [View](types/ActionListModel.ts) |
| ActionListItemModel | Union type for list items | [View](types/ActionListItemModel.ts) |
| ActionListItemActionable | Actionable item with selection, checkbox, etc. | [View](types/ActionListItemActionable.ts) |
| ActionListItemGroup | Group header | [View](types/ActionListItemGroup.ts) |
| ActionListItemSeparator | Visual separator | [View](types/ActionListItemSeparator.ts) |
| ActionListItemType | Item type discriminator | [View](types/ActionListItemType.ts) |
| ActionListItemAdditionalModel | Additional content/actions on items | [View](types/ActionListItemAdditionalModel.ts) |
| ActionListItemAdditionalItem | Additional action item | [View](types/ActionListItemAdditionalItem.ts) |
| ActionListItemAdditionalAction | Action with callback | [View](types/ActionListItemAdditionalAction.ts) |
| ActionListItemAdditionalCustom | Custom slot content | [View](types/ActionListItemAdditionalCustom.ts) |
| ActionListItemAdditionalInformation | Info badge | [View](types/ActionListItemAdditionalInformation.ts) |
| ActionListItemAdditionalSlot | Slot-based content | [View](types/ActionListItemAdditionalSlot.ts) |
| ActionListItemAdditionalBase | Base type for additional items | [View](types/ActionListItemAdditionalBase.ts) |
| ActionListItemAdditionalItemActionType | Action type discriminator | [View](types/ActionListItemAdditionalItemActionType.ts) |
| ActionListItemModelExtended | Extended item with runtime state | [View](types/ActionListItemModelExtended.ts) |
| ActionListItemModelExtendedGroup | Extended group item | [View](types/ActionListItemModelExtendedGroup.ts) |
| ActionListItemModelExtendedRoot | Extended root item | [View](types/ActionListItemModelExtendedRoot.ts) |
| ActionListCaptionChangeEventDetail | Event: caption edited | [View](types/ActionListCaptionChangeEventDetail.ts) |
| ActionListFixedChangeEventDetail | Event: pinned state changed | [View](types/ActionListFixedChangeEventDetail.ts) |
| ActionListImagePathCallback | Callback for dynamic image paths | [View](types/ActionListImagePathCallback.ts) |
| ActionListTranslations | i18n strings | [View](types/ActionListTranslations.ts) |

## ch-action-menu-render

| Type | Role | Definition |
|------|------|------------|
| ActionMenuModel | Model array for the menu | [View](types/ActionMenuModel.ts) |
| ActionMenuItemModel | Union type for menu items | [View](types/ActionMenuItemModel.ts) |
| ActionMenuItemActionableModel | Clickable menu item | [View](types/ActionMenuItemActionableModel.ts) |
| ActionMenuItemSeparatorModel | Visual separator | [View](types/ActionMenuItemSeparatorModel.ts) |
| ActionMenuItemSlotModel | Custom slot item | [View](types/ActionMenuItemSlotModel.ts) |
| ActionMenuExpandedChangeEvent | Event: submenu opened/closed | [View](types/ActionMenuExpandedChangeEvent.ts) |
| ActionMenuHyperlinkClickEvent | Event: link clicked | [View](types/ActionMenuHyperlinkClickEvent.ts) |
| ActionMenuImagePathCallback | Callback for dynamic image paths | [View](types/ActionMenuImagePathCallback.ts) |
| ActionMenuItemTypeActionable | Type discriminator for actionable | [View](types/ActionMenuItemTypeActionable.ts) |
| ActionMenuItemTypeSeparator | Type discriminator for separator | [View](types/ActionMenuItemTypeSeparator.ts) |
| ActionMenuItemTypeSlot | Type discriminator for slot | [View](types/ActionMenuItemTypeSlot.ts) |

## ch-chat

| Type | Role | Definition |
|------|------|------------|
| ChatCallbacks | Callbacks for send, stop, image generation, etc. | [View](types/ChatCallbacks.ts) |
| ChatMessage | Union of all message types | [View](types/ChatMessage.ts) |
| ChatMessageUser | User message | [View](types/ChatMessageUser.ts) |
| ChatMessageAssistant | Assistant message | [View](types/ChatMessageAssistant.ts) |
| ChatMessageSystem | System message | [View](types/ChatMessageSystem.ts) |
| ChatMessageError | Error message | [View](types/ChatMessageError.ts) |
| ChatMessageRole | Message role enum | [View](types/ChatMessageRole.ts) |
| ChatMessageByRole | Message type by role | [View](types/ChatMessageByRole.ts) |
| ChatMessageByRoleNoId | Message without ID | [View](types/ChatMessageByRoleNoId.ts) |
| ChatMessageContent | Message content model | [View](types/ChatMessageContent.ts) |
| ChatMessageFile | File attachment | [View](types/ChatMessageFile.ts) |
| ChatMessageFiles | File collection | [View](types/ChatMessageFiles.ts) |
| ChatMessageSource | Source reference | [View](types/ChatMessageSource.ts) |
| ChatMessageSources | Source collection | [View](types/ChatMessageSources.ts) |
| ChatMessageContentFilesAndSources | Content with files and sources | [View](types/ChatMessageContentFilesAndSources.ts) |
| ChatMessageRenderByItem | Per-item render function | [View](types/ChatMessageRenderByItem.ts) |
| ChatMessageRenderBySections | Section-based render function | [View](types/ChatMessageRenderBySections.ts) |
| ChatMessageStructureRender | Structure render function | [View](types/ChatMessageStructureRender.ts) |
| ChatContentRender | Custom content renderer | [View](types/ChatContentRender.ts) |
| ChatCodeBlockRender | Custom code block renderer | [View](types/ChatCodeBlockRender.ts) |
| ChatFileRender | Custom file renderer | [View](types/ChatFileRender.ts) |
| ChatSourceRender | Custom source renderer | [View](types/ChatSourceRender.ts) |
| ChatActionsRender | Custom actions renderer | [View](types/ChatActionsRender.ts) |
| ChatFileUploadState | File upload progress state | [View](types/ChatFileUploadState.ts) |
| ChatSendContainerLayout | Send container layout config | [View](types/ChatSendContainerLayout.ts) |
| ChatSendContainerLayoutElement | Layout element in send container | [View](types/ChatSendContainerLayoutElement.ts) |
| ChatLiveModeConfiguration | Live mode (voice) config | [View](types/ChatLiveModeConfiguration.ts) |
| ChatTranslations | i18n strings | [View](types/ChatTranslations.ts) |

## ch-code-editor / ch-code-diff-editor

| Type | Role | Definition |
|------|------|------------|
| CodeEditorOptions | Monaco editor options | [View](types/CodeEditorOptions.ts) |
| CodeDiffEditorOptions | Monaco diff editor options | [View](types/CodeDiffEditorOptions.ts) |

## ch-color-picker

| Type | Role | Definition |
|------|------|------------|
| ColorPickerControlsOrder | Order of color controls | [View](types/ColorPickerControlsOrder.ts) |
| ColorPickerTranslations | i18n strings | [View](types/ColorPickerTranslations.ts) |
| ColorVariants | Color format variants | [View](types/ColorVariants.ts) |

## ch-combo-box-render

| Type | Role | Definition |
|------|------|------------|
| ComboBoxModel | Model array for the combo box | [View](types/ComboBoxModel.ts) |
| ComboBoxItemModel | Union type for items | [View](types/ComboBoxItemModel.ts) |
| ComboBoxItemLeaf | Selectable leaf item | [View](types/ComboBoxItemLeaf.ts) |
| ComboBoxItemGroup | Group header | [View](types/ComboBoxItemGroup.ts) |
| ComboBoxSuggestOptions | Suggest/autocomplete configuration | [View](types/ComboBoxSuggestOptions.ts) |
| ComboBoxImagePathCallback | Callback for dynamic image paths | [View](types/ComboBoxImagePathCallback.ts) |

## ch-edit

| Type | Role | Definition |
|------|------|------------|
| EditType | Input type (text, password, email, number, etc.) | [View](types/EditType.ts) |
| EditInputMode | Input mode (numeric, tel, etc.) | [View](types/EditInputMode.ts) |
| EditTranslations | i18n strings | [View](types/EditTranslations.ts) |

## ch-flexible-layout-render

| Type | Role | Definition |
|------|------|------------|
| FlexibleLayoutModel | Root layout model | [View](types/FlexibleLayoutModel.ts) |
| FlexibleLayoutGroupModel | Group of layout items | [View](types/FlexibleLayoutGroupModel.ts) |
| FlexibleLayoutItemModel | Union of layout items | [View](types/FlexibleLayoutItemModel.ts) |
| FlexibleLayoutLeafModel | Terminal (non-group) layout node | [View](types/FlexibleLayoutLeafModel.ts) |
| FlexibleLayoutLeafType | Leaf type (tab, single-content) | [View](types/FlexibleLayoutLeafType.ts) |
| FlexibleLayoutLeafConfiguration | Leaf configuration | [View](types/FlexibleLayoutLeafConfiguration.ts) |
| FlexibleLayoutLeafConfigurationTabbed | Tab-based leaf config | [View](types/FlexibleLayoutLeafConfigurationTabbed.ts) |
| FlexibleLayoutLeafConfigurationSingleContent | Single-content leaf config | [View](types/FlexibleLayoutLeafConfigurationSingleContent.ts) |
| FlexibleLayoutLeafInfo | Runtime leaf info | [View](types/FlexibleLayoutLeafInfo.ts) |
| FlexibleLayoutItemExtended | Extended item with runtime state | [View](types/FlexibleLayoutItemExtended.ts) |
| FlexibleLayoutWidget | Widget definition | [View](types/FlexibleLayoutWidget.ts) |
| FlexibleLayoutWidgetRender | Widget render function | [View](types/FlexibleLayoutWidgetRender.ts) |
| FlexibleLayoutWidgetCloseInfo | Widget close event detail | [View](types/FlexibleLayoutWidgetCloseInfo.ts) |
| FlexibleLayoutRenderedWidgets | Collection of rendered widgets | [View](types/FlexibleLayoutRenderedWidgets.ts) |
| FlexibleLayoutRenders | Render callbacks | [View](types/FlexibleLayoutRenders.ts) |
| FlexibleLayoutViewRemoveResult | Result of removing a view | [View](types/FlexibleLayoutViewRemoveResult.ts) |
| DraggableViewInfo | Drag info for views | [View](types/DraggableViewInfo.ts) |
| DroppableArea | Drop target area | [View](types/DroppableArea.ts) |
| WidgetDragInfo | Widget drag event detail | [View](types/WidgetDragInfo.ts) |
| WidgetDropInfo | Widget drop event detail | [View](types/WidgetDropInfo.ts) |
| WidgetReorderInfo | Widget reorder event detail | [View](types/WidgetReorderInfo.ts) |

## ch-image

| Type | Role | Definition |
|------|------|------------|
| GxImageMultiState | Multi-state image configuration | [View](types/GxImageMultiState.ts) |
| ImageRender | Image render callback | [View](types/ImageRender.ts) |

## ch-layout-splitter

| Type | Role | Definition |
|------|------|------------|
| LayoutSplitterModel | Root splitter model | [View](types/LayoutSplitterModel.ts) |
| LayoutSplitterGroupModel | Group of split items | [View](types/LayoutSplitterGroupModel.ts) |
| LayoutSplitterItemModel | Union of splitter items | [View](types/LayoutSplitterItemModel.ts) |
| LayoutSplitterLeafModel | Terminal split panel | [View](types/LayoutSplitterLeafModel.ts) |
| LayoutSplitterDirection | Split direction (rows/columns) | [View](types/LayoutSplitterDirection.ts) |
| LayoutSplitterSize | Panel size value | [View](types/LayoutSplitterSize.ts) |
| LayoutSplitterSticky | Sticky behavior config | [View](types/LayoutSplitterSticky.ts) |
| LayoutSplitterDragBarConfig | Drag bar configuration | [View](types/LayoutSplitterDragBarConfig.ts) |
| LayoutSplitterItemAddResult | Result of adding an item | [View](types/LayoutSplitterItemAddResult.ts) |
| LayoutSplitterItemRemoveResult | Result of removing an item | [View](types/LayoutSplitterItemRemoveResult.ts) |
| LayoutSplitterReconnectedSubtree | Reconnected subtree info | [View](types/LayoutSplitterReconnectedSubtree.ts) |

## ch-live-kit-room

| Type | Role | Definition |
|------|------|------------|
| LiveKitCallbacks | Callbacks for room events | [View](types/LiveKitCallbacks.ts) |
| LiveKitConnectionListener | Connection state listener | [View](types/LiveKitConnectionListener.ts) |

## ch-markdown-viewer

| Type | Role | Definition |
|------|------|------------|
| MarkdownViewerCodeRender | Custom code block renderer | [View](types/MarkdownViewerCodeRender.ts) |
| MarkdownViewerCodeRenderOptions | Code render options | [View](types/MarkdownViewerCodeRenderOptions.ts) |
| MarkdownViewerExtension | Markdown extension | [View](types/MarkdownViewerExtension.ts) |
| MarkdownViewerExtensionRender | Extension render function | [View](types/MarkdownViewerExtensionRender.ts) |
| MarkdownViewerExtensionRenderFunction | Extension render callback | [View](types/MarkdownViewerExtensionRenderFunction.ts) |

## ch-navigation-list-render

| Type | Role | Definition |
|------|------|------------|
| NavigationListModel | Model array for the nav list | [View](types/NavigationListModel.ts) |
| NavigationListItemModel | Single navigation item | [View](types/NavigationListItemModel.ts) |
| NavigationListHyperlinkClickEvent | Event: link clicked | [View](types/NavigationListHyperlinkClickEvent.ts) |

## ch-paginator-render

| Type | Role | Definition |
|------|------|------------|
| PaginatorRenderModel | Union of paginator models | [View](types/PaginatorRenderModel.ts) |
| PaginatorRenderNumericModel | Numeric paginator config | [View](types/PaginatorRenderNumericModel.ts) |
| PaginatorRenderHyperlinkModel | Hyperlink paginator config | [View](types/PaginatorRenderHyperlinkModel.ts) |
| PaginatorRenderHyperlinkItemModel | Single hyperlink page item | [View](types/PaginatorRenderHyperlinkItemModel.ts) |
| PaginatorControlsOrder | Controls layout order | [View](types/PaginatorControlsOrder.ts) |
| PaginatorTranslations | i18n strings | [View](types/PaginatorTranslations.ts) |
| ChPaginatorNavigateClickedEvent | Event: page navigated | [View](types/ChPaginatorNavigateClickedEvent.ts) |
| ChPaginatorNavigateType | Navigation type (prev, next, page, etc.) | [View](types/ChPaginatorNavigateType.ts) |

## ch-popover

| Type | Role | Definition |
|------|------|------------|
| ChPopoverAlign | Alignment config (block + inline) | [View](types/ChPopoverAlign.ts) |
| ChPopoverSizeMatch | Size matching with trigger | [View](types/ChPopoverSizeMatch.ts) |
| PopoverActionElement | Action element reference | [View](types/PopoverActionElement.ts) |
| PopoverClosedInfo | Close event detail | [View](types/PopoverClosedInfo.ts) |

## ch-qr

| Type | Role | Definition |
|------|------|------------|
| ErrorCorrectionLevel | QR error correction level (L, M, Q, H) | [View](types/ErrorCorrectionLevel.ts) |

## ch-radio-group-render

| Type | Role | Definition |
|------|------|------------|
| RadioGroupModel | Model array for the radio group | [View](types/RadioGroupModel.ts) |
| RadioGroupItemModel | Single radio option | [View](types/RadioGroupItemModel.ts) |

## ch-segmented-control-render

| Type | Role | Definition |
|------|------|------------|
| SegmentedControlModel | Model array for the segmented control | [View](types/SegmentedControlModel.ts) |
| SegmentedControlItemModel | Single segment option | [View](types/SegmentedControlItemModel.ts) |

## ch-smart-grid / ch-virtual-scroller

| Type | Role | Definition |
|------|------|------------|
| SmartGridModel | Model array for the smart grid | [View](types/SmartGridModel.ts) |
| SmartGridItem | Single grid item | [View](types/SmartGridItem.ts) |
| SmartGridDataState | Data loading state | [View](types/SmartGridDataState.ts) |
| VirtualScrollVirtualItems | Virtual items collection | [View](types/VirtualScrollVirtualItems.ts) |
| CssContainProperty | CSS contain property values | [View](types/CssContainProperty.ts) |
| CssOverflowProperty | CSS overflow property values | [View](types/CssOverflowProperty.ts) |

## ch-tab-render

| Type | Role | Definition |
|------|------|------------|
| TabModel | Model array for tabs | [View](types/TabModel.ts) |
| TabItemModel | Single tab item | [View](types/TabItemModel.ts) |
| TabListPosition | Tab list position (top, bottom, etc.) | [View](types/TabListPosition.ts) |
| TabSelectedItemInfo | Event: tab selected | [View](types/TabSelectedItemInfo.ts) |
| TabItemCloseInfo | Event: tab closed | [View](types/TabItemCloseInfo.ts) |

## ch-tabular-grid

| Type | Role | Definition |
|------|------|------------|
| TabularGridModel | Grid model | [View](types/TabularGridModel.ts) |
| TabularGridColumnsModel | Columns model | [View](types/TabularGridColumnsModel.ts) |
| TabularGridColumnItemModel | Single column definition | [View](types/TabularGridColumnItemModel.ts) |
| TabularGridRowsModel | Rows model | [View](types/TabularGridRowsModel.ts) |
| TabularGridRowItemModel | Single row definition | [View](types/TabularGridRowItemModel.ts) |
| TabularGridCellsModel | Cells model | [View](types/TabularGridCellsModel.ts) |
| TabularGridCellItemModel | Single cell definition | [View](types/TabularGridCellItemModel.ts) |
| TabularGridRowsetsModel | Rowsets model | [View](types/TabularGridRowsetsModel.ts) |
| TabularGridRowsetsGroupModel | Rowset group | [View](types/TabularGridRowsetsGroupModel.ts) |
| TabularGridRowsetItemGroupModel | Rowset group item | [View](types/TabularGridRowsetItemGroupModel.ts) |
| TabularGridRowsetItemSimpleModel | Simple rowset item | [View](types/TabularGridRowsetItemSimpleModel.ts) |
| TabularGridColumnFreeze | Column freeze position | [View](types/TabularGridColumnFreeze.ts) |
| TabularGridColumnSortDirection | Sort direction | [View](types/TabularGridColumnSortDirection.ts) |
| TabularGridSelectionChangedEvent | Event: selection changed | [View](types/TabularGridSelectionChangedEvent.ts) |
| TabularGridCellSelectionChangedEvent | Event: cell selection changed | [View](types/TabularGridCellSelectionChangedEvent.ts) |
| TabularGridCellSelectorClickedEvent | Event: cell selector clicked | [View](types/TabularGridCellSelectorClickedEvent.ts) |
| TabularGridColumnSelectorClickedEvent | Event: column selector clicked | [View](types/TabularGridColumnSelectorClickedEvent.ts) |
| TabularGridRowClickedEvent | Event: row clicked | [View](types/TabularGridRowClickedEvent.ts) |
| TabularGridRowPressedEvent | Event: row pressed | [View](types/TabularGridRowPressedEvent.ts) |
| TabularGridRowContextMenuEvent | Event: row context menu | [View](types/TabularGridRowContextMenuEvent.ts) |
| TabularGridMarkingChangedEvent | Event: marking changed | [View](types/TabularGridMarkingChangedEvent.ts) |
| TabularGridColumnDragEvent | Event: column dragged | [View](types/TabularGridColumnDragEvent.ts) |
| TabularGridColumnResizeEvent | Event: column resized | [View](types/TabularGridColumnResizeEvent.ts) |
| TabularGridColumnFreezeChangedEvent | Event: freeze changed | [View](types/TabularGridColumnFreezeChangedEvent.ts) |
| TabularGridColumnHiddenChangedEvent | Event: column hidden/shown | [View](types/TabularGridColumnHiddenChangedEvent.ts) |
| TabularGridColumnOrderChangedEvent | Event: column order changed | [View](types/TabularGridColumnOrderChangedEvent.ts) |
| TabularGridColumnSizeChangedEvent | Event: column size changed | [View](types/TabularGridColumnSizeChangedEvent.ts) |
| TabularGridColumnSortChangedEvent | Event: sort changed | [View](types/TabularGridColumnSortChangedEvent.ts) |
| TabularGridRowDragEvent | Event: row dragged | [View](types/TabularGridRowDragEvent.ts) |
| GridChameleonState | Saved grid state | [View](types/GridChameleonState.ts) |
| GridChameleonStateColumn | Column state | [View](types/GridChameleonStateColumn.ts) |
| GridChameleonStateColumnFilter | Column filter state | [View](types/GridChameleonStateColumnFilter.ts) |

### Legacy grid types (ch-grid compatibility)

| Type | Role | Definition |
|------|------|------------|
| ChGridColumnFreeze | Column freeze (legacy) | [View](types/ChGridColumnFreeze.ts) |
| ChGridColumnFreezeChangedEvent | Freeze changed event (legacy) | [View](types/ChGridColumnFreezeChangedEvent.ts) |
| ChGridColumnHiddenChangedEvent | Column hidden event (legacy) | [View](types/ChGridColumnHiddenChangedEvent.ts) |
| ChGridColumnOrderChangedEvent | Column order event (legacy) | [View](types/ChGridColumnOrderChangedEvent.ts) |
| ChGridColumnSizeChangedEvent | Column size event (legacy) | [View](types/ChGridColumnSizeChangedEvent.ts) |
| ChGridColumnSortChangedEvent | Sort changed event (legacy) | [View](types/ChGridColumnSortChangedEvent.ts) |
| ChGridColumnSortDirection | Sort direction (legacy) | [View](types/ChGridColumnSortDirection.ts) |
| ChGridRowClickedEvent | Row clicked event (legacy) | [View](types/ChGridRowClickedEvent.ts) |
| ChGridSelectionChangedEvent | Selection changed event (legacy) | [View](types/ChGridSelectionChangedEvent.ts) |

## ch-theme

| Type | Role | Definition |
|------|------|------------|
| ThemeModel | Model array for theme stylesheets | [View](types/ThemeModel.ts) |
| ThemeItemModel | Union of theme item types | [View](types/ThemeItemModel.ts) |
| ThemeItemBaseModel | Base theme item | [View](types/ThemeItemBaseModel.ts) |
| ThemeItemModelStyleSheet | Inline stylesheet item | [View](types/ThemeItemModelStyleSheet.ts) |
| ThemeItemModelUrl | URL stylesheet item | [View](types/ThemeItemModelUrl.ts) |
| ChThemeLoadedEvent | Event: theme loaded | [View](types/ChThemeLoadedEvent.ts) |

## ch-tree-view-render

| Type | Role | Definition |
|------|------|------------|
| TreeViewModel | Model array for the tree | [View](types/TreeViewModel.ts) |
| TreeViewItemModel | Single tree item | [View](types/TreeViewItemModel.ts) |
| TreeViewItemModelExtended | Extended item with runtime state | [View](types/TreeViewItemModelExtended.ts) |
| TreeViewItemImageMultiState | Multi-state image for tree items | [View](types/TreeViewItemImageMultiState.ts) |
| TreeViewLines | Tree line style | [View](types/TreeViewLines.ts) |
| TreeViewFilterOptions | Filter configuration | [View](types/TreeViewFilterOptions.ts) |
| TreeViewFilterType | Filter type | [View](types/TreeViewFilterType.ts) |
| LazyLoadTreeItemsCallback | Callback for lazy-loading children | [View](types/LazyLoadTreeItemsCallback.ts) |
| TreeViewItemSelected | Selected item reference | [View](types/TreeViewItemSelected.ts) |
| TreeViewItemSelectedInfo | Event: item selected | [View](types/TreeViewItemSelectedInfo.ts) |
| TreeViewItemExpandedInfo | Event: item expanded/collapsed | [View](types/TreeViewItemExpandedInfo.ts) |
| TreeViewItemCheckedInfo | Event: item checked | [View](types/TreeViewItemCheckedInfo.ts) |
| TreeViewItemNewCaption | Event: caption edited | [View](types/TreeViewItemNewCaption.ts) |
| TreeViewItemOpenReferenceInfo | Event: reference opened | [View](types/TreeViewItemOpenReferenceInfo.ts) |
| TreeViewItemContextMenu | Event: context menu opened | [View](types/TreeViewItemContextMenu.ts) |
| TreeViewItemDragStartInfo | Event: drag started | [View](types/TreeViewItemDragStartInfo.ts) |
| TreeViewDataTransferInfo | Drag data transfer | [View](types/TreeViewDataTransferInfo.ts) |
| TreeViewDropCheckInfo | Drop target validation | [View](types/TreeViewDropCheckInfo.ts) |
| TreeViewDropType | Drop type (before, after, inside) | [View](types/TreeViewDropType.ts) |
| TreeViewOperationStatus | Operation result status | [View](types/TreeViewOperationStatus.ts) |
| TreeViewOperationStatusModifyCaption | Caption modification result | [View](types/TreeViewOperationStatusModifyCaption.ts) |
| TreeViewImagePathCallback | Callback for dynamic image paths | [View](types/TreeViewImagePathCallback.ts) |

## Shared / cross-component

| Type | Role | Definition |
|------|------|------------|
| AccessibleRole | ARIA role values | [View](types/AccessibleRole.ts) |
| ViewAccessibleRole | View accessible role | [View](types/ViewAccessibleRole.ts) |
| ViewItemCloseInfo | View item close event | [View](types/ViewItemCloseInfo.ts) |
| ViewSelectedItemInfo | View selected item event | [View](types/ViewSelectedItemInfo.ts) |
| ItemLink | Hyperlink configuration | [View](types/ItemLink.ts) |
| DataModel | Generic data model | [View](types/DataModel.ts) |
| NotificationMessage | Notification message | [View](types/NotificationMessage.ts) |
| NotificationMessageWithDelay | Timed notification | [View](types/NotificationMessageWithDelay.ts) |
| NotificationsPositions | Notification position | [View](types/NotificationsPositions.ts) |

### GeneXus integration types

These types are used in GeneXus-powered applications. Most developers outside GeneXus will not need them

| Type | Role | Definition |
|------|------|------------|
| Entity | GeneXus entity | [View](types/Entity.ts) |
| EntityItem | Entity item | [View](types/EntityItem.ts) |
| EntityItemType | Entity item type | [View](types/EntityItemType.ts) |
| EntityNameToATTs | Entity name mapping | [View](types/EntityNameToATTs.ts) |
| GxControl | GeneXus control | [View](types/GxControl.ts) |
| GxControlDataType | Control data type | [View](types/GxControlDataType.ts) |
| GxControlPossibleValues | Control possible values | [View](types/GxControlPossibleValues.ts) |
| GxControlType | Control type | [View](types/GxControlType.ts) |
| GxDataTransferInfo | Data transfer info | [View](types/GxDataTransferInfo.ts) |
| GxGrid | GeneXus grid | [View](types/GxGrid.ts) |
| GxGridCellProperties | Grid cell properties | [View](types/GxGridCellProperties.ts) |
| GxGridColumn | Grid column | [View](types/GxGridColumn.ts) |
| GxGridRow | Grid row | [View](types/GxGridRow.ts) |
| GxObject | GeneXus object | [View](types/GxObject.ts) |
