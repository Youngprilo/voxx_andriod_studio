// src/components/button/button.styles.ts
import { css } from "lit";
var button_styles_default = css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--p-input-border-width);
    font-family: var(--p-input-font-family);
    font-weight: var(--p-font-weight-medium);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--p-transition-x-fast) background-color,
      var(--p-transition-x-fast) color,
      var(--p-transition-x-fast) border,
      var(--p-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--p-focus-ring);
    outline-offset: var(--p-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(p-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--p-color-neutral-0);
    border-color: var(--p-input-border-color);
    color: var(--p-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--p-color-primary-50);
    border-color: var(--p-color-primary-300);
    color: var(--p-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--p-color-primary-100);
    border-color: var(--p-color-primary-400);
    color: var(--p-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--p-color-primary-600);
    border-color: var(--p-color-primary-600);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--p-color-primary-500);
    border-color: var(--p-color-primary-500);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--p-color-primary-600);
    border-color: var(--p-color-primary-600);
    color: var(--p-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--p-color-success-600);
    border-color: var(--p-color-success-600);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--p-color-success-500);
    border-color: var(--p-color-success-500);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--p-color-success-600);
    border-color: var(--p-color-success-600);
    color: var(--p-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--p-color-neutral-600);
    border-color: var(--p-color-neutral-600);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--p-color-neutral-500);
    border-color: var(--p-color-neutral-500);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--p-color-neutral-600);
    border-color: var(--p-color-neutral-600);
    color: var(--p-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--p-color-warning-600);
    border-color: var(--p-color-warning-600);
    color: var(--p-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--p-color-warning-500);
    border-color: var(--p-color-warning-500);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--p-color-warning-600);
    border-color: var(--p-color-warning-600);
    color: var(--p-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--p-color-danger-600);
    border-color: var(--p-color-danger-600);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--p-color-danger-500);
    border-color: var(--p-color-danger-500);
    color: var(--p-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--p-color-danger-600);
    border-color: var(--p-color-danger-600);
    color: var(--p-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--p-input-border-color);
    color: var(--p-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--p-color-primary-600);
    background-color: var(--p-color-primary-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--p-color-primary-700);
    background-color: var(--p-color-primary-700);
    color: var(--p-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--p-color-primary-600);
    color: var(--p-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--p-color-primary-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--p-color-primary-700);
    background-color: var(--p-color-primary-700);
    color: var(--p-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--p-color-success-600);
    color: var(--p-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--p-color-success-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--p-color-success-700);
    background-color: var(--p-color-success-700);
    color: var(--p-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--p-color-neutral-600);
    color: var(--p-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--p-color-neutral-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--p-color-neutral-700);
    background-color: var(--p-color-neutral-700);
    color: var(--p-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--p-color-warning-600);
    color: var(--p-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--p-color-warning-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--p-color-warning-700);
    background-color: var(--p-color-warning-700);
    color: var(--p-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--p-color-danger-600);
    color: var(--p-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--p-color-danger-600);
    color: var(--p-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--p-color-danger-700);
    background-color: var(--p-color-danger-700);
    color: var(--p-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--p-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--p-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--p-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--p-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--p-input-height-small);
    font-size: var(--p-button-font-size-small);
    line-height: calc(var(--p-input-height-small) - var(--p-input-border-width) * 2);
    border-radius: var(--p-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--p-input-height-medium);
    font-size: var(--p-button-font-size-medium);
    line-height: calc(var(--p-input-height-medium) - var(--p-input-border-width) * 2);
    border-radius: var(--p-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--p-input-height-large);
    font-size: var(--p-button-font-size-large);
    line-height: calc(var(--p-input-height-large) - var(--p-input-border-width) * 2);
    border-radius: var(--p-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--p-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--p-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--p-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--p-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--p-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--p-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading p-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(p-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(p-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--p-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--p-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--p-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--p-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--p-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--p-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--p-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--p-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--p-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--p-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--p-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--p-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--p-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--p-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--p-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-p-button-group__button--first]:not([data-p-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-p-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-p-button-group__button--last]:not([data-p-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-p-button-group__button]:not([data-p-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--p-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-p-button-group__button]:not(
          [data-p-button-group__button--first],
          [data-p-button-group__button--radio],
          [variant="default"]
        ):not(:hover)
    )
    .button:after {
    content: "";
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-p-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-p-button-group__button--focus]),
  :host([data-p-button-group__button][checked]) {
    z-index: 2;
  }
`;

export {
  button_styles_default
};
