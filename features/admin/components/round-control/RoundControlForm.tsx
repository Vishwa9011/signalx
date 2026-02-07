'use client';

import React from 'react';
import Tabs from './Tabs';
import Modal from './Modal';
import Header from './Header';
import RoundForm from './RoundForm';
import FetchPrice from './FetchPrice';
import TriggerButton from './TriggerButton';
import { deriveFormState } from './helpers';
import useRoundControls from '@/features/admin/hooks/useRoundControls';
import type { ActiveTab, FormDetails, RoundControlFormProps } from './types';

const RoundControlForm = ({ isRoundId = true, round: selectedRound, onResolve }: RoundControlFormProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<ActiveTab>('start');
    const { startRound, endRound, isPending } = useRoundControls();
    const [formDetails, setFormDetails] = React.useState<FormDetails>(() => deriveFormState(selectedRound, activeTab));

    React.useEffect(() => {
        setFormDetails(deriveFormState(selectedRound, activeTab));
    }, [
        selectedRound.round,
        selectedRound.startPrice,
        selectedRound.startTime,
        selectedRound.endPrice,
        selectedRound.endTime,
        activeTab,
    ]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isPriceInFloat = formDetails.price % 1 !== 0;
        if (isPriceInFloat) {
            return alert('Please enter a valid integer price without decimal places.');
        }

        if (activeTab === 'start') {
            await startRound(formDetails.roundId, formDetails.price, formDetails.timestamp);
        } else {
            await endRound(formDetails.roundId, formDetails.price);
        }

        setIsOpen(false);
        onResolve?.();
    };

    if (!isOpen) return <TriggerButton onClick={() => setIsOpen(true)} />;

    return (
        <Modal onClose={() => setIsOpen(false)}>
            <Header round={selectedRound} />
            <Tabs activeTab={activeTab} onSelect={setActiveTab} />
            <FetchPrice />
            <RoundForm
                activeTab={activeTab}
                formDetails={formDetails}
                isRoundId={isRoundId}
                isPending={isPending}
                onChange={setFormDetails}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSubmit}
                isOperationDisabled={false}
            />
        </Modal>
    );
};

export default RoundControlForm;
