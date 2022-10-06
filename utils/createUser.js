const User = require("../models/user");

const createInitialUsers = async () => {
    const total = await User.count({});
    if (total === 0) {
        const user = new User({
            username: "Renato",
            password: "1234",
            roles: ["restrito", "admin"],
        });
        await user.save();
    }

    const user2 = new User({
        username: "restrito",
        password: "123456",
        roles: ["restrito"],
    });
    await user2.save();
};

module.exports = createInitialUsers;
