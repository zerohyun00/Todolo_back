import bcrypt from "bcrypt";
import { IUserInputDTO } from "../../interface/IUser";
import { User } from "./user.schema";
import { generateRefreshToken, generateToken } from "../../utils/jwt";
import { Team } from "../team/team.schema";
import { Image } from "../image/image.schema";

const SALT_ROUNDS = 10;

const UserService = {
  register: async (data: IUserInputDTO, team: string, filePath?: string) => {
    const existingUser = await User.findOne({ data: data.email });
    if (existingUser) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(data.password!, SALT_ROUNDS);

    const user = new User({
      ...data,
      password: hashedPassword,
      avatar: "N/A",
    });
    const savedUser = await user.save();

    if (filePath) {
      const image = new Image({
        user_id: savedUser._id,
        image_url: filePath,
      });
      await image.save();
      savedUser.avatar = image.image_url;
    }

    await savedUser.save();

    const newTeamEntry = new Team({
      user_id: savedUser._id,
      team: team,
    });
    await newTeamEntry.save();

    return savedUser;
  },

  logIn: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("아이디 혹은 패스워드를 확인해주세요");

    const checkPassword = await bcrypt.compare(password, user.password!);
    if (!checkPassword) throw new Error("아이디 혹은 패스워드를 확인해주세요");

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    const teamData = await Team.findOne({ user_id: user._id });

    return {
      user,
      email,
      accessToken,
      refreshToken,
      // team: teamData ? teamData.team : null,
      team: teamData,
    };
  },

  logout: async (refreshToken: string) => {
    await User.updateOne({ refreshToken }, { $set: { refreshToken: null } });
  },

  updateUserInformation: async (userId: string, updateData: IUserInputDTO) => {
    const updateFields: { [key: string]: any } = {};

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(
        updateData.password,
        SALT_ROUNDS
      );
      updateFields.password = hashedPassword;
    }

    if (updateData.avatar) {
      updateFields.avatar = updateData.avatar;
    }

    await User.updateOne({ _id: userId }, { $set: updateFields });

    if (updateData.team) {
      await Team.updateOne(
        { user_id: userId },
        { $set: { team: updateData.team } }
      );
    }
  },

  findUser: async (searchInfo: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      {
        $match: {
          name: { $regex: searchInfo, $options: "i" },
        },
      },

      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "user_id",
          as: "teamInfo",
        },
      },

      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "user_id",
          as: "userTasks",
        },
      },

      {
        $lookup: {
          from: "task_statuses",
          localField: "_id",
          foreignField: "crew_member",
          as: "includedTasksStatuses",
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "includedTasksStatuses.taskId",
          foreignField: "_id",
          as: "includedTasks",
        },
      },

      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "user_id",
          as: "userProjects",
        },
      },

      {
        $lookup: {
          from: "project_members",
          localField: "_id",
          foreignField: "member_id",
          as: "includedProjects",
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          team: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$teamInfo",
                  as: "team",
                  in: "$$team.team",
                },
              },
              0,
            ],
          },
          userTasks: {
            _id: 1,
            title: 1,
            content: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          includedTasks: {
            _id: 1,
            title: 1,
            content: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          userProjects: {
            _id: 1,
            projectName: 1,
            description: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          includedProjects: {
            _id: 1,
            projectName: 1,
            description: 1,
            created_AT: 1,
            updated_AT: 1,
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!users || users.length === 0) {
      throw new Error("해당 유저를 찾을 수 없습니다.");
    }

    const totalUsers = await User.countDocuments({
      name: { $regex: searchInfo, $options: "i" },
    });
    // const totalUsers = await User.countDocuments();

    return {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  },

  getAllUsers: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      {
        $lookup: {
          from: "teams",
          localField: "_id",
          foreignField: "user_id",
          as: "teamInfo",
        },
      },

      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "user_id",
          as: "userTasks",
        },
      },

      {
        $lookup: {
          from: "task_statuses",
          localField: "_id",
          foreignField: "crew_member",
          as: "includedTasksStatuses",
        },
      },

      {
        $lookup: {
          from: "tasks",
          localField: "includedTasksStatuses.taskId",
          foreignField: "_id",
          as: "includedTasks",
        },
      },

      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "user_id",
          as: "userProjects",
        },
      },

      {
        $lookup: {
          from: "project_members",
          localField: "_id",
          foreignField: "member_id",
          as: "includedProjects",
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          teamInfo: 1,
          userTasks: {
            _id: 1,
            title: 1,
            content: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          includedTasks: {
            _id: 1,
            title: 1,
            content: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          userProjects: {
            _id: 1,
            projectName: 1,
            description: 1,
            created_AT: 1,
            updated_AT: 1,
          },
          includedProjects: {
            _id: 1,
            projectName: 1,
            description: 1,
            created_AT: 1,
            updated_AT: 1,
          },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!users || users.length === 0) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    const totalUsers = await User.countDocuments();

    return {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  },
};
export default UserService;
