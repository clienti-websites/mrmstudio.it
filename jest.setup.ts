import '@testing-library/jest-dom'

// jsdom non implementa matchMedia. Lo stub risponde "no" a ogni query, che
// per i test significa schermo stretto e nessuna preferenza particolare:
// i componenti partono dalla versione piu' conservativa.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
