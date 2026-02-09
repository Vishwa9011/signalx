'use client';

import { tabs } from './constants';
import type { ActiveTab } from './types';

type TabSelectorProps = {
    activeTab: ActiveTab;
    onSelect: (tab: ActiveTab) => void;
};

const Tabs = ({ activeTab, onSelect }: TabSelectorProps) => (
    <div className="mb-6 flex flex-col gap-2 rounded-2xl bg-slate-100 p-1 sm:flex-row sm:gap-0">
        {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelect(tab.id)}
                    className={`flex-1 cursor-pointer rounded-xl px-4 py-3 text-left transition ${
                        isActive ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <div className="text-sm font-semibold text-slate-900">{tab.label}</div>
                    <div className="text-xs text-slate-500">{tab.subtitle}</div>
                </button>
            );
        })}
    </div>
);

export default Tabs;
