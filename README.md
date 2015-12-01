#"Happy Hour" application 
  by Ashton Sobell, Gregory Fernandes, Ivan Yapeter, Keryn Robinson - WDI4, Melbourne, General Assembly, Web Immersive Development WDI-4 team

# About the "Happy Hour" app

  - What it does
    This is an online application that let's a user find the 10 nearest bars that offer happy hour deals based on the current location that the user enters. The user can enter the current address or simply say 'Nearby' to see 10 nearest happy hour bars, this is through the use of Google MAps API. The bars are deals that are uploaded by bar owners themselves, right now via the site admin. The user is also able to see a list of all participating happy-hour bars from the ALlBars menu item.

    The app also lets you search for cocktail recipes if you wish to create your own happy hour from the comfort of your home. Recipes are fetched from Yummly and a total of 17500 cocktail recipes can be searched. To aid faster retrieval of the list of 17500 coctails, the list is stored in the local database. Subsequent clicking on a cocktail from the cocktail list take you to the directions and a link to the actual website of that recipe, this is achieved by making a RESTful API call to Yummly.com.

    The app also allows a user to login and logout. Future releases will provide features so that a user can favourite a bar or a cocktail along with Signup.

# The app design and implementation
  - The design requires the use of Google Maps API to be able to search for a location based on 'Nearby" or the address provided by the user. It will then search the database for the top 10 nearest bars aith happy hour deals by calculating the distance of each bar from the user location. The distance is calculated using the Haversine formula to spped up the calculation process (instead of using Google API). Red markers represent the 10 nearest bars, while a yellow marker  represents the user locaiton. The user will also have the option of seeing the entire list of bars.

  The cocktail list of 17500 recipe list is fetched from Yummly using RESTful API calls and stored in the database for faster retrieval. In the future this will  be changed to pagination without storing in the local database, but instead fething it page by page from Yummly.com via API calls. As of now oclicking on a cocktail in a list will result in an API call that fetches the recipe from Yummly.com via RESTful APIs.

  The database design consists of a table for bars (listing) and another table for cocktails (list) and a third table for users (login and password). Future releases will provide features so that a user can favourite a bar or a cocktail.

# Known Bugs
  - Sometimes, some cocktails int the list have broken links for images, this may not be a bug - can be due to slow intenet connections

# Future improvements
 
  - replace local database of cocktails list with actual fetches from Yummly.com along with pagination queries. Right now only clicking on a cocktail form the list fetches from Yummly.
  - When user clicks on a bar from the top 10 list, the new page's map should also show the road the user should travel, this can be achieved through Google Map API
  - Allow the user to favourite a bar or a coctail that can be viewed in the favourites pages for cocktail and bar. The user can also have the option of un-favouriting a bar of cocktail from his list of favourites.
  - Allow a user with admin / owner privileges to input bar details via a form, this will not be visible to an ordinary user
  - allow signup of users, admin or owners
  - allow the number scroll in the bar and cocktail listing page to be numbers instead of << and >>


## Technologies used

  - HTML5 and CSS3 for the front-end
  - Ruby on Rails, Ruby Gems (bcrypt, pry, etc)
  - AJAX, underscore, JQuery 
  - Postgres
  - Ruby Gem activerecord to connect with Postgres
  - Google Maps API
  - Restful API from Yummly.com
  - Ruby Gem HTTParty to send/recieve Yummly Restful APIs
  - Chrome and Sublime editor for development

## DATABASE DESIGN
   please refer to the Entity Relationship Diagram in the file HappyHour-db-ERdiagram.xml, you can view this file by opening it in https://www.draw.io/


## GITHUB Link

  https://github.com/reachgregpff/happyhour.git

## HEROKU hosted Link

  https://happyhour-wdi4.herokuapp.com/

