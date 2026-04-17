#!/usr/bin/env bash
set -euo pipefail

TARGET_MB=25
AUDIO_KBPS=96

find . -type f -name "*.mp4" -size +${TARGET_MB}M -print0 | while IFS= read -r -d '' f; do
  echo "▶ Compressing: $f"

  dur=$(ffprobe -v error -show_entries format=duration \
    -of default=noprint_wrappers=1:nokey=1 "$f")

  total_kbps=$(echo "$TARGET_MB * 8192 / $dur" | bc)
  video_kbps=$(echo "$total_kbps - $AUDIO_KBPS" | bc)

  compressed="${f%.mp4}_compressed.mp4"

  ffmpeg -y -i "$f" \
    -c:v libx264 -b:v ${video_kbps}k -pass 1 -an -f mp4 /dev/null

  ffmpeg -y -i "$f" \
    -c:v libx264 -b:v ${video_kbps}k -pass 2 \
    -c:a aac -b:a ${AUDIO_KBPS}k \
    "$compressed"

  rm -f ffmpeg2pass-0.log ffmpeg2pass-0.log.mbtree

  mv "$compressed" "$f"
  echo "✔ Done: $f (replaced with compressed version)"
done

echo "All oversized videos processed."
