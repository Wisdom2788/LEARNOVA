// Global type declarations to fix external library issues

// Fix for @octokit/request-error ErrorOptions issue
declare global {
  interface ErrorOptions {
    cause?: unknown;
  }
}

export {};