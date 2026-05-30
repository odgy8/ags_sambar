// Package imports
import app from "ags/gtk4/app";
import { createState } from "ags";

// Style imports
import style from "./sambar.css";

// Component imports
import Bar from "./components/Bar/Bar";
import Popup from "./components/Popup/Popup";
import Volume from "./components/Volume/Volume";
import CalendarPopup from "./components/Calendar/CalendarPopup";

app.start({
  css: style,
  main() {
    const [isOpen0, setIsOpen0] = createState<boolean>(false);
    const [isOpen1, setIsOpen1] = createState<boolean>(false);
    const [isOpen2, setIsOpen2] = createState<boolean>(false);

    const [isCalendarOpen0, setIsCalendarOpen0] = createState<boolean>(false);
    const [isCalendarOpen1, setIsCalendarOpen1] = createState<boolean>(false);
    const [isCalendarOpen2, setIsCalendarOpen2] = createState<boolean>(false);

    Bar({ monitor: 0, setIsOpen: setIsOpen0, setIsCalendarOpen: setIsCalendarOpen0 });
    Popup({ monitor: 0, isOpen: isOpen0, setIsOpen: setIsOpen0, children: <Volume /> });
    CalendarPopup({ monitor: 0, isOpen: isCalendarOpen0, setIsOpen: setIsCalendarOpen0 });

    Bar({ monitor: 1, setIsOpen: setIsOpen1, setIsCalendarOpen: setIsCalendarOpen1 });
    Popup({ monitor: 1, isOpen: isOpen1, setIsOpen: setIsOpen1, children: <Volume /> });
    CalendarPopup({ monitor: 1, isOpen: isCalendarOpen1, setIsOpen: setIsCalendarOpen1 });

    Bar({ monitor: 2, setIsOpen: setIsOpen2, setIsCalendarOpen: setIsCalendarOpen2 });
    Popup({ monitor: 2, isOpen: isOpen2, setIsOpen: setIsOpen2, children: <Volume /> });
    CalendarPopup({ monitor: 2, isOpen: isCalendarOpen2, setIsOpen: setIsCalendarOpen2 });
  },
});
