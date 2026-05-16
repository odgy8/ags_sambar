// Package imports
import app from "ags/gtk4/app";
import { createState } from "ags";

// Style imports
import style from "./sambar.css";

// Component imports
import Bar from "./components/Bar/Bar";
import Popup from "./components/Popup/Popup";
import Volume from "./components/Volume/Volume";

app.start({
  css: style,
  main() {
    const [isOpen0, setIsOpen0] = createState<boolean>(false);
    const [isOpen1, setIsOpen1] = createState<boolean>(false);
    const [isOpen2, setIsOpen2] = createState<boolean>(false);

    Bar({ monitor: 0, setIsOpen: setIsOpen0 });
    Popup({
      monitor: 0,
      isOpen: isOpen0,
      setIsOpen: setIsOpen0,
      children: <Volume />,
    });

    Bar({ monitor: 1, setIsOpen: setIsOpen1 });
    Popup({
      monitor: 1,
      isOpen: isOpen1,
      setIsOpen: setIsOpen1,
      children: <Volume />,
    });

    Bar({ monitor: 2, setIsOpen: setIsOpen2 });
    Popup({
      monitor: 2,
      isOpen: isOpen2,
      setIsOpen: setIsOpen2,
      children: <Volume />,
    });
  },
});
