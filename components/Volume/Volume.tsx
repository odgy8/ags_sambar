import { Gtk } from "ags/gtk4";
import VolumeSliders from "./VolumeSliders";
import MediaPlayer from "./MediaPlayer";
import BatteryInfo from "./BatteryInfo";
import Notifications from "./Notifications";

export default function Volume() {
  return (
    <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
      <VolumeSliders />
      <MediaPlayer />
      <BatteryInfo />
      <Notifications />
    </box>
  );
}
