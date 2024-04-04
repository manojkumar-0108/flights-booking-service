const { Logger } = require('../../config');
const { sequelize } = require('../../models');
const pluralize = require('pluralize');

/**
 * Sequelize model names are singular, 
 * but while migrating it puluralize model names, so tables in our database are in plural form
 * To retrevie model names in plural form I am using pluralize npm package
 */
const modelNames = Object.keys(sequelize.models).map(modelName => pluralize(modelName));


const resetIdentity = async () => {

    modelNames.forEach(async (modelName) => {
        let query = `
                DECLARE @LastUsedID INT;
                SELECT @LastUsedID = COALESCE(MAX(id), 0) FROM ${modelName};
                DBCC CHECKIDENT (${modelName}, RESEED, @LastUsedID);
            `;

        try {
            const response = await sequelize.query(query);

        } catch (error) {
            console.error('Error resetting identity seed: check logs to see error');
            Logger.error({ message: "Error resetting identity seed:", error: error });
            return;
        }
    });

};

module.exports = resetIdentity;