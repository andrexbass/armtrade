module.exports = {
  servers: {
    one: {
      host: 'ip_do_servidor',
      username: 'root',
      // pem:
      //password: ''
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'armtrade',
    path: '../armtrade',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://000.000.000.000',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,
    
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {},
    },
  },
};
