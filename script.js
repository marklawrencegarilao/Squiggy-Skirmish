    let coins = 0;
    let upgradeLevel = 1;
    let tapValue = 1000000;
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
        max: { level: 0, maxLevel: 30 },
        hana: { level: 0, maxLevel: 25 },
        noel: { level: 0, maxLevel: 25 },
        sandrei: { level: 0, maxLevel: 28 },
        mark: { level: 0, maxLevel: 30 },
        gilbert: { level: 0, maxLevel: 100 },
        daisy: { level: 0, maxLevel: 100 },
        daisyside: { level: 0, maxLevel: 80 },
        gilbertside: { level: 0, maxLevel: 80 }
    };

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
        document.getElementById('coins-per-tap').innerText = coinsPerTap;
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

    function checkUpgradeUnlock() {
        const maxLevel = upgradeLevels.max.level;
        const hanaLevel = upgradeLevels.hana.level;

        const markUnlockMessage = document.getElementById('mark-unlock-message');
        const markLevelUpInfo = document.getElementById('mark-levelup-info');

        const daisyLevel = upgradeLevels.daisy.level;

        const daisysideUnlockMessage = document.getElementById('daisyside-unlock-message');
        const daisysideLevelUpInfo = document.getElementById('daisyside-levelup-info');

        const gilbertLevel = upgradeLevels.gilbert.level;

        const gilbertsideUnlockMessage = document.getElementById('gilbertside-unlock-message');
        const gilbertsideLevelUpInfo = document.getElementById('gilbertside-levelup-info');

        if (maxLevel >= 5 && hanaLevel >= 5) {
            markUnlockMessage.style.display = 'none';
            markLevelUpInfo.style.display = 'flex';
        } else {
            markUnlockMessage.style.display = 'block';
            markLevelUpInfo.style.display = 'none';
        }

        if (daisyLevel >= 10) {
            daisysideUnlockMessage.style.display = 'none';
            daisysideLevelUpInfo.style.display = 'flex';
        } else {
            daisysideUnlockMessage.style.display = 'block';
            daisysideLevelUpInfo.style.display = 'none';
        }

        if (gilbertLevel >= 10) {
            gilbertsideUnlockMessage.style.display = 'none';
            gilbertsideLevelUpInfo.style.display = 'flex';
        } else {
            gilbertsideUnlockMessage.style.display = 'block';
            gilbertsideLevelUpInfo.style.display = 'none';
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
            checkUpgradeUnlock(); // Check unlock condition for mark upgrade
    
            if (upgrade.level >= upgrade.maxLevel) {
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
            case 'squiggy':
                return 1600;
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
            case 'noel':
                return 2000;
            case 'sandrei':
                return 1800;
            case 'mark':
                return 5500;
            case 'gilbert':
                return 400;
            case 'daisy':
                return 320;
            case 'daisyside':
                return 900;
            case 'gilbertside':
                return 550;
            default:
                return 0;
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
    
    window.onload = function() {
        updateMaxLevels();
        updateCoinsPerTap();
        updateProfitPerHour();
        updateUpgradeCost();
        updateCoinsPerTap();
        updateEnergyBar(); // Ensure energy bar is initialized correctly
        checkUpgradeUnlock(); // Initial check for unlock condition
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
