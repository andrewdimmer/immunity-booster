## Categories we are submitting for:

- Best Overall,
- Most Practical/Scalable,
- Best Impact,
- Best Original,
- Best Design

## Video link

https://www.youtube.com/watch?v=3IZ01YhV2b4

##Greeting
Hello judges!

Thank you for giving your time to judge all the HackTheLib submissions! We really appreciate all you do to make this hackathon possible. We hope you enjoy Immunity Booster, a connected Alexa skill and cross-platform app designed to help people get the right nutrients they need to strengthen their immune system. Bellow, we describe in-depth how we made our project, including how it is scalable for the future, and what we like about the UI/UX design.

Thank you again,
Nathan and Andrew Dimmer

## Inspiration

We’ve spent a lot of time over the last few months sheltering in place and practicing social distancing. While these measures, along with using extra hand sanitizer, antibiotic soaps, and bleach wipes, have helped people avoid exposure to the coronavirus, they’ve also accidentally left our immune systems weaker than ever before and desperately needing a boost. And with many parts of the country opening back up, and especially schools reopening in the fall, a weakened immune system is exactly the LAST thing anyone should have.

Fortunately, we have the power and control to build up our own immune systems and microbiome so that when we’re exposed to larger amounts of microbes again (for example, being around a lot more people), we’ll have a much greater ability to fight them off.

The most effective ways to do this are: get enough sleep; exercise; and eat the right foods. Everyone already knows when they’re sleeping and exercising, but most people don’t keep track of everything they eat, and how it impacts their immune system.

That’s what inspired us to build Immunity Booster. Our app helps you keep track of, and remember to eat, all the healthiest foods you need to build a stronger immune system.

## What it does

Immunity Booster is a cross-platform app designed to help you improve your immune system by reminding you of healthy foods you should be including in your diet.

Through our Alexa Skill, you can use our app to find out what you should be eating, and either eat or skip them, all hands-free. This makes our app a great cooking companion, and allows users to use Immunity Booster without interrupting what they are doing.

By also creating a cross platform app using Flutter, users can check what foods they should be eating from anywhere, on any device, through Web, Windows and Mac desktop apps, and mobile apps for iOS and Android.

## How we built it

To begin with, we selected two main platforms for the front end. We built our web/mobile/desktop app in Flutter, and we built our smart home component for Amazon Alexa. These services allow our app to run on pretty much every device that people have, anywhere, so there are no accessibility issues with getting the data. The whole point of the app is to reduce stress, we don’t want the user to always need to come back to a single device to reduce their stress! We also started working with Google Assistant at the end, but we didn’t have enough time to get that fully integrated.

From there, we next built out our database architecture using Google Firestore. This serves as the central connection point for all data throughout the app that is coming in or out from any device or interface. We then built a wide range of central database functions on top of the database as basically our own internal library, so that the database actions are identical regardless of the requesting device.

In between these two layers (the front end and the database), we used Google Cloud Run to stand up a serverless Application Programming Interface (API) for each and every device that we support. These can range from a single massive function that handles all Alexa Skill responses, to a complex web of endpoints, helpers, and pass throughs to provide diverse and versatile functions in the Flutter app. Then, it just became a matter of connecting the front end to the associated API, which passed the data to the database, and everything was ready for use!

## Challenges we ran into

We wanted to try supporting Desktop Applications using Flutter, and so we found out when setting everything up that Desktop Applications aren’t even available in the developer package (bleeding-edge distribution) of Flutter. If you want to compile to a desktop app, you need to be running the code directly from the master branch of the Flutter GitHub. Consequently, when it came time to connect to our database, there were exactly 0 libraries that supported compiling to desktop, so we kind of needed to build our own round-about method. This led to a lot of trial and error and troubleshooting with the data formats, as we were using Dart on one side of the connection, and TypeScript on the other! In the end though, we got it working, and we’re really happy about that.

We also had a very wide range of input devices and systems for Immunity Booster, and so we needed common database handlers that would work for all devices, no matter the data format that we are getting. To do this, we first started by writing a cross-platform set of standard database functions, then we built out and exposed the same functions in different endpoints (depending on the device). This ensured that if we updated the database structure, all of our code for each of the devices would receive the update at the same time to avoid data mismatches and rewriting the same code for each device.

## Accomplishments that we're proud of

Our main accomplishment is the User Interface and design. We’re proud that we got both an Alexa skill and a Flutter app up and running in the short time frame of the hackathon, and that both have very fully featured UI’s. The Alexa skill is fully featured, and can be used as a standalone app, and the Flutter UI uses expressive gestures to make using the app fluid. We’re also proud of how seamlessly all of the devices interconnect and share data, so this can truly be a cross platform service for however users want to access and interact with Immunity Booster.

## What we learned

We’re fairly new to using Flutter for either Web or Desktop, and so we learned a lot about Flutter in trying to get that set up. It turns out that desktop is still so new that you need to run Flutter from the master branch of their GitHub, you can’t even run it in their developer bleeding edge download. As a result, we had to implement a lot of database connectivity that we usually use a library for ourselves, and we learned a lot about Dart vs. JavaScript data types, and some of the best practices to ensure connectivity between different systems.

This was also our first time running Queries in Firestore. We’ve used Firestore extensively in the past, but only ever when we knew exactly where the data was that we needed. This time, we needed to run multi-step queries to things like filter by tag or rearrange the items to get the database to reflect the changes we made in the Flutter app. In the process of setting that up, we learned a lot more about not only Firestore Queries, but how NoSQL databases are structured and indexed behind the scenes.

## What's next for Immunity Booster

In the future, we’d like to make the app more fully featured, so it can help people’s immunity past just the food they are eating, by recommending and tracking sleep and exercise. We’d also like to expand to include a Google Home app, along with the Alexa and Flutter apps.
