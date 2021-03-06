
export interface RecipeItem {
  name: string,
  author: string,
  description: string,
  photo: string,
  ingredients: Object[],
  tags: string[],
  directions: string[],
  recipe_id: string,
  rating: Object,
  price: string
}

export class Recipe implements RecipeItem {
  public name: string;
  public author: string;
  public description: string;
  public photo: string;
  public recipe_id: string;
  public price: string;
  public rating: Object;

  public ingredients: Object[];
  public directions: string[];
  public tags: string[];

  constructor(recipe?) {
    if(recipe) {
      this.name = recipe.name;
      this.author = recipe.author;
      this.description = recipe.description;
      this.photo = recipe.photo;
      this.recipe_id = recipe.recipe_id || recipe._id;
      this.ingredients = recipe.ingredients;
      this.directions = recipe.directions;
      this.tags = recipe.tags;
      this.rating = recipe.rating;
      this.price = recipe.price;
    }
  }

  getRating(): string {
    let stars = "";
    for(let i = 0; i < Math.round(this.rating['average']); i++) {
      console.log(stars)
      stars += "*";
      if (i+1 !== Math.round(this.rating['average']))
        stars += " ";
    }
    return stars;
  }
}
