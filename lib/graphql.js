const { GraphQLClient } = require('graphql-request');

let client;

/**
 * getClient
 */

function getClient() {
  if (!client) {
    client = _createClient();
  }
  return client;
}

module.exports.getClient = getClient;

/**
 * createApolloServer
 */

function _createClient() {
  return new GraphQLClient('https://api-stars.github.com/', {
		headers: {
      authorization: `Bearer ${process.env.GITHUB_STARS_API_TOKEN}`
    }
	});
}