require('dotenv').config();
const { gql } = require('graphql-request');

const { getClient } = require('./lib/graphql');

const items = require('./items.json');

/**
 * TYPES
 * - OTHER
 * - FORUM
 * - SPEAKING
 * - BLOGPOST
 * - HACKATHON
 * - VIDEO_PODCAST
 * - ARTICLE_PUBLICATION
 * - EVENT_ORGANIZATION
 * - OPEN_SOURCE_PROJECT
 */


async function addContribution({ type, title, description, url, date }) {
  const client = getClient();

  const query = gql`
    mutation AddContribution(
      $type: ContributionType!
      $date: GraphQLDateTime!
      $title: String!
      $url: URL
      $description: String!
    ) {
      createContribution(
        data: { date: $date, url: $url, type: $type, title: $title, description: $description }
      ) {
        id
        title
      }
    }
  `;

  const results = await client.request(query, {
    type,
    title,
    description,
    url,
    date: new Date(date).toISOString()
  });

  return results;
}

(async function run() {
  for ( let i = 0, len = items.length; i < len; i++) {
    const item = items[i];
    console.log(`Adding: ${JSON.stringify(item, null, 2)}`);
    try {
      await addContribution(item);
    } catch(e) {
      console.log(`Failed to add item: ${e.message}`);
    }
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000))
  }

})();

