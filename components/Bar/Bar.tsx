// Package imports
import { Astal } from "ags/gtk4";
import { type Setter } from "ags";

// Style imports
import BarCss from "./Bar.css";

import Section from "../../widgets/Section";
import Workspaces from "../Workspaces/Workspaces";
import Button from "../../widgets/Button";
import Clock from "../../widgets/Clock";

interface BarProps {
  setIsOpen: Setter<boolean>;
  monitor: number;
}

export default function Bar({ setIsOpen, monitor = 0 }: BarProps) {
  const anchor = Astal.WindowAnchor;
  const exlusivity = Astal.Exclusivity;

  const Temp = () => (
    <>
      <Button text="Open" onClick={() => setIsOpen(true)} />
    </>
  );

  return (
    <window
      css={BarCss}
      visible
      monitor={monitor}
      anchor={anchor.TOP | anchor.LEFT | anchor.RIGHT}
      class="bar bar-container"
      exclusivity={exlusivity.EXCLUSIVE}
    >
      <centerbox
        startWidget={<Section content={<Workspaces />} />}
        centerWidget={<Section content={<Clock />} />}
        endWidget={<Section content={<Temp />} />}
      />
    </window>
  );
}
