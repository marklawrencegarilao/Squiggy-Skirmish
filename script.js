let coins = 0;
let upgradeLevel = 1;
let tapValue = 10;
let upgradeCost = 80;
let baseProfitPerHour = 10000; // Initial base profit per hour in coins
let energy = 600; // Initial energy
let energyRegenRate = 1; // Energy regeneration rate per second
let profitInterval; // To store the interval ID for profit generation

const upgradeLevels = {
    squiggy: { level: 0, maxLevel: 50 },
    cooper: { level: 0, maxLevel: 12 },
    gizmo: { level: 0, maxLevel: 10 },
    orio: { level: 0, maxLevel: 15 },
    squiggynose: { level: 0, maxLevel: 25 },
    cooperbite: { level: 0, maxLevel: 15 },
    gizmogun: { level: 0, maxLevel: 12 },
    orioass: { level: 0, maxLevel: 20 },
    max: { level: 0, maxLevel: 30 },
    zestymax: { level: 0, maxLevel: 30},
    hana: { level: 0, maxLevel: 25 },
    hanabishi: { level: 0, maxLevel: 25 },
    mark: { level: 0, maxLevel: 30 },
    noel: { level: 0, maxLevel: 25 },
    sandrei: { level: 0, maxLevel: 28 },
    elijah: { level: 0, maxLevel: 25 },
    alphalegion: { level: 0, maxLevel: 20 },
    beans: { level: 0, maxLevel: 30 },
    beans2: { level: 0, maxLevel: 30 },
    beans3: { level: 0, maxLevel: 30 },
    gilbert: { level: 0, maxLevel: 100 },
    daisy: { level: 0, maxLevel: 100 },
    gilbertside: { level: 0, maxLevel: 80 },
    daisyside: { level: 0, maxLevel: 80 },
    boyet: { level: 0, maxLevel: 50 },
    pinkfloyd: { level: 0, maxLevel: 50 }
};

const upgrades = {
    squiggy: {
        baseCost: 800,
        baseProfitIncrease: 1000,
        costIncreaseRate: 1.2,
        profitIncreaseRate: 1.03
    },
    cooper: {
        baseCost: 4000,
        baseProfitIncrease: 2500,
        costIncreaseRate: 1.85,
        profitIncreaseRate: 1.35
    },
    gizmo: {
        baseCost: 3800,
        baseProfitIncrease: 2000,
        costIncreaseRate: 1.7,
        profitIncreaseRate: 1.25
    },
    orio: {
        baseCost: 6000,
        baseProfitIncrease: 4000,
        costIncreaseRate: 1.6,
        profitIncreaseRate: 1.15
    },
    squiggynose: {
        baseCost: 6200,
        baseProfitIncrease: 4500,
        costIncreaseRate: 1.3,
        profitIncreaseRate: 1.1
    },
    cooperbite: {
        baseCost: 8000,
        baseProfitIncrease: 6700,
        costIncreaseRate: 1.8,
        profitIncreaseRate: 1.21
    },
    gizmogun: {
        baseCost: 6000,
        baseProfitIncrease: 5500,
        costIncreaseRate: 1.65,
        profitIncreaseRate: 1.13
    },
    orioass: {
        baseCost: 7300,
        baseProfitIncrease: 6000,
        costIncreaseRate: 1.44,
        profitIncreaseRate: 1.09
    },
    max: {
        baseCost: 3500,
        baseProfitIncrease: 1750,
        costIncreaseRate: 1.3,
        profitIncreaseRate: 1.08
    },
    zestymax: {
        baseCost: 5000,
        baseProfitIncrease: 2350,
        costIncreaseRate: 1.31,
        profitIncreaseRate: 1.082
    },
    hana: {
        baseCost: 4200,
        baseProfitIncrease: 2300,
        costIncreaseRate: 1.35,
        profitIncreaseRate: 1.07
    },
    hanabishi: {
        baseCost: 8000,
        baseProfitIncrease: 4600,
        costIncreaseRate: 1.37,
        profitIncreaseRate: 1.075
    },
    mark: {
        baseCost: 6500,
        baseProfitIncrease: 5500,
        costIncreaseRate: 1.34,
        profitIncreaseRate: 1.06
    },
    noel: {
        baseCost: 3800,
        baseProfitIncrease: 2000,
        costIncreaseRate: 1.4,
        profitIncreaseRate: 1.1
    },
    sandrei: {
        baseCost: 3500,
        baseProfitIncrease: 1800,
        costIncreaseRate: 1.38,
        profitIncreaseRate: 1.09
    },
    elijah: {
        baseCost: 3700,
        baseProfitIncrease: 1950,
        costIncreaseRate: 1.41,
        profitIncreaseRate: 1.11
    },
    alphalegion: {
        baseCost: 9000,
        baseProfitIncrease: 5000,
        costIncreaseRate: 1.6,
        profitIncreaseRate: 1.22
    },
    beans: {
        baseCost: 4000,
        baseProfitIncrease: 3500,
        costIncreaseRate: 1.33,
        profitIncreaseRate: 1.04
    },
    beans2: {
        baseCost: 8000,
        baseProfitIncrease: 6900,
        costIncreaseRate: 1.33,
        profitIncreaseRate: 1.05
    },
    beans3: {
        baseCost: 12000,
        baseProfitIncrease: 9000,
        costIncreaseRate: 1.33,
        profitIncreaseRate: 1.06
    },
    gilbert: {
        baseCost: 200,
        baseProfitIncrease: 400,
        costIncreaseRate: 1.11,
        profitIncreaseRate: 1.05
    },
    daisy: {
        baseCost: 150,
        baseProfitIncrease: 320,
        costIncreaseRate: 1.1,
        profitIncreaseRate: 1.04
    },
    gilbertside: {
        baseCost: 600,
        baseProfitIncrease: 550,
        costIncreaseRate: 1.12,
        profitIncreaseRate: 1.04
    },
    daisyside: {
        baseCost: 950,
        baseProfitIncrease: 880,
        costIncreaseRate: 1.13,
        profitIncreaseRate: 1.045
    },
    boyet: {
        baseCost: 1500,
        baseProfitIncrease: 1400,
        costIncreaseRate: 1.2,
        profitIncreaseRate: 1.065
    },
    pinkfloyd: {
        baseCost: 1550,
        baseProfitIncrease: 1300,
        costIncreaseRate: 1.21,
        profitIncreaseRate: 1.075
    }
};


