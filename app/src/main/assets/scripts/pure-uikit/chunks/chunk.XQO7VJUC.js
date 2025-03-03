// src/components/dropdown/dropdown.styles.ts
import { css } from "lit";
var dropdown_styles_default = css`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--p-z-index-dropdown);
  }

  .dropdown[data-current-placement^="top"]::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^="bottom"]::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^="left"]::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^="right"]::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--p-font-sans);
    font-size: var(--p-font-size-medium);
    font-weight: var(--p-font-weight-normal);
    box-shadow: var(--p-shadow-large);
    border-radius: var(--p-border-radius-large);
    pointer-events: none;
    margin-top: 0.25rem;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(p-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;

export {
  dropdown_styles_default
};
