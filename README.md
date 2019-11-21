## Description

Interactive map to leave comments related to diverse local topics.



## User Stories

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
| GET        | /private/map/:lat/:long  | Map of near comments.                                        |                    HELLO                                      |
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

