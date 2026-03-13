# System

Comprehensive utility icons covering common actions — add, delete, search, settings, notifications, and more. **This is the primary icon category for most Mercury applications** (~95% of icons used)

**Type:** Monochrome

## Color types

| colorType        | States                           |
| ---------------- | -------------------------------- |
| `black`          | enabled                          |
| `error`          | enabled, hover, active, disabled |
| `interactive`    | enabled, hover, active, disabled |
| `on-interactive` | enabled, hover, active, disabled |
| `on-primary`     | enabled, hover, active, disabled |
| `on-status`      | enabled, hover, active, disabled |
| `on-suggestion`  | enabled, hover, active, disabled |
| `on-surface`     | enabled                          |
| `primary`        | enabled, hover, active, disabled |
| `selected`       | enabled                          |
| `success`        | enabled, hover, active, disabled |
| `warning`        | enabled, hover, active, disabled |
| `white`          | enabled                          |

## Usage

```ts
import { getIconPath } from "@genexus/mercury/assets-manager.js";

// Basic usage
getIconPath({ category: "system", name: "settings", colorType: "on-surface" });

// In a component item model
const items = [
  {
    caption: "Settings",
    startImgSrc: getIconPath({ category: "system", name: "settings", colorType: "on-surface" }),
    startImgType: "mask",
  },
];

// Collapsed + expanded pair (for ch-tree-view-render)
import { getIconPathExpanded } from "@genexus/mercury/assets-manager.js";

getIconPathExpanded(
  { category: "system", name: "group", colorType: "on-surface" },
  { category: "system", name: "group-off", colorType: "on-surface" }
);
```

## Icons (148)

