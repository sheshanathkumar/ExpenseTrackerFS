# Expense Tracker 
![spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white) ![node](
https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white`)

<br/>

## Introduction
An expense tracker app is either web- or phone-based and can help you track a range of expenses. You enter incoming and outgoing money, and the app can help you store and track that information. It can help you track your budget, track your investments, use graphs and charts to show your progress, and keep your business and personal expenses separate.

Expense tracker is a basic exense tracking system which can manager all type of your expanse. It tracks your source of income and source of expanse. It also keep eyes on the type of expanse which are irregular and not relevent.

We have uses **Spring** for the backend, where all apis are written and **React** for UI build.

## How it works
We have aded 2 types of field. 1 for income and other for expanse. 
Income part will show how your money credits and expanse will show where your money debited.
We are keep tracing what is your current balance and how much you have expansed.

Application creates a json file everymonth when ever any transaction happens. Currently we are showing only current months history transaction. Sooner we will add monthly wise transactions, where user can see what transaction they have made till yet.

## How to run this app
### Run Server side application first
* open terminal in folder ExpenseTrackerFS
* run command-> **cd ExpenseTrackerBE-java**
* run command-> **.\gradlew clean build**
* run command-> **java -jar build/libs/expense-0.0.1-SNAPSHOT.jar**

### Run UI side application
* open another terminal in the same folder 
* run command-> **cd ExpenseTrackerUI**
* run command-> **npm install**
* run command-> **npm start**

It will automatically opens a browser and load the page

## Issues
There are some issue with Python apis. Some apis from UI side is not communicating with python flask api.
