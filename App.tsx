
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Planner from './pages/Planner';
import PdfViewer from './pages/PdfViewer';
import PasswordModal from './components/PasswordModal';

type Page = 'home' | 'calendar' | 'planner' | 'pdf';
const PROTECTED_PAGES: Page[] = ['planner', 'pdf'];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageToUnlock, setPageToUnlock] = useState<Page | null>(null);

  const handleNavClick = useCallback((page: Page) => {
    if (PROTECTED_PAGES.includes(page) && !isAuthenticated) {
      setPageToUnlock(page);
      setIsModalOpen(true);
    } else {
      setCurrentPage(page);
    }
  }, [isAuthenticated]);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
    if (pageToUnlock) {
      setCurrentPage(pageToUnlock);
      setPageToUnlock(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'calendar':
        return <Calendar />;
      case 'planner':
        return isAuthenticated ? <Planner /> : <Home />;
      case 'pdf':
        return isAuthenticated ? <PdfViewer /> : <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a192f] text-[#8892b0] lowercase">
      <Sidebar currentPage={currentPage} onNavClick={handleNavClick} />
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {renderPage()}
      </main>
      {isModalOpen && (
        <PasswordModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
    </div>
  );
}
