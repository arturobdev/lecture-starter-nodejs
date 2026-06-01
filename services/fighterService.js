import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      throw Error("Fighter not found")
    }
    return item;
  }

  getAll() {
    return fighterRepository.getAll();
  }

  create(fighterData) {
    const name = fighterData.name.toLowerCase();

    const fighterByName = fighterRepository.getOne({ name });

    if (fighterByName) {
      throw Error("Fighter with this name already exists");
    }

    return fighterRepository.create({
      health: 85,
      ...fighterData,
      name
    });
  }

  update(id, fighterData) {
    const fighter = fighterRepository.getOne({ id });

    if (!fighter) {
      throw Error("Fighter not found");
    }

    if (fighterData.name) {
      const name = fighterData.name.toLowerCase();

      const existingFighter = fighterRepository.getOne({ name });

      if (existingFighter && existingFighter.id !== id) {
        throw Error("Fighter with this name already exists");
      }

      fighterData.name = name;
    }

    return fighterRepository.update(id, fighterData);
  }

  delete(id) {
    const fighterExisting = fighterRepository.getOne({ id });
    if (!fighterExisting) {
      throw Error("Fighter not found");
    }
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
