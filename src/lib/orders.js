import { supabase } from "./supabase";

// ─── Schema esperado no Supabase ──────────────────────────────────────────
//
// Tabela: orders
//   id          uuid  primary key default gen_random_uuid()
//   created_at  timestamptz default now()
//   razao       text  not null
//   cnpj        text  not null
//   email       text  not null
//   tel         text  not null
//   endereco    text
//   cidade      text
//   pagamento   text  not null   -- 'pix' | 'cartao'
//   total_pecas int   not null
//   total_valor numeric(10,2) not null
//   status      text  default 'pendente'
//   itens       jsonb not null   -- array de itens (ver abaixo)
//
// Estrutura de `itens`:
// [
//   {
//     id: number,
//     nome: string,
//     cat: string,
//     preco: number,
//     sel: [{ key, cor, tam, qtd }]
//   }
// ]
//
// SQL para criar a tabela:
//
// create table orders (
//   id          uuid primary key default gen_random_uuid(),
//   created_at  timestamptz default now(),
//   razao       text not null,
//   cnpj        text not null,
//   email       text not null,
//   tel         text not null,
//   endereco    text,
//   cidade      text,
//   pagamento   text not null,
//   total_pecas int  not null,
//   total_valor numeric(10,2) not null,
//   status      text default 'pendente',
//   itens       jsonb not null
// );
//
// Row Level Security (recomendado):
// alter table orders enable row level security;
// create policy "insert only" on orders for insert with check (true);
// ─────────────────────────────────────────────────────────────────────────

/**
 * Salva um pedido no Supabase.
 * Retorna { data, error }.
 */
export async function salvarPedido({ form, cart, pagamento, totalPecas, totalValor }) {
  if (!supabase) {
    // Supabase não configurado — simula sucesso para não travar o fluxo
    console.warn("[Galene] Supabase não configurado. Pedido não foi salvo.");
    return { data: null, error: null };
  }

  const payload = {
    razao:       form.razao.trim(),
    cnpj:        form.cnpj.trim(),
    email:       form.email.trim(),
    tel:         form.tel.trim(),
    endereco:    form.end?.trim() || "",
    cidade:      form.cidade?.trim() || "",
    pagamento,
    total_pecas: totalPecas,
    total_valor: totalValor,
    itens: cart.map((item) => ({
      id:    item.id,
      nome:  item.nome,
      cat:   item.cat,
      preco: item.preco,
      sel:   item.sel,
    })),
  };

  const { data, error } = await supabase.from("orders").insert([payload]).select();

  if (error) {
    console.error("[Galene] Erro ao salvar pedido:", error);
  }

  return { data, error };
}
