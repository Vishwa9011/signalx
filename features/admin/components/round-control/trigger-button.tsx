'use client';

type ControlButtonProps = {
    onClick: () => void;
};

const TriggerButton = ({ onClick }: ControlButtonProps) => (
    <button
        onClick={onClick}
        className="cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
        Manual Controls
    </button>
);

export default TriggerButton;
