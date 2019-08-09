(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "idRefCitation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "program",
            alias: "program",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "licensetitle",
            alias: "license title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "maintainer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "distributorContact",
            alias: "distributor contact",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "publicAccessLevel",
            alias: "public access level",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "relationshipsAsObject",
            alias: "relationships as object",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "beginningTimePeriodOfContent",
            alias: "beginning time period of content",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "private",
            alias: "private",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "maintaineremail",
            alias: "maintainer email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "numtags",
            alias: "number of tags",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "frequency",
            alias: "frequency",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "contactname",
            alias: "contact name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "metadatacreated",
            alias: "metadata created date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "pointOfContactAddress",
            alias: "point of contact address",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "databaseinfo",
            alias: "database info",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://data.cnra.ca.gov/api/3/action/current_package_list_with_resources?limit=100", function(resp) {
            var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "idRefCitation": resp[i].idRefCitation,
                    "program": resp[i].program,
                    "licensetitle": resp[i].license_title,
                    "maintainer": resp[i].maintainer,
                    "distributorContact": resp[i].distributorContact,
                    "publicAccessLevel": resp[i].public_access_level,
                    "relationshipsAsObject": resp[i].relationships_as_object,
                    "beginningTimePeriodOfContent": resp[i].beginningTimePeriodOfContent,
                    "private": resp[i].private,
                    "maintaineremail": resp[i].maintainer_email,
                    "numtags": resp[i].num_tags,
                    "frequency": resp[i].frequency,
                    "contactname": resp[i].contact_name,
                    "id": resp[i].id,
                    "metadatacreated": resp[i].metadata_created,
                    "pointOfContactAddress": resp[i].pointOfContactAddress
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "CKAN API DATA"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();