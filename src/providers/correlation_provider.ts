import {connection} from '@/mysql'
export async function get_objects(callback:any)
{
    const correlations :any = await new Promise((resolve, reject) => {
        connection.query(`SELECT object_correlation.*,
        correlation.name AS correlation
        FROM object_correlation
        INNER JOIN correlation ON correlation.id = object_correlation.id_correlation`, (err:any, rows:any) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
    const objects:any = await new Promise((resolve, reject) => {
    connection.query(`WITH generalization AS
    (
        WITH RECURSIVE gen AS 
        (
          SELECT 	  object_correlation.id_object_from, 
                      object_correlation.id_object_to ,
                      1 AS depth
          FROM 		  object_correlation
          where id_correlation = 2
          UNION ALL
          SELECT 		object_correlation.id_object_from, 
                       gen.id_object_to,
                       gen.depth + 1
          FROM 		   gen
          INNER JOIN 	object_correlation ON gen.id_object_from = object_correlation.id_object_to 
          where id_correlation = 2
        )
        SELECT      * 
        FROM        gen
        ORDER BY    id_object_to
    ), 
    closest_parent AS(
        SELECT id_object_to, MIN(depth) min_depth FROM generalization
        GROUP BY id_object_to
    ),
    object_alias AS (
        SELECT generalization.id_object_to id_object,
        object_name.name alias 
        FROM generalization
        INNER JOIN closest_parent ON closest_parent.id_object_to = generalization.id_object_to AND closest_parent.min_depth = generalization.depth
        INNER JOIN object_name ON object_name.id_object = generalization.id_object_from
    ),
    color_alias AS (
        SELECT generalization.id_object_to id_object,
        object_color.value 
        FROM generalization
        INNER JOIN closest_parent ON closest_parent.id_object_to = generalization.id_object_to AND closest_parent.min_depth = generalization.depth
        INNER JOIN object_color ON object_color.id_object = generalization.id_object_from
    )
    SELECT object.id,
    object_name.name is NOT null named,
    IFNULL(IFNULL(object_color.value, (SELECT value FROM color_alias WHERE id_object = object.id)),'white') color,
    IFNULL(CONCAT(object_name.name,' ',object.id), IFNULL(CONCAT((SELECT alias FROM object_alias WHERE id_object = object.id),' ',object.id),object.id)) AS name
    FROM object
    LEFT JOIN object_name ON object_name.id_object = object.id
    LEFT JOIN object_color ON object_color.id_object = object.id`, 
    (err:any, rows:object) => {
        if (err) {
            reject(err)
        } else {
            resolve(rows)
        }
    }
    )
    })
    objects.forEach((object:any) => {
        object.correlations = []
    })
    correlations.forEach(item => {
        item.object = objects.find(o => o.id === item.id_object_to)
        objects.find(o => o.id === item.id_object_from).correlations.push(item)
    });
    objects.sort((a:any, b:any) => {
        if (a.named && !b.named) {
            return -1
        }
        if (!a.named && b.named) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    callback(objects)
}