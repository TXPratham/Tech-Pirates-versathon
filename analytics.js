// Simulated analytics data (in real app, fetch from localStorage/database)
class TaxWiseAnalytics {
    constructor() {
        this.data = this.generateSampleData();
        this.initializeDashboard();
    }

    generateSampleData() {
        return {
            calculations: 1247,
            incomes: [850000, 1200000, 1800000, 950000, 2200000, 750000, 1500000, 3200000],
            regimes: { new: 0.68, old: 0.32 },
            professions: { 
                salaried: 0.52, 
                freelancer: 0.22, 
                business: 0.18, 
                farmer: 0.08 
            },
            states: { 
                karnataka: 0.35, 
                maharashtra: 0.25, 
                delhi: 0.18, 
                gujarat: 0.12, 
                tamilnadu: 0.10 
            },
            incomeBrackets: {
                '0-5L': 320,
                '5-10L': 456,
                '10-20L': 289,
                '20-50L': 142,
                '50L+': 40
            },
            avgIncome: 1450000,
            avgTax: 185000
        };
    }

    initializeDashboard() {
        this.updateStats();
        this.renderCharts();
        this.updateIncomeTable();
        this.updateMetrics();
        
        // Simulate live updates
        setInterval(() => {
            this.simulateLiveUpdate();
        }, 10000);
    }

    updateStats() {
        document.getElementById('totalCalculations').textContent = 
            this.data.calculations.toLocaleString();
        document.getElementById('avgIncome').textContent = 
            `₹${(this.data.avgIncome/1000).toLocaleString()}K`;
        document.getElementById('avgTax').textContent = 
            `₹${(this.data.avgTax/1000).toLocaleString()}K`;
        document.getElementById('topRegime').textContent = 
            Object.keys(this.data.regimes).reduce((a, b) => 
                this.data.regimes[a] > this.data.regimes[b] ? a : b
            ).toUpperCase();
    }

    renderCharts() {
        // Income Distribution (Histogram)
        new Chart(document.getElementById('incomeChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(this.data.incomeBrackets),
                datasets: [{
                    label: 'Calculations',
                    data: Object.values(this.data.incomeBrackets),
                    backgroundColor: '#3b82f6',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Tax Regime Pie
        new Chart(document.getElementById('regimeChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.data.regimes),
                datasets: [{
                    data: Object.values(this.data.regimes).map(v => v * 100),
                    backgroundColor: ['#1d4ed8', '#3b82f6']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // Profession Breakdown
        new Chart(document.getElementById('professionChart'), {
            type: 'pie',
            data: {
                labels: Object.keys(this.data.professions),
                datasets: [{
                    data: Object.values(this.data.professions).map(v => v * 100),
                    backgroundColor: ['#1e3a8a', '#1d4ed8', '#3b82f6', '#60a5fa']
                }]
            },
            options: { responsive: true }
        });

        // State Distribution
        new Chart(document.getElementById('stateChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.data.states),
                datasets: [{
                    data: Object.values(this.data.states).map(v => v * 100),
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
    }

    updateIncomeTable() {
        const tbody = document.getElementById('incomeTable');
        tbody.innerHTML = '';
        
        Object.entries(this.data.incomeBrackets).forEach(([range, count]) => {
            const row = tbody.insertRow();
            const total = this.data.calculations;
            const avgTax = Math.round(this.data.avgTax * (count / total) * 100) / 100;
            row.innerHTML = `
                <td>${range}</td>
                <td>${count.toLocaleString()}</td>
                <td>₹${avgTax.toLocaleString()}</td>
                <td>${((count/total)*100).toFixed(1)}%</td>
            `;
        });
    }

    updateMetrics() {
        const metricsList = document.getElementById('metricsList');
        metricsList.innerHTML = `
            <div class="metric-item">
                <div class="metric-value">${((this.data.regimes.new)*100).toFixed(1)}%</div>
                <div class="metric-label">New Regime Preference</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">₹${(this.data.avgIncome/12000).toFixed(0)}K</div>
                <div class="metric-label">Monthly Avg Take-home</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">${this.data.professions.farmer*100}%</div>
                <div class="metric-label">Farmer Usage</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">${(this.data.avgTax/this.data.avgIncome*100).toFixed(1)}%</div>
                <div class="metric-label">Effective Tax Rate</div>
            </div>
        `;
    }

    simulateLiveUpdate() {
        this.data.calculations += Math.floor(Math.random() * 5) + 1;
        this.data.avgIncome += (Math.random() - 0.5) * 50000;
        this.updateStats();
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    new TaxWiseAnalytics();
});
