// Integração com a biblioteca Chart.js (carregada por CDN somente quando necessária)
const CHART_JS = {
  url: 'https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js',
  integridade: 'sha384-jb8JQMbMoBUzgWatfe6COACi2ljcDdZQ2OxczGA3bGNeWe+6DChMTBJemed7ZnvJ'
};

let carregamento = null;

// Carrega o script uma única vez e devolve o construtor Chart
export function carregarChartJs() {
  if (window.Chart) return Promise.resolve(window.Chart);
  if (!carregamento) {
    carregamento = new Promise((resolver, rejeitar) => {
      const script = document.createElement('script');
      script.src = CHART_JS.url;
      script.integrity = CHART_JS.integridade;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolver(window.Chart);
      script.onerror = () => {
        carregamento = null; // permite tentar de novo na próxima visita
        rejeitar(new Error('Não foi possível carregar o Chart.js'));
      };
      document.head.appendChild(script);
    });
  }
  return carregamento;
}

// Lê as cores do design system (variáveis CSS) para o gráfico seguir a identidade visual
const cor = nome => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();

let graficoAtual = null;

export async function criarGraficoBarras(canvas, rotulos, valores, legenda) {
  const Chart = await carregarChartJs();
  graficoAtual?.destroy(); // evita gráficos duplicados ao voltar para a página

  Chart.defaults.font.family = cor('--fonte-base');
  Chart.defaults.color = cor('--cinza-600');

  graficoAtual = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: rotulos,
      datasets: [{
        label: legenda,
        data: valores,
        backgroundColor: cor('--cor-secundaria'),
        hoverBackgroundColor: cor('--cor-primaria'),
        borderRadius: 6
      }]
    },
    options: {
      locale: 'pt-BR', // números no formato brasileiro (1.200)
      responsive: true,
      maintainAspectRatio: false,
      animation: matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 800 },
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: cor('--cinza-200') } },
        x: { grid: { display: false } }
      }
    }
  });
  return graficoAtual;
}