function updateTotalPPH() {
    // Calculate and update the total PPH contributed by each upgrade
    for (let upgrade in upgradeLevels) {
        const upgradeInfo = upgradeLevels[upgrade];
        const totalPPH = getProfitIncrease(upgrade, upgradeInfo.level);
        document.getElementById(`${upgrade}-total-pph`).innerText = totalPPH.toLocaleString();
    }
}

function getProfitIncrease(upgradeName, level) {
    // Handle level 0 case
    if (level === 0) {
        return 0;
    }

    // Initialize total profit increase
    let totalPPH = 0;

    // Retrieve upgrade parameters
    const upgrade = upgrades[upgradeName];
    const { baseProfitIncrease, profitIncreaseRate } = upgrade;

    // Calculate total profit increase up to the specified level
    for (let i = 1; i <= level; i++) {
        totalPPH += i === 1 ? baseProfitIncrease : Math.round(baseProfitIncrease * Math.pow(profitIncreaseRate, i - 1));
    }

    return totalPPH;
}



function upgradePPH(upgradeName, profitIncrease, cost) {
    const upgrade = upgradeLevels[upgradeName];
    const upgradeButton = document.querySelector(`button[onclick="upgradePPH('${upgradeName}', ${profitIncrease}, ${cost})"]`);

    if (coins >= cost && upgrade.level < upgrade.maxLevel) {
        coins -= cost;
        baseProfitPerHour += profitIncrease; // Increase baseProfitPerHour by profitIncrease
        document.getElementById('coins').innerText = Math.round(coins);

        upgrade.level++;
        updateLevelBar(upgradeName);
        updateProfitPerHour(); // Update displayed profit per hour
        updateTotalPPH(); // Update total PPH display for all upgrades
        checkUpgradeUnlock(); // Check unlock condition for specific upgrades

        // Calculate the new cost and profit increase for the next level based on the upgrade's current level
        const newCost = calculateCost(upgradeName, upgrade.level);
        const nextProfitIncrease = calculateProfitIncrease(upgradeName, upgrade.level);
        const newPPH = nextProfitIncrease >= 1000 ? (nextProfitIncrease / 1000).toFixed(1) + 'k' : nextProfitIncrease.toString();

        // Update the displayed cost for the next level
        document.getElementById(`${upgradeName}-cost`).innerText = newCost.toLocaleString();
        document.getElementById(`${upgradeName}-pph`).innerText = newPPH.toLocaleString();

        // Update the onclick attribute of the button for the next level
        upgradeButton.setAttribute('onclick', `upgradePPH('${upgradeName}', ${nextProfitIncrease}, ${newCost})`);

        if (upgrade.level >= upgrade.maxLevel) {
            document.getElementById(`${upgradeName}-cost`).innerText = 'MAX';
            document.getElementById(`${upgradeName}-pph`).innerText = 'MAX';
            upgradeButton.innerText = 'MAX';
            upgradeButton.classList.add('disabled');
            upgradeButton.disabled = true;
        }
    } else if (upgrade.level >= upgrade.maxLevel) {
        showCustomAlert('This upgrade has reached its maximum level!');
    } else {
        showCustomAlert('Not enough coins to upgrade!');
    }
}

