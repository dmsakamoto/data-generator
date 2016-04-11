
'use strict'

let fs = require('fs')
let path = require('path')

let users = require('./userGenerator')

const DEFAULT_NUMBER = 2

class generator {

  constructor(OUTPUT_DIR) {
    this.output_dir = OUTPUT_DIR || null
  }

  /* Helper funcitons */

  /**
   * Writes to the generated content to a file or to the console
   */
  writeContent(json, output_path, log_results) {
    json = json || {}
    output_path = output_path || null
    log_results = log_results || false
    let data = JSON.stringify(json, 0, 2)
    if (output_path) {
      fs.writeFile(path.resolve(__dirname, output_path), data, (err) => {
        if (err) throw err
        console.log('Saved data to', output_path)
      })
    }
    if (!output_path || log_results) {
      console.log(data)
    }
  }

  /* Users */

  users(number, output_filename, log_results) {
    number = number || DEFAULT_NUMBER
    output_filename = output_filename || 'users.json'
    log_results = log_results || false
    let output_dir = this.output_dir
    let output_path = output_dir ? output_dir + '/' + output_filename : null
    let data = users.generate(number)
    this.writeContent(data, output_path, log_results)
  }


}

module.exports = generator
