// 대사와 선택지는 이 파일에서 수정하세요. 따옴표와 쉼표는 그대로 유지해 주세요.
// 선택지 A~D의 실제 문장과 상대 이름은 추후 이곳에서 채울 수 있습니다.
window.GAME_DATA = {
  version: 2,
  title: "인관심 7조 과제",
  affectionGauge: { min: -10, max: 10 },
  gameOver: {
    threshold: -8,
    title: "게임 오버",
    text: "호감도가 -8 이하가 되었습니다."
  },
  start: "choose_gender",
  assets: {
    title: "assets/title-cafe.png",
    backgrounds: { cafe: "assets/concepts/cafe-day.png" },
    portraits: {
      female: "assets/date-female.svg",
      male: "assets/date-male.svg"
    }
  },
  playerGenders: {
    male: { label: "남성", partner: "female" },
    female: { label: "여성", partner: "male" }
  },
  partners: {
    female: { name: "이름 미정", label: "여성", color: "#ffd5ba" },
    male: { name: "이름 미정", label: "남성", color: "#c7ddff" }
  },
  nodes: {
    choose_gender: {
      type: "gender", background: "cafe", portrait: null, speaker: null,
      text: "소개팅을 시작하기 전에 본인의 성별을 선택하세요.",
      options: [
        { label: "남성", value: "male", next: "cafe_intro" },
        { label: "여성", value: "female", next: "cafe_intro" }
      ]
    },
    cafe_intro: {
      type: "line", background: "cafe", portrait: null, speaker: null,
      text: "예시 대화 1",
      next: "greeting"
    },
    greeting: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 2",
      next: "first_choice"
    },
    first_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "first_question" },
        { label: "B", affection: 1, next: "first_question" },
        { label: "C", affection: -1, next: "first_question" },
        { label: "D", affection: -2, next: "first_question" }
      ]
    },
    first_question: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 3",
      next: "second_talk"
    },
    second_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 4",
      next: "second_choice"
    },
    second_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "second_question" },
        { label: "B", affection: 1, next: "second_question" },
        { label: "C", affection: -1, next: "second_question" },
        { label: "D", affection: -2, next: "second_question" }
      ]
    },
    second_question: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 5",
      next: "third_talk"
    },
    third_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 6",
      next: "third_choice"
    },
    third_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "fourth_talk" },
        { label: "B", affection: 1, next: "fourth_talk" },
        { label: "C", affection: -1, next: "fourth_talk" },
        { label: "D", affection: -2, next: "fourth_talk" }
      ]
    },
    fourth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 7",
      next: "fifth_talk"
    },
    fifth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 8",
      next: "fourth_choice"
    },
    fourth_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "sixth_talk" },
        { label: "B", affection: 1, next: "sixth_talk" },
        { label: "C", affection: -1, next: "sixth_talk" },
        { label: "D", affection: -2, next: "sixth_talk" }
      ]
    },
    sixth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 9",
      next: "seventh_talk"
    },
    seventh_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 10",
      next: "fifth_choice"
    },
    fifth_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "eighth_talk" },
        { label: "B", affection: 1, next: "eighth_talk" },
        { label: "C", affection: -1, next: "eighth_talk" },
        { label: "D", affection: -2, next: "eighth_talk" }
      ]
    },
    eighth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 11",
      next: "ninth_talk"
    },
    ninth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 12",
      next: "sixth_choice"
    },
    sixth_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "tenth_talk" },
        { label: "B", affection: 1, next: "tenth_talk" },
        { label: "C", affection: -1, next: "tenth_talk" },
        { label: "D", affection: -2, next: "tenth_talk" }
      ]
    },
    tenth_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 13",
      next: "eleventh_talk"
    },
    eleventh_talk: {
      type: "line", background: "cafe", portrait: "partner", speaker: "partner",
      text: "예시 대화 14",
      next: "seventh_choice"
    },
    seventh_choice: {
      type: "choice", background: "cafe", portrait: "partner", speaker: null,
      text: "",
      options: [
        { label: "A", affection: 2, next: "first_scene_end" },
        { label: "B", affection: 1, next: "first_scene_end" },
        { label: "C", affection: -1, next: "first_scene_end" },
        { label: "D", affection: -2, next: "first_scene_end" }
      ]
    },
    first_scene_end: {
      type: "ending", background: "cafe", portrait: "partner", speaker: null,
      text: "첫 번째 장면 종료",
      nextScene: {
        minAffection: 8,
        readyText: "호감도 8 이상 달성! 다음 장면으로 넘어가는 기능은 추후 구현 예정입니다.",
        lockedText: "호감도가 8 이상이면 다음 장면으로 넘어가는 기능은 추후 구현 예정입니다."
      }
    }
  }
};
