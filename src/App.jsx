import React from 'react'
import ProductList from './components/ProductList'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6 md:py-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              Galene - Moda Feminina Atacado
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Nossos Produtos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Descubra a melhor moda feminina no atacado com qualidade e estilo.</p>
        </div>
        <ProductList />
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Galene</h3>
            <p className="text-gray-300">Moda Feminina Atacado</p>
          </div>
          <p className="text-sm md:text-base">&copy; 2024 Galene. Todos os direitos reservados. | Desenvolvido com ❤️</p>
        </div>
      </footer>
    </div>
  )
}

export default App
