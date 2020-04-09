const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
//get a list of topics
router.get('/topic', async (req, res) => {
    try {
        const topics = await Topic.find()
        res.json(topics);
    } catch (err) {
        res.json({ message: err });
    }
});

//get a single topic
router.get('/topic/:topicid', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topicid);
        res.json(topic);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete a topic
router.delete('/deleteTopic/:topicid', async (req, res) => {
    try {
        const topic = await Topic.findByIdAndRemove(req.params.topicid);
        res.json(topic);
    } catch (err) {
        res.json({ message: err });
    }
});

//update a topic
router.post('/updateTopic/:topicid', async (req, res) => {
    try {
        const topic = await Topic.findByIdAndUpdate(req.params.topicid,
            { $set: { name: req.body.name, description: req.body.description } }, { new: true });
        res.json(topic);
    } catch (err) {
        res.json({ message: err });
    }
});

//update status of step
router.post("/updatestatus/:topicid/:stepid", async (req, res) => {
    try {
        const step = await Topic.updateOne({ _id: req.params.topicid, "steps._id": req.params.stepid }, {
            "$set": {
                "steps.$.status": req.body.status,
            }
        })
        res.send("success!!")
    } catch (err) {
        console.log(err)
    }

})

//add a step to a topic
router.post('/addStep/:topicid', async (req, res) => {
    const topic = await Topic.findById(req.params.topicid);
    let tname = topic.name;
    let sname = req.body.title;
    topic.steps.push({
        title: req.body.title,
    })
    try {
        const saveTopic = await topic.save();
        res.json(saveTopic);
    } catch (err) {
        res.json({ message: err });
    }
});

//adds a topic
router.post('/addTopic', (req, res) => {
    let topicObj = {
        "name": req.body.name,
        "description": req.body.description
    }
    const newTopic = new Topic(topicObj);
    let tname = req.body.name;
    newTopic.save((err, topic) => {
        if (err)
            res.status(400).send("Error while adding user");
        else
            res.status(200).json(topic);
    })
});

router.post("/file/:topicid/:stepid/", async (req, res) => {
    const step = await Topic.updateOne({ _id: req.params.topicid, "steps._id": req.params.stepid }, {
        "$set": {
            "steps.$.url": req.body.fileUrl,
        }
    })
});

//delete a step
router.delete('/deleteStep/:stepid', async (req, res) => {
    id= req.params.stepid
    await Topic.findOne({'steps._id': id}, async (err,result) => {
        await result.steps.id(id).remove();
        await result.save()
        res.send('deleted')
    })
})

module.exports = router;