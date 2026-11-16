import React, { useState } from 'react';
import { Product, PlatformType } from '../types';
import { Plus, Star, Clock, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}  

export function ProductCatalog({ products, searchQuery, onAddToCart }: ProductCatalogProps) {
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformType>('all');

  const filtered = products.filter((p) => {
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.supplier.toLowerCase().includes(q);
    return matchesPlatform && matchesSearch;
  });

  const platformBadge = (platform: PlatformType) => {
    switch (platform) {
      case 'alibaba':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'aliexpress':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'easyexpress':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  const platformLabel = (platform: PlatformType) => {
    switch (platform) {
      case 'alibaba':
        return 'Alibaba B2B';
      case 'aliexpress':
        return 'AliExpress B2C';
      case 'easyexpress':
        return 'Easy Express';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Catálogo Unificado Triangular</h2>
          <p className="text-sm text-slate-500">
            Selecione produtos B2B, B2C ou serviços logísticos para compor seu lote.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {(['all', 'alibaba', 'aliexpress', 'easyexpress'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setPlatformFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                platformFilter === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f === 'all' ? 'Todos' : platformLabel(f)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-sm">Nenhum item encontrado para os filtros atuais.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${platformBadge(
                      product.platform
                    )}`}
                  >
                    {platformLabel(product.platform)}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{product.supplier}</p>

                <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium">
                    {product.badge}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {product.leadTimeDays}d
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-slate-900">
                    US$ {product.price.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    MOQ: {product.minOrder} un. · Venda sug.: US$ {product.retailSuggested.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
