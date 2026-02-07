'use client';

import { useRound } from '@/features/market/hooks/useRound';
import ActionBar from '@/features/admin/components/ActionBar';
import CurrentRoundInfo from '@/features/admin/components/CurrentRoundInfo';
import PendingRoundsTable from '@/features/admin/components/PendingRoundsTable';
import { useSocket } from '@/features/market/hooks/useSocket';

export default function AdminDashboard() {
    useRound();
    useSocket();
    return (
        <div className="mx-auto w-full max-w-6xl space-y-4 p-6 md:p-8">
            <ActionBar />
            <CurrentRoundInfo />
            <PendingRoundsTable />
        </div>
    );
}
