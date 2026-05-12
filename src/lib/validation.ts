import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  stock: z.number().int().nonnegative('Estoque não pode ser negativo'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  tamanhos: z.array(z.string()).min(1, 'Pelo menos um tamanho é obrigatório'),
  cores: z.array(z.string()).min(1, 'Pelo menos uma cor é obrigatória'),
});

export const cartItemSchema = z.object({
  product_id: z.string().uuid('ID do produto inválido'),
  quantity: z.number().int().positive('Quantidade deve ser pelo menos 1'),
  size: z.string().min(1, 'Tamanho é obrigatório'),
  color: z.string().min(1, 'Cor é obrigatória'),
  user_id: z.string().uuid('ID do usuário inválido'),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type User = z.infer<typeof userSchema>;
