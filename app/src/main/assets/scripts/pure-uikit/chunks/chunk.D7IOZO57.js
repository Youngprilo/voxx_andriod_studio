import {
  include_styles_default
} from "./chunk.FY7IKLNL.js";
import {
  requestInclude
} from "./chunk.XNEONNEJ.js";
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

// src/components/include/include.component.ts
import { html } from "lit";
import { property } from "lit/decorators.js";
var PInclude = class extends PureElement {
  constructor() {
    super(...arguments);
    this.mode = "cors";
    this.allowScripts = false;
  }
  executeScript(script) {
    const newScript = document.createElement("script");
    [...script.attributes].forEach((attr) => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);
      if (src !== this.src) {
        return;
      }
      if (!file.ok) {
        this.emit("p-error", { detail: { status: file.status } });
        return;
      }
      this.innerHTML = file.html;
      if (this.allowScripts) {
        [...this.querySelectorAll("script")].forEach((script) => this.executeScript(script));
      }
      this.emit("p-load");
    } catch (e) {
      this.emit("p-error", { detail: { status: -1 } });
    }
  }
  render() {
    return html`<slot></slot>`;
  }
};
PInclude.styles = [component_styles_default, include_styles_default];
__decorateClass([
  property()
], PInclude.prototype, "src", 2);
__decorateClass([
  property()
], PInclude.prototype, "mode", 2);
__decorateClass([
  property({ attribute: "allow-scripts", type: Boolean })
], PInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], PInclude.prototype, "handleSrcChange", 1);

export {
  PInclude
};
