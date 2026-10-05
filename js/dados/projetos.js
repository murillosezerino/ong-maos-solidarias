// Dados dos projetos exibidos na página Projetos.
// No futuro, este arquivo pode ser substituído por uma chamada à API do back-end.
export const projetos = [
  {
    id: 'cozinha-comunitaria',
    titulo: 'Cozinha comunitária',
    descricao: 'Preparo de 400 refeições por semana para famílias do bairro.',
    imagem: 'cozinha',
    alt: 'Voluntárias preparando refeições em uma cozinha industrial',
    etiquetas: [
      { texto: 'Em andamento', tipo: 'sucesso' },
      { texto: 'Alimentação', tipo: 'info' }
    ]
  },
  {
    id: 'reforco-escolar',
    titulo: 'Reforço escolar',
    descricao: 'Aulas de apoio para 80 crianças do ensino fundamental.',
    imagem: 'reforco',
    alt: 'Educadora ajudando crianças com a lição em uma sala de aula',
    etiquetas: [
      { texto: 'Vagas limitadas', tipo: 'aviso' },
      { texto: 'Educação', tipo: 'info' }
    ]
  }
];
