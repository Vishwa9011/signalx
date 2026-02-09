'use client';

import React from 'react';
import SectionCard from './SectionCard';
import RoundControl from './RoundControl';
import { formatCurrency, formatTime } from '@/lib';
import type { Dispatch, SetStateAction } from 'react';
import { getDirectionText } from '@/lib/trade.helpers';
import useCountdownTimer from '@/features/admin/hooks/useCountdownTimer';
import { RoundStatCard, StatDivider } from './RoundStatCard';

type AdvancedOptionsToggleProps = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
};

function AdvancedOptionsToggle({ show, setShow }: AdvancedOptionsToggleProps) {
    return (
        <div className="mt-2 flex flex-col items-start">
            <button
                className={`flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100`}
                onClick={() => setShow(v => !v)}
            >
                {show ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                {show ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </button>
            {show && (
                <div className="mt-3 flex items-center gap-2 rounded border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
                    <FiAlertTriangle size={16} className="text-yellow-500" />
                    <span>
                        Warning: These actions affect the current round and can have serious consequences. Proceed with
                        caution.
                    </span>
                </div>
            )}
        </div>
    );
}
import { FiChevronDown, FiChevronUp, FiAlertTriangle } from 'react-icons/fi';
import { useRoundStore } from '@/features/market/store/roundStore';

export default function CurrentRoundInfo() {
    const { round } = useRoundStore();
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    const timer = useCountdownTimer(round?.endTime ?? 0);

    if (!round || round.round === 0) {
        return (
            <SectionCard>
                <p className="text-lg font-semibold text-slate-700">Loading current round...</p>
            </SectionCard>
        );
    }

    return (
        <SectionCard className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-base font-medium text-slate-800">
                        Current Round <span className="font-normal text-slate-500">#{round.round}</span>
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                        Start: {formatTime(round.startTime)} | End: {formatTime(round.endTime)}
                    </p>
                </div>
                <div className="flex flex-col items-start md:items-end">
                    <span className="text-xs text-slate-400">Time Left</span>
                    <span className="text-lg font-semibold tracking-wide text-slate-700">{timer.timeLeft}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <RoundStatCard label="Total Pool" value={formatCurrency(round.totalPool)} />
                <StatDivider />
                <RoundStatCard label="Up Pool" value={formatCurrency(round.upPool)} />
                <StatDivider />
                <RoundStatCard label="Down Pool" value={formatCurrency(round.downPool)} />
                <StatDivider />
                <RoundStatCard label="Min Bet" value={formatCurrency(round.minBetAmount)} />
                <StatDivider />
                <RoundStatCard label="Max Bet" value={formatCurrency(round.maxBetAmount)} />
            </div>

            {/* Result */}
            <div className="mt-2 flex flex-row items-center gap-2">
                <span className="text-xs text-slate-500">Result:</span>
                <span className="text-sm font-semibold text-slate-700">{getDirectionText(round.result)}</span>
            </div>

            {/* Toggle for advanced options */}
            <AdvancedOptionsToggle show={showAdvanced} setShow={setShowAdvanced} />

            {/* Control Panel for current round (advanced) */}
            {showAdvanced && <RoundControl />}
        </SectionCard>
    );
}
