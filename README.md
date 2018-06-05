[![Build Status](https://travis-ci.org/Addepar/addepar-modal.svg?branch=master)](https://travis-ci.org/Addepar/addepar-modal)

# addepar-modal

An Ember-CLI addon for modal components. 

This library wraps [ember-modal-dialog](https://github.com/yapplabs/ember-modal-dialog/tree/3b07c8db7ab9972796507db076c337c2a5c052fe) 
(@v1.0.0 for compatibility with Ember 1.12+). The resulting modal retains the same structure as
the [Addepar/ember-widgets](https://github.com/Addepar/ember-widgets) modal component but leverages
the pre-existing and powerful ember-modal-dialog, which uses ember-wormhole under the hood. Any
option that can be passed into ember-modal-dialog can similarly be used on this modal.

The largest disparity between ember-widgets modal and this new adde-modal is the means in which it
is displayed. Rather than calling `.popup()` inside javascript, the templating stays where it makes
the most logical sense... in the template. Modals should be conditionally shown and hidden using 
`{{#if}}` blocks. This simplifies the interface between the JavaScript and HTML to be controlled by
a single boolean variable. 

Example usage:

*.hbs
```hbs
{{#if showModal}}
  {{#adde-modal
    headerText='Are you sure?'
    confirmText='Continue'
    onCancel='cancelModal'
    onConfirm='confirmModal'
  }}
    Are you sure you want to do this?
  {{/adde-modal}}
{{/if}}

<button {{action 'doTheThing'}}>Do the thing?</button>
```

*.js
```js
export default Component.extend({
  showModal: false,

  _closeModal() {
    this.set('showModal', false);
  },

  actions: {
    doTheThing() {
      this.set('showModal', true);
    },

    closeModal() {
      this._closeModal();
    },

    confirmModal() {
      this._closeModal();
      this.doTheThing();
    }
  }
})
```

`adde-modal` uses [ember-wormhole](https://github.com/yapplabs/ember-wormhole) to teleport the 
modal to the root of the application regardless of where its parent component / template exists.

Full list of options that can be passed into the `adde-modal` component:
Property              | Purpose
--------------------- | -------------
`headerText`          | Text to be shown in the header of the modal.
`translucentOverlay`  | Indicates translucence of overlay, toggles presence of `translucent` CSS selector. Defaults to `true`.
`confirmText`         | Button text for the 'Confirm' button. Defaults to 'Confirm'. If set to null, the 'Confirm' button will not be shown.
`onConfirm`           | Action sent to parent when the 'Confirm' button is clicked.
`cancelText`          | Button text for the 'Cancel' button. Defaults to 'Cancel'. If set to null, the 'Cancel' button will not be shown.
`onCancel`            | Action sent to parent when the 'Cancel' button is clicked.
`onClickOverlay`      | Action sent to parent when the translucent overlay behind the modal is clicked.
`onClose`             | Action sent to parent when the 'Close' button is clicked. This is also the fallback action if action names are not defined for `onConfirm`, `onCancel`, or `onClickOverlay`
`showFooter`          | Whether to show the modal footer, which contains the 'Confirm' and 'Cancel' buttons (if used).
`showCloseButton`     | Whether to show the close button in the modal header. Defaults to true.
`escapeToClose`       | Whether pressing the escape key should close the modal. Defaults to true.
`clickOverlayToClose` | Indicates whether clicking outside a modal should close the modal. Defaults to true.
`containerClassNames` | CSS class names to append to container divs. This is a concatenated property, so it does **not** replace the default container class (default: `'ember-modal-dialog'`. If you subclass this component, you may define this in your subclass.)
`overlayClassNames`   | CSS class names to append to overlay divs. This is a concatenated property, so it does **not** replace the default overlay class (default: `'ember-modal-overlay'`. If you subclass this component, you may define this in your subclass.)
`wrapperClassNames`   | CSS class names to append to wrapper divs. This is a concatenated property, so it does **not** replace the default container class (default: `'ember-modal-wrapper'`. If you subclass this component, you may define this in your subclass.)
`target`              | Element selector, element, or Ember View reference that serves as the reference for modal position (default: `'body'`)
`renderInPlace`       | When true, renders the modal without wormholing, useful for including a modal in a style guide
`targetAttachment`    | A string of the form 'vert-attachment horiz-attachment', e.g. `'middle left'` (see "Positioning" section below)

## Installation

* `git clone git@github.com:Addepar/addepar-modal.git` this repository
* `cd addepar-modal`
* `yarn`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
