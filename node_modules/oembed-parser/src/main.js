// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
  providersFromList,
} = require('./utils');

const defaultProviderList = require('./utils/providers.json');
let providers = providersFromList(defaultProviderList);

const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL');
  }
  const p = findProvider(url, providers);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  const data = await fetchEmbed(url, p, params);
  return data;
};

const hasProvider = (url) => {
  return findProvider(url, providers) !== null;
};

const setProviderList = (list) => {
  providers = providersFromList(list);
};

module.exports = {
  extract,
  hasProvider,
  setProviderList,
};
