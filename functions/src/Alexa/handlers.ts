import * as functions from "firebase-functions";
import { getFoods, newDay } from "../Database/newDayAndGetData";
import { complete, skip } from "../Database/completeAndSkip";

export const alexaSkill = functions.https.onRequest((request, response) => {
  const type = JSON.stringify(request.body.request.type);
  let name = "";
  let food = "";

  try {
    name = JSON.stringify(request.body.request.intent.name);
    if (name.indexOf("EatFood") >= 0 || name.indexOf("SkipFood") >= 0) {
      food = JSON.stringify(request.body.request.intent.slots["food"].value);
    }
  } catch (e) {}

  getAlexaResponse(type, name, food)
    .then((results) => {
      response.status(200).send(results);
    })
    .catch((err) => {
      console.log(err);
      response
        .status(500)
        .send(
          "Sorry, but we're unable to fulfill your request at this time. Please try again later."
        );
    });
});

const getAlexaResponse = async (type: string, name: string, food: string) => {
  const AlexaDefaultAnswer = {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "SSML",
        ssml: "<speak>Welcome to immunity booster, [tagline].</speak>",
      },
      shouldEndSession: false,
      card: {
        type: "Simple",
        title: "LaunchRequest",
        content: "Welcome to immunity booster, [tagline].",
      },
    },
    userAgent: "ask-node/2.3.0 Node/v8.10.0",
    sessionAttributes: {},
  };

  if (type.indexOf("LaunchRequest") >= 0) {
    return AlexaDefaultAnswer;
  } else if (
    type.indexOf("IntentRequest") >= 0 &&
    name.indexOf("GetNotes") >= 0
  ) {
    AlexaDefaultAnswer.response.outputSpeech.ssml =
      "<speak>" + "Getting your foods. ";
    AlexaDefaultAnswer.response.card.content = "Getting your foods. \n";
    return getFoods()
      .then((foods) => {
        for (let i = 0; i < 5; i++) {
          AlexaDefaultAnswer.response.outputSpeech.ssml +=
            "Food " + (i + 1) + ": " + foods[i].label + ". ";
          AlexaDefaultAnswer.response.card.content +=
            "Food " + (i + 1) + ": " + foods[i].label + "\n ";
        }
        AlexaDefaultAnswer.response.outputSpeech.ssml += "</speak>";
        return AlexaDefaultAnswer;
      })
      .catch((err) => {
        console.log(err);
        AlexaDefaultAnswer.response.outputSpeech.ssml =
          "<speak>There was an error completing your request. Please try again later.</speak>";
        AlexaDefaultAnswer.response.card.content =
          "There was an error completing your request. Please try again later.";
        return AlexaDefaultAnswer;
      });
  } else if (
    type.indexOf("IntentRequest") >= 0 &&
    name.indexOf("GetNotes") >= 0
  ) {
    AlexaDefaultAnswer.response.outputSpeech.ssml =
      "<speak>" + "Getting your foods. ";
    AlexaDefaultAnswer.response.card.content = "Getting your foods. \n";
    return getFoods()
      .then((foods) => {
        for (let i = 0; i < foods.length; i++) {
          AlexaDefaultAnswer.response.outputSpeech.ssml +=
            "Food " + (i + 1) + ": " + foods[i].label + ". ";
          AlexaDefaultAnswer.response.card.content +=
            "Food " + (i + 1) + ": " + foods[i].label + "\n ";
        }
        AlexaDefaultAnswer.response.outputSpeech.ssml += "</speak>";
        return AlexaDefaultAnswer;
      })
      .catch((err) => {
        console.log(err);
        AlexaDefaultAnswer.response.outputSpeech.ssml =
          "<speak>There was an error completing your request. Please try again later.</speak>";
        AlexaDefaultAnswer.response.card.content =
          "There was an error completing your request. Please try again later.";
        return AlexaDefaultAnswer;
      });
  } else if (
    type.indexOf("IntentRequest") >= 0 &&
    name.indexOf("NewDay") >= 0
  ) {
    AlexaDefaultAnswer.response.outputSpeech.ssml =
      "<speak>" + "Adding a new day's foods to your list. ";
    AlexaDefaultAnswer.response.card.content =
      "Adding a new day's foods to your list. \n";
    return newDay()
      .then((foods) => {
        for (let i = 0; i < foods.length; i++) {
          AlexaDefaultAnswer.response.outputSpeech.ssml +=
            "Food " + (i + 1) + ": " + foods[i].label + ". ";
          AlexaDefaultAnswer.response.card.content +=
            "Food " + (i + 1) + ": " + foods[i].label + "\n ";
        }
        AlexaDefaultAnswer.response.outputSpeech.ssml += "</speak>";
        return AlexaDefaultAnswer;
      })
      .catch((err) => {
        console.log(err);
        AlexaDefaultAnswer.response.outputSpeech.ssml =
          "<speak>There was an error completing your request. Please try again later.</speak>";
        AlexaDefaultAnswer.response.card.content =
          "There was an error completing your request. Please try again later.";
        return AlexaDefaultAnswer;
      });
  } else if (
    type.indexOf("IntentRequest") >= 0 &&
    name.indexOf("EatFood") >= 0
  ) {
    return complete(food.replace(/"/g, ""))
      .then((noteId) => {
        if (noteId) {
          AlexaDefaultAnswer.response.outputSpeech.ssml =
            "<speak>" + "Food completed: " + food + "</speak>";
          AlexaDefaultAnswer.response.card.content = "Food completed: " + food;
        } else {
          AlexaDefaultAnswer.response.outputSpeech.ssml =
            "<speak>There was an error adding your note. Please try again later.</speak>";
          AlexaDefaultAnswer.response.card.content =
            "There was an error adding your note. Please try again later.";
        }
        return AlexaDefaultAnswer;
      })
      .catch((err) => {
        console.log(err);
        AlexaDefaultAnswer.response.outputSpeech.ssml =
          "<speak>There was an error adding your note. Please try again later.</speak>";
        AlexaDefaultAnswer.response.card.content =
          "There was an error adding your note. Please try again later.";
        return AlexaDefaultAnswer;
      });
  } else if (
    type.indexOf("IntentRequest") >= 0 &&
    name.indexOf("SkipFood") >= 0
  ) {
    return skip(food.replace(/"/g, ""))
      .then((noteId) => {
        if (noteId) {
          AlexaDefaultAnswer.response.outputSpeech.ssml =
            "<speak>" + "Food completed: " + food + "</speak>";
          AlexaDefaultAnswer.response.card.content = "Food completed: " + food;
        } else {
          AlexaDefaultAnswer.response.outputSpeech.ssml =
            "<speak>There was an error adding your note. Please try again later.</speak>";
          AlexaDefaultAnswer.response.card.content =
            "There was an error adding your note. Please try again later.";
        }
        return AlexaDefaultAnswer;
      })
      .catch((err) => {
        console.log(err);
        AlexaDefaultAnswer.response.outputSpeech.ssml =
          "<speak>There was an error adding your note. Please try again later.</speak>";
        AlexaDefaultAnswer.response.card.content =
          "There was an error adding your note. Please try again later.";
        return AlexaDefaultAnswer;
      });
  } else {
    return AlexaDefaultAnswer;
  }
};
