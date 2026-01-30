export class HTML extends EventTarget {
  container = document.createElement("div");
  element = document.createElement("div");

  constructor() {
    super();
    this.container = document.createElement("div");
    this.element = document.createElement(this.getTagName());
    this.onCreate();
  }

  onCreate() {}

  static fromElement(element) {
    const html = new HTML();
    html.element = element;
    return html;
  }

  static fromId(id) {
    return HTML.fromElement(document.getElementById(id));
  }

  addEventListener(name, value) {
    return this.element.addEventListener(name, value);
  }

  dispatchEvent(event) {
    return this.element.dispatchEvent(event);
  }

  dispatch(name, value) {
    const event = new CustomEvent(name);
    if (value !== undefined) event.value = value;
    return this.dispatchEvent(event);
  }

  getName() {
    return "div";
  }

  hasContainer() {
    return true;
  }

  getTagName() {
    return "div";
  }

  render() {
    if (!this.hasContainer()) return this.element;
    this.container.append(this.element);
    return this.container;
  }

  append(el = new HTML()) {
    this.element.append(el.render());
  }

  setStyle(name, value) {
    this.element.style[name] = value;
    return this;
  }

  getStyle(name) {
    return this.element.style[name];
  }

  setText(text) {
    this.element.innerText = text;
    return this;
  }

  getText() {
    return this.element.innerText;
  }

  setContainerStyle(name, value) {
    this.container.style[name] = value;
    return this;
  }

  getContainerStyle(name) {
    return this.container.style[name];
  }
}
