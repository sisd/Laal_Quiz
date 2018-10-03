package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB
var err error

type User struct {
  ID uint `json:"id"`
  Firstname string `json:"firstname"`
  Lastname string `json:"lastname"`
  Username string `json:"username"`
  Password string `json:"password"`
  Password_salt string `json:"password_salt"`
  Admin uint `json:"admin"`
}

type Leaderboard struct {
  ID uint `josn:"id"`
  User_id uint `json:"user_id"`
  Solved_quiz uint `json:"solved_quiz"`
  Solved_question uint `json:"solved_question"`
}

type Genre struct {
  ID uint `json:"id"`
  Name_genre string `json:"Name_of_Genre"`
}

type Quiz struct {
  ID uint `json:"id"`
  Name_quiz string `json:"Name_of_Quiz"`
  ID_genre uint `json:"id_genre"`//`sql:"type:uint REFERENCES genres(id)"`//`gorm:"type:int REFERENCES Genre(ID) ON DELETE CASCADE"`
}

type Question struct {
  ID uint `json:"id"`
  Question_name string `json:"Name_of_Question"`
  Question string `json:"question"`
  Option1 string `json:"option1"`
  Option2 string `json:"option2"`
  Option3 string `json:"option3"`
  Option4 string `json:"option4"`
  Answer int `json:"answer"`
  ID_quiz uint `json:"id_quiz"`//`gorm:"type:int REFERENCES Quiz(ID) ON DELETE CASCADE"`
}

func main()  {
  db, err = gorm.Open("sqlite3", "./laal_quiz_database.db")
  if err != nil {
     fmt.Println(err)
  }
  defer db.Close()
  db.Exec("PRAGMA foreign_keys = ON")
  db.AutoMigrate(&Genre{}, &Quiz{}, &Question{}, &User{})
  r := gin.Default()

  r.GET("/alluser/", Alluser)
  r.POST("/user/", Adduser)

  r.GET("/allgenre/", AllGenre)                             // Creating routes for each functionality
  r.GET("/genre/:id", GetGenre)
  r.POST("/genre/", AddGenre)
  //r.DELETE("/genre/:id", Deletegenre)

  r.GET("/allquiz/:id_genre",Genrequiz)
  //r.DELETE("/allquiz/:id_genre", Deletegenrequiz)
  r.GET("/quiz/:id", Getquiz)
  r.POST("/quiz/", Addquiz)
  r.DELETE("/quiz/:id", Deletequiz)

  r.GET("/allquestion/:id_quiz", Quizquestion)
  r.DELETE("/allquestion/:id_quiz", Deletequizquestion)
  r.GET("/question/:id", Getquestion)
  r.POST("/question/", Addquestion)
  r.DELETE("/question/:id", Deletequestion)
/*
  r.GET("/alloption/:id_question", Questionoption)
  r.DELETE("/alloption/:id_question", Deletequestionoption)
  r.DELETE("/alloptionq/:id_quiz", Deletequizoption)
  r.GET("/option/:id", Getoption)
  r.POST("/option/", Addoption)
  r.DELETE("/option/:id", Deleteoption)
*/
  r.Use((cors.Default()))
  r.Run(":8080")
}
func Alluser(c *gin.Context) {
  var users []User
  if err := db.Find(&users).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, users)
  }
}

func Adduser(c *gin.Context) {
  var user User
  c.BindJSON(&user)
  db.Create(&user)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, user)
}
/*
func Getoption(c *gin.Context) {
  id := c.Params.ByName("id")
  var option Option
  if err := db.Where("id = ?", id).First(&option).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, option)
  }
}

func Addoption(c *gin.Context) {
   var option Option
   c.BindJSON(&option)
   db.Create(&option)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, option)
}

func Deleteoption(c *gin.Context) {
  id := c.Params.ByName("id")
  var option Option
  if err := db.Where("id = ?", id).First(&option).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id = ?", id).Delete(&option)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
  }
}

func Questionoption(c *gin.Context) {
  question := c.Params.ByName("id_question")
  var option []Option
  if err := db.Where("id_question = ?", question).Find(&option).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, option)
  }
}

func Deletequestionoption(c *gin.Context) {
  question := c.Params.ByName("id_question")
  var option []Option
  if err := db.Where("id_question = ?", question).Find(&option).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id_question = ?", question).Delete(&option)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"question #" + question: "deleted"})
  }
}

func Deletequizoption(c *gin.Context) {
  quiz := c.Params.ByName("id_quiz")
  var option []Option
  if err := db.Where("id_quiz = ?", quiz).Find(&option).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id_quiz = ?", quiz).Delete(&option)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"quiz #" + quiz: "deleted"})
  }
}
*/
func Getquestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  if err := db.Where("id = ?", id).First(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, question)
  }
}

func Addquestion(c *gin.Context) {
   //genre := c.Params.ByName("Name_of_Genre")
   var question Question
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, question)
}

func Deletequestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  if err := db.Where("id = ?", id).First(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id = ?", id).Delete(&question)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
  }
}

func Quizquestion(c *gin.Context) {
  quiz := c.Params.ByName("id_quiz")
  var question []Question
  if err := db.Where("id_quiz = ?", quiz).Find(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, question)
  }
}

func Deletequizquestion(c *gin.Context) {
  quiz := c.Params.ByName("id_quiz")
  var question []Question
  if err := db.Where("id_quiz = ?", quiz).Find(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id_quiz = ?", quiz).Delete(&question)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"quiz #" + quiz: "deleted"})
  }
}

func Getquiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var quiz Quiz
  if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, quiz)
  }
}

func Addquiz(c *gin.Context) {
   //genre := c.Params.ByName("Name_of_Genre")
   var quiz Quiz
   //quiz.Genre_name = genre
   c.BindJSON(&quiz)
   db.Create(&quiz)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, quiz)
}

func Deletequiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var quiz Quiz
  if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id = ?", id).Delete(&quiz)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id #" + id: "deleted"})
  }
}

func Genrequiz(c *gin.Context) {
  genre := c.Params.ByName("id_genre")
  var quiz []Quiz
  if err := db.Where("id_genre = ?", genre).Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, quiz)
  }
}
/*
func Deletegenrequiz(c *gin.Context) {
  id_genre := c.Params.ByName("id_genre")
  var quiz []Quiz
  if err := db.Where("id_genre = ?", id_genre).Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
    d := db.Where("id_genre = ?", id_genre).Delete(&quiz)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"id_genre #" + id_genre: "deleted"})
  }
}
*/
func GetGenre(c *gin.Context) {
  id := c.Params.ByName("id")
  var genre Genre
  if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, genre)
  }
}
/*
func Deletegenre(c *gin.Context) {
   id := c.Params.ByName("id")
   var genre Genre
   if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {

     d := db.Where("id = ?", id).Delete(&genre)
     fmt.Println(d)
     c.Header("access-control-allow-origin", "*")
     c.JSON(200, gin.H{"id #" + id: "deleted"})
   }
}
*/
func AddGenre(c *gin.Context) {
   var genre Genre
   c.BindJSON(&genre)
   db.Create(&genre)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, genre)
}

func AllGenre(c *gin.Context) {
   var genres []Genre
   if err := db.Find(&genres).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, genres)
   }
}
