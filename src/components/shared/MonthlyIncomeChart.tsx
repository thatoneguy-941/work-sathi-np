
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getInvoices } from '@/lib/database';
import LoadingSpinner from './LoadingSpinner';

const MonthlyIncomeChart = () => {
  const { t } = useLanguage();
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, [timeRange]);

  const loadChartData = async () => {
    try {
      const invoices = await getInvoices();
      const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
      
      const months = getMonthsRange(timeRange);
      const monthlyData = months.map(month => {
        const monthInvoices = paidInvoices.filter(inv => {
          const invoiceDate = new Date(inv.issue_date);
          return invoiceDate.getMonth() === month.month && invoiceDate.getFullYear() === month.year;
        });
        
        const totalAmount = monthInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        
        return {
          name: month.name,
          income: totalAmount,
          invoiceCount: monthInvoices.length
        };
      });

      setChartData(monthlyData);
    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthsRange = (range: string) => {
    const now = new Date();
    const months = [];
    const rangeMap = { '3months': 3, '6months': 6, '12months': 12 };
    const monthCount = rangeMap[range as keyof typeof rangeMap] || 6;

    for (let i = monthCount - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        name: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      });
    }

    return months;
  };

  const totalIncome = chartData.reduce((sum, data) => sum + data.income, 0);
  const averageIncome = chartData.length > 0 ? totalIncome / chartData.length : 0;

  if (loading) {
    return <LoadingSpinner text="Loading income data..." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {t('monthlyIncomeChart')}
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 {t('months')}</SelectItem>
                <SelectItem value="6months">6 {t('months')}</SelectItem>
                <SelectItem value="12months">12 {t('months')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={(value: 'bar' | 'line') => setChartType(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">{t('totalIncome')}</p>
            <p className="text-xl font-bold text-green-600">Rs. {totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">{t('averageMonthly')}</p>
            <p className="text-xl font-bold text-blue-600">Rs. {averageIncome.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, t('income')]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, t('income')]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncomeChart;
