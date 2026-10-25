// @thomasloven/round-slider registers <round-slider> unconditionally, which throws
// and breaks the whole card if another card has already registered it.
// Only register it when the tag is still free.
const ROUND_SLIDER_ID = /[\\/]@thomasloven[\\/]round-slider[\\/]round-slider\.js$/;
const DEFINE = 'customElements.define("round-slider", RoundSlider);';

export default function guardRoundSlider() {
  return {
    name: 'guard-round-slider',
    transform(code, id) {
      if (!ROUND_SLIDER_ID.test(id)) {
        return null;
      }
      if (!code.includes(DEFINE)) {
        this.error(`Could not find the round-slider registration to guard in ${id}`);
      }
      return code.replace(DEFINE, `customElements.get("round-slider") || ${DEFINE}`);
    },
  };
}
