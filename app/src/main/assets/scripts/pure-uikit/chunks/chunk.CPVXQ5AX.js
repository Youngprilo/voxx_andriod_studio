import {
  PTooltip
} from "./chunk.JNBKS7ES.js";
import {
  copy_button_styles_default
} from "./chunk.5N5Y4M3S.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.CRLRFWGI.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PIcon
} from "./chunk.FVIDRVFQ.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/copy-button/copy-button.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
var PCopyButton = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isCopying = false;
    this.status = "rest";
    this.value = "";
    this.from = "";
    this.disabled = false;
    this.copyLabel = "";
    this.successLabel = "";
    this.errorLabel = "";
    this.feedbackDuration = 1e3;
    this.tooltipPlacement = "top";
    this.hoist = false;
  }
  async handleCopy() {
    if (this.disabled || this.isCopying) {
      return;
    }
    this.isCopying = true;
    let valueToCopy = this.value;
    if (this.from) {
      const root = this.getRootNode();
      const isProperty = this.from.includes(".");
      const isAttribute = this.from.includes("[") && this.from.includes("]");
      let id = this.from;
      let field = "";
      if (isProperty) {
        [id, field] = this.from.trim().split(".");
      } else if (isAttribute) {
        [id, field] = this.from.trim().replace(/\]$/, "").split("[");
      }
      const target = "getElementById" in root ? root.getElementById(id) : null;
      if (target) {
        if (isAttribute) {
          valueToCopy = target.getAttribute(field) || "";
        } else if (isProperty) {
          valueToCopy = target[field] || "";
        } else {
          valueToCopy = target.textContent || "";
        }
      } else {
        this.showStatus("error");
        this.emit("p-error");
      }
    }
    if (!valueToCopy) {
      this.showStatus("error");
      this.emit("p-error");
    } else {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus("success");
        this.emit("p-copy", {
          detail: {
            value: valueToCopy
          }
        });
      } catch (error) {
        this.showStatus("error");
        this.emit("p-error");
      }
    }
  }
  async showStatus(status) {
    const copyLabel = this.copyLabel || this.localize.term("copy");
    const successLabel = this.successLabel || this.localize.term("copied");
    const errorLabel = this.errorLabel || this.localize.term("error");
    const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
    const showAnimation = getAnimation(this, "copy.in", { dir: "ltr" });
    const hideAnimation = getAnimation(this, "copy.out", { dir: "ltr" });
    this.tooltip.content = status === "success" ? successLabel : errorLabel;
    await this.copyIcon.animate(hideAnimation.keyframes, hideAnimation.options).finished;
    this.copyIcon.hidden = true;
    this.status = status;
    iconToShow.hidden = false;
    await iconToShow.animate(showAnimation.keyframes, showAnimation.options).finished;
    setTimeout(async () => {
      await iconToShow.animate(hideAnimation.keyframes, hideAnimation.options).finished;
      iconToShow.hidden = true;
      this.status = "rest";
      this.copyIcon.hidden = false;
      await this.copyIcon.animate(showAnimation.keyframes, showAnimation.options).finished;
      this.tooltip.content = copyLabel;
      this.isCopying = false;
    }, this.feedbackDuration);
  }
  render() {
    const copyLabel = this.copyLabel || this.localize.term("copy");
    return html`
      <p-tooltip
        class=${classMap({
      "copy-button": true,
      "copy-button--success": this.status === "success",
      "copy-button--error": this.status === "error"
    })}
        content=${copyLabel}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <p-icon library="system" name="copy"></p-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <p-icon library="system" name="check"></p-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <p-icon library="system" name="x-lg"></p-icon>
          </slot>
        </button>
      </p-tooltip>
    `;
  }
};
PCopyButton.styles = [component_styles_default, copy_button_styles_default];
PCopyButton.dependencies = {
  "p-icon": PIcon,
  "p-tooltip": PTooltip
};
__decorateClass([
  query('slot[name="copy-icon"]')
], PCopyButton.prototype, "copyIcon", 2);
__decorateClass([
  query('slot[name="success-icon"]')
], PCopyButton.prototype, "successIcon", 2);
__decorateClass([
  query('slot[name="error-icon"]')
], PCopyButton.prototype, "errorIcon", 2);
__decorateClass([
  query("p-tooltip")
], PCopyButton.prototype, "tooltip", 2);
__decorateClass([
  state()
], PCopyButton.prototype, "isCopying", 2);
__decorateClass([
  state()
], PCopyButton.prototype, "status", 2);
__decorateClass([
  property()
], PCopyButton.prototype, "value", 2);
__decorateClass([
  property()
], PCopyButton.prototype, "from", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PCopyButton.prototype, "disabled", 2);
__decorateClass([
  property({ attribute: "copy-label" })
], PCopyButton.prototype, "copyLabel", 2);
__decorateClass([
  property({ attribute: "success-label" })
], PCopyButton.prototype, "successLabel", 2);
__decorateClass([
  property({ attribute: "error-label" })
], PCopyButton.prototype, "errorLabel", 2);
__decorateClass([
  property({ attribute: "feedback-duration", type: Number })
], PCopyButton.prototype, "feedbackDuration", 2);
__decorateClass([
  property({ attribute: "tooltip-placement" })
], PCopyButton.prototype, "tooltipPlacement", 2);
__decorateClass([
  property({ type: Boolean })
], PCopyButton.prototype, "hoist", 2);
setDefaultAnimation("copy.in", {
  keyframes: [
    { scale: ".25", opacity: ".25" },
    { scale: "1", opacity: "1" }
  ],
  options: { duration: 100 }
});
setDefaultAnimation("copy.out", {
  keyframes: [
    { scale: "1", opacity: "1" },
    { scale: ".25", opacity: "0" }
  ],
  options: { duration: 100 }
});

export {
  PCopyButton
};
