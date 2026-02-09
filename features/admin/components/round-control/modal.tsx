'use client';

import type { ReactNode } from 'react';

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => (
    <div
        className="font-tertiary fixed inset-0 z-999 flex items-start justify-center overflow-y-auto px-3 py-6"
        style={{ background: 'rgba(15, 23, 42, 0.45)' }}
        onClick={onClose}
    >
        <div
            className="relative w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl shadow-slate-300/40 sm:p-8"
            style={{ maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
        >
            <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer text-slate-400 transition hover:text-slate-600"
                onClick={onClose}
            >
                ✕
            </button>
            {children}
        </div>
    </div>
);

export default Modal;
