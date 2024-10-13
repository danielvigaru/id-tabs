I wrote this library as a replacement for the jQuery plugin [idTabs by Sean Catchpole](https://www.sunsean.com/idTabs). Of course, the idea is that you don't need jQuery for this one.

[![npm](https://img.shields.io/badge/npm-FFF?style=flat&logo=npm&logoColor=fff&color=CB3837)](https://www.npmjs.com/package/@danielvigaru/id-tabs)
[![bundlephobia](https://img.shields.io/bundlephobia/min/%40danielvigaru%2Fid-tabs)](https://bundlephobia.com/package/@danielvigaru/id-tabs)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=flat&logo=ko-fi&logoColor=white&color=D34F4C)](https://ko-fi.com/Y8Y1DZBZU)

# How to use IdTabs

```javascript
import IdTabs from 'id-tabs';
IdTabs.init('.your-selector');
```

1. Create your content and add IDs to the containers
2. Create a list of anchors, these will be the tabs. Use the previously created IDs as hrefs, like `href="#tab-content-id"`
3. For initialization, see the examples below:

## Default tab

Set a default tab in a group by adding the class `selected` to the anchor.

# Examples

### Using your own selector

```html
<div class="tab-container">
    <ul>
        <li><a href="#tab-1">Tab 1</a></li>
        <li><a href="#tab-2" class="selected">Tab 2</a></li>
        <li><a href="#tab-3">Tab 3</a></li>
    </ul>
</div>

<div id="tab-1">Tab 1 content</div>
<div id="tab-2">Tab 2 content</div>
<div id="tab-3">Tab 3 content</div>
```

Initialize this by running `IdTabs.init('.tab-container ul')` on page load.

### Using the default selector `class="idTabs"`

```html
<div class="idTabs">
    <ul>
        <li><a href="#tab-4">Tab 4</a></li>
        <li><a href="#tab-5" class="selected">Tab 5</a></li>
        <li><a href="#tab-6">Tab 6</a></li>
    </ul>
</div>

<div id="tab-4">Tab 4 content</div>
<div id="tab-5">Tab 5 content</div>
<div id="tab-6">Tab 6 content</div>
```

That's all. If you use the `idTabs` class it will be initialized automatically on page load.

Note: You can use it with broad selectors that match multiple lists of anchors, it will create a new instance for each list