function calculateCost(upgradeName, level) {
    const { baseCost, costIncreaseRate } = upgrades[upgradeName];
    return Math.round(baseCost * Math.pow(costIncreaseRate, level));
}

function calculateProfitIncrease(upgradeName, level) {
    const { baseProfitIncrease, profitIncreaseRate } = upgrades[upgradeName];
    return Math.round(baseProfitIncrease * Math.pow(profitIncreaseRate, level));
}

function updateUnlockStatus(unlockMessageId, levelUpInfoId, conditions, showLevelUpInfo) {
    const unlockMessage = document.getElementById(unlockMessageId);
    const levelUpInfo = document.getElementById(levelUpInfoId);

    // Check if all conditions are met
    const allConditionsMet = conditions.every(({ level, unlockLevel }) => level >= unlockLevel);

    if (allConditionsMet) {
        unlockMessage.style.display = 'none';
        levelUpInfo.style.display = showLevelUpInfo ? 'flex' : 'none';
    } else {
        unlockMessage.style.display = 'block';
        levelUpInfo.style.display = 'none';
    }
}

function checkUpgradeUnlock() {
    // Upgrade that requires Max and Hana levels
    updateUnlockStatus('mark-unlock-message', 'mark-levelup-info', [
        { level: upgradeLevels.max.level, unlockLevel: 15 },
        { level: upgradeLevels.hana.level, unlockLevel: 15 }
    ], true);

    // Upgrade that requires Daisy level
    updateUnlockStatus('gilbertside-unlock-message', 'gilbertside-levelup-info', [
        { level: upgradeLevels.gilbert.level, unlockLevel: 25 }
    ], true);

    // Upgrade that requires Daisy level
    updateUnlockStatus('daisyside-unlock-message', 'daisyside-levelup-info', [
        { level: upgradeLevels.daisy.level, unlockLevel: 25 }
    ], true);

    // Upgrade that requires Gilbert and Gilbertside levels
    updateUnlockStatus('boyet-unlock-message', 'boyet-levelup-info', [
        { level: upgradeLevels.gilbert.level, unlockLevel: 50 },
        { level: upgradeLevels.gilbertside.level, unlockLevel: 25 }
    ], true);

    // Upgrades that depend on Beans levels
    updateUnlockStatus('beans2-unlock-message', 'beans2-levelup-info', [
        { level: upgradeLevels.beans.level, unlockLevel: 15 }
    ], true);

    updateUnlockStatus('beans3-unlock-message', 'beans3-levelup-info', [
        { level: upgradeLevels.beans.level, unlockLevel: 30 }
    ], true);

    updateUnlockStatus('squiggynose-unlock-message', 'squiggynose-levelup-info', [
        { level: upgradeLevels.squiggy.level, unlockLevel: 25 }
    ], true);

    updateUnlockStatus('cooperbite-unlock-message', 'cooperbite-levelup-info', [
        { level: upgradeLevels.cooper.level, unlockLevel: 12 }
    ], true);

    updateUnlockStatus('gizmogun-unlock-message', 'gizmogun-levelup-info', [
        { level: upgradeLevels.gizmo.level, unlockLevel: 10 }
    ], true);

    updateUnlockStatus('orioass-unlock-message', 'orioass-levelup-info', [
        { level: upgradeLevels.orio.level, unlockLevel: 15 }
    ], true);

    updateUnlockStatus('pinkfloyd-unlock-message', 'pinkfloyd-levelup-info', [
        { level: upgradeLevels.daisy.level, unlockLevel: 50 },
        { level: upgradeLevels.daisyside.level, unlockLevel: 25 }
    ], true);
    updateUnlockStatus('alphalegion-unlock-message', 'alphalegion-levelup-info', [
        { level: upgradeLevels.mark.level, unlockLevel: 30 },
        { level: upgradeLevels.noel.level, unlockLevel: 25 },
        { level: upgradeLevels.sandrei.level, unlockLevel: 28 },
        { level: upgradeLevels.elijah.level, unlockLevel: 25 }
    ], true);

    updateUnlockStatus('zestymax-unlock-message', 'zestymax-levelup-info', [
        { level: upgradeLevels.max.level, unlockLevel: 30 }
    ], true);

    updateUnlockStatus('hanabishi-unlock-message', 'hanabishi-levelup-info', [
        { level: upgradeLevels.hana.level, unlockLevel: 30 }
    ], true);
}


