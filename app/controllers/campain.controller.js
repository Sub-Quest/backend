const db = require("../models")
const Campain = db.campain;
const Task = require("../utils/task")


exports.getCampainById = async(req, res) => {
    const {id} = req.query.id
    const campain = await Campain.getCampainById(id);
    if (!campain) {
        res.status(404).send({message: "Campain not found"})
    }
    res.status(200).send(
        {
            campain: campain,
        }
    );
    return  
}

exports.getCampainsBySpaceId = async(req, res) => {
    const {spaceId} = req.query.spaceId;
    const campains = await Campain.getCampainsBySpaceId(spaceId)
    const total = await Campain.countDocuments({ spaceId: spaceId })
    res.status(200).send(
        {
            total: total,
            campains: campains
        }
    )
    return
}

exports.searchCampain = async(req, res) => {
    const {text} = req.query.q;
    let campains;
    if (text == "") {
        campains = await Campain.getCampains();
    } else {
        campains = await Campain.findCampainsByName(text);
    }

    res.status(200).send({
         campains: campains,
    })
    return
}

exports.createCampain = async(req, res) => {
    const {campain} = req.body;
    await Campain.create(campain)
    res.status(200).send(
        {
            message: "create space successfully"
        }
    )
}

exports.getTaskArray = async(req, res) => {
    res.status(200).send(
        {
            tasks: Task
        }
    )
}