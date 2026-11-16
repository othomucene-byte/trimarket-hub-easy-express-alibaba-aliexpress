import React, { useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

export function MarginSimulator() {
  const [unitCost, setUnitCost] = useState(14.5);
  const [quantity, setQuantity] = useState(50);
  const [shippingTotal, setShippingTotal] = useState(145);
  const [retailPrice, setRetailPrice] = useState(44.9);

  const totalProductCost = unitCost * quantity;
  const totalInvested = totalProductCost + shippingTotal;
  const totalRevenue = retailPrice * quantity;
  const netProfit = totalRevenue - totalInvested;
  const marginPercent = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Simulador de Margem Triangular</h2>
          <p className="text-sm text-slate-500">
            Calcule a rentabilidade comprando no Alibaba/AliExpress com frete Easy Express.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Custo Unitário Origem (US$)
            </label>
            <input
              type="number"
              step="0.5"
              value={unitCost}
              onChange={(e) => setUnitCost(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quantidade do Lote (un.)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Frete Consolidado Easy Express (US$)
            </label>
            <input
              type="number"
              value={shippingTotal}
              onChange={(e) => setShippingTotal(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preço de Venda B2C / AliExpress (US$)
            </label>
            <input
              type="number"
              step="0.5"
              value={retailPrice}
              onChange={(e) => setRetailPrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-slate-900 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            Resultado Projetado
          </span>
          <h3 className="text-3xl font-bold mt-2">
            US$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-sm text-slate-400 mt-1">Lucro líquido estimado na operação</p>
        </div>

        <div className="space-y-3 border-t border-slate-800 pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Investimento Total (Produtos + Easy Express)</span>
            <span className="font-semibold">US$ {totalInvested.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Receita Bruta Estimada</span>
            <span className="font-semibold">US$ {totalRevenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Margem Líquida</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {marginPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
