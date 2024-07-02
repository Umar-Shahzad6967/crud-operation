import User from "../Model/UserModel.js"

export const create = async (req, res) => {
    try {
        // const userexist = await User.findOne({ email: req.body.email })
        // if (userexist) {
        //     return res.status(404).json({ msg: "email allready registered" })
        // }
        const userdata = new User(req.body)
        if (!userdata) {
            return res.status(404).json({ msg: "user data not found" })
        }
        const savedata = await userdata.save()
        res.status(200).json({ savedata, msg: 'user create successfully' })

    } catch (error) {
        return res.status(500).json(error)

    }
}

export const getAll = async (req, res) => {
    try {
        const userdata = await User.find(req.body)
        if (!userdata) {
            return res.status(404).json({ msg: "user data not found" })
        }
        res.status(200).json(userdata)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getone = async (req, res) => {
    try {
        const id = req.params.id;

        const userexist = await User.findById(id);
        if (!userexist) {
            return res.status(404).json({ msg: "user data not found" })
        }
        res.status(200).json(userexist)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await User.findById(id);
        if (!userexist) {
            return res.status(404).json({ msg: "user data not found" })
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedData)


    } catch (error) {
        return res.status(500).json({ error: error })
    }
}
export const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const userexist = await User.findById(id);
        if (!userexist) {
            return res.status(404).json({ msg: "user data not found" })
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({ msg: "user deleted successfully" })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}
