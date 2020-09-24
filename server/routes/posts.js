const express = require('express');
const db = require('../models');
const { verifyToken } = require('../routes/middlewares');
const router = express.Router();

// Posts List
router.get('/',async (req, res) => {
  try {
    const posts = await db.Post.findAll({
        include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
        }],
        order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
        posts: posts
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

// Post List
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['nickname'],
      }],
    });

    return res.status(200).json({ post: post });

  } catch (err) {
    console.error(error);
    return res.status(500).json(error);
  }
});

// POST 생성
router.post('/', verifyToken, async (req, res) => {
  
    // POST 내용 입력 검사
    const { title, contents } = req.body;
    if (!title) {
      return res.status(400).json({ msg: '게시물 제목을 입력해주세요.' });
    }
    if (!contents) {
      return res.status(400).json({ msg: '게시물 내용을 입력해주세요.' });
    }
    
  try {
    // POST 추가
    const user = req.decoded; // verifyToken 값 decoded
    const newPost = await db.Post.create({
      title: req.body.title,
      contents: req.body.contents,
      UserId: user.id, 
    });
    return res.status(201).json(newPost);
  
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Server Error' });
  }
});

// POST 삭제
router.delete('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const user = req.decoded;
  const post = await db.Post.findOne({
    where: {
      id: postId,
    }
  });
  const postUser = await db.Post.findOne({
    where: {
      id: postId,
      UserId: user.id,
    }
  });

  if (!post) {
    return res.status(404).json({ message: '존재하지 않는 게시물입니다.' });
  }
  if (!postUser) {
    return res.status(403).json({ message: '자신의 게시물이 아닌 게시물은 삭제할 수 없습니다.' });
  }

  try {
    await post.destroy();
    return res.status(204).json({});

  } catch (error) {
    return res.status(500).json({ message: 'Delete Error', error });
  }
});


// POST 수정
router.put('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const user = req.decoded;
  const post = await db.Post.findOne({
    where: {
       id: postId,
    },
  });
  const postUser = await db.Post.findOne({
    where: {
      id: postId,
      UserId: user.id
    }
  });
  

  if (!post) {
    return res.status(404).json({ message: '존재하지 않는 게시물입니다.' });
  }
  if (!postUser) {
    return res.status(403).json({ message: '자신의 게시물이 아닌 게시물은 수정할 수 없습니다.' });
  }

  const { title, contents } = req.body;
  if (!title) {
    return res.status(400).json({ message: '게시물 제목을 입력해주세요.' });
  }
  if (!contents) {
    return res.status(400).json({ message: '게시물 내용을 입력해주세요.' });
  }

  try {
    // POST 수정
    const updatePost = await db.Post.update({
      title: req.body.title,
      contents: req.body.contents,
    }, {
      where: { id: postId },
    });
    return res.status(201).json(updatePost);
  
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Server Error', error });
  }
});

module.exports = router;