/* -------------------------------------------------------- */

function tapSquiggy() {
    if (energy > 1) {
        coins += tapValue;
        document.getElementById('coins').innerText = Math.round(coins);
        energy -= 2;
        updateEnergyBar();
        updateCoinsPerTap();
        updateUpgradeCost(); // Update upgrade cost after tapping
    } else {
        showCustomAlert('Out of energy! Wait for it to regenerate.');
    }
}

function updateEnergyBar() {
    let energyPercentage = (energy / 600) * 100; // Calculate energy percentage
    document.getElementById('energy-fill').style.width = energyPercentage + '%';
    document.getElementById('energy-count').innerText = energy;
    document.getElementById('energy-limit').innerText = 600;
}

function regenerateEnergy() {
    if (energy < 600) {
        energy += energyRegenRate;
        if (energy > 600) {
            energy = 600; // Cap energy at max 600
        }
        updateEnergyBar();
    }
}

function updateCoinsPerTap() {
    let coinsPerTap = tapValue;
    document.getElementById('coins-per-tap').innerText = coinsPerTap.toLocaleString();
}

// Energy regeneration interval
setInterval(regenerateEnergy, 1000); // Update energy every second

function upgradeSquiggy() {
    if (coins >= upgradeLevel * upgradeCost) {
        coins -= upgradeLevel * upgradeCost;
        upgradeLevel++;
        tapValue++;
        document.getElementById('upgrade-level').innerText = upgradeLevel;
        document.getElementById('coins').innerText = Math.round(coins);
        updateCoinsPerTap();
        updateUpgradeCost(); // Update upgrade cost after upgrading
    } else {
        showCustomAlert('Not enough coins to upgrade!');
    }
}

function updateUpgradeCost() {
    let nextUpgradeCost = upgradeLevel * upgradeCost;
    document.getElementById('upgrade-cost').innerText = nextUpgradeCost;
}

function updateProfitPerHour() {
    let profitPerHour = baseProfitPerHour;
    document.getElementById('profit-per-hour').innerText = profitPerHour.toLocaleString();

    // Clear existing interval before setting a new one
    clearInterval(profitInterval);

    // Add passive income
    profitInterval = setInterval(function () {
        coins += profitPerHour / 3600; // Add coins per second based on profit per hour
        document.getElementById('coins').innerText = Math.round(coins);
    }, 1000); // Update every second
}

