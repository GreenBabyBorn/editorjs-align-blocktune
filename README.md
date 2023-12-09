# Text Alignment tune tool for Editor.js

You can add text alignment to any block (heading, paragraph).

![align](https://github.com/GreenBabyBorn/editorjs-align-blocktune/assets/35188249/df2e8e8b-1361-4992-82c3-1a4b17b17a7a)

## Installation

### Install via NPM

Get the package

```shell
npm i --save editorjs-align-blocktune
```

Include module at your application

```js
import AlignmentBlockTune from "editorjs-align-blocktune";
```

## Usage

And look [Editor.js document](https://editorjs.io/configuration#block-tunes-connection)

```js
tool:{
    list: {
      class: List,
      inlineToolbar: true,
    },
    header: {
      class: Header,
      tunes: ['anyTuneName'],
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: false,
      tunes: ['anyTuneName'],
    },
    anyTuneName: {
      class: AlignmentBlockTune,
      config:{
        default: "right",
        blocks: {
          header: 'center',
          list: 'right'
        }
      },
    }
}
```

## Config Params

| Field   | Type     | Description                                                       |
| ------- | -------- | ----------------------------------------------------------------- |
| default | `string` | "left"/"center"/"right"/"justify", If not set, it will be "left". |
| blocks  | `object` | Default alignment can be set for each block                       |
