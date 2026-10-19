(function () {
  "use strict";

  const data = window.GAME_DATA;
  const saveKey = "game2.visualNovel.save.v1";
  const unlockKey = "game2.visualNovel.gallery.v1";
  const $ = (id) => document.getElementById(id);
  const ui = {
    scene: $("scene"), background: $("background"), portrait: $("portrait"),
    speaker: $("speaker"), line: $("line"), choices: $("choices"),
    affection: $("affection"), next: $("next-button"), status: $("status"),
    gallery: $("gallery"), galleryGrid: $("gallery-grid")
  };

  function newState() {
    return {
      node: data.start,
      affection: Object.fromEntries(Object.keys(data.characters).map((id) => [id, 0]))
    };
  }

  let state = newState();

  function readJson(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function notify(message) {
    ui.status.textContent = message;
  }

  function unlockedIds() {
    const ids = readJson(unlockKey);
    return Array.isArray(ids) ? ids.filter((id) => data.gallery[id]) : [];
  }

  function unlock(id) {
    if (!data.gallery[id]) return;
    const ids = unlockedIds();
    if (ids.includes(id)) return;
    ids.push(id);
    try {
      localStorage.setItem(unlockKey, JSON.stringify(ids));
      notify("새로운 추억이 해금되었어요! ‘추억 보기’에서 확인하세요.");
    } catch (_) {
      notify("추억을 표시했지만 브라우저에 저장하지 못했어요.");
    }
  }

  function enter(id) {
    const node = data.nodes[id];
    if (!node) {
      notify("이야기 연결을 찾을 수 없어요: " + id);
      return;
    }
    state.node = id;
    if (node.unlock) unlock(node.unlock);
    render();
  }

  function choose(option) {
    for (const [id, amount] of Object.entries(option.affection || {})) {
      if (id in state.affection) state.affection[id] += amount;
    }
    enter(option.next);
  }

  function showImage(element, path, alt) {
    if (path) {
      element.src = path;
      element.alt = alt;
      element.hidden = false;
    } else {
      element.removeAttribute("src");
      element.alt = "";
      element.hidden = true;
    }
  }

  function render() {
    const node = data.nodes[state.node];
    showImage(ui.background, data.assets.backgrounds[node.background], "장면 배경");
    showImage(ui.portrait, data.assets.characters[node.portrait],
      node.portrait ? data.characters[node.portrait].name : "");
    ui.speaker.textContent = node.speaker ? data.characters[node.speaker].name : "이야기";
    ui.speaker.style.color = node.speaker ? data.characters[node.speaker].color : "#f6dfaa";
    ui.line.textContent = node.text;
    ui.choices.replaceChildren();

    for (const [id, person] of Object.entries(data.characters)) {
      let badge = ui.affection.querySelector('[data-character="' + id + '"]');
      if (!badge) {
        badge = document.createElement("span");
        badge.dataset.character = id;
        ui.affection.append(badge);
      }
      badge.textContent = person.name + " ♥ " + state.affection[id];
    }

    if (node.type === "choice") {
      for (const option of node.options) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option.text;
        button.addEventListener("click", () => choose(option));
        ui.choices.append(button);
      }
    }
    ui.next.hidden = node.type === "choice";
    ui.next.innerHTML = node.type === "ending" ? "다시 시작 <span aria-hidden='true'>↺</span>" : "다음 <span aria-hidden='true'>›</span>";
  }

  function advance() {
    const node = data.nodes[state.node];
    if (node.type === "ending") {
      state = newState();
      notify("처음부터 다시 시작했어요.");
      enter(state.node);
    } else if (node.type === "line") {
      enter(node.next);
    }
  }

  function save() {
    try {
      localStorage.setItem(saveKey, JSON.stringify({ version: data.version, state }));
      notify("현재 장면을 이 브라우저에 저장했어요.");
    } catch (_) {
      notify("저장하지 못했어요. 브라우저의 저장 설정을 확인해 주세요.");
    }
  }

  function load() {
    const saved = readJson(saveKey);
    const valid = saved && saved.version === data.version && saved.state &&
      typeof saved.state.node === "string" && data.nodes[saved.state.node] &&
      saved.state.affection && Object.keys(data.characters).every((id) =>
        Number.isFinite(saved.state.affection[id]));
    if (!valid) {
      notify("불러올 수 있는 저장 기록이 없어요.");
      return;
    }
    state = {
      node: saved.state.node,
      affection: Object.fromEntries(Object.keys(data.characters).map((id) =>
        [id, saved.state.affection[id]]))
    };
    render();
    notify("저장한 장면을 불러왔어요.");
  }

  function openGallery() {
    const ids = unlockedIds();
    ui.galleryGrid.replaceChildren();
    for (const [id, item] of Object.entries(data.gallery)) {
      const card = document.createElement("article");
      card.className = "gallery-card";
      const image = document.createElement("img");
      const unlocked = ids.includes(id);
      if (unlocked) image.src = data.assets.cgs[id];
      image.alt = unlocked ? item.title : "아직 해금되지 않은 장면";
      const title = document.createElement("strong");
      title.textContent = unlocked ? item.title : "???";
      const description = document.createElement("span");
      description.textContent = unlocked ? item.description : "이야기에서 만날 수 있어요";
      card.append(image, title, description);
      ui.galleryGrid.append(card);
    }
    ui.gallery.showModal();
  }

  ui.next.addEventListener("click", advance);
  $("save-button").addEventListener("click", save);
  $("load-button").addEventListener("click", load);
  $("restart-button").addEventListener("click", () => {
    state = newState();
    enter(state.node);
    notify("처음부터 다시 시작했어요. 저장 기록과 해금한 추억은 남아 있어요.");
  });
  $("gallery-button").addEventListener("click", openGallery);
  $("close-gallery").addEventListener("click", () => ui.gallery.close());
  ui.scene.addEventListener("click", (event) => {
    if (event.target.closest("button, .dialogue, .topbar, .hud")) return;
    advance();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !ui.gallery.open && event.target.tagName !== "BUTTON") advance();
  });
  enter(state.node);
})();
