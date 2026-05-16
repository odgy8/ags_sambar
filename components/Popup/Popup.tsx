import { Astal, Gtk } from "ags/gtk4";
import { type Accessor, type Setter } from "ags";
import Button from "../../widgets/Button";

import PopupCss from "./Popup.css";

interface PopupProps {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  monitor: number;
  children: JSX.Element;
}

export default function Popup({
  isOpen,
  setIsOpen,
  monitor = 0,
  children,
}: PopupProps) {
  const anchor = Astal.WindowAnchor;

  return (
    <window
      css={PopupCss}
      class="popup"
      anchor={anchor.TOP | anchor.RIGHT}
      monitor={monitor}
      visible={isOpen}
      marginTop={8}
      marginRight={8}
    >
      <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <Button text="Close" onClick={() => setIsOpen(false)} />
        {children}
      </box>
    </window>
  );
}
