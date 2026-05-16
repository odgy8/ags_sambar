import { createPoll } from "ags/time";
import { execAsync } from "ags/process";

function parseBraveStreamIdAndVolume(
  stdout: string,
): { id: number; volume: number } | null {
  const blocks = stdout.split(/\n(?=Sink Input #\d+)/g);
  for (const block of blocks) {
    const idMatch = block.match(/Sink Input #(\d+)/);
    if (!idMatch) continue;

    const isBrave =
      /application\.process\.binary = "(brave|brave-browser)"/.test(block) ||
      /application\.name = "Brave[^"]*"/.test(block);
    if (!isBrave) continue;

    const volumeMatch = block.match(/Volume:[^\n]*?(\d+)%/);
    const id = Number(idMatch[1]);
    const volume = Number(volumeMatch?.[1] ?? 0);
    return { id, volume: Number.isFinite(volume) ? volume : 0 };
  }
  return null;
}

async function getBraveStreamInfo() {
  try {
    const stdout = await execAsync(["pactl", "list", "sink-inputs"]);
    return parseBraveStreamIdAndVolume(stdout);
  } catch {
    return null;
  }
}

async function setBraveVolumePercent(percent: number): Promise<void> {
  const info = await getBraveStreamInfo();
  if (!info) return;
  const pct = Math.max(0, Math.min(150, Math.round(percent)));
  await execAsync([
    "pactl",
    "set-sink-input-volume",
    String(info.id),
    `${pct}%`,
  ]);
}

const sinkVolumePercent = createPoll(0, 1000, async () => {
  try {
    const stdout = await execAsync([
      "pactl",
      "get-sink-volume",
      "@DEFAULT_SINK@",
    ]);
    const match = stdout.match(/(\d+)%/);
    return Number(match?.[1] ?? 0);
  } catch {
    return 0;
  }
});

const sinkMute = createPoll(false, 1000, async () => {
  try {
    const stdout = await execAsync([
      "pactl",
      "get-sink-mute",
      "@DEFAULT_SINK@",
    ]);
    return stdout.includes("yes");
  } catch {
    return false;
  }
});

const sourceVolumePercent = createPoll(0, 1000, async () => {
  try {
    const stdout = await execAsync([
      "pactl",
      "get-source-volume",
      "@DEFAULT_SOURCE@",
    ]);
    const match = stdout.match(/(\d+)%/);
    return Number(match?.[1] ?? 0);
  } catch {
    return 0;
  }
});

const sourceMute = createPoll(false, 1000, async () => {
  try {
    const stdout = await execAsync([
      "pactl",
      "get-source-mute",
      "@DEFAULT_SOURCE@",
    ]);
    return stdout.includes("yes");
  } catch {
    return false;
  }
});

const braveNowPlaying = createPoll("Brave not playing", 1500, async () => {
  try {
    const stdout = await execAsync([
      "playerctl",
      "--player=brave",
      "metadata",
      "--format",
      "{{ artist }} - {{ title }}",
    ]);
    const value = stdout.trim().replace(/^-\s*/, "");
    return value.length > 0 ? value : "Brave is playing";
  } catch {
    return "Brave not playing";
  }
});

const braveStatus = createPoll("Stopped", 1500, async () => {
  try {
    const stdout = await execAsync(["playerctl", "--player=brave", "status"]);
    return stdout.trim();
  } catch {
    return "Stopped";
  }
});

const braveVolumePercent = createPoll(0, 1200, async () => {
  const info = await getBraveStreamInfo();
  return info ? info.volume : 0;
});

const braveStreamDetected = createPoll(
  false,
  1200,
  async () => (await getBraveStreamInfo()) !== null,
);

export {
  sinkVolumePercent,
  sinkMute,
  sourceVolumePercent,
  sourceMute,
  braveNowPlaying,
  braveStatus,
  braveVolumePercent,
  setBraveVolumePercent,
  braveStreamDetected,
};
