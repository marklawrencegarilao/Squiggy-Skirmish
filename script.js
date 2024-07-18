    let coins = 1000000000;
    let upgradeLevel = 1;
    let tapValue = 5;
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
        beans: { level: 0, maxLevel: 30 },
        gilbert: { level: 0, maxLevel: 100 },
        daisy: { level: 0, maxLevel: 100 },
        daisyside: { level: 0, maxLevel: 80 },
        gilbertside: { level: 0, maxLevel: 80 }
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
        max: {
            baseCost: 3500,
            baseProfitIncrease: 1750,
            costIncreaseRate: 1.3,
            profitIncreaseRate: 1.08
        },
        hana: {
            baseCost: 4200,
            baseProfitIncrease: 2300,
            costIncreaseRate: 1.35,
            profitIncreaseRate: 1.07
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
        mark: {
            baseCost: 6500,
            baseProfitIncrease: 5500,
            costIncreaseRate: 1.4,
            profitIncreaseRate: 1.06
        },
        beans: {
            baseCost: 4000,
            baseProfitIncrease: 3500,
            costIncreaseRate: 1.38,
            profitIncreaseRate: 1.04
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
            baseCost: 900,
            baseProfitIncrease: 900,
            costIncreaseRate: 1.13,
            profitIncreaseRate: 1.045
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
    
        // Retrieve upgrade parameters
        const { costIncreaseRate, profitIncreaseRate } = upgrades[upgradeName];
    
        // Calculate the new cost for the next level based on the current cost
        const newCost = Math.round(cost * costIncreaseRate);
    
        if (coins >= cost && upgrade.level < upgrade.maxLevel) {
            coins -= cost;
            baseProfitPerHour += profitIncrease; // Increase baseProfitPerHour by profitIncrease
            document.getElementById('coins').innerText = Math.round(coins);
    
            upgrade.level++;
            updateLevelBar(upgradeName);
            updateProfitPerHour(); // Update displayed profit per hour
            updateTotalPPH(); // Update total PPH display for all upgrades
            checkUpgradeUnlock(); // Check unlock condition for specific upgrades
    
            // Calculate the new profit increase for the next level
            const nextProfitIncrease = Math.round(profitIncrease * profitIncreaseRate);
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

    function initializeAllUpgrades() {
        for (let upgradeName in upgrades) {
            const upgradeInfo = upgrades[upgradeName]; // Retrieve upgrade info from JavaScript object
    
            // Update HTML elements with initial values
            const costElement = document.getElementById(`${upgradeName}-cost`);

            const baseProfitIncrease = upgradeInfo.baseProfitIncrease;
            const pphElementNum = baseProfitIncrease >= 1000 ? (baseProfitIncrease / 1000).toFixed(1) + 'k' : baseProfitIncrease.toString();

            const pphElement = document.getElementById(`${upgradeName}-pph`);
    
            if (costElement && pphElement) {
                costElement.innerText = upgradeInfo.baseCost.toLocaleString();
                pphElement.innerText = pphElementNum.toLocaleString();
            }
        }
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
    
    
    window.onload = function() {
        initializeAllUpgrades();
        initializeUpgradeButtons();
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
