"use strict";
window.onload = function () {
  const elements = {
    buttons: {
      newGame: document.querySelector(".new_game"),
      howToPlay: document.querySelector(".how_to_play"),
      settings: document.querySelector(".settings"),
      closeModalButtons: document.querySelectorAll(".close-modal"),
      startGameButton: document.querySelector(".start_game"),
      cardBacks: document.querySelectorAll(".card_back"),
    },
    sliders: {
      newGameSlider: document.querySelector(".new_game_slider"),
      difficultySlider: document.querySelector(".difficulty_slider"),
      playerCountSlider: document.querySelector(".player_count_slider"),
    },
    windows: {
      mainModal: document.querySelector(".modal"),
      playAreaModal: document.querySelector(".play_area_modal"),
      overlay: document.querySelector(".overlay"),
      playAreaOverlay: document.querySelector(".overlay_play_area"),
    },
    page: {
      currentLanguage: "english",
    },
    game: {
      gameState: 0,
      gameMode: 0,
      gameDifficulty: 0,
      gamePlayerCount: 1,
      gameArray: [],
      modeFolders: ["animals", "vehicles", "thingsThatFly"],
      firstCard: null,
      secondCard: null,
      lockBoard: false,
      currentPlayer: 0,
      scores: [0, 0, 0, 0],
      cardBack: "card_back_blue",
    },
    data: {
      text: {
        english: {
          newGame: "New Game",
          howToPlay: "How to Play",
          settings: "Settings",
          chooseGameTypeText: "Choose game Type:",
          animalsSlideText: "Animals<br>🦒",
          vehiclesSlideText: "Vehicles<br>🛻",
          thingsThatFlySlideText: "Things That Fly<br>✈️",
          easyDifficultyText: "Easy (8 cards)<br>🙂)",
          mediumDifficultyText: "Medium (12 cards)<br>😐",
          hardDifficultyText: "Hard (16 cards)<br>😓",
          onePlayerText: "One Player<br>😊",
          twoPlayerText: "Two players<br>😊😊",
          threePlayerText: "Three Players<br>😊😊😊",
          fourPlayerText: "Four Players<br>😊😊😊😊",
          startGameButtonText: "Start the Game!<br>🕹️",
          explanationHeadingText: "How to Play",
          explanationText:
            "You can play with up to four players. Tap or click on cards to flip them over. Find pairs of cards to make a match and score a point. Whoever get the most match points is the winner! When cards are matched, click or tap them to see the picture and learn the English and Chinese words. Enjoy yourself!",
          settingsMenuHeadingText: "Settings",
          settingsChooseCardBackText: "Card back preference:",
          classicBlueText: "Classic Blue",
          classicRedText: "Classic Red",
          gameCollage1Text: "Game Collage 1",
          gameCollage2Text: "Game Collage 2",
          playMusicText:
            "Play some jaunty background music! (If you prefer) 😎",
          audioPlayerErrorText:
            "Your browser does not support the audio element.",
        },
        chinese: {
          newGame: "开始游戏",
          howToPlay: "说明",
          settings: "设置",
          chooseGameTypeText: "",
          animalsSlideText: "  动物  <br>🦒",
          vehiclesSlideText: "  车辆  <br>🛻",
          thingsThatFlySlideText: "  飞行物  <br>✈️",
          easyDifficultyText: "简单 (8 个卡片)<br>🙂)",
          mediumDifficultyText: "中等 (12 个卡片)<br>😐",
          hardDifficultyText: "困难 (16 个卡片)<br>😓",
          onePlayerText: "一个玩家<br>😊",
          twoPlayerText: "两个玩家<br>😊😊",
          threePlayerText: "三个玩家<br>😊😊😊",
          fourPlayerText: "四个玩家<br>😊😊😊😊",
          startGameButtonText: "开始游戏！<br>🕹️",
          explanationHeadingText: "说明",
          explanationText:
            "您最多可以与四名玩家一起玩。点击或单击卡片以将其翻转。找到一对牌进行匹配并获得一分。谁获得最多的赛点，谁就是赢家！当卡片匹配时，单击或点击它们以查看图片并学习英文和中文单词。尽情享受吧！",
          settingsMenuHeadingText: "设置",
          settingsChooseCardBackText: "卡背偏好设置:",
          classicBlueText: "经典蓝色",
          classicRedText: "经典红色",
          gameCollage1Text: "游戏拼贴 1",
          gameCollage2Text: "游戏拼贴 2",
          playMusicText: "播放一些欢快的背景音乐！（如果您愿意）😎",
          audioPlayerErrorText: "您的浏览器不支持音频元素。",
        },
      },
      messages: {
        english: {
          flipAnyCard: "Flip any card to begin",
          flipCardToBegin: "Flip a card to begin! Player 1",
          flipFirstCard: "Flip first card",
          pickAnotherCard: "Pick another card",
          pickAnotherCardPlayer: "Pick another card, {player}",
          noMatch: "No match. Player {player}, try again.",
          playerTurn: "Player {player}'s turn.",
          playerScores: "Player {player} scores!",
          tieGame: "It's a tie between Player {players}!",
          playerWins: "Congratulations, Player {player} wins!",
          youWin: "Congratulations, you win!",
        },
        chinese: {
          flipAnyCard: "开始翻牌吧",
          flipCardToBegin: "开始翻牌吧！玩家 1",
          flipFirstCard: "翻第一牌吧",
          pickAnotherCard: "再选一张牌",
          pickAnotherCardPlayer: "再选一张牌 {player}",
          noMatch: "没有匹配。玩家 {player}, 再试一次。",
          playerTurn: "玩家 {player} 的回合。",
          playerScores: "玩家 {player} 得分了！",
          tieGame: "玩家 {players} 打成平手！",
          playerWins: "恭喜，玩家 {player} 获胜！",
          youWin: "恭喜，你赢了！",
        },
      },

      animals: [
        { id: "elephant_shrew", english: "Elephant Shrew", chinese: "象鼩" },
        { id: "dragonfly", english: "Dragonfly", chinese: "蜻蜓" },
        { id: "giraffe", english: "Giraffe", chinese: "长颈鹿" },
        { id: "duck", english: "Duck", chinese: "鸭子" },
        { id: "pig", english: "Pig", chinese: "猪" },
        { id: "cow", english: "Cow", chinese: "牛" },
        { id: "ladybug", english: "Ladybug", chinese: "瓢虫" },
        { id: "octopus", english: "Octopus", chinese: "章鱼" },
        { id: "elephant", english: "Elephant", chinese: "大象" },
        { id: "tiger", english: "Tiger", chinese: "老虎" },
        {
          id: "hercules_beetle",
          english: "Hercules Beetle",
          chinese: "长戟大兜虫",
        },
        { id: "dolphin", english: "Dolphin", chinese: "海豚" },
        {
          id: "pygmy_marmoset",
          english: "Pygmy Marmoset",
          chinese: "侏儒狨猴",
        },
        { id: "sugar_glider", english: "Sugar Glider", chinese: "糖袋鼠" },
        { id: "chipmunk", english: "Chipmunk", chinese: "花栗鼠" },
        { id: "horse", english: "Horse", chinese: "马" },
        { id: "weasel", english: "Weasel", chinese: "黄鼠狼" },
        { id: "rabbit", english: "Rabbit", chinese: "兔子" },
      ],
      vehicles: [
        { id: "front_loader", english: "Front Loader", chinese: "前装载机" },
        { id: "excavator", english: "Excavator", chinese: "挖掘机" },
        { id: "dump_truck", english: "Dump Truck", chinese: "自卸卡车" },
        { id: "fire_engine", english: "Fire Engine", chinese: "消防车" },
        {
          id: "mobile_crane",
          english: "Mobile Crane",
          chinese: "移动式起重机",
        },
        { id: "forklift", english: "Forklift", chinese: "叉车" },
        { id: "bus", english: "Bus", chinese: "公交车" },
        { id: "sports_car", english: "Sports Car", chinese: "运动汽车" },
        {
          id: "old_fashioned_car",
          english: "Old Fashioned Car",
          chinese: "老式汽车",
        },
        { id: "bulldozer", english: "Bulldozer", chinese: "推土机" },
        { id: "sleeper_truck", english: "Sleeper Truck", chinese: "可睡卡车" },
        { id: "roller", english: "Roller", chinese: "压路机" },
        { id: "bicycle", english: "Bicycle", chinese: "自行车" },
        { id: "motorcycle", english: "Motorcycle", chinese: "摩托车" },
        { id: "police_car", english: "Police Car", chinese: "警车" },
        { id: "ambulance", english: "Ambulance", chinese: "救护车" },
      ],
      thingsThatFly: [
        { id: "passenger_plane", english: "Passenger Plane", chinese: "客机" },
        { id: "glider", english: "Glider", chinese: "滑翔机" },
        { id: "helicopter", english: "Helicopter", chinese: "直升机" },
        { id: "drone", english: "Drone", chinese: "无人机" },
        { id: "biplane", english: "Biplane", chinese: "双翼飞机" },
        { id: "fighter_jet", english: "Fighter Jet", chinese: "战斗机" },
        {
          id: "hot_air_balloon",
          english: "Hot Air Balloon",
          chinese: "热气球",
        },
        { id: "rocket", english: "Rocket", chinese: "火箭" },
        { id: "parachute", english: "Parachute", chinese: "降落伞" },
        { id: "hang_glider", english: "Hang Glider", chinese: "悬挂式滑翔翼" },
        { id: "cargo_plane", english: "Cargo Plane", chinese: "货机" },
        { id: "kite", english: "Kite", chinese: "风筝" },
        { id: "seaplane", english: "Seaplane", chinese: "水上飞机" },
        { id: "blimp", english: "Blimp", chinese: "飞艇" },
      ],
    },
  };
  const highlightLanguage = function () {
    const indicators = document.querySelectorAll(".language_toggle span");

    indicators.forEach((indicator) => {
      indicator.classList.remove("active_language");
    });

    if (elements.page.currentLanguage === "english") {
      const englishIndicator = document.querySelector(".english_indicator");
      englishIndicator.classList.add("active_language");
    } else if (elements.page.currentLanguage === "chinese") {
      const chineseIndicator = document.querySelector(".chinese_indicator");
      chineseIndicator.classList.add("active_language");
    }
  };
  const switchLanguage = function () {
    elements.page.currentLanguage =
      elements.page.currentLanguage === "english" ? "chinese" : "english";

    document.querySelectorAll(".text").forEach((element) => {
      const textKey = element.getAttribute("data-text-key");
      element.innerHTML =
        elements.data.text[elements.page.currentLanguage][textKey];
    });
    highlightLanguage();
  };

  highlightLanguage();

  document
    .querySelector(".language_toggle")
    .addEventListener("click", switchLanguage);

  const displayMessage = function (key, params = {}, duration = 2000) {
    const messageElement = document.querySelector(".play_area_header .message");

    // Look up the message from the language object
    let message = elements.data.messages[elements.page.currentLanguage][key];

    // Replace any placeholders with the provided parameters
    for (let param in params) {
      message = message.replace(`{${param}}`, params[param]);
    }

    messageElement.textContent = message;

    // Clear previous timeout if any
    if (messageElement.displayTimeout) {
      clearTimeout(messageElement.displayTimeout);
    }

    // Set timeout for message duration
    if (duration > 0) {
      messageElement.displayTimeout = setTimeout(() => {
        messageElement.textContent = "";
      }, duration);
    }
  };

  const updateScores = function () {
    const scoreAreas = document.querySelectorAll(
      ".score_display_area h1:last-child"
    );
    for (let i = 0; i < scoreAreas.length; i++) {
      scoreAreas[i].textContent = elements.game.scores[i];
    }
  };

  const randomInteger = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const toggleModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.toggle("hidden");
      elements.windows.overlay.classList.toggle("hidden");
    } else {
      console.error(`Modal with ID ${modalId} not found.`);
    }
  };

  const closeAllModals = function () {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
    elements.windows.overlay.classList.add("hidden");
  };

  document.querySelectorAll(".header_buttons button").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      toggleModal(modalId);
    });
  });

  elements.buttons.closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeAllModals);
  });

  elements.windows.overlay.addEventListener("click", closeAllModals);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  const setupSlider = (sliderElement) => {
    let currentIndex = 0;
    const slides = sliderElement.querySelectorAll(".slide");
    const slidesContainer = sliderElement.querySelector(".slides");
    const btnLeft = sliderElement.querySelector(".slider__btn--left");
    const btnRight = sliderElement.querySelector(".slider__btn--right");

    const showSlide = (index) => {
      const totalSlides = slides.length;
      if (index >= totalSlides) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = totalSlides - 1;
      } else {
        currentIndex = index;
      }
      const offset = -currentIndex * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;
      if (sliderElement.classList.contains("new_game_slider")) {
        elements.game.gameMode = currentIndex;
      } else if (sliderElement.classList.contains("difficulty_slider")) {
        elements.game.gameDifficulty = currentIndex;
      } else if (sliderElement.classList.contains("player_count_slider")) {
        elements.game.gamePlayerCount = currentIndex;
      }
    };

    btnLeft.addEventListener("click", () => {
      showSlide(currentIndex - 1);
    });

    btnRight.addEventListener("click", () => {
      showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
  };

  setupSlider(elements.sliders.newGameSlider);
  setupSlider(elements.sliders.difficultySlider);
  setupSlider(elements.sliders.playerCountSlider);

  const cardCategories = ["animals", "vehicles", "thingsThatFly"];

  const setupCardArray = function (cardPoolIndex) {
    const cardPool = cardCategories[cardPoolIndex];
    const originalPool = elements.data[cardPool];
    if (!Array.isArray(originalPool)) {
      throw new Error(
        `Original pool is not an array. Check the cardPool key: ${cardPool}`
      );
    }

    const startPool = [...originalPool];

    let numCards;
    switch (elements.game.gameDifficulty) {
      case 0:
        numCards = 8;
        break;
      case 1:
        numCards = 12;
        break;
      case 2:
        numCards = 16;
        break;
      default:
        numCards = 8;
    }

    elements.game.gameArray = [];
    for (let i = 0; i < numCards / 2; i++) {
      const randomIndex = randomInteger(startPool.length - 1, 0);
      const selectedCard = startPool.splice(randomIndex, 1)[0];
      elements.game.gameArray.push(selectedCard, selectedCard);
    }

    elements.game.gameArray = elements.game.gameArray.sort(
      () => Math.random() - 0.5
    );
    // console.log(elements.game.gameArray);
  };

  // Function to create the expanded card
  const createExpandedCard = function (cardData, folderName, cardInfo) {
    cardInfo = elements.data[folderName].find(
      (card) => card.id === cardData.id
    );

    if (!cardInfo) {
      console.error(
        `No card found for cardData: ${cardData} in folder: ${folderName}`
      );
      return;
    }

    const expandedCard = document.createElement("div");
    expandedCard.classList.add("expanded-card");
    expandedCard.setAttribute("data-expanded-id", cardData.id);

    const englishAudio = new Audio(
      `audio/${folderName}/${cardData.id}-english.mp3`
    );
    const chineseAudio = new Audio(
      `audio/${folderName}/${cardData.id}-chinese.mp3`
    );

    expandedCard.innerHTML = `
      <button class="close-btn">X</button>
      <div class="card-info">
        <button class="audio-btn top">🔉 ${cardInfo.english}</button>
      </div>
      <img src="img/card_fronts/${folderName}/${cardData.id}.jpeg" alt="Card Artwork" class="artwork">
      <div class="card-info">
        <button class="audio-btn bottom">🔉 ${cardInfo.chinese}</button>
      </div>
`;

    // Attach event listeners to the audio buttons
    expandedCard
      .querySelector(".audio-btn.top")
      .addEventListener("click", function () {
        englishAudio.play();
      });

    expandedCard
      .querySelector(".audio-btn.bottom")
      .addEventListener("click", function () {
        chineseAudio.play();
      });

    elements.windows.playAreaModal.appendChild(expandedCard);

    // expanded card close button
    expandedCard.querySelector(".close-btn").addEventListener("click", () => {
      expandedCard.style.display = "none";
      elements.windows.playAreaOverlay.classList.add("hidden");
    });
    //play audio files function
    window.playAudio = function (type) {
      if (type === "english") {
        englishAudio.play();
      } else if (type === "chinese") {
        chineseAudio.play();
      }
    };

    expandedCard.style.display = "none";
  };

  const setupGameBoard = function () {
    const playArea = document.querySelector(".play_area_main");
    const playerScoreArea = document.querySelector(".play_area_footer");

    playArea.innerHTML = "";

    const numCards = elements.game.gameArray.length;
    let columns = 4;

    const cardWidth = `calc(100% / ${columns} - 10px)`;
    const folderName = elements.game.modeFolders[elements.game.gameMode];

    elements.game.gameArray.forEach((cardValue, i) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.setAttribute("data-card-value", cardValue.id);
      cardDiv.style.width = cardWidth;

      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-back"><img src="img/card_backs/${elements.game.cardBack}.png" alt="Card Back"></div>
          <div class="card-front"><img src="img/card_fronts/${folderName}/${cardValue.id}.png" alt="Card Front"></div>
        </div>
      `;

      playArea.appendChild(cardDiv);
      createExpandedCard(cardValue, folderName);
      cardDiv.addEventListener("click", function () {
        if (this.classList.contains("matched")) {
          const expandedCard = document.querySelector(
            `.expanded-card[data-expanded-id="${cardValue.id}"]`
          );
          if (expandedCard) {
            elements.windows.playAreaOverlay.classList.remove("hidden");
            expandedCard.style.display = "block";
          }
        }
      });
    });

    const highlightCurrentPlayer = function () {
      document.querySelectorAll(".score_display_area").forEach((area) => {
        area.classList.remove("active-player");
      });

      const currentPlayerArea = document.querySelector(
        `.score_display_area[data-player-number="${elements.game.currentPlayer}"]`
      );
      if (currentPlayerArea) {
        currentPlayerArea.classList.add("active-player");
      }
    };

    const checkForEndGame = function () {
      const flippedCards = document.querySelectorAll(".card.flipped").length;
      const totalCards = elements.game.gameArray.length;
      const allFlipped = flippedCards === totalCards;
      if (allFlipped) {
        const maxScore = Math.max(...elements.game.scores);
        const winners = elements.game.scores
          .map((score, index) => (score === maxScore ? index + 1 : null))
          .filter((player) => player !== null);
        let joiner =
          elements.page.currentLanguage === "english"
            ? " and player "
            : " 和 玩家 ";
        if (winners.length > 1) {
          displayMessage("tieGame", { players: winners.join(joiner) });
        } else {
          elements.game.gamePlayerCount === 0
            ? displayMessage("youWin")
            : displayMessage("playerWins", { player: winners[0] });
        }
        elements.game.lockBoard = true;
        return true;
      }
      return false;
    };

    playArea.addEventListener("click", function (event) {
      if (elements.game.lockBoard) return;

      const clickedElement = event.target.closest(".card");
      if (!clickedElement) return;
      if (clickedElement.classList.contains("flipped")) return;

      clickedElement.classList.add("flipped");

      if (!elements.game.firstCard) {
        elements.game.firstCard = clickedElement;
        elements.game.gamePlayerCount === 0
          ? displayMessage("pickAnotherCard")
          : displayMessage("pickAnotherCardPlayer", {
              player: elements.game.currentPlayer + 1,
            });
        return;
      }

      elements.game.secondCard = clickedElement;
      elements.game.lockBoard = true;

      if (
        elements.game.firstCard.getAttribute("data-card-value") ===
        elements.game.secondCard.getAttribute("data-card-value")
      ) {
        elements.game.scores[elements.game.currentPlayer]++;
        displayMessage("playerScores", {
          player: elements.game.currentPlayer + 1,
        });
        updateScores();
        elements.game.firstCard.classList.add("matched");
        elements.game.secondCard.classList.add("matched");

        if (checkForEndGame()) {
          return;
        }
        resetBoard();
      } else {
        displayMessage("noMatch", {
          player: elements.game.currentPlayer + 1,
        });
        setTimeout(() => {
          elements.game.firstCard.classList.remove("flipped");
          elements.game.secondCard.classList.remove("flipped");
          resetBoard();
        }, 1000);
      }

      elements.game.currentPlayer =
        (elements.game.currentPlayer + 1) % (elements.game.gamePlayerCount + 1);
      elements.game.gamePlayerCount === 0
        ? displayMessage("pickFirstCard")
        : displayMessage("playerTurn", {
            player: elements.game.currentPlayer + 1,
          });
      highlightCurrentPlayer();
    });

    function resetBoard() {
      [elements.game.firstCard, elements.game.secondCard] = [null, null];
      elements.game.lockBoard = false;
    }

    const numPlayers = elements.game.gamePlayerCount + 1;
    playerScoreArea.innerHTML = "";
    for (let i = 0; i < numPlayers; i++) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("score_display_area");
      playerDiv.setAttribute("data-player-number", i);
      playerDiv.innerHTML = `<h3>Player ${i + 1}</h3>
          <h3>0</h3>`;

      playerScoreArea.appendChild(playerDiv);
    }
    highlightCurrentPlayer();
  };

  const clearExpandedCards = function () {
    const expandedCards = document.querySelectorAll(".expanded-card");
    expandedCards.forEach((card) => card.remove());
  };

  //start new game function
  elements.buttons.startGameButton.addEventListener("click", function () {
    clearExpandedCards();
    const modalId = this.getAttribute("data-modal");
    toggleModal(modalId);
    elements.game.gameState = 1;
    elements.game.currentPlayer = 0;
    elements.game.scores = [0, 0, 0, 0];
    setupCardArray(elements.game.gameMode);
    setupGameBoard();
    elements.game.lockBoard = false;
    elements.game.gamePlayerCount === 0
      ? displayMessage("flipAnyCard")
      : displayMessage("flipCardToBegin");
  });

  elements.buttons.cardBacks.forEach((cardBack) => {
    cardBack.addEventListener("click", function () {
      elements.buttons.cardBacks.forEach((item) => {
        item.classList.remove("card_back_active");
      });
      this.classList.add("card_back_active");
      const cardBackName = cardBack.getAttribute("data-card-back-name");
      elements.game.cardBack = cardBackName;
    });
  });
};
