export interface Menu {
  mealType: string;
  meals: {
    mealName: string;
    mealPrice: number;
    mealCount: number;
    ingridients: string[];
  }[];
}
