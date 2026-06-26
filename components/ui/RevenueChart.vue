<template>
  <div class="relative w-full h-full min-h-[350px]">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
      <div class="flex flex-col items-center gap-3 text-slate-500">
        <div class="w-8 h-8 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
        <span class="text-sm font-medium">Loading Chart Data...</span>
      </div>
    </div>
    
    <div v-if="!loading && chartData.labels?.length === 0" class="absolute inset-0 flex items-center justify-center">
      <div class="text-slate-500 text-sm">No revenue data available for the last 6 months.</div>
    </div>

    <Line v-if="!loading && chartData.labels?.length > 0" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as () => any[],
    default: () => [],
  },
});

const chartData = computed(() => {
  const sortedData = [...props.data];
  
  return {
    labels: sortedData.map(item => item.month),
    datasets: [
      {
        label: 'Platform Revenue (₦)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)', // primary-600 with opacity
        borderColor: '#7c3aed', // primary-600
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#7c3aed',
        pointHoverBackgroundColor: '#7c3aed',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        data: sortedData.map(item => item.revenue),
        yAxisID: 'y',
      },
      {
        label: 'Total GMV (₦)',
        backgroundColor: 'rgba(16, 185, 129, 0.05)', // emerald-500 with opacity
        borderColor: '#10b981', // emerald-500
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#10b981',
        pointHoverBackgroundColor: '#10b981',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.4,
        data: sortedData.map(item => item.gmv),
        yAxisID: 'y1',
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          weight: '600',
          size: 12,
        },
        color: '#64748b' // slate-500
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)', // slate-900
      titleFont: {
        family: "'Plus Jakarta Sans', sans-serif",
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 13
      },
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 12,
          weight: '500'
        },
        color: '#94a3b8' // slate-400
      }
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: {
        color: '#f1f5f9', // slate-100
        drawBorder: false,
      },
      ticks: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 11,
          weight: '600'
        },
        color: '#94a3b8',
        callback: function(value: any) {
          if (value >= 1000000) return '₦' + (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return '₦' + (value / 1000).toFixed(1) + 'k';
          return '₦' + value;
        }
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
      ticks: {
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 11,
          weight: '600'
        },
        color: '#10b981', // emerald-500
        callback: function(value: any) {
          if (value >= 1000000) return '₦' + (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return '₦' + (value / 1000).toFixed(1) + 'k';
          return '₦' + value;
        }
      }
    }
  }
};
</script>
