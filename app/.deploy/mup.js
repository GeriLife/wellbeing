module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '0.0.0.0',
      username: 'shailee',
      // pem: './path/to/pem'
      password: 'shailee'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'wellbeing-server',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://172.17.0.3:3000',
      MONGO_URL: 'mongodb://172.17.0.3/meteor',
      MONGO_OPLOG_URL: 'mongodb://172.17.0.3/local',
      SECRET: 'secret123'
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base',
      bind: '127.0.0.1',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },


  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
