'use client';

import { useRound } from '@/features/market/hooks/use-round';
import ActionBar from '@/features/admin/components/action-bar';
import CurrentRoundInfo from '@/features/admin/components/current-round-info';
import PendingRoundsTable from '@/features/admin/components/pending-rounds-table';
import { useSocket } from '@/features/market/hooks/use-socket';

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
