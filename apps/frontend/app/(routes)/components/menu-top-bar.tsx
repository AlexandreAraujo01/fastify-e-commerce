"use client";

export default function MenuTopBar() {
  return (
    // 1. Usamos fixed ou sticky para o header acompanhar o scroll
    // 2. bg-zinc-900/80 dá uma transparência sutil (blur) para o conteúdo de trás
    // 3. O padding e a margem negativa mx-0.5 foram ajustados para alinhamento
    <header className="sticky top-0 z-50 w-full px-4 pt-2 antialiased">
      <div
        className="
          mx-auto flex h-14  items-center justify-between rounded-xl 
          border border-zinc-800 bg-zinc-900 px-6
          
          /* O PULO DO GATO DA SOMBRA SUTIL */
          /* shadow-[0_8px_30px_rgb(0,0,0,0.12)] - Sombra persAonalizada com opacidade baixa */
          /* shadow-zinc-950/20 - Adiciona uma cor de base para a sombra */
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          +
          backdrop-blur-sm
        "
      >
        {/* LOGO OU NOME DA LOJA */}
        <div className="flex items-center gap-2">
          {/* <div className="h-7 w-7 rounded-full bg-indigo-600" />{" "} */}
          {/* Placeholder de Logo */}
          <span className="text-xl font-bold tracking-tight text-white">
            SudoShop
          </span>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a href="#" className="hover:text-white transition-colors">
            Produtos
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Categorias
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Promoções
          </a>
        </nav>

        {/* AÇÕES DO USUÁRIO */}
      </div>
    </header>
  );
}
