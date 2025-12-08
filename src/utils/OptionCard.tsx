import React from 'react';
import clsx from 'clsx';

interface Props {
  label: string;
  subtitle?: string;
  selected?: boolean;
  comingSoon?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const OptionCard: React.FC<Props> = ({ label, subtitle, selected, comingSoon, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={comingSoon}
      className={clsx(
        'w-full text-left px-3 py-2 rounded-lg border transition-shadow focus:outline-none flex items-center justify-between',
        selected ? 'border-primary shadow-md' : 'border-gray-200 hover:shadow-sm',
        comingSoon ? 'opacity-60 cursor-not-allowed' : ''
      )}
    >
      <div>
        <div className="font-medium text-gray-900 text-sm">{label}</div>
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>

      <div className="ml-3">
        <div className={clsx('w-4 h-4 rounded-full border', selected ? 'bg-primary' : 'bg-white')}></div>
      </div>

      {children}
    </button>
  );
};

export default OptionCard;
