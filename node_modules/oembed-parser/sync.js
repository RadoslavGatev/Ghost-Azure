#!/usr/bin/env node

/* eslint-disable camelcase */

const {
  unlinkSync,
  writeFileSync,
} = require('fs');

const fetch = require('cross-fetch');

const source = 'https://oembed.com/providers.json';
const target = './src/utils/providers.json';
const backup = './src/utils/providers.backup.json';

const providerList = require(target);

const blockedProviders = [
  'Twitch',
];

const findOne = (name) => {
  const matches = providerList.filter((p) => {
    return name === p.provider_name;
  });
  return matches.length > 0 ? matches[0] : null;
};

const mergeEndpointsTo = (provider, endpoints) => {
  try {
    const name = provider.provider_name;
    const curr_endpoints = provider.endpoints;
    const mix = (endpoint) => {
      const url = endpoint.url;
      const matches = curr_endpoints.filter((ep) => {
        return url === ep.url;
      });
      const item = matches.length > 0 ? matches[0] : null;
      if (!item) {
        console.log(`Add new endpoint to provider "${name}"`);
      } else {
        const {schemes = null} = item;
        if (schemes) {
          endpoint.schemes.forEach((scheme) => {
            if (!schemes.includes(scheme)) {
              item.schemes.push(scheme);
              console.log(`Add new scheme to provider "${name}" endpoint`);
              console.log(scheme);
            }
          });
        }
      }
    };
    endpoints.map(mix);
  } catch (err) {
    console.trace(err);
    console.log(provider);
    console.log(endpoints);
  }
};

const merge = (data) => {
  writeFileSync(
    backup,
    JSON.stringify(providerList, undefined, 2),
    'utf8',
  );
  data.filter(({provider_name}) => {
    return !blockedProviders.includes(provider_name);
  }).forEach((item) => {
    const {
      provider_name,
      endpoints,
    } = item;
    const provider = findOne(provider_name);
    if (!provider) {
      console.log(`Got a new provider "${provider_name}"`);
      providerList.push(item);
    } else {
      mergeEndpointsTo(provider, endpoints);
    }
  });
  unlinkSync(target);
  writeFileSync(
    target,
    JSON.stringify(providerList, undefined, 2),
    'utf8',
  );
  console.log(`Providers list has been updated`);
};

fetch(source)
  .then((res) => res.json())
  .then(merge)
  .catch(console.trace);
