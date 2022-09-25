const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

/*get all members*/
router.get("/", (req, res) => {
  res.json(members);
});

/*get single member*/
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(404)
      .json({ msg: `Noe member with id of ${req.params.id} was found` });
  }
});

/*Create Members*/
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    status: "Active",
  };

  if (!newMember.name || !newMember.age) {
    res.status(400).json({ msg: "Please include the name and age" });
  }

  members.push(newMember);
  res.json(members);
});

/*edit*/
router.put("/:id", (req, res) => {
  const found = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? req.body.name : member.name;
        member.age = updMember.age ? req.body.age : member.age;

        res.json({
          msg: `Member with id ${member.id} was successfully updated`,
          member,
        });
      }
    });
  }
  res.status(400).json({ msg: "Not found!" });
});

/*Delete*/
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(404)
      .json({ msg: `Noe member with id of ${req.params.id} was found` });
  }
});

module.exports = router;