| Name                 | Keywords                                         |
| -------------------- | ------------------------------------------------ |
| accessibility-new    | accessibility, a11y, person, human, inclusive    |
| add                  | add, plus, create, new                           |
| add-circle           | add, plus, create, new, circle                   |
| applications         | apps, applications, grid, windows                |
| arrow-down           | arrow, down, direction, sort descending          |
| arrow-drop-down      | dropdown, caret, expand, down                    |
| arrow-drop-left      | caret, left, collapse, back                      |
| arrow-drop-right     | caret, right, expand, forward                    |
| arrow-drop-up        | caret, up, collapse                              |
| arrow-left           | arrow, left, back, previous                      |
| arrow-right          | arrow, right, forward, next                      |
| arrow-top            | arrow, up, top, ascending                        |
| assistant            | assistant, AI, bot, help                         |
| assistant-fill       | assistant, AI, bot, help, filled                 |
| block                | block, ban, prohibit, restricted                 |
| calendar             | calendar, date, schedule, event                  |
| cancel-circle        | cancel, close, remove, circle, clear             |
| card                 | card, view, tile, layout                         |
| check                | check, confirm, done, tick, approve              |
| check-circle         | check, confirm, done, tick, circle, success      |
| chevron-down         | chevron, down, expand, collapse                  |
| chevron-left         | chevron, left, back, navigate                    |
| chevron-pag-left     | pagination, previous page, back                  |
| chevron-pag-right    | pagination, next page, forward                   |
| chevron-right        | chevron, right, forward, navigate                |
| chevron-small-down   | chevron, down, small, compact                    |
| chevron-small-left   | chevron, left, small, compact                    |
| chevron-small-right  | chevron, right, small, compact                   |
| chevron-small-up     | chevron, up, small, compact                      |
| chevron-up           | chevron, up, collapse, expand                    |
| close                | close, dismiss, remove, x                        |
| close-sidebar        | sidebar, collapse, hide, panel                   |
| close-small          | close, dismiss, small, compact                   |
| collapse-content     | collapse, minimize, shrink, compact              |
| company              | company, organization, building, enterprise      |
| computer             | computer, desktop, device, monitor               |
| contact              | contact, person, user, profile                   |
| copy                 | copy, duplicate, clipboard                       |
| cut                  | cut, scissors, remove, move                      |
| dashboard            | dashboard, overview, analytics, metrics          |
| data-modeling        | data, model, schema, structure                   |
| database             | database, storage, data, server                  |
| delete-outlined      | delete, remove, trash, discard                   |
| detail               | detail, view, inspect, info                      |
| disturb              | disturb, do not disturb, quiet, mute             |
| dock-to-left         | dock, left, panel, layout                        |
| dock-to-right        | dock, right, panel, layout                       |
| double-chevron-left  | collapse, minimize, back, double arrow           |
| double-chevron-right | expand, maximize, forward, double arrow          |
| download             | download, save, export, get                      |
| draft                | draft, document, file, note                      |
| draft-doc            | draft, document, file, write                     |
| drag                 | drag, move, reorder, handle                      |
| edit                 | edit, modify, pencil, write                      |
| error                | error, alert, problem, issue                     |
| expand-content       | expand, maximize, grow, enlarge                  |
| eyedropper           | eyedropper, color picker, sample, pick           |
| favorite             | favorite, star, bookmark, like                   |
| favorite-fill        | favorite, star, bookmark, filled                 |
| filter               | filter, funnel, refine, narrow                   |
| filters              | filters, funnel, refine, multiple                |
| flag                 | flag, mark, report, bookmark                     |
| folder               | folder, directory, organize, files               |
| grid                 | grid, layout, view, tiles                        |
| group                | group, folder, expand, collection                |
| group-off            | ungroup, collapse, separate, ungrouped           |
| headphones           | headphones, audio, sound, music, listen          |
| help                 | help, question, support, info                    |
| help-variant         | help, question, support, alternative             |
| hide                 | hide, invisible, eye off, conceal                |
| history              | history, time, past, log, recent                 |
| home                 | home, house, main, start                         |
| idea                 | idea, lightbulb, suggestion, tip                 |
| information          | information, info, about, details                |
| key                  | key, password, security, access, lock            |
| language             | language, translate, globe, i18n, localization   |
| launch               | launch, open, external, new window               |
| left-panel-open      | panel, left, open, sidebar                       |
| link                 | link, url, chain, hyperlink, connect             |
| link-off             | unlink, disconnect, break, remove link           |
| list                 | list, view, rows, lines                          |
| loading              | loading, spinner, progress, wait                 |
| lock                 | lock, secure, private, restricted                |
| log-out              | logout, sign out, exit, leave                    |
| logout               | logout, sign out, exit, leave                    |
| mail                 | mail, email, message, envelope                   |
| menu                 | menu, hamburger, navigation, sidebar             |
| message              | message, chat, comment, conversation             |
| mic                  | microphone, voice, audio, record                 |
| mic-off              | microphone off, mute, silent                     |
| mobile               | mobile, phone, device, smartphone                |
| mop                  | mop, clean, sweep, maintenance                   |
| more-horizontal      | more, options, ellipsis, horizontal, actions     |
| more-vertical        | more, options, ellipsis, vertical, actions       |
| news                 | news, article, feed, update                      |
| notification         | notification, alert, bell, reminder              |
| order-alphabetically | sort, alphabetical, A-Z, order                   |
| order-numberically   | sort, numerical, 1-9, order                      |
| pause                | pause, stop, hold, wait                          |
| photo                | photo, image, picture, camera                    |
| pin                  | pin, attach, stick, anchor                       |
| pin-fill             | pin, attach, stick, anchor, filled               |
| play-circle          | play, start, begin, media, video                 |
| plug-in              | plugin, extension, addon, module                 |
| property             | property, attribute, field, value                |
| publish              | publish, release, deploy, public                 |
| qr-code              | qr, barcode, scan, code                          |
| query                | query, search, database, sql                     |
| refresh              | refresh, reload, sync, update                    |
| retry                | retry, repeat, redo, again                       |
| right-panel-open     | panel, right, open, sidebar                      |
| run                  | run, execute, play, start                        |
| save                 | save, disk, store, persist                       |
| search               | search, find, lookup, magnifying glass           |
| send                 | send, submit, dispatch, message                  |
| settings             | settings, configuration, gear, preferences       |
| share                | share, distribute, send, social                  |
| show                 | show, visible, eye, reveal                       |
| star                 | star, rate, favorite, rank                       |
| star-fill            | star, rate, favorite, filled                     |
| star-half            | star, rate, half, partial                        |
| star-unselected      | star, rate, empty, unselected                    |
| status               | status, state, indicator, badge                  |
| stop                 | stop, halt, end, terminate                       |
| stop-circle          | stop, halt, end, circle                          |
| substract            | subtract, minus, remove, decrease                |
| table                | table, grid, data, spreadsheet                   |
| text-compare         | compare, diff, text, difference                  |
| thumb-down           | dislike, thumbs down, negative, reject           |
| thumb-up             | like, thumbs up, positive, approve               |
| thunder              | thunder, lightning, fast, power, flash           |
| time                 | time, clock, schedule, duration                  |
| toggle-theme         | theme, dark mode, light mode, toggle, appearance |
| tools                | tools, wrench, settings, utilities               |
| unchecked            | unchecked, empty, checkbox, deselect             |
| undo                 | undo, revert, back, restore                      |
| unpublished          | unpublished, draft, hidden, private              |
| upload               | upload, import, send, put                        |
| user                 | user, person, account, profile                   |
| version              | version, history, revision, branch               |
| videocam             | video, camera, webcam, record                    |
| voice                | voice, speak, audio, sound                       |
| warning              | warning, caution, alert, attention               |
| zoom-in              | zoom in, magnify, enlarge, plus                  |
| zoom-out             | zoom out, shrink, reduce, minus                  |
