/**
 * Full food & drink menu — aligned with smeadspub.com/menu/ (prices as published).
 * Update this file when the kitchen changes the board.
 */

export type MenuDish = {
  name: string;
  price: string;
  description?: string;
  note?: string;
};

export type MenuSubsection = {
  title: string;
  description?: string;
  items: MenuDish[];
};

export type MenuCategory = {
  id: string;
  nav: string;
  title: string;
  eyebrow?: string;
  intro?: string[];
  outro?: string;
  items?: MenuDish[];
  subsections?: MenuSubsection[];
};

export const menuTagline = "The finest food on the Columbia";

export const menuCategories: MenuCategory[] = [
  {
    id: "appetizers",
    nav: "Apps",
    title: "Appetizers",
    eyebrow: "Starters",
    intro: [
      "Available all day. Starred (*) items may have limited availability after 11:30 pm.",
      "Pub-style favorites plus scratch-made specialties you’ll only find at Smeads.",
    ],
    items: [
      {
        name: "Onion rings*",
        price: "$10",
        note: "Add beer cheese +$2",
      },
      { name: "Hot wings (9)", price: "$16" },
      { name: "Nachos / tachos*", price: "$15" },
      { name: "Mozzarella sticks (7)", price: "$8" },
      { name: "Jalapeño poppers (7)", price: "$8" },
      { name: "Pot stickers (9)", price: "$10" },
      { name: "Mini corndogs (10)", price: "$7" },
      { name: "French fries / tater tots / pub chips", price: "$7" },
      { name: "Ruben fries", price: "$14" },
      { name: "Brisket chili cheese fries", price: "$12.50" },
      { name: "Meatloaf sliders (2)", price: "$9.50" },
      { name: "Mac & cheese*", price: "$10" },
    ],
  },
  {
    id: "burgers",
    nav: "Burgers",
    title: "Signature burgers",
    eyebrow: "Half-pound beef",
    intro: [
      "Served with your choice of fries, tots, pub chips, potato salad or green salad.",
      "Gluten-free bread or bun +$1.50.",
      "All burgers are a half pound of 100% fresh premium beef with fresh, locally grown vegetables — savory, juicy, classic.",
    ],
    items: [
      {
        name: "Classic cheeseburger",
        price: "$16",
        description:
          "Cheddar cheese, mayo, pickles, lettuce, tomato, red onion",
        note: "Add bacon +$2",
      },
      {
        name: "Bleu cheeseburger",
        price: "$18",
        description:
          "Crumbled bleu cheese, bacon, lettuce, tomato, red onion, mayo",
      },
      {
        name: "Crispy or grilled chicken burger",
        price: "$18",
        description:
          "Jack cheese, bacon, lettuce, tomato, mayo, red onion, honey mustard",
      },
      {
        name: "Brisket chili cheeseburger",
        price: "$18",
        description: "Homemade chili, jack and cheddar cheese, onions",
      },
      {
        name: "BBQ burger",
        price: "$18",
        description: "BBQ sauce, cheddar cheese, bacon, onion rings",
        note: "Sub brisket +$2",
      },
      {
        name: "Mushroom Swiss burger",
        price: "$18",
        description:
          "Swiss cheese, sautéed mushrooms, onions, mayo, lettuce, tomato",
      },
      {
        name: "Smeads ultimate",
        price: "$19",
        description:
          "Ham, bacon, cheddar & jack cheese, fried egg, mayo, lettuce, tomato, red onion",
      },
      {
        name: "Impossible veggie burger",
        price: "$18",
        description:
          "Veggie patty, cheddar cheese, mayo, pickles, lettuce, tomato, red onion",
      },
    ],
  },
  {
    id: "sandwiches",
    nav: "Sandwiches",
    title: "Sandwiches",
    eyebrow: "Slow-roasted & stacked",
    intro: [
      "Served with your choice of fries, tots, pub chips, potato salad or green salad.",
      "Gluten-free bread or bun +$1.50.",
      "Quality meats, slow-cooked roasts, fresh vegetables, and fresh-baked breads.",
    ],
    items: [
      {
        name: "Reuben sandwich",
        price: "$18",
        description:
          "House-brined corned beef, Swiss cheese, special sauce & sauerkraut on grilled rye",
      },
      {
        name: "Club house sandwich",
        price: "$17",
        description:
          "Turkey, ham, bacon, Swiss & cheddar, lettuce, tomato, mayo on toasted white",
      },
      {
        name: "Patty melt",
        price: "$17",
        description:
          "Sirloin patty, Swiss cheese, caramelized onions on grilled rye",
      },
      {
        name: "The BLTA",
        price: "$16",
        description:
          "Bacon, lettuce, tomato, avocado, mayo on toasted white",
      },
      {
        name: "Grilled cheese",
        price: "$15",
        description:
          "Cheddar, jack & American cheeses, tomato, choice of ham or bacon on grilled white",
      },
      {
        name: "French dip sandwich",
        price: "$14",
        description:
          "House-cooked roast beef on a 6\" sourdough roll with au jus, Swiss & sautéed onions",
      },
    ],
  },
  {
    id: "wraps",
    nav: "Wraps",
    title: "Wraps",
    intro: [
      "Served with your choice of fries, tots, pub chips, potato salad or green salad.",
    ],
    items: [
      {
        name: "Spicy chicken chipotle wrap",
        price: "$16",
        description:
          "Crispy or grilled chicken, chipotle sauce, black beans, tomatoes, lettuce, onions; sour cream on the side",
      },
      {
        name: "Chicken bacon ranch wrap",
        price: "$16",
        description:
          "Grilled or crispy chicken, bacon, shredded cheese, tomato, lettuce, ranch",
      },
    ],
  },
  {
    id: "baskets",
    nav: "Baskets",
    title: "Baskets",
    items: [
      { name: "Chicken basket", price: "$15" },
      { name: "Popcorn shrimp basket", price: "$16.50" },
    ],
  },
  {
    id: "soups-salads",
    nav: "Soups & salads",
    title: "Soups & salads",
    subsections: [
      {
        title: "Chili & soup",
        items: [
          {
            name: "House-made brisket chili",
            price: "Small $6 · Large $8",
          },
          { name: "Rotating soups", price: "Small $5 · Large $7.50" },
        ],
      },
      {
        title: "Salads",
        items: [
          {
            name: "House salad",
            price: "$8",
            description:
              "Lettuce mix, tomato, olives, jack & cheddar, croutons",
          },
          {
            name: "Chicken bacon ranch",
            price: "$17",
            description:
              "Red onion, grilled or crispy chicken, bacon, lettuce mix, tomato, jack & cheddar, croutons",
          },
          {
            name: "Taco salad",
            price: "$17",
            description:
              "Ground beef, mixed greens, cheese, olives, tomatoes, onion, jalapeños, fried tortilla chips",
            note: "Sub chicken +$2",
          },
          {
            name: "Caesar salad",
            price: "$14",
            description: "Romaine, croutons, Caesar dressing",
            note: "Add grilled or crispy chicken +$2",
          },
          {
            name: "Chef salad",
            price: "$16",
            description:
              "Ham, turkey, lettuce mix, tomato, egg, Swiss & cheddar, croutons",
          },
        ],
      },
    ],
  },
  {
    id: "sides",
    nav: "Sides",
    title: "Side orders",
    items: [
      { name: "Extra sauce, dressing, sour cream, or tartar", price: "$0.75" },
      { name: "Potato salad", price: "$6" },
      { name: "Coleslaw", price: "$3" },
      { name: "Extra patty", price: "$9" },
    ],
  },
  {
    id: "beverages",
    nav: "Drinks",
    title: "Beverages",
    eyebrow: "One free refill",
    items: [
      { name: "Soda", price: "$4" },
      { name: "Coffee", price: "$3" },
      { name: "Iced tea", price: "$4" },
      { name: "Lemonade", price: "$4" },
    ],
  },
  {
    id: "dessert",
    nav: "Dessert",
    title: "Dessert specials",
    eyebrow: "Sweet finish",
    intro: [
      "Seasonal — chef’s choice. Ask your server what’s on tonight.",
      "$6.50",
    ],
  },
  {
    id: "cocktails",
    nav: "House drinks",
    title: "Smeads specialty drinks",
    eyebrow: "Cocktails",
    items: [
      {
        name: "Smeads infamous Bloody Mary",
        price: "$14",
        description:
          "Stoli vodka, house Bloody Mary mix, olives, pepperoncini, pickled beans, celery, lime, cheese & bacon",
      },
      {
        name: "Smeads punch",
        price: "$12",
        description:
          "360 strawberry & orange vodkas, muddled orange & lemon, cherry, OJ & grenadine",
      },
      {
        name: "The dirty Goose",
        price: "$12.50",
        description:
          "Grey Goose vodka, olive juice, bleu cheese–stuffed green olives",
      },
      {
        name: "Royally old fashioned",
        price: "$12.50",
        description:
          "Bullet whiskey, simple syrup, orange zest, bitters, bourbon cherry",
      },
      {
        name: "A perfect combo",
        price: "$12.50",
        description:
          "Deep Eddy cranberry vodka, triple sec, fresh lime, cranberry juice, lime",
      },
    ],
  },
  {
    id: "breakfast",
    nav: "Breakfast",
    title: "Smeads breakfast",
    eyebrow: "Sat & Sun · 9 am – 12:30 pm",
    intro: [
      "Kids welcome on Saturdays & Sundays from 9 am – 2 pm.",
      "Gluten-free bread or bun +$1.50 where applicable.",
    ],
    subsections: [
      {
        title: "Kids menu",
        items: [
          {
            name: "Child French toast",
            price: "$9.50",
            description: "2 pieces, sausage or bacon, drink",
          },
          {
            name: "Child pancakes",
            price: "$9.50",
            description: "2 silver dollar pancakes, sausage or bacon, drink",
          },
          {
            name: "Child egg breakfast",
            price: "$9.50",
            description: "1 egg, home fries, toast, sausage or bacon, drink",
          },
        ],
      },
      {
        title: "Egg combinations",
        items: [
          {
            name: "Combo 1",
            price: "$12.50",
            description:
              "2 eggs any style, home fries & toast or pancake",
          },
          {
            name: "Combo 2",
            price: "$16.50",
            description:
              "2 eggs any style, 3 bacon or sausage, home fries & toast or pancake",
          },
          {
            name: "Combo 3",
            price: "$17.50",
            description:
              "3 scrambled eggs, home fries, sausage or bacon & toast or pancake",
          },
        ],
      },
      {
        title: "Omelettes",
        description: "Served with home fries, toast or pancake",
        items: [
          {
            name: "Cheese",
            price: "$15",
            description: "Jack & cheddar",
          },
          {
            name: "Veggie",
            price: "$17.50",
            description:
              "Mushroom, onion, green peppers, tomato, jack & cheddar, hollandaise",
          },
          {
            name: "Denver",
            price: "$18.50",
            description: "Green pepper, ham, onion, jack & cheddar",
          },
          {
            name: "Mushroom Swiss",
            price: "$18.50",
            description: "Sautéed mushrooms, onions, Swiss",
          },
          {
            name: "Cheese & meat",
            price: "$19",
            description:
              "3 eggs, sausage or bacon, jack & cheddar",
            note: "Additional meat +$2.50",
          },
        ],
      },
      {
        title: "From the griddle",
        items: [
          {
            name: "Pancakes",
            price: "$12",
            description: "2 pancakes with maple syrup",
            note: "Add sausage or bacon +$2.50",
          },
          {
            name: "French toast",
            price: "$14",
            description: "2 slices with maple syrup",
            note: "Add sausage or bacon +$2.50",
          },
        ],
      },
      {
        title: "Breakfast specials",
        items: [
          {
            name: "Smeads egg McMuffin",
            price: "$14",
            description:
              "English muffin or biscuit, egg, cheese, choice of meat & home fries",
          },
          {
            name: "Chicken fried steak",
            price: "$19",
            description:
              "Chicken fried steak, 2 eggs, house sausage gravy, home fries, toast or pancake",
          },
          {
            name: "Classic burger",
            price: "$16",
            description:
              "Beef, cheddar, lettuce, tomato, onion, pickle, mayo; fries or tots",
            note: "Add bacon +$2",
          },
          {
            name: "Corned beef hash",
            price: "$19",
            description: "Home fries & egg, toast or pancake",
          },
          {
            name: "BLTA",
            price: "$16",
            description: "Bacon, lettuce, tomato, avocado, mayo on toasted white",
          },
          {
            name: "The mini",
            price: "$12.50",
            description: "1 egg, 2 bacon or sausage, home fries & 1 toast",
          },
          {
            name: "Eggs Benedict",
            price: "$16.50",
            description:
              "Poached eggs, Canadian bacon, English muffin, hollandaise, home fries",
          },
          {
            name: "Veggie eggs Benedict",
            price: "$16",
            description:
              "Tomato, avocado, English muffin, hollandaise, home fries",
          },
          {
            name: "Smeads stuff",
            price: "$17",
            description:
              "Home fries, sausage gravy, ham, bacon, peppers, onions & cheese; toast or pancake",
            note: "Half order $15",
          },
          {
            name: "Biscuits and gravy",
            price: "$14",
            description: "Biscuits with house sausage gravy",
            note: "Half order $12",
          },
          {
            name: "Breakfast burrito",
            price: "$16",
            description:
              "Home fries, eggs, jack & cheddar, onions, peppers, olives, choice of meat, sour cream & salsa",
            note: "Add sausage gravy +$2 · all meats +$2",
          },
        ],
      },
      {
        title: "Breakfast sides",
        items: [
          { name: "Egg (1)", price: "$2.50" },
          { name: "Sausage links (2)", price: "$5" },
          { name: "Sausage patty (1)", price: "$4" },
          { name: "Side of gravy or hollandaise", price: "$5" },
          { name: "Warm biscuit with honey butter", price: "$5" },
          { name: "Gluten-free bread / bun", price: "$1.50" },
        ],
      },
      {
        title: "Breakfast beverages",
        items: [
          { name: "Coffee or hot tea", price: "$3" },
          { name: "Soda / lemonade / iced tea", price: "$4" },
          { name: "Hot chocolate", price: "$4" },
          { name: "Milk / chocolate milk", price: "Sm $4 · Lg $5" },
          {
            name: "Juice (apple, cranberry, orange)",
            price: "Sm $4 · Lg $5",
          },
        ],
      },
      {
        title: "Rise & shine specials",
        items: [
          {
            name: "Smeads Bloody Mary",
            price: "$14",
            description:
              "Stoli vodka, house mix, bacon, celery, peppers, olives, cheese, pickled veggies, lime",
          },
          {
            name: "Morning mimosa",
            price: "$7.50",
            description:
              "Champagne with cranberry, OJ, pineapple, or grapefruit & sherbet",
          },
          {
            name: "Irish breakfast shot",
            price: "$12.50",
            description: "Jameson, buttershot liqueur, OJ & bacon",
          },
          {
            name: "Kahlúa & coffee",
            price: "$10",
            description: "Kahlúa, coffee, whipped cream, cinnamon",
          },
        ],
      },
    ],
  },
];

export const menuLegal = [
  "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.",
  "Additional $1 charge per item for to-go orders.",
];
