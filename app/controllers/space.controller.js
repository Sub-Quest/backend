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
    const total = await Space.countDocuments();
    res.status(200).send(
        {
            total: total,
            spaces: spaces
        }
    );
    return
}

exports.searchSpace = async(req, res) => {
    const {text} = req.query.q;
    let spaces;
    let total = 0;
    if (text == "") {
        total = await Space.countDocuments();
        spaces = await Space.getSpaces();
    } else {
        total = await Space.countDocuments({ $text: { $search: input } });
         spaces = await Space.findSpaceByName(text);
    }

    res.status(200).send(
        {
            total: total,
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

exports.getSpaceLimit = async(req, res) => {
    var page = parseInt(req.query.page) || 0; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {};
    Space.find(query)
      .sort({ update_at: -1 })
      .skip(page * limit) //Notice here
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        Space.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            spaces: doc
          });
        });
      });
}