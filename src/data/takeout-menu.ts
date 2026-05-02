/**
 * Takeout menu shown on /order — edit names, prices, and items to match your kitchen.
 * Prices are in USD cents for clean math (899 = $8.99).
 */

export type TakeoutModifierGroup = {
  id: string;
  label: string;
  options: readonly string[];
};

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
    popular: true,
  },
  {
    id: "wings",
    categoryId: "starters",
    name: "Pub wings (10)",
    description: "House sauce or ranch",
    priceCents: 1499,
    popular: true,
    modifiers: [
      {
        id: "sauce",
        label: "Sauce",
        options: ["House", "Ranch", "Buffalo", "BBQ"],
      },
    ] as const satisfies readonly TakeoutModifierGroup[],
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
    popular: true,
    modifiers: [
      {
        id: "temp",
        label: "Cook",
        options: ["Medium rare", "Medium", "Medium well", "Well"],
      },
    ] as const satisfies readonly TakeoutModifierGroup[],
  },
  {
    id: "bbq-burger",
    categoryId: "burgers",
    name: "BBQ bacon cheddar",
    description: "Smoky BBQ, bacon, cheddar",
    priceCents: 1799,
    modifiers: [
      {
        id: "temp",
        label: "Cook",
        options: ["Medium rare", "Medium", "Medium well", "Well"],
      },
    ] as const satisfies readonly TakeoutModifierGroup[],
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
    popular: true,
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

export function getDefaultModifiers(
  item: (typeof takeoutItems)[number],
): Record<string, string> {
  const mods: Record<string, string> = {};
  const groups = "modifiers" in item ? item.modifiers : undefined;
  if (!groups) return mods;
  for (const g of groups) {
    mods[g.id] = g.options[0] ?? "";
  }
  return mods;
}
