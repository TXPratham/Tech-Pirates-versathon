// Mock Data
const allTimeData = {
    totalIncome: 123500, // Scaled up for all time
    totalExpenses: 55299.99,
    netSavings: 68200.01,
    topCategory: "Housing",
    topCategorySpent: 36000,
    savingsRate: 55.2,
    spendingCategories: [
        { name: 'Housing', value: 36000, color: '#3b82f6' },
        { name: 'Groceries', value: 6000, color: '#10b981' },
        { name: 'Other', value: 4500, color: '#f59e0b' },
        { name: 'Insurance', value: 3000, color: '#ef4444' },
        { name: 'Utilities', value: 2500, color: '#8b5cf6' },
        { name: 'Education', value: 2000, color: '#06b6d4' },
        { name: 'Dining', value: 1000, color: '#ec4899' },
        { name: 'Transportation', value: 500, color: '#84cc16' }
    ],
    trend: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        income: [15000, 18000, 16000, 20000, 22000, 32500],
        expenses: [8000, 9000, 8500, 10000, 12000, 7800]
    }
};

const monthlyData = {
    totalIncome: 12350,
    totalExpenses: 5529.99,
    netSavings: 6820.01,
    topCategory: "Housing",
    topCategorySpent: 3600,
    savingsRate: 55.2,
    spendingCategories: [
        { name: 'Housing', value: 3600, color: '#3b82f6' },
        { name: 'Groceries', value: 600, color: '#10b981' },
        { name: 'Other', value: 450, color: '#f59e0b' },
        { name: 'Insurance', value: 300, color: '#ef4444' },
        { name: 'Utilities', value: 250, color: '#8b5cf6' },
        { name: 'Education', value: 200, color: '#06b6d4' },
        { name: 'Dining', value: 100, color: '#ec4899' },
        { name: 'Transportation', value: 50, color: '#84cc16' }
    ],
    trend: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        income: [3000, 3200, 2900, 3250],
        expenses: [1200, 1500, 1000, 1830]
    }
};

let currentData = allTimeData;
let trendChartInstance = null;
let categoryChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderStats();
    renderTrendChart();
    renderCategoryChart();

    // Toggle Logic
    const dateFilter = document.querySelector('.date-filter');
    const dateText = dateFilter.querySelector('span');

    dateFilter.addEventListener('click', () => {
        if (dateText.innerText === 'All time') {
            dateText.innerText = 'This Month';
            currentData = monthlyData;
        } else {
            dateText.innerText = 'All time';
            currentData = allTimeData;
        }

        // Update UI
        updateAll();
    });
});

function updateAll() {
    renderStats();

    // Destroy and Re-render Charts to animate changes
    if (trendChartInstance) trendChartInstance.destroy();
    if (categoryChartInstance) categoryChartInstance.destroy();

    renderTrendChart();
    renderCategoryChart();
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function renderStats() {
    animateValue(document.getElementById('totalIncome'), 0, currentData.totalIncome, 500, '₹');
    animateValue(document.getElementById('totalExpenses'), 0, currentData.totalExpenses, 500, '₹');
    animateValue(document.getElementById('netSavings'), 0, currentData.netSavings, 500, '₹');

    document.getElementById('savingsRate').innerText = `${currentData.savingsRate}% savings rate`;
    document.getElementById('topCategory').innerText = currentData.topCategory;
    document.getElementById('topCategoryAmount').innerText = `${formatCurrency(currentData.topCategorySpent)} spent`;
}

function animateValue(obj, start, end, duration, prefix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = prefix + value.toLocaleString('en-IN');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trend Chart
function renderTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    // Gradient for Income
    const gradientIncome = ctx.createLinearGradient(0, 0, 0, 400);
    gradientIncome.addColorStop(0, 'rgba(16, 185, 129, 0.2)'); // Green
    gradientIncome.addColorStop(1, 'rgba(16, 185, 129, 0)');

    // Gradient for Expenses
    const gradientExpenses = ctx.createLinearGradient(0, 0, 0, 400);
    gradientExpenses.addColorStop(0, 'rgba(239, 68, 68, 0.2)'); // Red
    gradientExpenses.addColorStop(1, 'rgba(239, 68, 68, 0)');

    trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: currentData.trend.labels,
            datasets: [
                {
                    label: 'Income',
                    data: currentData.trend.income,
                    borderColor: '#10b981',
                    backgroundColor: gradientIncome,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Expenses',
                    data: currentData.trend.expenses,
                    borderColor: '#ef4444',
                    backgroundColor: gradientExpenses,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 20 }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { borderDash: [5, 5], color: '#f1f5f9' },
                    ticks: { callback: (value) => '₹' + (value / 1000) + 'k' }
                },
                x: {
                    grid: { display: false }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Category Chart
function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const total = currentData.spendingCategories.reduce((a, b) => a + b.value, 0);

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: currentData.spendingCategories.map(c => c.name),
            datasets: [{
                data: currentData.spendingCategories.map(c => c.value),
                backgroundColor: currentData.spendingCategories.map(c => c.color),
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Custom Legend
    const legendContainer = document.getElementById('categoryLegend');
    legendContainer.innerHTML = ''; // Clear previous
    currentData.spendingCategories.forEach(cat => {
        const percent = total > 0 ? ((cat.value / total) * 100).toFixed(0) : 0;
        legendContainer.innerHTML += `
            <div class="legend-item">
                <div class="color-box" style="background: ${cat.color}"></div>
                <span>${cat.name} <span class="legend-percent">(${percent}%)</span></span>
            </div>
        `;
    });
}
