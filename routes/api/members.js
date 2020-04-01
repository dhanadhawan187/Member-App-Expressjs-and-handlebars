const express = require("express");
const router = express.Router();
//for generate  unique id
const uuid = require("uuid");
const members = require("../../members");
router.get("/", (req, res) => {
  res.json(members);
  //for direct to same page
  /*const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(members => members.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Memeber with this id ${req.params.id}` });
  }*/
});

//create new member
router.post("/", (req, res) => {
  const newMemeber = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  };

  if (!newMemeber.name || !newMemeber.email) {
    res.status(400).json({ msg: `Enter name and age` });
  } else {
  }
  members.push(newMemeber);
  //res.send(members);
  res.redirect("/");
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(members => {
      if (members.id === parseInt(req.params.id)) {
        members.name = updateMember.name ? updateMember.name : members.name;
        members.age = updateMember.age ? updateMember.age : members.age;
        members.email = updateMember.email ? updateMember.email : members.email;
        res.json({ msg: "member Updated", members });
      }
    });
  } else {
    res.status(400).json({ msg: `No Memeber with this id ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(members => members.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No Memeber with this id ${req.params.id}` });
  }
});

module.exports = router;
