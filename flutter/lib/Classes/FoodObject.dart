class FoodObject {
  FoodObject({this.label, this.category});

  final String label;
  final String category;

  factory FoodObject.fromJSON(Map<String, dynamic> json) {
    return FoodObject(label: json["label"], category: json["category"]);
  }
}
