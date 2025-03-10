const Post = require('../models/post');
const validationSession = require('../util/validation-session');
const ValidateSession = require('../util/validation-session')
const postIsValid = require('../util/validation')
function getHome(req, res) {
    res.render('welcome',
       //  { csrfToken: req.csrfToken() }
        );
  }

  async function getAdmin (req, res) {
    if (!res.locals.isAuth) {
      return res.status(401).render('401');
    }
  
   // const posts = await db.getDb().collection('posts').find().toArray();
  const posts =await Post.fetchAll();
  sessionInputData= ValidateSession.getSessionError(req,
    {
        title :'',
        content : ''
    }
  )
  
    res.render('admin', {
      posts: posts,
      inputData: sessionInputData,
     // csrfToken: req.csrfToken(),
    });
  }
  async function createPost (req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
  
    if (
    //   !enteredTitle ||
    //   !enteredContent ||
    //   enteredTitle.trim() === '' ||
    //   enteredContent.trim() === ''
    !postIsValid.validateInput(enteredTitle , enteredContent)
    ) {
        ValidateSession.flashErroRstoSession(req ,
            {
                message: 'Invalid input - please check your data.',
                title: enteredTitle,
                content: enteredContent,
            }
            , function(){
                res.redirect('/admin');
            }
        )
      
  
   
      return; // or return res.redirect('/admin'); => Has the same effect
    }
  
  const post =new Post(enteredTitle ,enteredContent);
  await post.save();
    res.redirect('/admin');
  }

  async function getSinglePost (req, res) {
    //const postId = new ObjectId(req.params.id);
    //const post = await db.getDb().collection('posts').findOne({ _id: postId });
   const post = new Post(null , null , req.params.id)
  await post.fetch();
    if (!post.title || !post.content) {
      return res.render('404'); // 404.ejs is missing at this point - it will be added later!
    }
    sessionInputData= ValidateSession.getSessionError(req , {
        title : post.title,
        content : post.content
    })
   
  
    res.render('single-post', {
      post: post,
      inputData: sessionInputData,
    //   csrfToken: req.csrfToken(),
    });
  }
  async function updatePost (req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
    //const postId = new ObjectId(req.params.id);
  
    if (
        !postIsValid.validateInput(enteredTitle , enteredContent)
    ) {
    //have 3 parameters req , data , action
       validationSession.flashErroRstoSession(req,{message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,}
    ,function(){
        res.redirect(`/posts/${req.params.id}/edit`);
    }
    
    ) 
      
  
     
      return; 
    }
    const post =new Post(enteredTitle ,enteredContent,req.params.id);
    await post.save();
  
    res.redirect('/admin');
  }
  async function deletePost (req, res) {
    //const postId = new ObjectId(req.params.id);
   const post =new Post(null,null,req.params.id);
  await post.delete();
    res.redirect('/admin');
  }
  module.exports ={
getHome :getHome,
getAdmin:getAdmin,
createPost:createPost,
getSinglePost:getSinglePost,
updatePost:updatePost,
deletePost:deletePost

  }

