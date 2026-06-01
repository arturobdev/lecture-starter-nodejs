const powerValidator = (power) => {
    return typeof power === "number" && (1 <= power && power <= 100);
}

const defenseValidator = (defense) => {
    return typeof defense === "number" && (1 <= defense && defense <= 10);
}

const healthValidator = (health) => {
    return typeof health === "number" && (80 <= health && health <= 120);
}

export { powerValidator, defenseValidator, healthValidator }