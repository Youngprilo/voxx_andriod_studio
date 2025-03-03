import {
  getNestedValue
} from "./chunk.36U7VCWI.js";
import {
  table_styles_default
} from "./chunk.7CJLCSQH.js";
import {
  PPaginate
} from "./chunk.MGMZCCQJ.js";
import {
  icon_default
} from "./chunk.OWASOHSA.js";
import {
  PCheckbox
} from "./chunk.CF4DECWJ.js";
import {
  PTag
} from "./chunk.7P6FPBRE.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  watch
} from "./chunk.2FB5TK5H.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/table/table.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
var PTable = class extends PureElement {
  constructor() {
    super(...arguments);
    this.observedElements = [];
    this.localize = new LocalizeController(this);
    this.disabled = false;
    this.options = {
      columns: [],
      paginate: true,
      draggable: false,
      hideHeader: false,
      hideFooter: false,
      expandable: false,
      selectable: false
    };
    this.data = [];
    this.loading = false;
    this.page = 1;
    this.limit = 10;
    this.total = 0;
    this.items = [];
    this.selectedRows = [];
    this.tmpSelectedRows = [];
    this.handleEventDispatch = (e) => {
      const path = e.composedPath();
      const closestRow = path.find((element) => {
        var _a;
        return (_a = element == null ? void 0 : element.classList) == null ? void 0 : _a.contains("table-row");
      });
      if (closestRow) {
        const rowElement = closestRow;
        const rowValue = rowElement == null ? void 0 : rowElement["data-row"];
        this.dispatchEvent(new CustomEvent(e.type, { detail: rowValue, bubbles: true, composed: true }));
      }
    };
  }
  // Computed property using a getter
  /**
   * Returns the current page of items based on the current page, page size, and total items.
   * If the table is not local paginated, all items are returned.
   *
   * @returns {Array} The current page of items.
   */
  get currentItems() {
    var _a;
    if (!((_a = this.options) == null ? void 0 : _a.paginate))
      return this.items;
    if (this.total === 0)
      return [];
    const start = ((this.page || 1) - 1) * this.limit;
    const end = start + this.limit;
    return this.items.slice(start, end);
  }
  handleApplyOptionsChange() {
    this.total = this.data.length;
    this.items = this.data;
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  startObserver() {
    var _a;
    const elements = (_a = this.shadowRoot) == null ? void 0 : _a.querySelectorAll(".table-header .table-cell.table-cell--resizable");
    this.observedElements.forEach((el) => this.resizeObserver.unobserve(el));
    this.observedElements = [];
    elements.forEach((el) => {
      this.resizeObserver.observe(el);
      this.observedElements.push(el);
    });
  }
  stopObserver() {
    this.resizeObserver.disconnect();
  }
  handleAttachResizeObserved() {
    this.resizeObserver = new ResizeObserver((entries) => {
      var _a, _b;
      if (Array.isArray(entries) && entries.length > 0) {
        const currentResizedElement = (_a = entries[0]) == null ? void 0 : _a.target;
        const currentColumnIndex = currentResizedElement.getAttribute("data-column-index");
        const rowData = (_b = this.shadowRoot) == null ? void 0 : _b.querySelectorAll(".table-body .table-row");
        Array.from(rowData).forEach((el) => {
          const cellResize = el.querySelector(`.table-cell[data-column-index="${currentColumnIndex}"]`);
          if (cellResize) {
            cellResize.style.width = `${currentResizedElement.clientWidth}px`;
          }
        });
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleAttachResizeObserved();
  }
  firstUpdated() {
    this.tableWrapper.addEventListener("click", this.handleEventDispatch.bind(this));
    if (!this.disabled) {
      this.startObserver();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.tableWrapper.removeEventListener("click", this.handleEventDispatch.bind(this));
    this.stopObserver();
  }
  handleChangePage(e) {
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    const page = Number(e.detail.page);
    this.page = page;
    this.tmpSelectedRows = [];
    this.currentItems.forEach((selectedRow) => {
      if (this.selectedRows.includes(selectedRow)) {
        this.tmpSelectedRows = [...this.tmpSelectedRows, selectedRow];
      }
    });
    this.emit("p-change", {
      detail: { page: this.page }
    });
  }
  handleChangeLimit(e) {
    var _a;
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    const limit = Number((_a = e.detail) == null ? void 0 : _a.limit);
    this.limit = limit;
    this.page = 1;
    this.emit("p-change-limit", {
      detail: { limit }
    });
  }
  handleSelectAll(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.tmpSelectedRows.length === this.currentItems.length && this.tmpSelectedRows.length > 0) {
      this.tmpSelectedRows = [];
      this.selectedRows = this.selectedRows.filter(
        (selectedRow) => !this.currentItems.some((currentRow) => JSON.stringify(currentRow) === JSON.stringify(selectedRow))
      );
    } else {
      this.tmpSelectedRows = this.currentItems;
      this.currentItems.forEach((selectedRow) => {
        if (!this.selectedRows.some((currentRow) => JSON.stringify(currentRow) === JSON.stringify(selectedRow))) {
          this.selectedRows = [...this.selectedRows, selectedRow];
        }
      });
    }
    Promise.all(this.selectedRows.map((el) => el.updateComplete)).then(() => {
      this.emit("p-table-row-select", { detail: { selection: this.selectedRows } });
    });
  }
  handleSelectRow(e, r) {
    e.preventDefault();
    e.stopPropagation();
    if (this.selectedRows.some((currentRow) => JSON.stringify(currentRow) === JSON.stringify(r))) {
      this.selectedRows = this.selectedRows.filter((selectedRow) => JSON.stringify(selectedRow) !== JSON.stringify(r));
      this.tmpSelectedRows = this.tmpSelectedRows.filter(
        (selectedRow) => JSON.stringify(selectedRow) !== JSON.stringify(r)
      );
    } else {
      this.selectedRows = [...this.selectedRows, r];
      this.tmpSelectedRows = [...this.tmpSelectedRows, r];
    }
    Promise.all(this.selectedRows.map((el) => el.updateComplete)).then(() => {
      this.emit("p-table-row-select", { detail: { selection: this.selectedRows, row: r } });
    });
  }
  getSelectedRows() {
    return this.selectedRows;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    return html` <div
      class=${classMap({
      "table-wrapper": true
    })}
      part="table-wrapper"
    >
      <div
        class=${classMap({
      table: true
    })}
        style="grid-template-columns: repeat(${((_a = this.options) == null ? void 0 : _a.selectable) ? this.options.columns.length + 1 : this.options.columns.length}, auto); max-height: ${((_b = this.options) == null ? void 0 : _b.maxHeight) || "unset"};
          min-height: ${((_c = this.options) == null ? void 0 : _c.minHeight) || "auto"};
          "
      >
        <div
          class=${classMap({
      "table-header": true,
      "table-header--hidden": !!((_d = this.options) == null ? void 0 : _d.hideHeader)
    })}
          part="table-header"
        >
          ${((_e = this.options) == null ? void 0 : _e.selectable) ? html`
                <div
                  class=${classMap({
      "table-cell": true
    })}
                  style=${styleMap({
      width: "auto",
      alignItems: "center",
      justifyContent: "center"
    })}
                >
                  <p-checkbox
                    ?checked=${this.tmpSelectedRows.length > 0 && this.tmpSelectedRows.length === this.currentItems.length}
                    @click=${this.handleSelectAll}
                  ></p-checkbox>
                </div>
              ` : ""}
          ${this.options.columns.map(
      (i, index) => html`
              <div
                class=${classMap({
        "table-cell": true,
        "table-cell--resizable": !!(i == null ? void 0 : i.resizable),
        "table-cell--sticky": !!(i == null ? void 0 : i.sticky)
      })}
                data-column-index=${index}
                style=${styleMap({
        width: (i == null ? void 0 : i.width) || "auto",
        minWidth: (i == null ? void 0 : i.minWidth) || "auto",
        maxWidth: (i == null ? void 0 : i.maxWidth) || "unset",
        display: (i == null ? void 0 : i.hide) ? "none" : "flex",
        alignItems: (i == null ? void 0 : i.alignItems) || "center",
        justifyContent: (i == null ? void 0 : i.justifyContent) || "flex-start",
        textOverflow: (i == null ? void 0 : i.truncate) ? "ellipsis" : "unset",
        whiteSpace: (i == null ? void 0 : i.truncate) ? "nowrap" : "unset",
        overflow: (i == null ? void 0 : i.truncate) ? "hidden" : (i == null ? void 0 : i.resizable) ? "auto" : "unset",
        position: (i == null ? void 0 : i.sticky) ? "sticky" : "relative",
        left: (i == null ? void 0 : i.sticky) === "start" ? `${(i == null ? void 0 : i.stickyOffset) || 0}px` : "unset",
        right: (i == null ? void 0 : i.sticky) === "end" ? `${(i == null ? void 0 : i.stickyOffset) || 0}px` : "unset",
        borderLeft: (i == null ? void 0 : i.sticky) === "end" ? "1px solid var(--p-color-gray-200)" : "",
        borderRight: (i == null ? void 0 : i.sticky) === "start" ? "1px solid var(--p-color-gray-200)" : ""
      })}
              >
                ${i == null ? void 0 : i.headerName}
              </div>
            `
    )}
        </div>
        <div
          class=${classMap({
      "table-body": true
    })}
          part="table-body"
        >
          ${!this.loading && this.currentItems.length > 0 ? this.currentItems.map(
      (i) => {
        var _a2;
        return html`
                  <div
                    class=${classMap({
          "table-row": true
        })}
                    .data-row=${i}
                  >
                    ${((_a2 = this.options) == null ? void 0 : _a2.selectable) ? html`
                          <div
                            class=${classMap({
          "table-cell": true
        })}
                            style=${styleMap({
          width: "auto",
          alignItems: "center",
          justifyContent: "center"
        })}
                          >
                            <p-checkbox
                              ?checked=${this.selectedRows.includes(i)}
                              @click=${(e) => this.handleSelectRow(e, i)}
                            ></p-checkbox>
                          </div>
                        ` : ""}
                    ${this.options.columns.map(
          (k, idx) => html`
                        <div
                          class=${classMap({
            "table-cell": true,
            "table-cell--sticky": !!(k == null ? void 0 : k.sticky),
            [String(k.classes)]: k.classes || false
          })}
                          data-column-index=${idx}
                          style=${styleMap({
            width: (k == null ? void 0 : k.width) || "auto",
            minWidth: (k == null ? void 0 : k.minWidth) || "auto",
            maxWidth: (k == null ? void 0 : k.maxWidth) || "unset",
            display: (k == null ? void 0 : k.hide) ? "none" : "flex",
            alignItems: (k == null ? void 0 : k.alignItems) || "center",
            justifyContent: (k == null ? void 0 : k.justifyContent) || "flex-start",
            textOverflow: (k == null ? void 0 : k.truncate) ? "ellipsis" : "unset",
            whiteSpace: (k == null ? void 0 : k.truncate) ? "nowrap" : "unset",
            overflow: (k == null ? void 0 : k.truncate) ? "hidden" : "unset",
            position: (k == null ? void 0 : k.sticky) ? "sticky" : "relative",
            left: (k == null ? void 0 : k.sticky) === "start" ? `${(k == null ? void 0 : k.stickyOffset) || 0}px` : "unset",
            right: (k == null ? void 0 : k.sticky) === "end" ? `${(k == null ? void 0 : k.stickyOffset) || 0}px` : "unset",
            borderLeft: (k == null ? void 0 : k.sticky) === "end" ? "1px solid var(--p-color-gray-200)" : "",
            borderRight: (k == null ? void 0 : k.sticky) === "start" ? "1px solid var(--p-color-gray-200)" : ""
          })}
                        >
                          ${k.render ? k.render(i) : k.field ? html` <span>${getNestedValue(i, k.field)}</span> ` : ""}
                        </div>
                      `
        )}
                  </div>
                `;
      }
    ) : ""}
        </div>
      </div>
      ${this.loading ? html`
            <div
              class=${classMap({
      "table-loading": true
    })}
              part="table-loading"
            >
              <p-spinner style="font-size: 30px; --track-width: 4px;"></p-spinner>
            </div>
          ` : ""}
      ${!this.loading && this.currentItems.length === 0 ? html`
            <div
              class=${classMap({
      "table-empty": true
    })}
              part="table-empty"
            >
              <p-icon name="box"></p-icon>
              <span class="table-empty__label">${this.localize.term("empty")}</span>
            </div>
          ` : ""}
      <div
        class=${classMap({
      "table-footer": true,
      "table-footer--hidden": !!((_f = this.options) == null ? void 0 : _f.hideFooter)
    })}
        part="table-footer"
      >
        <slot name="paginate">
          ${((_g = this.options) == null ? void 0 : _g.paginate) ? html`
                <p-paginate
                  size="small"
                  variant="default"
                  total=${this.total}
                  page=${this.page}
                  limit=${this.limit}
                  @p-change=${this.handleChangePage}
                  @p-change-limit=${this.handleChangeLimit}
                ></p-paginate>
              ` : ""}
        </slot>
      </div>
    </div>`;
  }
};
PTable.styles = [component_styles_default, table_styles_default];
PTable.dependencies = {
  "p-paginate": PPaginate,
  "p-tag": PTag,
  "p-icon": icon_default,
  "p-checkbox": PCheckbox
};
__decorateClass([
  property({ type: Boolean, reflect: true })
], PTable.prototype, "disabled", 2);
__decorateClass([
  property({
    type: Object,
    reflect: false,
    converter: {
      fromAttribute: (value) => {
        if (!value)
          return null;
        return JSON.parse(value);
      },
      toAttribute: (value) => {
        if (!value)
          return null;
        return JSON.stringify(value);
      }
    }
  })
], PTable.prototype, "options", 2);
__decorateClass([
  property({ type: Array, reflect: false })
], PTable.prototype, "data", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PTable.prototype, "loading", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PTable.prototype, "page", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PTable.prototype, "limit", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PTable.prototype, "total", 2);
__decorateClass([
  property({
    type: Array,
    reflect: false
  })
], PTable.prototype, "items", 2);
__decorateClass([
  state()
], PTable.prototype, "selectedRows", 2);
__decorateClass([
  state()
], PTable.prototype, "tmpSelectedRows", 2);
__decorateClass([
  query(".table-wrapper")
], PTable.prototype, "tableWrapper", 2);
__decorateClass([
  watch("data")
], PTable.prototype, "handleApplyOptionsChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], PTable.prototype, "handleDisabledChange", 1);

export {
  PTable
};
