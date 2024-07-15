import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { Product } from "./types";

export function loadProductData(): Product[] {
  const filePath = path.join(process.cwd(), "public", "BigBasket.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  return data as Product[];
}
