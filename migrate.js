const knex = require('./src/mysql_models/knexConfig');
const Schema = require('./src/mysql_models/schema');
const sequence = require('when/sequence');
const _ = require('lodash');
function createTable(tableName) {
    return knex.schema.createTable(tableName, function (table) {
        let column;
        const columnKeys = _.keys(Schema[tableName]);
        _.each(columnKeys, function (key) {
            if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
            }
            else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
            }
            else {
                column = table[Schema[tableName][key].type](key);
            }
            if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
                column.nullable();
            }
            else {
                column.notNullable();
            }
            if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
                column.primary();
            }
            if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
                column.unique();
            }
            if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
                column.unsigned();
            }
            if (Schema[tableName][key].hasOwnProperty('references')) {
                column.references(Schema[tableName][key].references);
            }
            if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(Schema[tableName][key].defaultTo);
            }
        });
    });
}
function deleteTable(tableName) {
    if(knex.schema.hasTable(tableName)) {
        console.log("table "+tableName)
        return knex.schema.dropTable(tableName);
    } else
        return null;
}
function deleteTables() {
    let tables;
    const tableNames = _.keys(Schema);
    tables = _.map(tableNames, function (tableName) {
        return function () {
            return deleteTable(tableName);
        };
    });
    return sequence(tables)
}
function createTables () {
    let tables;
    const tableNames = _.keys(Schema);
    tables = _.map(tableNames, function (tableName) {
        return function () {
            return createTable(tableName);
        };
    });
    return sequence(tables);
}

function clean() {

}

// deleteTables()
//     .then(() =>console.log('Tables Deleted'))
//     .catch(e => {throw e});

createTables()
    .then(function() {
        console.log('Tables created!!');
        process.exit(0);
    })
    .catch(function (error) {
        throw error;
    });