// main

const {
  extract,
  hasProvider,
  setProviderList,
} = require('./main');

const required = [
  'type',
  'version',
];

const optional = [
  'provider_url',
  'provider_name',
];

const RichTypeKeys = [
  'html',
  'width',
  'height',
  ...optional,
  ...required,
];

const PhotoTypeKeys = [
  'url',
  'width',
  'height',
  ...optional,
  ...required,
];

const InstagramKeys = [
  'html',
  'width',
  ...optional,
  ...required,
];

const hasProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const hasRichKeys = (o) => {
  return RichTypeKeys.every((k) => {
    return hasProperty(o, k);
  });
};

const hasPhotoKeys = (o) => {
  return PhotoTypeKeys.every((k) => {
    return hasProperty(o, k);
  });
};

const hasInstagramKeys = (o) => {
  return InstagramKeys.every((k) => {
    return hasProperty(o, k);
  });
};

(() => {
  const badSamples = [
    '',
    {k: 9},
    [1, 3, 4],
    301932,
    'htt:/abc.com/failed-none-sense',
    'https://abc.com/failed-none-sense',
    'http://badcom/146753785',
    'https://674458092126388225',
    'http://www.ted.com/talks/something-does-not-exist',
    'https://soundcloud^(*%%$%^$$%$$*&(&)())',
  ];


  const testBadOne = (url) => {
    test(`testing extract bad url "${url}"`, async () => {
      try {
        await extract(url);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  };

  return badSamples.map(testBadOne);
})();


test(`test extract YouTube link`, async () => {
  try {
    const url = 'https://www.youtube.com/watch?v=ciS8aCrX-9s';
    const result = await extract(url);
    expect(hasRichKeys(result)).toBe(true);
  } catch (err) {
    expect(err).toBe(null);
  }
});

test(`test extract Flickr link`, async () => {
  try {
    const url = 'https://flic.kr/p/2iYctUr';
    const result = await extract(url);
    expect(hasPhotoKeys(result)).toBe(true);
  } catch (err) {
    expect(err).toBe(null);
  }
});

test(`test extract Flickr link with params`, async () => {
  try {
    const url = 'https://flic.kr/p/2iYctUr';
    const result = await extract(url, {maxwidth: 640, maxheight: 480});
    expect(hasPhotoKeys(result)).toBe(true);
  } catch (err) {
    expect(err).toBe(null);
  }
});


test(`test extract Instagram link`, async () => {
  try {
    const url = 'https://www.instagram.com/p/ic7kRDqOlt/';
    const result = await extract(url);
    expect(hasInstagramKeys(result)).toBe(true);
  } catch (err) {
    // could not wait for reviewing 'Oembed Read' feature
    // https://developers.facebook.com/docs/apps/review
    expect(err).toBeTruthy();
  }
});


test(`test .hasProvider() method`, () => {
  expect(hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s')).toBe(true);
  expect(hasProvider('https://trello.com/b/BO3bg7yn/notes')).toBe(false);
});

test(`test .setProviderList() method`, () => {
  const customProviderOnly = [
    {
      provider_name: 'Example',
      provider_url: 'http://www.example.org',
      endpoints: [
        {
          schemes: [
            'http://www.example.org/media/*',
          ],
          url: 'http://www.example.org/oembed',
        },
      ],
    },
  ];
  setProviderList(customProviderOnly);
  expect(hasProvider('http://www.example.org/media/abcdef')).toBe(true);
  expect(hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s')).toBe(false);
});
