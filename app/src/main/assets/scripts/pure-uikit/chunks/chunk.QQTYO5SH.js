// src/components/tab/tab.styles.ts
import { css } from "lit";
var tab_styles_default = css`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--p-font-sans);
    font-size: var(--p-font-size-small);
    font-weight: var(--p-font-weight-medium);
    border-radius: var(--p-border-radius-large) var(--p-border-radius-large) 0 0;
    color: var(--p-color-neutral-600);
    padding: var(--p-spacing-medium) var(--p-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--p-color-primary-600);
    background-color: var(--p-color-primary-50);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible):not([disabled]) {
    color: var(--p-color-primary-600);
  }

  :host(:focus-visible) {
    outline: var(--p-focus-ring);
    outline-offset: calc(-1 * var(--p-focus-ring-width) - var(--p-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--p-color-primary-600);
    background-color: var(--p-color-primary-50);
  }

  .tab.tab--closable {
    padding-inline-end: var(--p-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--p-font-size-small);
    margin-inline-start: var(--p-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--p-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;

export {
  tab_styles_default
};
