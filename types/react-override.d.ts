import 'react';

declare module 'react' {
    interface DOMAttributes<T = unknown> {
        onClick?: (event: React.MouseEvent<T>) => void;
    }
}
