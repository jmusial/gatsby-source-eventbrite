const fetch = require(`./fetch`)
const _ = require('lodash')
const { defaultEntities } = require('./defaultEntities')
const { linkEventWithVenue } = require('./createNodeRelations')
const processEntry = require('./processEntry')

// @TODO add image processing
exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  options
) => {
  const { createNode } = boundActionCreators
  const { organizations, entities = [] } = options

  // Merge default entities with configured ones
  const entitiesToFetch = [...new Set([...defaultEntities, ...entities])]

  // Fetch all defined entities and create nodes
  const nodes = {}
  let processedEntries = [];

  organizations.map(org => {
    let tempEntries = entitiesToFetch.map(entity => {
      return fetch({
        organizationId: org.organizationId,
        accessToken: org.accessToken,
        entity
      }).then(entries => entries[entity].map(entry => processEntry(entry, entity, createNodeId))).then(entries => {
        nodes[entity] = [...(nodes[entity] || []), ...entries];
      });
    });
    processedEntries = [...processedEntries, ...tempEntries];
  });


  await Promise.all(processedEntries).then(() => {
    Object.keys(nodes).forEach(entity => {
      if (entity === 'events') {
        nodes[entity].forEach(() => {
          linkEventWithVenue(nodes, entity)
        })
      }
      nodes[entity].forEach(entry => createNode(entry))
    })
  })
}
