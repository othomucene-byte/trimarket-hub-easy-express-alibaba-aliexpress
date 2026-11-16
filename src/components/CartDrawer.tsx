import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (tier: 'standard' | 'express', destination: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const [shippingTier, setShippingTier] = useState<'standard' | 'express'>('express');
  const [destination, setDestination] = useState('Operação Brasil — Hub São Paulo');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingCost = items.length > 0 ? (shippingTier === 'express' ? 145 : 65) : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Lote Triangular</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-12">
              Seu lote está vazio. Adicione itens do catálogo unificado.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    US$ {item.product.price.toFixed(2)} / un.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded-md cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Destino / Hub Receptor
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShippingTier('express')}
                className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                  shippingTier === 'express'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="font-bold">Easy Express Aéreo</div>
                <div className="opacity-80">5 dias · US$ 145</div>
              </button>
              <button
                onClick={() => setShippingTier('standard')}
                className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                  shippingTier === 'standard'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="font-bold">Consolidado Padrão</div>
                <div className="opacity-80">12 dias · US$ 65</div>
              </button>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Produtos</span>
                <span>US$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Frete Easy Express</span>
                <span>US$ {shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-1">
                <span>Total</span>
                <span>US$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => onCheckout(shippingTier, destination)}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              Despachar Lote Triangular
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
