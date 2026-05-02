/**
 * Takeout menu shown on /order — edit names, prices, and items to match your kitchen.
 * Prices are in USD cents for clean math (899 = $8.99).
 */

export const takeoutCategories = [
  { id: "starters", label: "Starters" },
  { id: "burgers", label: "Burgers & handhelds" },
  { id: "pub", label: "Pub plates" },
  { id: "kids", label: "Kids" },
] as const;

export type TakeoutCategoryId = (typeof takeoutCategories)[number]["id"];

export const takeoutItems = [
  {
    id: "nachos",
    categoryId: "starters" satisfies TakeoutCategoryId,
    name: "Loaded nachos",
    description: "Cheese, jalapeños, salsa, sour cream",
    priceCents: 1299,
  },
  {
    id: "wings",
    categoryId: "starters",
    name: "Pub wings (10)",
    description: "House sauce or ranch",
    priceCents: 1499,
  },
  {
    id: "pretzel",
    categoryId: "starters",
    name: "Soft pretzel & beer cheese",
    description: "",
    priceCents: 999,
  },
  {
    id: "smeads-burger",
    categoryId: "burgers",
    name: "Smeads burger",
    description: "Classic pub burger — lettuce, tomato, onion, pickle",
    priceCents: 1699,
  },
  {
    id: "bbq-burger",
    categoryId: "burgers",
    name: "BBQ bacon cheddar",
    description: "Smoky BBQ, bacon, cheddar",
    priceCents: 1799,
  },
  {
    id: "fish-tacos",
    categoryId: "burgers",
    name: "Halibut tacos (2)",
    description: "Cabbage slaw, crema, lime",
    priceCents: 1599,
  },
  {
    id: "fish-chips",
    categoryId: "pub",
    name: "Fish & chips",
    description: "Beer-battered with fries & slaw",
    priceCents: 1899,
  },
  {
    id: "chowder",
    categoryId: "pub",
    name: "Clam chowder",
    description: "Cup — add bread on request in notes",
    priceCents: 499,
  },
  {
    id: "kids-mac",
    categoryId: "kids",
    name: "Kids mac & cheese",
    description: "",
    priceCents: 699,
  },
] as const;

export type TakeoutItemId = (typeof takeoutItems)[number]["id"];

const itemById = Object.fromEntries(
  takeoutItems.map((i) => [i.id, i]),
) as Record<TakeoutItemId, (typeof takeoutItems)[number]>;

export function getTakeoutItem(id: string) {
  return itemById[id as TakeoutItemId];
}
