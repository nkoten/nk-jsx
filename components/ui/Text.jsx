// components/ui/Text.jsx
import React from 'react';

// Mapeamento padrão: Associa o tipo de texto à tag HTML mais semântica por padrão
const DEFAULT_TAGS = {
  'titulo': 'h1',
  'subtitulo': 'h2',
  'subtopico': 'h3',
  'topico-miudo': 'h4',
  'rotulo-secao': 'h5',
  'texto-destaque': 'p',
  'texto': 'p',
  'texto-pequeno': 'span',
  'legenda': 'figcaption',
  'acao': 'span'
};

/**
 * --- Componente de Tipografia NK-Text ---
 * Centraliza e padroniza o uso do mini-framework de texto do projeto.
 */
export default function Text({ 
  children, 
  type = 'texto', 
  tag, 
  className = '', 
  ...props 
}) {
  // Define a tag final: usa a informada explicitamente, ou busca a padrão do tipo, ou cai em 'span'
  const Component = tag || DEFAULT_TAGS[type] || 'span';

  // Monta a classe do framework (.nk-*) combinada com eventuais classes extras do usuário
  const combinedClassName = `nk-${type} ${className}`.trim();

  return (
    <Component className={combinedClassName} ...props>
      {children}
    </Component>
  );
}
