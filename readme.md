# OKC – done right!

## Improves the okcupid.com experience with enhanced features.

---

### Setup "OKC – done right!"

1. Install Tapermonkey browser-plugin
2. Create new Tapermonkey script
3. Copy & Paste this Template into the script:
    ```
    // ==UserScript==
    // @name         OKC – done right!
    // @namespace    http://tampermonkey.net/
    // @version      2024-12-16
    // @description  Improve OKC interface
    // @author       You
    // @match        https://www.okcupid.com/*
    // @icon         https://www.google.com/s2/favicons?sz=64&domain=okcupid.com
    // @grant        unsafeWindow
    // @grant        window.focus
    // @require      file:///Users/aersosi/Projects/okc-done-right/dist/index.js
    // ==/UserScript==
    ```
4. Run `bun install` to install dependencies
5. Run `bun run dist-all` or `bun run dist-all-minify` in terminal
6. Point `==UserScript==` `@require` to the `dist/index.js` file
7. Open **okcupid.com** and _enjoy your enhanced interface_!

---

### Setup Dev Environment

Same as above, but instead of `bun run dist-all`, run both commands in separate terminal:
- First `bun run watch-build-js`
- Then `bun run watch-build-css` 

Enjoy hacking!