import bcrypt from 'bcrypt';
import { IUserInputDTO } from '../../interface/IUser';
import { User } from './user.schema';
import { generateRefreshToken, generateToken } from '../../utils/jwt';
import { Team } from '../team/team.schema';
import { Image } from '../image/image.schema';

const SALT_ROUNDS = 10;

const UserService = {
  register: async (data: IUserInputDTO, team: string, filePath?: string) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(data.password!, SALT_ROUNDS);

    const user = new User({
      ...data,
      password: hashedPassword,
      avatar: 'N/A',
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
    if (!user) throw new Error('이메일 혹은 패스워드를 확인해주세요');

    const checkPassword = await bcrypt.compare(password, user.password!);
    if (!checkPassword) throw new Error('이메일 혹은 패스워드를 확인해주세요');

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();
    return { user, accessToken, refreshToken };
  },

  logout: async (refreshToken: string) => {
    await User.updateOne({ refreshToken }, { $set: { refreshToken: null } });
  },

  updateUserInformation: async (userId: string, updateData: IUserInputDTO) => {
    const updateFields: { [key: string]: any } = {};

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, SALT_ROUNDS);
      updateFields.password = hashedPassword;
    }

    if (updateData.avatar) {
      updateFields.avatar = updateData.avatar;
    }

    await User.updateOne({ _id: userId }, { $set: updateFields });

    if (updateData.team) {
      await Team.updateOne({ user_id: userId }, { $set: { team: updateData.team } });
    }
  },

  findUser: async (searchTerm: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      {
        $lookup: {
          from: 'teams',
          localField: '_id',
          foreignField: 'user_id',
          as: 'teamInfo',
        },
      },
      {
        $match: {
          $or: [
            { email: { $regex: searchTerm, $options: 'i' } },
            { name: { $regex: searchTerm, $options: 'i' } },
            { 'teamInfo.team': { $regex: searchTerm, $options: 'i' } },
          ],
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!users || users.length === 0) {
      throw new Error('해당 유저를 찾을 수 없습니다.');
    }

    const totalUsers = await User.countDocuments();

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
          from: 'teams',
          localField: '_id',
          foreignField: 'user_id',
          as: 'teamInfo',
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!users || users.length === 0) {
      throw new Error('유저를 찾을 수 없습니다.');
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
