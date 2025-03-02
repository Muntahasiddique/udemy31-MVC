const User = require('../models/user');

function signup(req, res) {
  let sessionInputData = req.session.inputData || {
    hasError: false,
    email: '',
    confirmEmail: '',
    password: '',
  };
  
  req.session.inputData = null;
  res.render('signup', { inputData: sessionInputData });
}

function login(req, res) {
  let sessionInputData = req.session.inputData || {
    hasError: false,
    email: '',
    password: '',
  };
  
  req.session.inputData = null;
  res.render('login', { inputData: sessionInputData });
}

async function signuppost(req, res) {
  const { email, password } = req.body;
  const confirmEmail = req.body['confirm-email'];

  if (!email || !confirmEmail || !password || password.length < 6 || email !== confirmEmail || !email.includes('@')) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email,
      confirmEmail,
      password,
    };

    req.session.save(() => res.redirect('/signup'));
    return;
  }

  const user = new User(email, password);
  if (await user.exists()) {
    req.session.inputData = {
      hasError: true,
      message: 'User exists already!',
      email,
      confirmEmail,
      password,
    };
    req.session.save(() => res.redirect('/signup'));
    return;
  }

  await user.save();
  res.redirect('/login');
}

async function loginpost(req, res) {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user || !(await new User(user.email, user.password).comparePassword(password))) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email,
      password,
    };
    req.session.save(() => res.redirect('/login'));
    return;
  }

  req.session.user = { id: user._id, email: user.email };
  req.session.isAuthenticated = true;
  req.session.save(() => res.redirect('/admin'));
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

module.exports = {
  signup,
  login,
  signuppost,
  loginpost,
  logout
};
