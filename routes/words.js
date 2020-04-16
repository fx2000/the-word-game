const express = require('express')
const router = express.Router()
const axios = require('axios')
/* const wordnikApi = require('../lib/wordnikApi') */

/* GET words listing. */
router.get('/', function (req, res, next) {
  const response = async () => {
    try {
      return await axios.get(process.env.WORDNIK_API_URL + 'words.json/randomWord', {
        params: {
          api_key: process.env.WORDNIK_API_KEY,
          includePartOfSpeech: 'noun',
          minCorpusCount: 8000,
          maxCorpusCount: -1
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  res.status(200).json(response.data)
})

module.exports = router
