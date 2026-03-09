const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");

// 1. ADD TASK
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            await existingUser.save();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// 2. UPDATE TASK
// router.put("/updateTask/:id", async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         // Find the task by ID and update the title and body
//         const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        
//         list.save().then(() => res.status(200).json({ message: "Task Updated" }));
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: "Internal Server Error" });
//     }
// });

// 2. UPDATE TASK
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;

        const updatedList = await List.findByIdAndUpdate(
            req.params.id, 
            { title, body }, 
            { new: true } 
        );
        
        if (updatedList) {
            res.status(200).json({ message: "Task Updated", updatedList });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// 3. DELETE TASK
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { list: req.params.id } }
        );

        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => 
                res.status(200).json({ message: "Task Deleted" })
            );
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// 4. GET ALL TASKS (Sorted by most recent)
router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (list.length !== 0) {
            res.status(200).json({ list: list });
        } else {
            res.status(200).json({ message: "No Task Yet" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

module.exports = router;