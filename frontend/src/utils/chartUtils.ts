import { Chart, registerables, type ChartConfiguration } from 'chart.js';

Chart.register(...registerables);

// 🎨 Colores reutilizables
export const CHART_COLORS = [
  'rgba(168, 85, 247, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(59, 130, 246, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(245, 158, 11, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(99, 102, 241, 0.8)',
  'rgba(20, 184, 166, 0.8)',
];

// 🧹 destruir chart anterior
export function destroyChart(chart: Chart | null) {
  if (chart) chart.destroy();
}

// 📊 BAR CHART (actresses por nacionalidad)
export function createBarChart(
  canvas: HTMLCanvasElement,
  labels: string[],
  data: number[]
) {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderRadius: 8,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              ` ${ctx.parsed.y} actress${ctx.parsed.y !== 1 ? 'es' : ''}`,
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
}

// 🥧 PIE CHART (géneros)
export function createPieChart(
  ctx: CanvasRenderingContext2D,
  labels: string[],
  data: number[]
) {
  const config: ChartConfiguration = {
    type: 'pie',
    data: {
      labels,
      datasets: [{ data, borderWidth: 0 }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20, font: { size: 12 } },
        },
      },
    },
  };

  return new Chart(ctx, config);
}

// 🍩 DOUGHNUT CHART (películas por país)
export function createDoughnutChart(
  canvas: HTMLCanvasElement,
  labels: string[],
  data: number[]
) {
  const config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              ` ${ctx.label}: ${ctx.parsed} movie${ctx.parsed !== 1 ? 's' : ''}`,
          },
        },
      },
    },
  };

  return new Chart(canvas, config);
}