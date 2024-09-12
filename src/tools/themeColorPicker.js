export default function themeColorPicker(inputColor, theme) {
  let taskPallete;
  switch (theme) {
    case "bubbleGum":
      taskPallete = bubbleGumColorPicker(inputColor);
      break;
    case "space":
      result.taskPallete = bubbleGumColorPicker(inputColor);
      break;
    case "beach":
      result.taskPallete = bubbleGumColorPicker(inputColor);
      break;
    default:
      taskPallete = pastelColorPicker(inputColor);
      break;
  }
  return { taskPallete: taskPallete };
}

function bubbleGumColorPicker(inputColor) {
  let borderColor;
  let color;
  let dragColor;

  switch (inputColor) {
    case "red":
      color = "#FC1C46";
      borderColor = "#fff";
      dragColor = "#CA0227";
      break;
    case "orange":
      color = "#FC9A2E";
      borderColor = "#000";
      dragColor = "#F17E04";
      break;
    case "green":
      color = "#1CCDB5";
      borderColor = "#fff";
      dragColor = "#14907F";
      break;
    case "blue":
      color = "#4AB8F9";
      borderColor = "#fff";
      dragColor = "#078CDA";
      break;
    case "yellow":
      color = "#FEF462";
      borderColor = "#000";
      dragColor = "#DFD001";
      break;
    case "purple":
      color = "#8965BC";
      borderColor = "#fff";
      dragColor = "#563880";
      break;
    case "disabled":
      color = "#DADADA";
      borderColor = "#646363";
      dragColor = "#5C2418";
      break;
    default:
      color = "#F45489";
      borderColor = "#fff";
      dragColor = "#F05489";
  }

  let result = {
    backgroundColor: color,
    borderColor: borderColor,
    dragColor: dragColor,
  };
  return result;
}

function pastelColorPicker(inputColor) {
  let borderColor;
  let color;
  let dragColor;

  switch (inputColor) {
    case "red":
      color = "#FC1C46";
      borderColor = "#fff";
      dragColor = "#CA0227";
      break;
    case "orange":
      color = "#FC9A2E";
      borderColor = "#000";
      dragColor = "#F17E04";
      break;
    case "green":
      color = "#1CCDB5";
      borderColor = "#fff";
      dragColor = "#14907F";
      break;
    case "blue":
      color = "#4AB8F9";
      borderColor = "#fff";
      dragColor = "#078CDA";
      break;
    case "yellow":
      color = "#FEF462";
      borderColor = "#000";
      dragColor = "#DFD001";
      break;
    case "purple":
      color = "#8965BC";
      borderColor = "#fff";
      dragColor = "#563880";
      break;
    case "disabled":
      color = "#DADADA";
      borderColor = "#646363";
      dragColor = "#5C2418";
      break;
    default:
      color = "#000000";
      borderColor = "#fff";
      dragColor = "#F05489";
  }

  let result = {
    backgroundColor: color,
    borderColor: borderColor,
    dragColor: dragColor,
  };
  return result;
}
