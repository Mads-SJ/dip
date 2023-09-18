export function getEyeElements(numberOfEyes) {
    let face;
    let dot = `<span class="dot"></span>`;

    switch (numberOfEyes) {
        case 1:
            face = `<div class="face first-face">
                ${dot}
              </div>`;
            break;
        case 2:
            face = `<div class="face second-face">
                ${dot}
                ${dot}
              </div>`;
            break;
        case 3:
            face = `<div class="face third-face">
                ${dot}
                ${dot}
                ${dot}
              </div>`;
            break;
        case 4:
            face = `<div class="face fourth-face">
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
              </div>`;
            break;
        case 5:
            face = `<div class="face fifth-face">
                  <div class="column">
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
              </div>`;
            break;
        case 6:
            face = `<div class="face sixth-face">
                <div class="column">
                  ${dot}
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                  ${dot}
                </div>
              </div>`;
            break;
    }
    return face;
}