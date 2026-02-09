'use client';

import React from 'react';
import type { ActiveTab, FormDetails } from './types';

type RoundFormProps = {
    activeTab: ActiveTab;
    isRoundId: boolean;
    isPending: boolean;
    formDetails: FormDetails;
    isOperationDisabled: boolean;
    onChange: React.Dispatch<React.SetStateAction<FormDetails>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onClose: () => void;
};

const RoundForm = ({
    activeTab,
    isRoundId,
    isPending,
    formDetails,
    isOperationDisabled,
    onChange,
    onSubmit,
    onClose,
}: RoundFormProps) => {
    return (
        <form className="space-y-5" onSubmit={onSubmit}>
            {isRoundId && (
                <FormField
                    label="Round ID"
                    helper="Defaults to the currently selected round."
                    inputProps={{
                        type: 'number',
                        value: formDetails.roundId,
                        onChange: e => onChange({ ...formDetails, roundId: Number(e.target.value) }),
                    }}
                />
            )}

            <FormField
                label="Oracle Price"
                helper={`Suggested: ${formDetails.suggestedPrice || 0}`}
                inputProps={{
                    type: 'number',
                    value: formDetails.price,
                    onChange: e => onChange({ ...formDetails, price: Number(e.target.value) }),
                }}
            />

            <FormField
                label="Timestamp (seconds)"
                helper={`Suggested: ${formDetails.suggestedTimestamp}`}
                inputProps={{
                    type: 'number',
                    value: formDetails.timestamp,
                    onChange: e => onChange({ ...formDetails, timestamp: Number(e.target.value) }),
                }}
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                    type="button"
                    className="w-full cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 sm:w-auto"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isOperationDisabled || isPending}
                    className="w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:from-indigo-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {isPending ? 'Processing…' : activeTab === 'start' ? 'Start Round' : 'End Round'}
                </button>
            </div>
        </form>
    );
};

export default RoundForm;

type FormFieldProps = {
    label: string;
    helper?: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const FormField = ({ label, helper, inputProps }: FormFieldProps) => (
    <label className="block">
        <div className="mb-2 text-sm font-semibold text-slate-800">{label}</div>
        <input
            {...inputProps}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
        {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </label>
);
