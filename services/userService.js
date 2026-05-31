import { userRepository } from "../repositories/userRepository.js";

class UserService {

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      throw Error("User not found")
    }
    return item;
  }

  getAll() {
    return userRepository.getAll();
  }

  create(userData) {
    const email = userData.email.toLowerCase();

    const userByEmail = userRepository.getOne({ email });

    if (userByEmail) {
      throw Error("User with this email already exists");
    }

    const userByPhone = userRepository.getOne({
      phone: userData.phone
    });

    if (userByPhone) {
      throw Error("User with this phone already exists");
    }

    return userRepository.create({
      ...userData,
      email
    });
  }

  update(id, userData) {
    const user = userRepository.getOne({ id });

    if (!user) {
      throw Error("User not found");
    }

    if (userData.email) {
      const email = userData.email.toLowerCase();

      const existingUser = userRepository.getOne({ email });

      if (existingUser && existingUser.id !== id) {
        throw Error("User with this email already exists");
      }

      userData.email = email;
    }

    if (userData.phone) {
      const existingUser = userRepository.getOne({
        phone: userData.phone
      });

      if (existingUser && existingUser.id !== id) {
        throw Error("User with this phone already exists");
      }
    }

    return userRepository.update(id, userData);
  }

  delete(id) {
    const userExisting = userRepository.getOne({ id });
    if (!userExisting) {
      throw Error("User not found");
    }
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
