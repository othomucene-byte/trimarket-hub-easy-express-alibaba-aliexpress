import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NetworkOverview } from './components/NetworkOverview';
import { ProductCatalog } from './components/ProductCatalog';
import { OrdersLogistics } from './components/OrdersLogistics';
import { MarginSimulator } from './components/MarginSimulator';
import { CartDrawer } from './components/CartDrawer';
import { initialProducts, initialOrders } from './data/triangularData';
import { CartItem, Product, TriangularOrder, TabType } from './types';
import { CheckCircle2, Globe, Layers, Truck, BarChart3 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('trimarket_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<TriangularOrder[]>(() => {
    try {
      const saved = localStorage.getItem('trimarket_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('trimarket_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('trimarket_orders', JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }
  }, [orders]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + product.minOrder }
            : item
        );
      }
      return [...prev, { product, quantity: product.minOrder }];
    });
    showToast(`${product.name} adicionado ao lote triangular`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = (shippingTier: 'standard' | 'express', destination: string) => {
    if (cart.length === 0) return;
    const totalValue = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingCost = shippingTier === 'express' ? 145 : 65;
    const newOrder: TriangularOrder = {
      id: `TRI-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: destination || 'Operação Brasil — Hub SP',
      originPlatform: cart[0].product.platform,
      fulfillmentBy: 'Easy Express',
      targetChannel: cart[0].product.platform === 'alibaba' ? 'AliExpress B2C' : 'Loja Parceira',
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalUsd: Number((totalValue + shippingCost).toFixed(2)),
      status: 'Coleta Alibaba/AliExpress',
      etaDays: shippingTier === 'express' ? 5 : 12,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('orders');
    showToast(`Pedido ${newOrder.id} enviado para a malha Easy Express!`);
  };

  const handleAdvanceOrder = (orderId: string) => {
    const stages: TriangularOrder['status'][] = [
      'Coleta Alibaba/AliExpress',
      'Hub Easy Express (Shenzhen)',
      'Trânsito Aéreo Internacional',
      'Desembaraço Aduaneiro',
      'Entregue ao Destino',
    ];
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIndex = stages.indexOf(order.status);
        const nextIndex = Math.min(stages.length - 1, currentIndex + 1);
        return { ...order, status: stages[nextIndex] };
      })
    );
    showToast(`Status do pedido ${orderId} atualizado na rede`);
  };

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [    { id: 'overview', label: 'Rede Triangular', icon: <Globe className="w-4 h-4" /> },
    { id: 'catalog', label: 'Catálogo Unificado', icon: <Layers className="w-4 h-4" /> },
    { id: 'orders', label: 'Pedidos & Logística', icon: <Truck className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulador de Margem', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && activeTab !== 'catalog') setActiveTab('catalog');
        }}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto py-2.5 no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <NetworkOverview
            orders={orders}
            productsCount={initialProducts.length}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'catalog' && (
          <ProductCatalog
            products={initialProducts}
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
          />
        )}
        {activeTab === 'orders' && (
          <OrdersLogistics orders={orders} onAdvanceOrder={handleAdvanceOrder} />
        )}
        {activeTab === 'simulator' && <MarginSimulator />}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;
