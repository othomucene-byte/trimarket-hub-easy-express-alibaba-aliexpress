import React from 'react';
import { TriangularOrder, TabType } from '../types';
import { ArrowRight, Globe, Layers, Truck, TrendingUp, Shield, Clock } from 'lucide-react';

interface NetworkOverviewProps {
  orders: TriangularOrder[];
  productsCount: number;
  onNavigate: (tab: TabType) => void;
}

export function NetworkOverview({ orders, productsCount, onNavigate }: NetworkOverviewProps) {
  const totalVolume = orders.reduce((sum, o) => sum + o.totalUsd, 0);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            Arquitetura de Marketplace Triangular
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Conecte Sourcing Alibaba, Varejo AliExpress e Logística Easy Express
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Compre em lote no Alibaba, distribua via AliExpress ou lojas locais e utilize os hubs da Easy Express para consolidação, etiquetagem e desembaraço expresso.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Explorar Catálogo ({productsCount})
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('simulator')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Simular Margem Triangular
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>VOLUME TRANSACIONADO</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            US$ {totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-600 mt-1 font-medium">+18,4% na malha triangular</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>PEDIDOS EM TRÂNSITO</span>
            <Truck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{orders.length}</div>
          <p className="text-xs text-slate-500 mt-1">Via Hub Easy Express Shenzhen</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>SLA MÉDIO DE ENTREGA</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">5,4 dias</div>
          <p className="text-xs text-slate-500 mt-1">Desembaraço prioritário ativo</p>
        </div>
      </div>

      {/* Triangular Nodes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Fluxo da Rede Triangular</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-orange-50 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                1. Origem B2B
              </span>
              <Layers className="w-4 h-4 text-orange-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Alibaba</h4>
            <p className="text-xs text-slate-600 mt-1">
              Sourcing direto de fábrica, preços de atacado, personalização OEM e lotes mínimos competitivos.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                2. Ponte Logística
              </span>
              <Shield className="w-4 h-4 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Easy Express</h4>
            <p className="text-xs text-slate-600 mt-1">
              Consolidação de carga em Shenzhen, inspeção de qualidade, frete aéreo expresso e desembaraço.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-rose-50 border border-rose-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                3. Canal B2C
              </span>
              <Globe className="w-4 h-4 text-rose-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">AliExpress</h4>
            <p className="text-xs text-slate-600 mt-1">
              Escoamento rápido para consumidor final, dropshipping automatizado e alta conversão.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
