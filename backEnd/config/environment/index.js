"use strict";

const path = require("path");
const _ = require("lodash");
function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================

const all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + "/../../.."),
  port: process.env.PORT,
  seedDB: false,
  secrets: {
    //session: 'admin-module-secret'
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2EzMzAxYzM0Y2Y5NTIyYzc0ZGFlMzciLCJlbWFpbCI6InZldHJpdmVsQGNndmFraW5kaWEuY29tIiwiY2xpZW50Ijp7Il9pZCI6IjVjYTMyNjVlMmIwZjg5MTRhNGYxOGMxOCIsIm5hbWUiOiJXZWJBUFAgUmVhY3QiLCJ0eXBlIjoiV0VCQVBQIiwic2VjcmV0IjoieFFGVW5Scnd0Qy9BR0RacGFCbzM5bldDKzhvUGFZYjJ6RzBzaHMzSVlPaz0iLCJfX3YiOjB9LCJpYXQiOjE1NTQyMDAzMjMsImV4cCI6MTU1NDIwMzkyM30.TMqchxIxxyHo6AEpamisK8sLoQIceS_YQaIPi2qQcWQ",
    globalAccessToken: process.env.GLOBAL_ACCESS_TOKEN_SECRET,
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2EzMzAxYzM0Y2Y5NTIyYzc0ZGFlMzciLCJlbWFpbCI6InZldHJpdmVsQGNndmFraW5kaWEuY29tIiwiY2xpZW50Ijp7Il9pZCI6IjVjYTMyNjVlMmIwZjg5MTRhNGYxOGMxOCIsIm5hbWUiOiJXZWJBUFAgUmVhY3QiLCJ0eXBlIjoiV0VCQVBQIiwic2VjcmV0IjoieFFGVW5Scnd0Qy9BR0RacGFCbzM5bldDKzhvUGFZYjJ6RzBzaHMzSVlPaz0iLCJfX3YiOjB9LCJpYXQiOjE1NTUwNjIwMzV9.-cYCaI7nbuBj3Ptuoh3Ll0a-qDj7nHNGFhl_ANxpQ9c",
    refTokenKey: "mypassword"
  },
  pass_token: {
    PORT: "3002",
    JWT_SECRET: "5e8ac09ad4d43200c4c3551e"
  },
  auth: {
    clientId: "5e8ac09ad4d43200c4c3551e",
    clientSecret: "YEPzU01d/AaqyZ1x30E+UdMelD5cklGrIzwUdiex0T4=",

    saUrl: "http://localhost:3002" + "/auth/token"
  },

  token: {
    expiresInMinutes: 60 * 60
  },
  // MongoDB connection options
  mongo: {
    options: {
      useNewUrlParser: true
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require("./" + process.env.NODE_ENV + ".js") || {}
);
