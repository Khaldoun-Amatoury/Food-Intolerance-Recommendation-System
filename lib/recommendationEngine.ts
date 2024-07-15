import natural from "natural";
import { Product } from "./types";

const TfIdf = natural.TfIdf;

function getKeywordsForIntolerance(intolerance: string): string[] {
  if (intolerance === "gluten") {
    return [
      "wheat",
      "barley",
      "rye",
      "oats",
      "gluten",
      "bread",
      "pasta",
      "cereal",
      "noodles",
    ];
  } else if (intolerance === "lactose") {
    return ["milk", "dairy", "cheese", "yogurt", "cream", "butter", "lactose"];
  }
  return [];
}

const foodCategories = [
  "Fruits & Vegetables",
  "Foodgrains, Oil & Masala",
  "Bakery, Cakes & Dairy",
  "Beverages",
  "Snacks & Branded Foods",
  "Eggs, Meat & Fish",
];

export function getRecommendations(
  products: Product[],
  intolerance: string
): { safeProducts: Product[]; unsafeProducts: Product[] } {
  const tfidf = new TfIdf();
  const keywords = getKeywordsForIntolerance(intolerance);

  // Filter only food products
  const foodProducts = products.filter((product) =>
    foodCategories.includes(product.Category)
  );

  // Add product descriptions to TF-IDF
  foodProducts.forEach((product, index) => {
    const description =
      `${product.ProductName} ${product.Category} ${product.SubCategory}`.toLowerCase();
    tfidf.addDocument(description);
  });

  // Calculate similarity scores and categorize products
  const safeProducts: Product[] = [];
  const unsafeProducts: Product[] = [];

  foodProducts.forEach((product, index) => {
    let score = 0;
    keywords.forEach((keyword) => {
      score += tfidf.tfidf(keyword, index);
    });
    // Consider the product safe if the score is below a threshold
    if (score < 0.1) {
      safeProducts.push(product);
    } else {
      unsafeProducts.push(product);
    }
  });

  return { safeProducts, unsafeProducts };
}
