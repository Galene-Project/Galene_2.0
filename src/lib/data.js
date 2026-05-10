// ─── THEME ────────────────────────────────────────────────────────────────
export const T = {
  bg: "#FAFAF8", bg2: "#F4F1EC", bg3: "#EDE8E0", panel: "#FFFFFF",
  border: "#E0D8CC", border2: "#C8BFB0",
  gold: "#B8935A", goldDk: "#8A6A38", goldLt: "#D4B07A", goldXlt: "#F5EDD8",
  ink: "#1A1714", ink2: "#3A3530", ink3: "#6A6058", ink4: "#9A9088",
  ruby: "#8B3A3A", jade: "#3A6B4A",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────
export const fmt = (v) => "R$ " + Number(v).toFixed(2).replace(".", ",");

// ─── COLOR MAP ────────────────────────────────────────────────────────────
export const COR_HEX = {
  Preto: "#1A1A1A", Branco: "#F5F2EE", OffWhite: "#EEEADE",
  Vinho: "#6B2737", Marinho: "#1E3A5F", Nude: "#C4A882",
  Bege: "#C8B89A", Caramelo: "#B5743A", Rosa: "#E8A0A0",
  Vermelho: "#8B2020", Laranja: "#C97A3A", Amarelo: "#D4A82A",
  Azul: "#3A6B9E", Verde: "#4A6B3A", Cinza: "#8A8A8A",
  Grafite: "#484848", Marrom: "#6B4226", Jeans: "#3A5A7A",
  Colorido: "#B8935A", Lilas: "#9B7EC8", Coral: "#E07A5F",
  Musgo: "#5C6B3A", Terracota: "#C16A3A",
};

const SP = ["P", "M", "G", "GG"];
const SP_PLUS = ["P", "M", "G", "GG", "XGG"];
const SP_UNICO = ["Unico"];

// ─── CATALOG ──────────────────────────────────────────────────────────────
export const PRODUTOS = [
  // VESTIDOS VISCOLAYCRA
  { id: 1,  nome: "Vestido Bella",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: true,  tag: "Mais Vendido", cores: ["Preto","Branco","Vinho","Nude","Marinho"], tamanhos: SP,        desc: "Vestido basico em viscolaycra com caimento elegante." },
  { id: 4,  nome: "Vestido Eva",         cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Preto","Caramelo","Verde","Azul"],        tamanhos: SP,        desc: "Corte reto com tecido leve e fluido." },
  { id: 5,  nome: "Vestido Safira",      cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false, tag: "Novo",         cores: ["Marinho","Vinho","Preto","Grafite"],       tamanhos: SP,        desc: "Modelagem sofisticada para uso day to night." },
  { id: 6,  nome: "Vestido Naomi",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Preto","Nude","Rosa","Bege"],              tamanhos: SP,        desc: "Decote elegante com tecido de alta qualidade." },
  { id: 7,  nome: "Vestido Mara",        cat: "Vestidos",  sub: "Viscolaycra", preco: 68, destaque: false, tag: null,           cores: ["Vinho","Marrom","Terracota","Preto"],      tamanhos: SP,        desc: "Vestido midi com textura leve e caimento perfeito." },
  { id: 8,  nome: "Vestido Ariel",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: "Destaque",     cores: ["Azul","Verde","Coral","Preto"],            tamanhos: SP,        desc: "Vestido vibrante com modelagem contemporanea." },
  { id: 9,  nome: "Vestido Nina",        cat: "Vestidos",  sub: "Viscolaycra", preco: 85, destaque: false, tag: "Premium",      cores: ["Preto","Marinho","Grafite","Vinho"],       tamanhos: SP_PLUS,   desc: "Linha premium com acabamento refinado." },
  { id: 10, nome: "Vestido Lola",        cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Nude","Rosa","Caramelo","Branco"],         tamanhos: SP,        desc: "Vestido feminino com tecido macio e confortavel." },
  { id: 11, nome: "Vestido Lorena ML",   cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Preto","Bege","Cinza","Marinho"],          tamanhos: SP,        desc: "Manga longa com tecido de alto desempenho." },
  { id: 12, nome: "Vestido Laila",       cat: "Vestidos",  sub: "Viscolaycra", preco: 70, destaque: false, tag: null,           cores: ["Verde","Musgo","Preto","Nude"],            tamanhos: SP,        desc: "Inspiracao natural com corte anatomico." },
  { id: 13, nome: "Vestido Kenya",       cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Colorido","Coral","Laranja","Amarelo"],    tamanhos: SP,        desc: "Estilo livre com cores vibrantes." },
  { id: 14, nome: "Vestido Marina",      cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Azul","Marinho","Jeans","Cinza"],          tamanhos: SP,        desc: "Estilo nautico com corte moderno." },
  { id: 15, nome: "Vestido Pandora",     cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Preto","Vinho","Lilas","Cinza"],           tamanhos: SP,        desc: "Tecido elastico de alta recuperacao." },
  { id: 16, nome: "Vestido Italia",      cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false, tag: null,           cores: ["Bege","Nude","OffWhite","Rosa"],           tamanhos: SP,        desc: "Inspirado na moda mediterranea." },
  { id: 17, nome: "Vestido Allegra",     cat: "Vestidos",  sub: "Viscolaycra", preco: 65, destaque: false, tag: null,           cores: ["Preto","Coral","Verde","Amarelo"],         tamanhos: SP,        desc: "Vestido alegre com cores marcantes." },
  { id: 18, nome: "Vestido Brisa",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["OffWhite","Azul","Rosa","Verde"],          tamanhos: SP,        desc: "Leve como uma brisa, conforto o dia todo." },
  { id: 19, nome: "Vestido Luana",       cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Preto","Bege","Caramelo"],                tamanhos: SP,        desc: "Basico essencial para o dia a dia." },
  { id: 20, nome: "Vestido Elisa",       cat: "Vestidos",  sub: "Viscolaycra", preco: 60, destaque: false, tag: null,           cores: ["Rosa","Nude","Vinho","Lilas"],             tamanhos: SP,        desc: "Feminino e elegante para qualquer ocasiao." },
  { id: 21, nome: "Vestido Aurora",      cat: "Vestidos",  sub: "Viscolaycra", preco: 40, destaque: false, tag: null,           cores: ["Laranja","Coral","Amarelo","Vermelho"],    tamanhos: SP,        desc: "Cores do amanhecer em tecido premium." },
  // MOLETINHO
  { id: 22, nome: "Vestido Monica Mol.", cat: "Moletinho", sub: "Moletinho",   preco: 75, destaque: false, tag: "Novo",         cores: ["Preto","Cinza","Bege","Marinho"],          tamanhos: SP,        desc: "Moletinho premium com caimento relaxado e elegante." },
  { id: 23, nome: "Vestido Pandora Mol.",cat: "Moletinho", sub: "Moletinho",   preco: 85, destaque: false, tag: null,           cores: ["Preto","Grafite","Cinza","Musgo"],         tamanhos: SP,        desc: "Macio e confortavel, perfeito para o dia a dia." },
  { id: 24, nome: "Vestido Italia Mol.", cat: "Moletinho", sub: "Moletinho",   preco: 75, destaque: false, tag: null,           cores: ["Bege","Caramelo","OffWhite","Marrom"],     tamanhos: SP,        desc: "Estilo italiano em tecido moletinho premium." },
  // LANZINHA
  { id: 25, nome: "Vestido Italia Lanz.",cat: "Lanzinha",  sub: "Lanzinha",    preco: 60, destaque: false, tag: null,           cores: ["Bege","Nude","OffWhite","Cinza"],          tamanhos: SP,        desc: "Lanzinha de alta qualidade com caimento suave." },
  { id: 26, nome: "Vestido Monica Lanz.",cat: "Lanzinha",  sub: "Lanzinha",    preco: 60, destaque: false, tag: null,           cores: ["Preto","Marinho","Grafite"],               tamanhos: SP,        desc: "Modelagem moderna em lanzinha premium." },
  { id: 27, nome: "Vestido Monica Lanz. Rosa", cat: "Lanzinha", sub: "Lanzinha", preco: 60, destaque: false, tag: null,        cores: ["Rosa","Lilas","Coral","Nude"],             tamanhos: SP,        desc: "Cores pastel delicadas em tecido lanzinha." },
  // CONJUNTOS
  { id: 2,  nome: "Conjunto Dallas",    cat: "Conjuntos", sub: "Viscolaycra", preco: 75,  destaque: true,  tag: "Mais Vendido", cores: ["Preto","Nude","Marinho","Caramelo"],       tamanhos: SP,        desc: "Conjunto cropped + saia com caimento impecavel." },
  { id: 28, nome: "Conjunto Dani",      cat: "Conjuntos", sub: "Viscolaycra", preco: 85,  destaque: false, tag: "Premium",     cores: ["Preto","Vinho","Grafite","Marinho"],        tamanhos: SP,        desc: "Conjunto sofisticado para ocasioes especiais." },
  { id: 29, nome: "Conjunto Tiffany",   cat: "Conjuntos", sub: "Viscolaycra", preco: 50,  destaque: false, tag: null,          cores: ["Nude","Rosa","Bege","OffWhite"],            tamanhos: SP,        desc: "Delicado e feminino, ideal para o dia a dia." },
  { id: 30, nome: "Conj. Tiffany Mol.", cat: "Conjuntos", sub: "Moletinho",   preco: 98,  destaque: false, tag: "Premium",     cores: ["Cinza","Bege","Preto","Marinho"],           tamanhos: SP,        desc: "Conjunto moletinho premium para o casual chic." },
  { id: 31, nome: "Conj. Chantal Calca",cat: "Conjuntos", sub: "Viscolaycra", preco: 80,  destaque: false, tag: null,          cores: ["Preto","Marinho","Grafite","Vinho"],        tamanhos: SP,        desc: "Calca + blusa com tecido de alta qualidade." },
  { id: 32, nome: "Conjunto Chantal",   cat: "Conjuntos", sub: "Viscolaycra", preco: 80,  destaque: false, tag: null,          cores: ["Nude","Bege","Caramelo","Rosa"],            tamanhos: SP,        desc: "Elegancia cotidiana em viscolaycra premium." },
  // BLUSAS
  { id: 33, nome: "Blusa Caja",         cat: "Blusas",    sub: "Viscolaycra", preco: 35,  destaque: false, tag: null,          cores: ["Preto","Branco","Nude","Cinza","Azul"],     tamanhos: SP,        desc: "Blusa versatil para compor looks variados." },
  { id: 34, nome: "Blusa Bagda",        cat: "Blusas",    sub: "Viscolaycra", preco: 39,  destaque: false, tag: null,          cores: ["Preto","Marinho","Verde","Vinho"],          tamanhos: SP,        desc: "Modelagem solta com tecido leve." },
  { id: 35, nome: "Blusa Julia",        cat: "Blusas",    sub: "Viscolaycra", preco: 45,  destaque: false, tag: "Novo",        cores: ["Branco","OffWhite","Nude","Rosa"],           tamanhos: SP,        desc: "Blusa premium com detalhes delicados." },
  { id: 36, nome: "Blusa Yasmin",       cat: "Blusas",    sub: "Viscolaycra", preco: 30,  destaque: false, tag: null,          cores: ["Colorido","Coral","Azul","Verde","Amarelo"],tamanhos: SP,        desc: "Estampas vibrantes para looks descontraidos." },
  // REGATAS
  { id: 37, nome: "Regata Ellen",       cat: "Regatas",   sub: "Viscolaycra", preco: 20,  destaque: false, tag: null,          cores: ["Preto","Branco","Nude","Cinza","Rosa","Azul"], tamanhos: SP,     desc: "Regata basica em viscolaycra, essencial no guarda-roupa." },
  // CARDIGANS
  { id: 38, nome: "Cardigan Canelado",  cat: "Cardigans", sub: "Canelado",    preco: 39,  destaque: false, tag: null,          cores: ["Preto","Bege","Caramelo","Cinza","OffWhite"],tamanhos: SP_UNICO, desc: "Cardigan canelado com textura premium." },
  { id: 39, nome: "Cardigan Luxor",     cat: "Cardigans", sub: "Viscolycra",  preco: 39,  destaque: false, tag: null,          cores: ["Preto","Marinho","Vinho","Grafite","Nude"],  tamanhos: SP_UNICO, desc: "Tecido macio e encorpado, ideal para camadas." },
  // CALCAS
  { id: 40, nome: "Calca Pantalona",    cat: "Calcas",    sub: "Viscolaycra", preco: 40,  destaque: false, tag: null,          cores: ["Preto","Marinho","Caramelo","Bege","Cinza"], tamanhos: SP,        desc: "Pantalona fluida com cos elastico confortavel." },
  // MACACOES
  { id: 3,  nome: "Macacao Kami",       cat: "Macacoes",  sub: "Viscolaycra", preco: 79,  destaque: true,  tag: "Destaque",    cores: ["Preto","Nude","Caramelo","Marinho","Vinho"], tamanhos: SP,        desc: "Macacao elegante para looks completos e sofisticados." },
];

export const CATS = [
  { id: "destaques", label: "Destaques", icon: "✦" },
  { id: "Vestidos",  label: "Vestidos",  icon: "+" },
  { id: "Moletinho", label: "Moletinho", icon: "+" },
  { id: "Lanzinha",  label: "Lanzinha",  icon: "+" },
  { id: "Conjuntos", label: "Conjuntos", icon: "+" },
  { id: "Blusas",    label: "Blusas",    icon: "›" },
  { id: "Regatas",   label: "Regatas",   icon: "v" },
  { id: "Cardigans", label: "Cardigans", icon: "o" },
  { id: "Calcas",    label: "Calcas",    icon: "=" },
  { id: "Macacoes",  label: "Macacoes",  icon: "o" },
];
