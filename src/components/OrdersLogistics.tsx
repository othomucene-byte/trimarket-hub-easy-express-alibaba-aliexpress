import React from 'react';
import { TriangularOrder } from '../types';
import { Truck, RefreshCw, MapPin, CheckCircle2 } from 'lucide-react';

interface OrdersLogisticsProps {
  orders: TriangularOrder[];
  onAdvanceOrder: (orderId: string) => void;
}  

export function OrdersLogistics({ orders, onAdvanceOrder }: OrdersLogisticsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Pedidos & Malha Logística Easy Express</h2>
        <p className="text-sm text-slate-500">
          Acompanhe e simule o avanço das cargas entre Alibaba, AliExpress e Easy Express.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{order.id}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {order.status}
                </span>
                <span className="text-xs text-slate-400">Criado em {order.createdAt}</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                {order.customer}
              </div>

              <div className="text-xs text-slate-500">
                Origem: <strong className="uppercase">{order.originPlatform}</strong> → Hub:{' '}
                <strong>{order.fulfillmentBy}</strong> → Canal: <strong>{order.targetChannel}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <div className="text-left lg:text-right">
                <div className="text-base font-bold text-slate-900">
                  US$ {order.totalUsd.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500">
                  {order.itemsCount} itens · ETA {order.etaDays} dias
                </div>
              </div>

              {order.status !== 'Entregue ao Destino' ? (
                <button
                  onClick={() => onAdvanceOrder(order.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Avançar Etapa
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  Concluído
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
