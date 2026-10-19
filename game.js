(function () {
  "use strict";

  const data = window.GAME_DATA;
  const saveKey = "game2.firstDate.save.v2";
  const $ = (id) => document.getElementById(id);
  const ui = {
    scene: $("scene"), background: $("background"), portrait: $("portrait"),
    dialogue: $("dialogue"),
    title: $("title-screen"), titleBackground: $("title-background"),
    titleStatus: $("title-status"),
    speaker: $("speaker"), line: $("line"), choices: $("choices"),
    affection: $("affection"), partnerLabel: $("partner-label"),
    affectionValue: $("affection-value"), positive: $("affection-positive"),
    negative: $("affection-negative"), next: $("next-button"), status: $("status")
  };

  document.title = data.title;

  function newState() {
    return { node: data.start, gender: null, affection: 0 };
  }

  let state = newState();

  function partner() {
    const selected = data.playerGenders[state.gender];
    return selected ? data.partners[selected.partner] : null;
  }

  function partnerGender() {
    return data.playerGenders[state.gender]?.partner;
  }

  function notify(message) {
    ui.status.textContent = message;
  }

  function showImage(element, path, alt) {
    if (!path) {
      element.removeAttribute("src");
      element.alt = "";
      element.hidden = true;
      return;
    }
    element.src = path;
    element.alt = alt;
    element.hidden = false;
  }

  function render() {
    const node = data.nodes[state.node];
    const date = partner();
    showImage(ui.background, data.assets.backgrounds[node.background], "카페 배경");
    showImage(ui.portrait,
      node.portrait === "partner" ? data.assets.portraits[partnerGender()] : null,
      date ? date.label + " 소개팅 상대" : "");
    ui.speaker.textContent = node.speaker === "partner" ? date.name : "이야기";
    ui.speaker.style.color = node.speaker === "partner" ? date.color : "#f6dfaa";
    ui.line.textContent = node.text;
    ui.dialogue.classList.toggle("choice-mode", node.type === "choice");
    ui.affection.hidden = !date;
    if (date) {
      const { min, max } = data.affectionGauge;
      const displayed = Math.max(min, Math.min(max, state.affection));
      ui.partnerLabel.textContent = `${date.label} 상대 · ${date.name}`;
      ui.affectionValue.textContent = state.affection > 0 ? `+${state.affection}` : String(state.affection);
      ui.positive.style.width = `${Math.max(0, displayed) / max * 50}%`;
      ui.negative.style.width = `${Math.max(0, -displayed) / -min * 50}%`;
      ui.affection.setAttribute("aria-valuenow", String(displayed));
      ui.affection.setAttribute("aria-valuetext", `${date.name} 호감도 ${state.affection}`);
    }
    ui.choices.replaceChildren();
    ui.choices.className = "choices " + (node.type === "gender" ? "gender-options" : "letter-options");

    if (node.type === "gender" || node.type === "choice") {
      for (const option of node.options) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option.label;
        button.addEventListener("click", () => {
          if (node.type === "gender") {
            state.gender = option.value;
            state.affection = 0;
            enter(option.next);
          } else {
            state.affection = Math.max(data.affectionGauge.min,
              Math.min(data.affectionGauge.max, state.affection + option.affection));
            enter(option.next);
            notify(`호감도 ${option.affection > 0 ? "+" : ""}${option.affection} · 현재 ${state.affection}`);
          }
        });
        ui.choices.append(button);
      }
    }

    ui.next.hidden = node.type === "gender" || node.type === "choice";
    ui.next.textContent = node.type === "ending" ? "처음부터 ↺" : "다음 ›";
  }

  function enter(id) {
    if (!data.nodes[id]) {
      notify("연결된 대사를 찾을 수 없어요: " + id);
      return;
    }
    state.node = id;
    notify("");
    render();
  }

  function advance() {
    const node = data.nodes[state.node];
    if (node.type === "ending") {
      state = newState();
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

  function load(fromTitle = false) {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(saveKey));
    } catch (_) {
      saved = null;
    }
    const previous = saved?.state;
    const valid = saved?.version === data.version && previous &&
      Object.hasOwn(data.nodes, previous.node) &&
      (previous.gender === null || Object.hasOwn(data.playerGenders, previous.gender)) &&
      (previous.node === data.start || previous.gender !== null) &&
      Number.isFinite(previous.affection);
    if (!valid) {
      if (fromTitle) ui.titleStatus.textContent = "불러올 수 있는 저장 기록이 없어요.";
      else notify("불러올 수 있는 저장 기록이 없어요.");
      return;
    }
    state = { node: previous.node, gender: previous.gender, affection: previous.affection };
    ui.title.hidden = true;
    ui.dialogue.hidden = false;
    render();
    notify("저장한 장면을 불러왔어요.");
  }

  $("title-start-button").addEventListener("click", () => {
    state = newState();
    ui.title.hidden = true;
    ui.dialogue.hidden = false;
    enter(state.node);
    ui.choices.querySelector("button")?.focus();
  });
  $("title-load-button").addEventListener("click", () => load(true));
  ui.next.addEventListener("click", advance);
  $("save-button").addEventListener("click", save);
  $("load-button").addEventListener("click", () => load());
  $("restart-button").addEventListener("click", () => {
    state = newState();
    enter(state.node);
    notify("처음부터 다시 시작했어요.");
  });
  ui.scene.addEventListener("click", (event) => {
    if (!ui.title.hidden) return;
    if (event.target.closest("button, .dialogue, .topbar, .hud")) return;
    advance();
  });
  document.addEventListener("keydown", (event) => {
    if (!ui.title.hidden) return;
    if (event.key === "Enter" && event.target.tagName !== "BUTTON") advance();
  });
  showImage(ui.titleBackground, data.assets.title, "");
  enter(state.node);
})();
