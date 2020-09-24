const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');

const prod = process.env.NODE_ENV === 'production';
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');

const app = express();

dotenv.config();

// sequelize.sync({ force: true });
sequelize.sync();
passportConfig();

// EXPRESS SETUP
if(prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(cors());
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://aki90.dothome.co.kr/',
    credentials: true,
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200).json({ test: 'API Servers' });
});

// ROUTES
app.use('/user', userRouter);
app.use('/posts', postsRouter);


// const port = prod ? process.env.PORT : 3031;
// const port = 80;
// const PORT = process.env.PORT||3031;
const port = process.env.PORT || 3000;
// START
app.listen(port, () => {
  console.log(`백엔드 서버 ${port}번 포트에서 작동중.`);
});
