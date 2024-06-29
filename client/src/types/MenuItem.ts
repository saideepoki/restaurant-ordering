export type MenuItemCategory =
  | 'starters'
  | 'main courses'
  | 'breads'
  | 'rice & biryani'
  | 'desserts'
  | 'drinks'
  | 'sides'
  | 'appetizers';

export interface MenuItem{
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: MenuItemCategory;
    imageUrl: string;
    rating: number
    featured: boolean;
}