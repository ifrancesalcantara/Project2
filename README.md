



# Project2
Project 2 repository



## User story

#### Index view (not secured area)

###### CASE 1 new user

- ​		As  user I want to create an account. 

  ​		As user I need a Sign UP Button to get to the SignUp view.	

  ​		Signup Button --> route to Sign Up view	

###### CASE 2 registered user

- As a registered user I want to login to the page. 

  - As a user I want to input my Profile name 
  - and my password
  - press login button to view the secured Index page.

  ​		Login Button with filled Credentials (Validation if empty or not) --> route to Secured Index ( show Map)



#### Signup view (not secured area)

- As a user I want to sign up to the page, leave the following information

  - Profile Name (Validation if name is not in use)

  - Password (validation if password is fitting the password rules)

  - Password Validation (validation if both password the same)

  - Home Place

    --> Validation all informations correct --> route to Secured Index ( show Map)

  - As a user I want to read a message if there was an error

  

#### Profile view (secured area)

- As a user I want to edit/delete my Profile to cofirm the changes I have to input my actual password to accept the changes

  - As a user I want a delete/edit Button to enter Edit Profile mode
  - As a user I want to change my Profile name, validation if name is use or not
  - As a user I want to change my password (validate with old password and type in the new password and the validation)
  - As a user I want to change my favorite Place

  --> As a user after i changed my Information i want to save/discard the changes

  ###### CASE 1 discard changes

  - As user I want to discard my changes and get my Profile as it was
    - --> Discard Button --> don t save changes
    - As a user I want to read a message if discard changes was succesful
    - As a user I want to read a message if there was an error

  ###### CASE 2 save changes

  - ​	As a user I want to save my changes to my profile
    - Save Changes Button --> save changes to user profile
      - As user I want a message if save was succefull
      - As a user I want a message if there was an error

- As a user I want to see my comments I left --> render commetns user view (Backlog) 

  

  #### MAP view (index secured area)

  - As a user I want to see the map around my location

    ###### CASE 1 geolocation tracking 

    - ​	render map with actual position

    ###### CASE 2 no geolocation tracking 

    - ​	render map around the home/favorite place saved in my profile

  - As a user I want to click on a point on the map to leave a comment to that place or read comments

    ###### CASE 1 no comments at this location

    --> rendering the comment write view

    ###### CASE 2 commets already on this location 
    - As a user I want to click on a mark on the map to read the comments other users left 

      --> rendering comment read view

    - As a user I want a button on the top to write my comment to this location, to not have to read all comments before writing my comment

      --> rendering write view

  

  #### Comment Read view (comment-read secured area)

  - As a user I want to read comments other user left on the map

    - As user I want to have a visible Object on the map that signals me there are already comments on this location
    - As a user I want to scroll down to read the comments

  - As a user I want to write a comment --> Write Button should be accessed from easy from every point where I am

    --> WRITE Button to the top of the comments view for more usability

  

  #### Comment Write view (comment-write secured area)

  - As a user I want to write comments 

  ​	



