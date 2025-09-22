// 代码生成时间: 2025-09-23 00:56:09
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheStrategyService {
  // Use a Map to store the cached items with their expiration times
  private cache: Map<string, {data: any, expires: number}>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Set an item in the cache with a given key and time-to-live (TTL) in milliseconds.
   * @param key The key for the cache item.
   * @param data The data to be stored in the cache.
   * @param ttl The time-to-live in milliseconds.
   */
  set(key: string, data: any, ttl: number): void {
    const expires = Date.now() + ttl;
    this.cache.set(key, { data, expires });
  }

  /**
   * Retrieve an item from the cache. If the item is expired or does not exist, it will return undefined.
   * @param key The key for the cache item.
   * @returns The cached data, or undefined if not found or expired.
   */
  get(key: string): any {
    const cachedItem = this.cache.get(key);
    if (!cachedItem) {
      return undefined;
    }

    const { data, expires } = cachedItem;
    if (Date.now() > expires) {
      // If the item is expired, remove it from the cache and return undefined
      this.cache.delete(key);
      return undefined;
    }

    return data;
  }

  /**
   * Delete an item from the cache.
   * @param key The key for the cache item to be deleted.
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all expired items from the cache.
   */
  clearExpired(): void {
    for (const [key, { expires }] of this.cache.entries()) {
      if (Date.now() > expires) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear the entire cache.
   */
  clearAll(): void {
    this.cache.clear();
  }
}
