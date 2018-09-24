
# @jmusial/gatsby-source-eventbrite

---

This is a fork of [gatsby-source-eventbrite](https://github.com/GatsbyCentral/gatsby-source-eventbrite) made to support multiple evetbrite accounts and support for gatsby v1.9

----

Source plugin for pulling events and related data from eventbrite. 

WORK IN PROGRESS: At the moment it just fetches `events` and `venues` from eventbrite.com without further processing or filtering. Other Endpoints are configurable but haven't been tested yet.
Works with Eventbrite's API v3.


## Install

`npm install --save @jmusial/gatsby-source-eventbrite`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `@jmusial/gatsby-source-eventbrite`,
    options: {
      organizations: {
        [     
          organizationId: `The ID of your organization 1`,
          accessToken: `your_access_token 1`,
        ],
        [     
          organizationId: `The ID of your organization 2`,
          accessToken: `your_access_token 2`,
        ],
        ...
      }
      // OPTIONAL: Defaults are Events and Venues
      entities: ['events', 'venues','...']
    },
  },
]
```
