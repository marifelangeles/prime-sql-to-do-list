const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();


// get task description and complete status
router.get('/', (req, res) => {
    console.log('get from /task');
    // get tasks in order by most recent task
    pool.query(`SELECT * FROM "task" ORDER BY "id" DESC`)
        .then( (result) => {
            console.log('get from SELECT query:', result.rows);
            res.send(result.rows);
        }).catch( (error) => {
            console.log('error with SELECT query', error);
            res.sendStatus(500);
        });
    
});


// post new task description with false complete status
router.post('/', (req, res) => {
    console.log('sending', req.body);
    pool.query(`INSERT INTO "task" ("taskDescription", "completeStatus")
                VALUES ($1, $2);`, [req.body.taskDescription, req.body.completeStatus])
        .then( () => {
            res.sendStatus(200);
        }).catch( (error) => {
            console.log('POST request failed', error);
        });
});


// delete task by task id
router.delete('/:id', (req, res) => {
    console.log('deleting task id:', req.params.id);
    pool.query(`DELETE FROM "task" WHERE "id" = $1`, [req.params.id])
        .then( () => {
            res.sendStatus(200);
        }).catch( (error) => {
            console.log('DELETE request failed', error);
        });
});


// update status of task completion
router.put('/:id', (req, res) => {
    console.log('updating status');
    // identify task id on table and status
    let id = req.params.id;
    let status = req.body.completeStatus;
    // change complete status as marked by checkbox
    pool.query(`UPDATE "task" SET "completeStatus" = $1 WHERE "id" = $2;`, [status, id])
        .then( (result) => {
            res.sendStatus(200);
        }).catch( (error) => {
            console.log('UPDATE request failed', error);
            res.sendStatus(500);
        });
});


module.exports = router;