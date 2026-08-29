import React from 'react';
import { CategoryId } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

const CATEGORIES: { id: CategoryId; label: string; icon: string }[] = [
  { id: 'all', label: 'Todo el Menú', icon: '🔥' },
  { id: 'hamburguesas', label: 'Hamburguesas', icon: '🍔' },
  { id: 'conos', label: 'Papas en Cono', icon: '🍟' },
  { id: 'gajos', label: 'Papas Gajo', icon: '🥔' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            id={`category-btn-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-150 shrink-0 ${
              isActive
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <span className="text-base leading-none">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
