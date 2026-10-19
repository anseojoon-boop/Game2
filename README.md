# 옥상에서 만난 봄

설치 없이 즐기는 작은 비주얼 노벨 예제입니다. `index.html`을 더블클릭해 브라우저에서 열면 됩니다. **다음**을 누르거나 화면의 빈 곳을 클릭하면 대사가 진행되고, 선택지 버튼을 누르면 이야기가 달라집니다.

## 직접 고치는 곳

- **대사·선택지:** `story.js`의 `nodes`를 고칩니다. `text`가 화면에 나오는 글이고, `next`가 다음 장면의 이름입니다. `options`는 선택지 목록입니다.
- **호감도:** 선택지의 `affection: { mina: 1 }`은 미나 호감도를 1 올립니다. 이름을 `haneul`로 바꾸면 하늘의 호감도가 올라갑니다.
- **이미지:** 새 이미지를 `assets` 폴더에 넣고 `story.js` 맨 위의 `assets`에 경로를 적습니다. 각 장면의 `background`와 `portrait`에는 그 이미지의 짧은 이름을 적습니다. PNG·JPG·SVG를 사용할 수 있습니다.
- **화면 모양:** 색, 글자 크기, 배치는 `style.css`를 고칩니다.

새 대사를 넣으려면 기존 `line` 장면 하나를 복사해 `nodes` 안에 붙여 넣고, 장면 이름과 `text`, `next`를 바꾸세요. 예를 들어 `mina_talk` 뒤에 `mina_more`를 추가했다면 `mina_talk`의 `next`를 `mina_more`로 바꿉니다. 장면 이름은 겹치면 안 됩니다. 쉼표·따옴표·중괄호는 지우지 마세요.

선택지의 `next`에는 선택 후 이동할 장면 이름을 적습니다. `ending` 장면의 `unlock`에 CG 이름을 적으면 그 장면에 도달했을 때 **추억 보기**에서 이미지가 열립니다. CG 이름은 `assets.cgs`와 `gallery`에도 같게 적어야 합니다.

**저장**은 현재 위치와 호감도를 브라우저에 기록합니다. **불러오기**는 기록한 장면으로 돌아갑니다. 추억 해금은 별도로 남아서 **처음부터**를 눌러도 유지됩니다. 브라우저 저장 데이터를 삭제하거나 다른 기기·브라우저에서 열면 기록을 공유할 수 없습니다. 이야기 구조를 크게 바꿀 때는 `story.js`의 `version`을 올리면 이전 저장 기록 대신 새 게임을 시작할 수 있습니다.

파일이 열리지 않는 브라우저에서는 이 폴더에서 `python3 -m http.server 8000`을 실행한 뒤 `http://localhost:8000`으로 접속하세요.

## 웹에서 열기

임시 미리보기 주소: https://raw.githack.com/anseojoon-boop/Game2/main/index.html

고정된 GitHub Pages 주소를 만들려면 GitHub 저장소의 **Settings → Pages**에서 **Deploy from a branch**, **main**, **/(root)**를 선택하고 저장하세요. 게시가 끝나면 https://anseojoon-boop.github.io/Game2/ 에서 열 수 있습니다. 이 설정은 저장소 소유자가 한 번만 하면 됩니다.
