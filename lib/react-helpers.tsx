import * as React from 'react';

/**
 * Creates a type-safe React context with automatic error handling
 * Useful for creating contexts that must be used within their Provider
 * @param name - Optional name for better error messages
 * @returns Tuple of [Provider component, hook to use the context]
 * @example
 * const [ThemeProvider, useTheme] = getStrictContext<ThemeContextType>('Theme');
 */
function getStrictContext<T>(
    name?: string,
): readonly [({ value, children }: { value: T; children?: React.ReactNode }) => React.JSX.Element, () => T] {
    const Context = React.createContext<T | undefined>(undefined);

    const Provider = ({ value, children }: { value: T; children?: React.ReactNode }) => (
        <Context.Provider value={value}>{children}</Context.Provider>
    );

    const useSafeContext = () => {
        const ctx = React.useContext(Context);
        if (ctx === undefined) {
            throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
        }
        return ctx;
    };

    return [Provider, useSafeContext] as const;
}

export { getStrictContext };
