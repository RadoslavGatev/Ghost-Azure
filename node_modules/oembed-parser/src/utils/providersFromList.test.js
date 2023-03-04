// providersFromList

const providersFromList = require('./providersFromList');


test(`test providersFromList bad URI format`, () => {
  const customProviderOnly = [
    {
      provider_name: 'Example',
      provider_url: 'http.org',
      endpoints: [
        {
          schemes: [
            'example.org/media/*',
          ],
          url: 'org/oembed',
        },
      ],
    },
  ];
  const result = providersFromList(customProviderOnly);
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toEqual(0);
});
