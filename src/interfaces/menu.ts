export interface Menu {
  mealType: string;
  meals: [
    {
      mealName: string;
      mealPrice:string;
      mealCount: number;
      ingridients: string[];
    }
  ];
}
