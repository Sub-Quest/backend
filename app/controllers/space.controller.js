const db = require("../models")
const Space = db.space;

exports.getSpaceById = async(req, res) => {
    const {id} = req.query.id;
    const space = await Space.getSpaceById(id);
    if (!space) {
        res.status(404).send({ message: "Space not found" });
        return;
    }
    res.status(200).send(
        {
            space: space,
        }
    );
    return
}

exports.getAllSpace = async(req, res) => {
    const spaces = await Space.getSpaces();
    res.status(200).send(
        {
            spaces: spaces
        }
    );
    return
}

exports.searchSpace = async(req, res) => {
    const {text} = req.query.q;
    let spaces;
    if (text == "") {
         spaces = await Space.getSpaces();
    } else {
         spaces = await Space.findSpaceByName(text);
    }

    res.status(200).send(
        {
            spaces: spaces
        }
    );
    return
}

exports.createSpace = async(req, res) => {
    const {spaces} = req.body;
    await Space.createSpaces(spaces);
    res.status(200).send(
        {
            message: "create space successfully"
        }
    )
    return
}