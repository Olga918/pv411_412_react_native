import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  created_at: number;
  deleted_at?: number | null;
}

class DatabaseManager {
  private db: SQLite.SQLiteDatabase | null = null;

  async init() {
    this.db = await SQLite.openDatabaseAsync("shop.db");

    await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS products(
                id CHAR(32) PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                created_at INTEGER DEFAULT (unixepoch()),
                deleted_at INTEGER DEFAULT NULL
            );
        `);
    console.log("DB created succesfully");
  }

  async addProduct(title: string, price: number, description?: string) {
    if (!this.db) throw new Error("DB is not initialized");
    const result = await this.db.runAsync(
      "INSERT INTO products (id, title, price, description, created_at) VALUES(?, ?, ?, ?, ?);",
      [
        Crypto.randomUUID(),
        title,
        price,
        description ? description : null,
        Date.now(),
      ]
    );

    return result.lastInsertRowId;
  }

  /** Active products only (not soft-deleted). */
  async getAllProducts(): Promise<Product[]> {
    if (!this.db) throw new Error("DB is not initialized");
    return await this.db.getAllAsync<Product>(
      "SELECT * FROM products WHERE deleted_at IS NULL ORDER BY title;"
    );
  }

  /** All products, including soft-deleted. */
  async getAllProductsIncludingDeleted(): Promise<Product[]> {
    if (!this.db) throw new Error("DB is not initialized");
    return await this.db.getAllAsync<Product>(
      "SELECT * FROM products ORDER BY title;"
    );
  }

  async updateProduct(
    id: string,
    title: string,
    price: number,
    description?: string
  ) {
    if (!this.db) throw new Error("DB is not initialized");
    await this.db.runAsync(
      "UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?;",
      [title, price, description ? description : null, id]
    );
  }

  /** Soft delete — sets deleted_at, row stays in DB. */
  async deleteProduct(id: string) {
    if (!this.db) throw new Error("DB is not initialized");
    await this.db.runAsync(
      "UPDATE products SET deleted_at = ? WHERE id = ?;",
      [Date.now(), id]
    );
  }

  async restoreProduct(id: string) {
    if (!this.db) throw new Error("DB is not initialized");
    await this.db.runAsync(
      "UPDATE products SET deleted_at = NULL WHERE id = ?;",
      [id]
    );
  }

  /** Hard delete — removes row forever. */
  async hardDeleteProduct(id: string) {
    if (!this.db) throw new Error("DB is not initialized");
    await this.db.runAsync("DELETE FROM products WHERE id = ?;", [id]);
  }
}

export const dbManager = new DatabaseManager();
