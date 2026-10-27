import '@testing-library/jest-dom/vitest'

// jsdom does not implement scrollTo, which the router calls on navigation
window.scrollTo = () => {}
