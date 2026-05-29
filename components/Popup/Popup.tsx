import { Astal, Gtk } from "ags/gtk4";
import { type Accessor, type Setter } from "ags";

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

  // Card created in JSX so css={PopupCss} applies to it and all inner widgets
  const card = (
    <box
      css={PopupCss}
      class="popup"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      marginTop={8}
      marginEnd={8}
    >
      {children}
    </box>
  ) as unknown as Gtk.Widget;

  // Transparent full-screen backdrop — clicking it closes the popup
  const backdrop = new Gtk.Box({ hexpand: true, vexpand: true });
  const closeGesture = new Gtk.GestureClick();
  closeGesture.connect("pressed", () => setIsOpen(false));
  backdrop.add_controller(closeGesture);

  // Overlay stacks card on top of backdrop — hit-testing routes clicks to
  // whichever widget is topmost, so clicks on the card never reach backdrop
  const overlay = new Gtk.Overlay();
  overlay.set_child(backdrop);
  overlay.add_overlay(card);
  overlay.set_hexpand(true);
  overlay.set_vexpand(true);

  return (
    <window
      class="popup-outer"
      anchor={anchor.TOP | anchor.RIGHT | anchor.BOTTOM | anchor.LEFT}
      exclusivity={Astal.Exclusivity.IGNORE}
      monitor={monitor}
      visible={isOpen}
    >
      {overlay}
    </window>
  );
}
