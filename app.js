//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hii, welcome to our blog website where we share insightful articles, exciting stories, and valuable information on a wide range of topics. Whether you're here for inspiration, knowledge, or just a good read, we're thrilled to have you join our community of curious minds. Explore, engage, and enjoy the journey with us! Whether you're here for informative articles, entertaining stories, or thought-provoking insights, we're thrilled to have you join us on this journey of discovery and exploration. Feel free to dive in, explore our latest posts, and become part of our growing community. Happy reading!";
const aboutContent = "A blog website is an online platform where individuals or organizations regularly publish written content in a chronological format. The term blog is a shortened form of weblog. Blogs often cover a wide range of topics, including personal experiences, opinions, news, tutorials, and more Typically, a blog website allows for interaction through comments, enabling readers to engage with the content and the author. Blogs can be created for various purposes, such as sharing knowledge, expressing personal thoughts, promoting products or services, or building a community around a particular niche";
const contactContent = "For adding your blog at our website mail at  chetanyasinghbais987@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
