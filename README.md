

# hoody

Project 2 repository



## Description

Interactive map to leave comments related to diverse local topics.

## User stories

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

    --> render write comment view

  - As a user I want to delete comments

    --> add a delete button to the comment-write view, await 2nd confirmation to delete

  - As a user I want to edit my comments

    --> add a edit button to the comment-write view

  

  #### Navigation Bar (secured view)

  - As a user I want to navigate easy from every page to necessary options and content

    --> Add navigation bar to the top of the view, dropdown -> Layout for secured views

    - As a user I want to navigage to my profile

      ->  add Link to user profile, use user id

    - As a user I want to navigate to the Map

      -> add link to the Map/main view

    - As a user I want to navigate to my comment i have wrote

      -> add link to the user comment 

  ​	

## 

- **404** - As a user I want to see a funny Not Found page.

- **500** - As a user I want to see an apology when there is an internal error.

- **homepage** - As a user I want to see the homepage and be able to introduce my data, accessing the app if I already have an account, being redirected to the same page with error message. Also, I want to access sign up page in case I want to create a new account. 

- **sign up** - As a user I want to sign up on the web page so that I can .

- **login** - As a user I want to be able to log in on the web page so that I can get back to my account

- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account

- **favorite list** - As a user I want to see the list of my favorite and delete them.

- **edit user** - As a user I want to be able to edit my profile.

- **result** - As a user I want to see the list of restaurant filter by my preferences.

- **restaurant listing** - As a user I want to see more details of the restaurant, be able to call them and visit their website and save it as favorites.

  
  
  ## API Routes (Back-end):

| **Method** | **Route**                | **Description**                                              | Request - Body                                           |
| ---------- | ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                      | Main page route. Renders home `index` view.                  |                                                          |
| `POST`     | `/login`                 | Sends Login form data to the server.                         | { username, password }                                   |
| `GET`      | `/signup`                | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                | Sends Sign Up info to the server and creates user in the DB. | { username, password }                                   |
| `GET`      | `/private/profile`       | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/profile-edit`  | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `DELETE`   | /private/profile-delete  | Private route. Render the `favorites` view.                  |                                                          |
| GET        | /private/map/:lat/:long  | Map of near comments.                                        |                                                          |
| GET        | /private/map/:comment_id | Comment display. Backlog: comments on comment and likes.     |                                                          |
| GET        | /private/map/write       | Displays write screen                                        |                                                          |
| POST       | /private/map/write/post  | Posts new comment                                            | { user_id, comment_title, comment_text, location }       |

## Models

User model

```
{
  name: String,
  password: String,
  comments: [CommentId],
  likes: [likeId]
}
```

Comment model

```
{
  title: String,
  text: String,
  user: UserId,
  likes: [likeId],
}
```

Favorites model

```
{
  userId: String
}
```



## Backlog

[See the Trello Board](https://trello.com/b/z4mwyULn/project-2)



## Links

### Git

[Repository Link](https://gist.github.com/ross-u/8f91ec13aeaf35a1ba7603848284703f)

[Deploy Link]()



### Slides

[Slides Link](https://docs.google.com/presentation/d/1Zi7FQcl9imwjfVpgVau7Zex-KJJuxnzDYFTnYQ73A8c/edit?usp=sharing)



