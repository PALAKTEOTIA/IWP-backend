require('dotenv').config();
const router = require('express').Router();
var multer = require('multer'); 
var multers3 = require('multer-s3');
const AWS = require('aws-sdk');
const authMiddleware = require('../middlewares/auth');
const s3 = new AWS.S3({
    accessKeyId:process.env.Access_Key_ID,
    secretAccessKey:process.env.Secret_Access_Key
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

const uploadS3 = multer({
    storage: multers3({
      s3: s3,
      acl: 'public-read',
      bucket: 'vote-with-ease',
      metadata: (req, file,cb) => {
        cb(null, {fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname)
      }
    })
  });

const signUp = require('./signup');
const signIn = require('./signin');
const candidateRegistration = require('./candidateRegistration');
const castVote = require('./castVote');
const getVoteCount = require('./getVoteCount');
const getCandidates = require('./getCandidates');

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/candidate/signup',authMiddleware,uploadS3.single('image'),candidateRegistration);
router.post('/vote',authMiddleware,castVote);
router.get('/vote/count',authMiddleware,getVoteCount);
router.get('/candidates',authMiddleware,getCandidates);

module.exports = router