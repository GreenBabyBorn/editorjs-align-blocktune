import "./index.css";
import {
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
} from "@codexteam/icons";
function make(tagName, classNames = null, attributes = {}) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    el[attrName] = attributes[attrName];
  }
  return el;
}

export default class AlignmentBlockTune {
  /**
   * Default alignment
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_ALIGNMENT() {
    return "left";
  }

  static get isTune() {
    return true;
  }

  getAlignment() {
    if (
      !!this.settings?.blocks &&
      this.settings.blocks.hasOwnProperty(this.block.name)
    ) {
      return this.settings.blocks[this.block.name];
    }
    if (!!this.settings?.default) {
      return this.settings.default;
    }
    return AlignmentBlockTune.DEFAULT_ALIGNMENT;
  }
  /**
   *
   * @param api
   * @param data 既に設定されているデータ
   * @param settings tuneに設定項目
   * @param block tuneに設定されてるblock
   */
  constructor({ api, data, config, block }) {
    this.api = api;
    this.block = block;
    /**
         config:{
            default: "right",
            blocks: {
              header: 'center',
              list: 'right'
            }
          },
         */
    this.settings = config;
    this.data = data || { alignment: this.getAlignment() };
    this.alignmentSettings = [
      {
        name: "left",
        icon: IconAlignLeft,
      },
      {
        name: "center",
        icon: IconAlignCenter,
      },
      {
        name: "right",
        icon: IconAlignRight,
      },
      {
        name: "justify",
        icon: IconAlignJustify,
      },
    ];
    this._CSS = {
      alignment: {
        left: "ce-tune-alignment--left",
        center: "ce-tune-alignment--center",
        right: "ce-tune-alignment--right",
        justify: "ce-tune-alignment--justify",
      },
    };
  }

  /**
   * block自体をwrapしてくれる
   * constructorで与えられたalignmentを代入しようとすると、holderが確定してなく
   * renderでやろうとすると、tuneを表示時に処理が走る
   * @param blockContent
   */
  wrap(blockContent) {
    this.wrapper = make("div");
    this.wrapper.classList.toggle(this._CSS.alignment[this.data.alignment]);
    this.wrapper.append(blockContent);
    return this.wrapper;
  }

  /**
   * rendering block tune
   * @returns {*}
   */
  render() {
    const wrapper = make("div");
    this.alignmentSettings
      .map((align) => {
        const button = document.createElement("button");
        button.classList.add(this.api.styles.settingsButton);
        button.innerHTML = align.icon;
        button.type = "button";

        button.classList.toggle(
          this.api.styles.settingsButtonActive,
          align.name === this.data.alignment
        );
        wrapper.appendChild(button);
        return button;
      })
      .forEach((element, index, elements) => {
        element.addEventListener("click", () => {
          this.data = {
            alignment: this.alignmentSettings[index].name,
          };
          elements.forEach((el, i) => {
            const { name } = this.alignmentSettings[i];
            el.classList.toggle(
              this.api.styles.settingsButtonActive,
              name === this.data.alignment
            );
            //toggle alignment style class for block
            this.wrapper.classList.toggle(
              this._CSS.alignment[name],
              name === this.data.alignment
            );
          });
        });
      });
    return wrapper;
  }
  /**
   * save
   * @returns {*}
   */
  save() {
    return this.data;
  }
}
