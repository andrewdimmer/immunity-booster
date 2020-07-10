import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:immunity_booster/Classes/FoodObject.dart';

Future<bool> completeDatabaseUpate(String category) async {
  // NOTE: Due to Google Cloud Platform Billing Restrictions, we were unable to create a new project for this hack.
  // To fix this, we deployed our fuctions to an archived project still connected to billing to run cloud functions.
  final response = await http.post(
      'https://us-central1-hackcation2020-gcp.cloudfunctions.net/complete_flutter',
      body: category);

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return json.decode(response.body) as bool;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    print(response.statusCode);
    print(response.reasonPhrase);
    print(response.body);
    throw Exception('Failed to mark food as complete.');
  }
}

Future<FoodObject> skipDatabaseUpdate(String category) async {
  // NOTE: Due to Google Cloud Platform Billing Restrictions, we were unable to create a new project for this hack.
  // To fix this, we deployed our fuctions to an archived project still connected to billing to run cloud functions.
  final response = await http.post(
      'https://us-central1-hackcation2020-gcp.cloudfunctions.net/skip_flutter',
      body: category);

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return FoodObject.fromJSON(json.decode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    print(response.statusCode);
    print(response.reasonPhrase);
    print(response.body);
    throw Exception('Failed skip food.');
  }
}

Future<List<FoodObject>> newDayDatabaseUpdate() async {
  // NOTE: Due to Google Cloud Platform Billing Restrictions, we were unable to create a new project for this hack.
  // To fix this, we deployed our fuctions to an archived project still connected to billing to run cloud functions.
  final response = await http.post(
    'https://us-central1-hackcation2020-gcp.cloudfunctions.net/new_day_flutter',
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    List<dynamic> list = json.decode(response.body)["list"];
    return list.map((food) {
      return FoodObject.fromJSON(json.decode(json.encode(food)));
    }).toList();
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    print(response.statusCode);
    print(response.reasonPhrase);
    print(response.body);
    throw Exception('Failed to reset the list for a new day.');
  }
}

Future<List<FoodObject>> getFoodsDatabaseCall() async {
  // NOTE: Due to Google Cloud Platform Billing Restrictions, we were unable to create a new project for this hack.
  // To fix this, we deployed our fuctions to an archived project still connected to billing to run cloud functions.
  final response = await http.post(
    'https://us-central1-hackcation2020-gcp.cloudfunctions.net/get_foods_flutter',
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    List<dynamic> list = json.decode(response.body)["list"];
    return list.map((food) {
      return FoodObject.fromJSON(json.decode(json.encode(food)));
    }).toList();
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    print(response.statusCode);
    print(response.reasonPhrase);
    print(response.body);
    throw Exception('Failed to get foods.');
  }
}

Future<bool> reorderFoodsDatabaseUpdate(List<FoodObject> list) async {
  final response = await http.post(
      'https://us-central1-hackcation2020-gcp.cloudfunctions.net/reorder_foods_flutter',
      body: '{"list": ' +
          list
              .map((item) {
                return '{"label": "' +
                    item.label +
                    '", "category": "' +
                    item.category +
                    '"}';
              })
              .toList()
              .toString() +
          '}');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return json.decode(response.body) as bool;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    print(response.statusCode);
    print(response.reasonPhrase);
    print(response.body);
    throw Exception('Failed to get notes.');
  }
}
