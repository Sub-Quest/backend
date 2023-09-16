const db = require("../models")
const Space = db.space;

exports.getSpaceById = async(req, resp) => {
    const {id} = req.body;
    const space = await Space.getSpaceById(id);
    if (!space) {
        resp.status(404).send({ message: "Space not found" });
        return;
    }
    resp.status(200).send(
        {
            space: space,
        }
    );
    return
}

exports.getAllSpace = async(req, resp) => {
    const spaces = await Space.getSpaces();
    resp.status(200).send(
        {
            spaces: spaces
        }
    );
    return
}

exports.searchSpace = async(req, resp) => {
    const {text} = req.body;
    let spaces;
    if (text == "") {
         spaces = await Space.getSpaces();
    } else {
         spaces = await Space.findSpaceByName(text);
    }

    resp.status(200).send(
        {
            spaces: spaces
        }
    );
    return
}

exports.createSpace = async(req, resp) => {
    const {spaces} = req.body;
    await Space.createSpaces(spaces);
    resp.status(200).send(
        {
            message: "create space successfully"
        }
    )
    return
}