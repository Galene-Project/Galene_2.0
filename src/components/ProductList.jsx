import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    if (!supabase) {
      setError('Supabase não está configurado')
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="ml-4 text-lg">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium">Erro ao carregar produtos:</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
            {product.photo_url && (
              <img
                src={product.photo_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Categoria:</span> {product.category}</p>
              <p className="text-sm text-gray-600 mb-4"><span className="font-medium">Material:</span> {product.material}</p>
              <div className="flex items-baseline justify-between">
                {product.price_original ? (
                  <>
                    <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through">R$ {product.price_original.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-2xl font-bold text-gray-800">
          Total de produtos: <span className="text-blue-600">{products.length}</span>
        </p>
      </div>
    </div>
  )
}
