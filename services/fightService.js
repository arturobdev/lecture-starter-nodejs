import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightService {
  search(search) {
    const item = fightRepository.getOne(search);
    if (!item) {
      throw Error("Fight not found")
    }
    return item;
  };

  getAll() {
    return fightRepository.getAll();
  };

  delete(id) {
    const fightExisting = fightRepository.getOne({ id });
    if (!fightExisting) {
      throw Error("Fight not found");
    }
    return fightRepository.delete(id);
  };

  fight(fighter1, fighter2) {

    let health1 = fighter1.health;
    let health2 = fighter2.health;

    const log = [];

    while (health1 > 0 && health2 > 0) {
      const shot1 = this.getDamage(
        fighter1,
        fighter2
      );

      const shot2 = this.getDamage(
        fighter2,
        fighter1
      );

      health2 -= shot1;
      health1 -= shot2;

      const round2 = (value) => Number(value.toFixed(2));

      log.push({
        fighter1Shot: round2(shot1),
        fighter2Shot: round2(shot2),
        fighter1Health: round2(Math.max(0, health1)),
        fighter2Health: round2(Math.max(0, health2))
      });
    }

    const lastFight = log?.at(-1);

    const winner = lastFight.fighter1Health <= 0 ? fighter2.name : fighter1.name;

    const fightData = {
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      fighter1Name: fighter1.name,
      fighter2Name: fighter2.name,
      winner,
      log
    }
    const fight = fightRepository.create(fightData)
    return fight;
  };

  getHitPower(fighter) {
    const criticalChance = Math.random() + 1;
    return fighter.power * criticalChance;
  };

  getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
  };

  getDamage(attacker, defender) {
    const strike = this.getHitPower(attacker);
    const block = this.getBlockPower(defender);

    return Math.max(0, strike - block);
  };
}

const fightService = new FightService();

export { fightService };
