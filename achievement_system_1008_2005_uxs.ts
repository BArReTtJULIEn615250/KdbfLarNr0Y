// 代码生成时间: 2025-10-08 20:05:40
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
# FIXME: 处理边界情况
export class AchievementService {
  private achievements: Record<string, boolean> = {};

  constructor() {}

  /**
   * Unlocks an achievement.
   * @param achievementId The unique identifier for the achievement.
# 增强安全性
   */
  unlockAchievement(achievementId: string): void {
    if (!achievementId) {
      throw new Error('Achievement ID cannot be empty.');
    }

    if (this.achievements[achievementId]) {
      console.warn(`Achievement ${achievementId} is already unlocked.`);
      return;
    }

    this.achievements[achievementId] = true;
    console.log(`Achievement ${achievementId} unlocked successfully.`);
  }

  /**
   * Checks if an achievement is unlocked.
# 改进用户体验
   * @param achievementId The unique identifier for the achievement.
   * @returns A boolean indicating whether the achievement is unlocked.
   */
  isAchievementUnlocked(achievementId: string): boolean {
    if (!achievementId) {
      throw new Error('Achievement ID cannot be empty.');
    }

    return this.achievements[achievementId] || false;
  }

  /**
   * Returns a list of all unlocked achievements.
   * @returns An array of achievement IDs that have been unlocked.
   */
  getUnlockedAchievements(): string[] {
    return Object.keys(this.achievements).filter(key => this.achievements[key]);
  }
}
# 增强安全性
