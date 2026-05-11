import { useState } from 'react';
import AdminButton from './admin/AdminButton';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Página Inicial</h2>
            <p>Conteúdo da página inicial.</p>
          </div>
        );
      case 'about':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Sobre</h2>
            <p>Conteúdo da página sobre.</p>
          </div>
        );
      case 'contact':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contato</h2>
            <p>Conteúdo da página de contato.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">App</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderPage()}
        </div>
      </main>
      <AdminButton className="fixed bottom-[24px] left-[80px] z-[500]" />
    </div>
  );
}

export default App;
