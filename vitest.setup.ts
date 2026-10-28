import '@testing-library/jest-dom/vitest';

// jsdom lacks these browser APIs, which the router and the page rely on
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ObserverStub;
window.IntersectionObserver = ObserverStub as unknown as typeof IntersectionObserver;

window.matchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }) as unknown as MediaQueryList;

// No WebGL or 2D canvas in jsdom: the 3D stage falls back to flat tiles
HTMLCanvasElement.prototype.getContext = () => null;
