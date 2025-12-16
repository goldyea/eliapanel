import React from 'react';
import { HomeIcon, CalendarIcon, DocumentTextIcon, DocumentIcon, LockClosedIcon } from './icons/Icons';

type Page = 'home' | 'calendar' | 'planner' | 'pdf';

interface SidebarProps {
  currentPage: Page;
  onNavClick: (page: Page) => void;
}

const NavItem: React.FC<{
  label: string;
  page: Page;
  // FIX: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
  icon: React.ReactElement;
  isProtected?: boolean;
  isActive: boolean;
  onClick: (page: Page) => void;
}> = ({ label, page, icon, isProtected, isActive, onClick }) => (
  <button
    onClick={() => onClick(page)}
    className={`w-full flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ease-in-out text-sm ${
      isActive ? 'bg-[#112240] text-white' : 'text-[#8892b0] hover:bg-[#112240] hover:text-[#ccd6f6]'
    }`}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
    {isProtected && <LockClosedIcon className="h-4 w-4 ml-auto hidden md:inline" />}
  </button>
);

export default function Sidebar({ currentPage, onNavClick }: SidebarProps) {
  const navItems = [
    { label: 'home', page: 'home', icon: <HomeIcon className="h-5 w-5" /> },
    { label: 'calendar', page: 'calendar', icon: <CalendarIcon className="h-5 w-5" /> },
    { label: 'planner', page: 'planner', icon: <DocumentTextIcon className="h-5 w-5" />, isProtected: true },
    { label: 'pdfs', page: 'pdf', icon: <DocumentIcon className="h-5 w-5" />, isProtected: true },
  ];

  return (
    <nav className="bg-[#0a192f] border-r border-[#112240] p-2 sm:p-4 flex flex-col space-y-4">
       <div className="text-white text-xl font-bold p-3 text-center">
         <span className="md:hidden">e</span>
         <span className="hidden md:inline">elia</span>
       </div>
      <div className="flex-grow space-y-2">
        {navItems.map(item => (
          <NavItem 
            key={item.page}
            {...item}
            isActive={currentPage === item.page}
            onClick={onNavClick}
          />
        ))}
      </div>
    </nav>
  );
}