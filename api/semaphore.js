var Mutex = require('async-mutex').Mutex;
var Semaphore = require('async-mutex').Semaphore;
var withTimeout = require('async-mutex').withTimeout;

class MySemaphore {

    constructor() {
        this.semaphoreA = new Semaphore(1);  // 1 maximum concurrent consumer
    }

    getA() {
        return this.semaphoreA;
    }
}

class Singleton {

  constructor() {
      if (!Singleton.instance) {
          Singleton.instance = new MySemaphore();
      }
  }

  getInstance() {
      return Singleton.instance;
  }

}

module.exports = Singleton;