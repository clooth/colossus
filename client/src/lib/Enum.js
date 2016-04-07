export default class Enum {
  constructor(...props) {
    props.forEach(p => this[p] = Symbol(p))
    Object.freeze(this)
  }
}