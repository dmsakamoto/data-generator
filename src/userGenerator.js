'use strict'

const FEMALE_FIRST_NAMES = require('../lib/female_first_names.json')
const MALE_FIRST_NAMES = require('../lib/male_first_names.json')
const LAST_NAMES = require('../lib/last_names.json')
const DOMAINS = ['a', 'b', 'c']
const POLITICAL_PARTIES = ['REPUBLICAN', 'DEMOCRAT']

const TEN_DAYS_AGO = 10 * 24 * 3600 * 1000

let randomInt = function(range) {
  return Math.floor(Math.random() * range)
}

let randomArrayValue = function(array) {
  return array[randomInt(array.length)]
}

let randomCreatedAtDate = function() {
  let createdAt = Date.now() - randomInt(TEN_DAYS_AGO)
  return new Date(createdAt).toISOString()
}

let randomUpdatedAtDate = function (createdAt) {
  let now = Date.now()
  createdAt = createdAt || new Date(now).toISOString()
  let range = now - new Date(createdAt)
  let updatedAt = now - randomInt(range)
  return new Date(updatedAt).toISOString()
}

// TODO : Eliminate duplicate names
let generateUser = function(id) {
  let user = {}
  let gender = Math.random() > 0.5
  user.id = '' + id
  user.gender = gender ? 'MALE' : 'FEMALE'
  user.first_name = gender ? randomArrayValue(MALE_FIRST_NAMES) : randomArrayValue(FEMALE_FIRST_NAMES)
  user.last_name = randomArrayValue(LAST_NAMES)
  user.email = user.first_name + user.last_name + '@' + randomArrayValue(DOMAINS)
  user.createdAt = randomCreatedAtDate()
  user.updatedAt = randomUpdatedAtDate(user.createdAt)
  // user.mobile = randomPhoneNumber() // TODO
  // user.political = randomArrayValue(POLITICAL_PARTIES)
  return user
}


module.exports = {
  generate: function(number) {
    number = number || 100
    let users = []
    let existingNames = {}
    for (let i = 0; i < number; i++) {
      let user = generateUser(i)
      users.push(user)
    }
    return users
  }
}
