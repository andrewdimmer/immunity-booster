import 'package:flutter/material.dart';

class FoodItem extends StatelessWidget {
  FoodItem({Key key, this.label, this.category, this.onComplete, this.onSkip})
      : super(key: key);

  final String label;
  final String category;
  final Function onComplete;
  final Function onSkip;

  Widget build(BuildContext context) {
    return (Dismissible(
        child: Card(
          child: ListTile(
            title: Text(label),
            subtitle: Text(category),
            trailing: Icon(Icons.drag_handle),
          ),
          elevation: 2,
          margin: EdgeInsets.all(16),
        ),
        key: UniqueKey(),
        background: dismissBackground(Colors.green, Colors.black, Icons.check,
            "Completed", MainAxisAlignment.start),
        secondaryBackground: dismissBackground(Colors.red, Colors.black,
            Icons.delete, "Delete", MainAxisAlignment.end),
        direction: DismissDirection.horizontal,
        onDismissed: (direction) {
          if (direction == DismissDirection.startToEnd) {
            onComplete();
          } else {
            onSkip();
          }
        }));
  }
}

Widget dismissBackground(Color backgroundColor, Color accentColor,
    IconData icon, String label, MainAxisAlignment alignment) {
  return Container(
    child: Row(
      children: alignment == MainAxisAlignment.start
          ? [
              Padding(
                child: Icon(
                  icon,
                  color: accentColor,
                ),
                padding: EdgeInsets.symmetric(horizontal: 16),
              ),
              Text(
                label,
                style: TextStyle(color: accentColor),
              ),
            ]
          : [
              Text(
                label,
                style: TextStyle(color: accentColor),
              ),
              Padding(
                child: Icon(
                  icon,
                  color: accentColor,
                ),
                padding: EdgeInsets.symmetric(horizontal: 16),
              ),
            ],
      mainAxisAlignment: alignment,
      crossAxisAlignment: CrossAxisAlignment.center,
    ),
    color: backgroundColor,
    margin: EdgeInsets.symmetric(vertical: 16),
  );
}
