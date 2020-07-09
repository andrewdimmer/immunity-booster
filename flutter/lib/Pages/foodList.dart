import 'package:flutter/material.dart';
import 'package:immunity_booster/Classes/FoodObject.dart';
import 'package:immunity_booster/Widgets/foodItem.dart';

class FoodList extends StatelessWidget {
  FoodList(
      {Key key,
      this.header,
      this.list,
      this.handleReorder,
      this.refreshList,
      this.onComplete,
      this.onSkip})
      : super(key: key);

  final Widget header;
  final List<FoodObject> list;
  final Function handleReorder;
  final Function refreshList;
  final Function onComplete;
  final Function onSkip;

  Widget build(BuildContext context) {
    return RefreshIndicator(
      child: ReorderableListView(
        header: header,
        children: list
            .map(
              (item) => FoodItem(
                food: item,
                onComplete: onComplete,
                onSkip: onSkip,
                key: UniqueKey(),
              ),
            )
            .toList(),
        onReorder: handleReorder,
        padding: EdgeInsets.only(top: 16),
      ),
      onRefresh: refreshList,
    );
  }
}
