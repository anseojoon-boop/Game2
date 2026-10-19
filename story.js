// 이야기를 고칠 때는 이 파일을 수정하세요. 쉼표와 따옴표는 그대로 유지해 주세요.
// 이미지 이름(roof, mina 등)은 아래 assets에서 실제 파일 경로와 연결됩니다.
window.GAME_DATA = {
  version: 1,
  title: "옥상에서 만난 봄",
  start: "opening",
  assets: {
    backgrounds: {
      roof: "assets/roof.svg",
      library: "assets/library.svg"
    },
    characters: {
      mina: "assets/mina.svg",
      haneul: "assets/haneul.svg"
    },
    cgs: {
      mina_memory: "assets/mina-memory.svg",
      haneul_memory: "assets/haneul-memory.svg"
    }
  },
  characters: {
    mina: { name: "미나", color: "#ffb5c8" },
    haneul: { name: "하늘", color: "#a5d9ff" }
  },
  gallery: {
    mina_memory: { title: "옥상의 약속", description: "미나와 함께한 봄날" },
    haneul_memory: { title: "도서관의 오후", description: "하늘과 함께한 조용한 시간" }
  },
  nodes: {
    opening: {
      type: "line", background: "roof", portrait: null, speaker: null,
      text: "새 학기가 시작된 첫날. 바람을 따라 학교 옥상에 올라왔다.", next: "mina_hello"
    },
    mina_hello: {
      type: "line", background: "roof", portrait: "mina", speaker: "mina",
      text: "여기 있었네! 오늘 방과 후에 시간 있어?", next: "haneul_hello"
    },
    haneul_hello: {
      type: "line", background: "roof", portrait: "haneul", speaker: "haneul",
      text: "도서관에도 들러 줘. 보여 주고 싶은 책이 있어.", next: "first_choice"
    },
    first_choice: {
      type: "choice", background: "roof", portrait: null, speaker: null,
      text: "오늘은 누구와 시간을 보낼까?",
      options: [
        { text: "미나와 옥상에 남는다", next: "mina_talk", affection: { mina: 1 } },
        { text: "하늘과 도서관에 간다", next: "haneul_talk", affection: { haneul: 1 } }
      ]
    },
    mina_talk: {
      type: "line", background: "roof", portrait: "mina", speaker: "mina",
      text: "와 줘서 고마워. 사실 같이 보고 싶은 풍경이 있거든.", next: "mina_choice"
    },
    mina_choice: {
      type: "choice", background: "roof", portrait: "mina", speaker: "mina",
      text: "미나가 손을 내민다. 어떻게 할까?",
      options: [
        { text: "손을 잡고 함께 걷는다", next: "mina_ending", affection: { mina: 1 } },
        { text: "다음에 보자고 말한다", next: "quiet_ending" }
      ]
    },
    haneul_talk: {
      type: "line", background: "library", portrait: "haneul", speaker: "haneul",
      text: "이 책의 마지막 장면을 너와 함께 읽고 싶었어.", next: "haneul_choice"
    },
    haneul_choice: {
      type: "choice", background: "library", portrait: "haneul", speaker: "haneul",
      text: "하늘이 책을 펼친다. 어떻게 할까?",
      options: [
        { text: "옆에 앉아 함께 읽는다", next: "haneul_ending", affection: { haneul: 1 } },
        { text: "다음에 읽자고 말한다", next: "quiet_ending" }
      ]
    },
    mina_ending: {
      type: "ending", background: "roof", portrait: "mina", speaker: "mina",
      text: "내일도 여기서 만나자. 약속이야!", unlock: "mina_memory"
    },
    haneul_ending: {
      type: "ending", background: "library", portrait: "haneul", speaker: "haneul",
      text: "다음 책도 함께 읽을래?", unlock: "haneul_memory"
    },
    quiet_ending: {
      type: "ending", background: "roof", portrait: null, speaker: null,
      text: "오늘은 조용히 지나갔다. 내일은 다른 이야기가 시작될지도 모른다."
    }
  }
};
