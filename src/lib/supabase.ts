import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (typeof supabaseUrl !== 'string' || !supabaseUrl || typeof supabaseAnonKey !== 'string' || !supabaseAnonKey) {
  throw new Error('Missing or invalid Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getCurrentUserId() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    throw new Error('User not authenticated')
  }
  return user.id
}

export const db = {
  async getProducts() {
    const { data, error } = await supabase.from('products').select('*')
    if (error) throw error
    return data ?? []
  },

  async getUserCart() {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data ?? []
  },

  async addToCart(productId: string, quantity: number = 1) {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('cart')
      .upsert({ user_id: userId, product_id: productId, quantity })
      .select()
    if (error) throw error
    return data
  },

  async removeFromCart(productId: string) {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    if (error) throw error
    return data
  },

  async getUserProfile() {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw error
    return data
  },
}
