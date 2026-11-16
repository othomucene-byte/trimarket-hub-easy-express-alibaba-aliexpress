export type PlatformType = 'alibaba' | 'aliexpress' | 'easyexpress';

export type TabType = 'overview' | 'catalog' | 'orders' | 'simulator';

export interface Product {
  id: string;
  name: string;
  category: string;
  platform: PlatformType;
  price: number;
  retailSuggested: number;
  minOrder: number;
  leadTimeDays: number;
  supplier: string;
  rating: number;
  badge: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TriangularOrder {
  id: string;
  customer: string;
  originPlatform: PlatformType;
  fulfillmentBy: string;
  targetChannel: string;
  itemsCount: number;
  totalUsd: number;
  status:
    | 'Coleta Alibaba/AliExpress'
    | 'Hub Easy Express (Shenzhen)'
    | 'Trânsito Aéreo Internacional'
    | 'Desembaraço Aduaneiro'
    | 'Entregue ao Destino';
  etaDays: number;
  createdAt: string;
}