function showUpgrades(category) {
    const mainUpgrades = document.getElementById('main-upgrades');
    const marketUpgrades = document.getElementById('market-upgrades');
    const workflowUpgrades = document.getElementById('workflow-upgrades');

    const buttons = document.querySelectorAll('.upgrade-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Determine the layout type based on window width
    let layoutType = window.innerWidth = 'grid';

    mainUpgrades.style.display = 'none';
    marketUpgrades.style.display = 'none';
    workflowUpgrades.style.display = 'none';

    if (category === 'main') {
        mainUpgrades.style.display = layoutType;
        document.getElementById('main-button').classList.add('active');
        checkUpgradeUnlock()
    } else if (category === 'market') {
        marketUpgrades.style.display = layoutType;
        document.getElementById('market-button').classList.add('active');
        checkUpgradeUnlock()
    } else if (category === 'workflow') {
        workflowUpgrades.style.display = layoutType;
        document.getElementById('workflow-button').classList.add('active');
        checkUpgradeUnlock()
    }
}

function updateLevelBar(upgradeName) {
    const upgrade = upgradeLevels[upgradeName];
    const levelFill = document.getElementById(`${upgradeName}level`);
    const percentage = (upgrade.level / upgrade.maxLevel) * 100;
    levelFill.style.width = `${percentage}%`;

    // Update current level and max level indicators
    document.getElementById(`${upgradeName}-currentlevel`).innerText = upgrade.level;
    document.getElementById(`${upgradeName}-maxlevel`).innerText = upgrade.maxLevel;
    checkUpgradeUnlock(); // Check unlock condition for mark upgrade
}

function updateMaxLevels() {
    // Update the maximum levels for each upgrade display
    for (let upgrade in upgradeLevels) {
        const upgradeInfo = upgradeLevels[upgrade];
        document.getElementById(`${upgrade}-maxlevel`).innerText = upgradeInfo.maxLevel;
    }
    checkUpgradeUnlock(); // Check unlock condition for mark upgrade on load
}

// Initialization function to set up all upgrades and buttons
function initializeAllUpgrades() {
    Object.keys(upgrades).forEach(upgradeName => {
        const upgradeInfo = upgrades[upgradeName];

        // Update HTML elements with initial values
        const costElement = document.getElementById(`${upgradeName}-cost`);
        const pphElement = document.getElementById(`${upgradeName}-pph`);

        if (costElement && pphElement) {
            const pphFormatted = upgradeInfo.baseProfitIncrease >= 1000
                ? (upgradeInfo.baseProfitIncrease / 1000).toFixed(1) + 'k'
                : upgradeInfo.baseProfitIncrease.toString();

            costElement.innerText = `${upgradeInfo.baseCost.toLocaleString()}`;
            pphElement.innerText = `${pphFormatted}`;
        }

        // Initialize upgrade buttons
        const upgradeButton = document.getElementById(`${upgradeName}-upgrade-button`);
        if (upgradeButton) {
            upgradeButton.setAttribute('onclick', `upgradePPH('${upgradeName}', ${upgradeInfo.baseProfitIncrease}, ${upgradeInfo.baseCost})`);
        }
    });
}

// Update function to calculate and display costs and PPH based on current levels
function updateAllUpgrades() {
    Object.keys(upgradeLevels).forEach(upgradeName => {
        updateLevelBar(upgradeName);

        const upgrade = upgradeLevels[upgradeName];
        const level = upgrade.level;

        // Calculate the new cost and profit increase
        const newCost = calculateCost(upgradeName, level);
        const nextProfitIncrease = calculateProfitIncrease(upgradeName, level);

        // Format profit increase
        const newPPH = nextProfitIncrease >= 1000
            ? (nextProfitIncrease / 1000).toFixed(1) + 'k'
            : nextProfitIncrease.toString();

        // Update the displayed cost and PPH for the current upgrade
        const costElement = document.getElementById(`${upgradeName}-cost`);
        const pphElement = document.getElementById(`${upgradeName}-pph`);

        if (costElement) {
            costElement.innerText = `${newCost.toLocaleString()}`;
        }

        if (pphElement) {
            pphElement.innerText = `${newPPH}`;
        }
    });
}

function initializeUpgradeButtons() {
    for (let upgradeName in upgrades) {
        const upgradeInfo = upgrades[upgradeName]; // Retrieve upgrade info from JavaScript object

        // Find the upgrade button element
        const upgradeButton = document.getElementById(`${upgradeName}-upgrade-button`);

        // Check if the button element exists before setting onclick attribute
        if (upgradeButton) {
            upgradeButton.setAttribute('onclick', `upgradePPH('${upgradeName}', ${upgradeInfo.baseProfitIncrease}, ${upgradeInfo.baseCost})`);
        }
    }
}


window.onload = function () {
    initializeAllUpgrades();
    initializeUpgradeButtons();
    updateMaxLevels();
    updateCoinsPerTap();
    updateProfitPerHour();
    updateUpgradeCost();
    updateCoinsPerTap();
    updateEnergyBar(); // Ensure energy bar is initialized correctly
    checkUpgradeUnlock(); // Initial check for unlock condition
    updateAllUpgrades();
    updateTotalPPH();
}


function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.innerText = message;
    alertBox.classList.remove('hidden');
}

function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.classList.add('hidden');
}

window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.upgrade-btn.active');
    if (activeButton) {
        const category = activeButton.id.replace('-button', '');
        showUpgrades(category);
    }
});
