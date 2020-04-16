const axios = require('axios')

const getRandom = async (partOfSpeach, minCorpusCount, maxCorpusCount) => {
  try {
    return await axios.get(process.env.WORDNIK_API_URL + 'words.json/randomWord', {
      params: {
        api_key: process.env.WORDNIK_API_KEY,
        includePartOfSpeech: partOfSpeach,
        minCorpusCount: minCorpusCount,
        maxCorpusCount: maxCorpusCount
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const getMeaning = async (word) => {
  try {
    return await axios.get(process.env.WORDNIK_API_URL + 'word.json/' + word + '/definitions')
  } catch (error) {
    console.error(error)
  }
}

exports.getRandom = getRandom
exports.getMeaning = getMeaning
