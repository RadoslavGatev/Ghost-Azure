# Bookshelf Relations

Insert, update and remove relationships on your Bookshelf models.
This plugin supports all relationship types: belongs-to, belongs-to-many has-one and has-many.

# Install

`npm install bookshelf-relations --save`

or

`yarn add bookshelf-relations`


# Usage

## Pre-word

- It's highly recommended to insert/update/delete your models within [transactions](http://bookshelfjs.org/#Bookshelf-instance-transaction) when using this plugin, because updating nested relationships requires additional queries to the database. Otherwise if an error occurs during any query, you can't expect data to be rolled back fully.

## Options

|hook|type|default|description|
|---|---|---|---|
|autoHook|Boolean|true|The plugin takes over everything for you and hooks into the Bookshelf workflow.
|allowedOptions|Array|-|An array of allowed model options the plugin passes on when executing Bookshelf queries.
|unsetRelations|Boolean|true|The plugin will unset the relations after they are detected (e.g. `model.unset('tags')`). If you are disabling "autoHook", you manually need to unset the relations.
|extendChanged|String|-|Define a variable name and Bookshelf-relations will store the information which relations were changed.|
|attachPreviousRelations|Boolean|false|An option to attach previous relations. Bookshelf-relations attaches this information as `_previousRelations` on the target parent model.|
|hooks|Object|-|<ul><li>**belongsToMany**: Hook into the process of updating belongsToMany relationships. </ul> <br><br> **Example**: ```hooks: {belongsToMany: {after: Function, beforeRelationCreation: Function}}```

Take a look [at the plugin configuration in Ghost](https://github.com/TryGhost/Ghost/blob/2.21.0/core/server/models/base/index.js#L52).

## Automatic

The plugin will automatically deal with relationships upserts and cascading deletions through hasMany relationships.
It's required to register your relationships in Bookshelf before you can use bookshelf-relations, see [this example](https://github.com/TryGhost/Ghost/blob/2.21.0/core/server/models/post.js#L502).

1. Register the plugin.

```js
    bookshelf.plugin('bookshelf-relations', {options});
```

2. Define your relationships on each model.

```js
    bookshelf.Model.extend({
        relationships: ['tags', 'news']
    }, {...});
```

To opt-out of automatic child record deletion for `hasMany` relationships it's possible to define per-relationship config:

```js
    bookshelf.Model.extend({
        relationships: ['tags', 'news', 'events'],
        relationshipConfig: {
            events: {
                destroyRelated: false
            }
        }
    });
```

## Manual

You manually need to call the plugin to update relationships.
It's required to register your relationships in Bookshelf before you can use bookshelf-relations, see [this example](https://github.com/TryGhost/Ghost/blob/2.21.0/core/server/models/post.js#L502).

1. Register the plugin.

```js
    bookshelf.plugin('bookshelf-relations', {options});
```

2. Manually call bookshelf-relations.

```js
    bookshelf.manager.updateRelations({
        model: model,
        relations: {tags: [...]},
        pluginOptions: {options}
    })
```

## Notations

```js
// will detach & remove all existing relations
model.set('tags', []);

// will check if "test" exists and if not, it will insert the target tag
// will remove all previous relations if exist
model.set('tags', [{slug: 'test'}]);
```

# Test

- `yarn test` to run tests & eslint
- `yarn lint` to run eslint only
- `NODE_ENV=testing-mysql yarn test` to run tests with mysql db
- `yarn perf` to run a performance test
- `yarn coverage` to run test coverage

# Publish

- `yarn ship`

# Copyright & License

Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
