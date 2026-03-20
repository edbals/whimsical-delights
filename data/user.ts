export interface MockOrder {
  id: string
  date: string
  summary: string
  total: number
  status: 'Delivered' | 'In Progress' | 'Ready for Pickup'
}

export interface SavedCustomisation {
  id: string
  name: string
  flavour: string
  frosting: string
  size: string
  tiers: number
  totalPrice: number
  savedAt: string
}

export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-2024-001',
    date: 'February 14, 2025',
    summary: '2-layer Red Velvet Cake, 6"+8", Cream Cheese Frosting, Fresh Flowers',
    total: 118,
    status: 'Delivered',
  },
  {
    id: 'ORD-2024-002',
    date: 'January 5, 2025',
    summary: 'Angel Food Cake, 6", Swiss Meringue Buttercream, Macarons on Top',
    total: 78,
    status: 'Delivered',
  },
  {
    id: 'ORD-2024-003',
    date: 'December 20, 2024',
    summary: 'Pound Cake, 10", Whipped Cream, Custom Cake Topper, Message Plaque',
    total: 175,
    status: 'Delivered',
  },
]

export const savedCustomisations: SavedCustomisation[] = [
  {
    id: 'SAVE-001',
    name: 'Birthday Special',
    flavour: 'Chiffon Cake',
    frosting: 'Swiss Meringue Buttercream',
    size: '6"+8"',
    tiers: 2,
    totalPrice: 110,
    savedAt: 'March 1, 2025',
  },
  {
    id: 'SAVE-002',
    name: 'Anniversary Cake',
    flavour: 'Red Velvet Cake',
    frosting: 'Fondant',
    size: '6"',
    tiers: 1,
    totalPrice: 80,
    savedAt: 'February 20, 2025',
  },
]
