let coins = 0;
let upgradeLevel = 1;
let tapValue = 1;
let upgradeCost = 80;
let baseProfitPerHour = 10000; // Initial base profit per hour in coins
let energy = 600; // Initial energy
let energyRegenRate = 1; // Energy regeneration rate per second
let profitInterval; // To store the interval ID for profit generation

const upgradeLevels = {
    cooper: { level: 0, maxLevel: 12 },
    gizmo: { level: 0, maxLevel: 10 },
    orio: { level: 0, maxLevel: 15 },
    max: { level: 0, maxLevel: 30 },
    hana: { level: 0, maxLevel: 25 }
};

function tapHamster() {
    if (energy > 1) {
        coins += tapValue;
        document.getElementById('coins').innerText = Math.round(coins);
        energy -= 2;
        updateEnergyBar();
        updateCoinsPerTap();
        updateUpgradeCost(); // Update upgrade cost after tapping
    } else {
        alert('Out of energy! Wait for it to regenerate.');
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
    document.getElementById('coins-per-tap').innerText = coinsPerTap;
}

// Energy regeneration interval
setInterval(regenerateEnergy, 1000); // Update energy every second

function upgradeHamster() {
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
    let profitPerHour = baseProfitPerHour
    document.getElementById('profit-per-hour').innerText = profitPerHour;

    // Clear existing interval before setting a new one
    clearInterval(profitInterval);

    // Add passive income
    profitInterval = setInterval(function() {
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
    let layoutType = window.innerWidth <= 864 ? 'flex' : 'grid';

    mainUpgrades.style.display = 'none';
    marketUpgrades.style.display = 'none';
    workflowUpgrades.style.display = 'none';

    if (category === 'main') {
        mainUpgrades.style.display = layoutType;
        document.getElementById('main-button').classList.add('active');
    } else if (category === 'market') {
        marketUpgrades.style.display = layoutType;
        document.getElementById('market-button').classList.add('active');
    } else if (category === 'workflow') {
        workflowUpgrades.style.display = layoutType;
        document.getElementById('workflow-button').classList.add('active');
    }
}


function upgradePPH(upgradeName, profitIncrease, cost) {
    const upgrade = upgradeLevels[upgradeName];
    const upgradeButton = document.querySelector(`button[onclick="upgradePPH('${upgradeName}', ${profitIncrease}, ${cost})"]`);

    if (coins >= cost && upgrade.level < upgrade.maxLevel) {
        coins -= cost;
        baseProfitPerHour += profitIncrease;
        document.getElementById('coins').innerText = Math.round(coins);

        upgrade.level++;
        updateLevelBar(upgradeName);
        updateProfitPerHour();
        updateTotalPPH(); // Update total PPH display for all upgrades

        if (upgrade.level >= upgrade.maxLevel) {
            upgradeButton.innerText = 'MAXED';
            upgradeButton.classList.add('disabled');
            upgradeButton.disabled = true;
        }
    } else if (upgrade.level >= upgrade.maxLevel) {
        showCustomAlert('This upgrade has reached its maximum level!');
    } else {
        showCustomAlert('Not enough coins to upgrade!');
    }
}


function updateTotalPPH() {
    // Calculate and update the total PPH contributed by each upgrade
    for (let upgrade in upgradeLevels) {
        const upgradeInfo = upgradeLevels[upgrade];
        const totalPPH = upgradeInfo.level * getProfitIncrease(upgrade);
        document.getElementById(`${upgrade}-total-pph`).innerText = totalPPH.toLocaleString();
    }
}

function getProfitIncrease(upgradeName) {
    // Define the profit increase for each upgrade (you can adjust these values as needed)
    switch (upgradeName) {
        case 'cooper':
            return 2500;
        case 'gizmo':
            return 2000;
        case 'orio':
            return 4000;
        case 'max':
            return 1750;
        case 'hana':
            return 2300;
        default:
            return 0;
    }
}

function updateLevelBar(upgradeName) {
    const upgrade = upgradeLevels[upgradeName];
    const levelFill = document.getElementById(`${upgradeName}level`);
    const percentage = (upgrade.level / upgrade.maxLevel) * 100;
    levelFill.style.width = `${percentage}%`;
}

// Initial calculation
updateCoinsPerTap();
updateProfitPerHour();
updateUpgradeCost();
updateCoinsPerTap();
updateEnergyBar(); // Ensure energy bar is initialized correctly

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